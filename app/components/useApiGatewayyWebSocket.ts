import { useEffect, useRef, useState, useCallback } from "react";

type Options = {
  url: string;
  heartbeatMs?: number;
  maxBackoffMs?: number;
  initialBackoffMs?: number;
};

export function useApiGatewayWebSocket({
  url,
  heartbeatMs = 15000,
  initialBackoffMs = 500,
  maxBackoffMs = 5000,
}: Options) {
  const wsRef = useRef<WebSocket | null>(null);
  const heartbeatRef = useRef<number | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);
  const backoffRef = useRef(initialBackoffMs);
  const connectRef = useRef<() => void>(() => {});
  const [isOpen, setIsOpen] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const [error, setError] = useState<Event | null>(null);

  const clearHeartbeat = () => {
    if (heartbeatRef.current) {
      window.clearInterval(heartbeatRef.current);
      heartbeatRef.current = null;
    }
  };

  const startHeartbeat = () => {
    clearHeartbeat();
    if (heartbeatMs > 0 && wsRef.current?.readyState === WebSocket.OPEN) {
      heartbeatRef.current = window.setInterval(() => {
        try {
          wsRef.current?.send(JSON.stringify({ type: "ping", t: Date.now() }));
        } catch {}
      }, heartbeatMs);
    }
  };

  const scheduleReconnect = useCallback(() => {
    const delay = Math.min(backoffRef.current, maxBackoffMs);
    if (reconnectTimeoutRef.current) window.clearTimeout(reconnectTimeoutRef.current);
    reconnectTimeoutRef.current = window.setTimeout(() => {
      connectRef.current();
      backoffRef.current = Math.min(backoffRef.current * 2, maxBackoffMs);
    }, delay) as unknown as number;
  }, [maxBackoffMs]);

  const close = useCallback(() => {
    wsRef.current?.close();
    clearHeartbeat();
    if (reconnectTimeoutRef.current) window.clearTimeout(reconnectTimeoutRef.current);
  }, []);

  const connect = useCallback(() => {
    try {
      if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
        return;
      }
      wsRef.current = new WebSocket(url);
      wsRef.current.onopen = () => {
        setIsOpen(true);
        setError(null);
        backoffRef.current = initialBackoffMs;
        startHeartbeat();
      };
      wsRef.current.onmessage = (evt) => {
        const data = (() => { try { return JSON.parse(evt.data); } catch { return evt.data; } })();
        setLastMessage(data);
      };
      wsRef.current.onerror = (evt) => setError(evt);
      wsRef.current.onclose = () => {
        setIsOpen(false);
        clearHeartbeat();
        scheduleReconnect();
      };
    } catch {
      scheduleReconnect();
    }
  }, [url, initialBackoffMs, scheduleReconnect]);

  useEffect(() => {
    connectRef.current = connect;
  }, [connect]);

  useEffect(() => {
    connect();
    return () => close();
  }, [url, connect, close]);

  const send = useCallback((payload: unknown) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return false;
    try {
      const data = typeof payload === "string" ? payload : JSON.stringify(payload);
      wsRef.current.send(data);
      return true;
    } catch {
      return false;
    }
  }, []);

  return { isOpen, lastMessage, error, send, close };
}
