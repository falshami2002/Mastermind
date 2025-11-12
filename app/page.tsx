"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, ShoppingCart, Bell, Circle, Gamepad2 } from "lucide-react";

const ART = {
  messi: "https://images.unsplash.com/photo-1522770179533-24471fcdba45?q=80&w=1600&auto=format&fit=crop",
  ball: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  skills: "https://plus.unsplash.com/premium_photo-1684713510655-e6e31536168d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  totw: "https://images.unsplash.com/photo-1527871369852-eb58cb2b54e2?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  crest: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Soccer_ball.svg",
  grass: "/FifaBackground.png",
};

const COLORS = {
  gold1: "#F6C945",
  gold2: "#FF9F1A",
  panel: "#141820",
  panelDim: "#10151B",
  line: "#2A303A",
  text: "#ECEFF4",
  sub: "#9AA3B2",
};

function DockedNav() {
  const tabs = ["HOME", "PLAY", "ONLINE", "MATCH DAY LIVE", "CUSTOMISE"];

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-[1280px] px-6">
        <div className="relative h-12 flex items-center gap-8 px-6 select-none">
          <div className="absolute inset-x-0 top-0 h-px bg-gray-400/40" />

          {tabs.map((t, i) => (
            <button
              key={t}
              className={`group relative uppercase text-[13px] tracking-wide font-semibold pb-1 transition-colors
                ${i === 0 ? "text-[#F6C945]" : "text-gray-200/85 hover:text-[#F6C945]"}`}
            >
              {t}
              <span
                className={`absolute left-0 right-0 -top-[13px] h-px transition-opacity ${i === 0 ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                style={{
                  background:
                    i === 0
                      ? `linear-gradient(
            90deg,
            rgba(246,201,69,0) 0%,
            rgba(246,201,69,0.7) 20%,
            ${COLORS.gold1} 40%,
            ${COLORS.gold2} 60%,
            rgba(246,201,69,0.7) 80%,
            rgba(246,201,69,0) 100%
          )`
                      : `linear-gradient(90deg, transparent, ${COLORS.gold1}, transparent)`,
                  boxShadow:
                    i === 0
                      ? "0 0 8px rgba(246,201,69,1), 0 0 16px rgba(255,159,26,0.95), 0 0 24px rgba(246,201,69,0.8)"
                      : "none",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -1 }}
      className={`group relative isolate overflow-hidden border ${className}`}
      style={{
        borderColor: COLORS.line,
        background: `linear-gradient(135deg, ${COLORS.panel}, #0F1319)`,
        boxShadow: "0 1px 0 rgba(255,255,255,0.03)",
      }}
    >
      <div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${COLORS.gold1}, ${COLORS.gold2})` }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}


function KickOffCard() {
  return (
    <Panel className="col-span-6">
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3">
          <img src={ART.crest} className="w-10 h-10" />
          <span className="font-extrabold tracking-wide text-white">MASTERMIND</span>
        </div>
        <div className="mt-4 text-[44px] leading-none font-black text-white">1ST</div>
        <div className="mt-6 text-sm text-white/80">Team form:</div>
        <div className="mt-1 flex items-center gap-3 text-xs font-semibold text-white">
          <span className="px-2 py-0.5 bg-black/30">▲ 5</span>
          <span className="px-2 py-0.5 bg-black/30">▼ 1</span>
          <span>W/D/W/W/W</span>
        </div>
      </div>
    </Panel>
  );
}


function CatalogueCard() {
  return (
    <Panel className="col-span-6">
      <div className="grid grid-cols-12">
        <div className="col-span-7 p-6 md:p-8 relative z-10">
          <h3 className="text-white font-black tracking-wide text-lg">HEAD TO HEAD</h3>
          <div className="mt-2 text-sm" style={{ color: COLORS.sub }}>
            Play Against a Friend
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="text-white/90 font-bold">250</div>
            <div className="text-white/70 text-sm">LEVEL 1</div>
          </div>

          <div className="mt-6 text-xs" style={{ color: COLORS.sub }}>
            REDEEM OR GIFT NOW! Unlockables with your Football Club Credits.
          </div>

          <div className="mt-6 flex gap-3">
            {["Create", "Join"].map((label) => (
              <button
                key={label}
                className={[
                  "text-sm font-semibold px-4 py-2 rounded transition-colors duration-200",
                  "bg-[#141820]/85 border border-yellow-400/70 text-yellow-300",
                  "group-hover:bg-[#141820]/85 group-hover:border-yellow-400/70 group-hover:text-yellow-300",
                  "hover:bg-white hover:border-white hover:text-black",
                  "shadow-sm hover:shadow"
                ].join(" ")}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-5 relative min-h-[220px]">
          <img src={ART.ball} className="absolute inset-0 w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(500px 400px at 40% 50%, rgba(255,255,255,.05), transparent 60%)" }}
          />
        </div>
      </div>
    </Panel>
  );
}

function SmallCard({ title, subtitle, art }: { title: string; subtitle: string; art: string }) {
  return (
    <Panel className="col-span-6" dim>
      <div className="grid grid-cols-12">
        <div className="col-span-7 p-6 md:p-8">
          <h4 className="text-white font-extrabold tracking-wide">{title}</h4>
          <p className="mt-2 text-sm" style={{ color: COLORS.sub }}>
            {subtitle}
          </p>
        </div>
        <div className="col-span-5 relative min-h-[150px]">
          <img src={art} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent, rgba(0,0,0,.35))" }} />
        </div>
      </div>
      <div className="absolute bottom-2 right-4 flex items-center gap-1">
        <span className="w-2 h-2 bg-white/30" />
        <span className="w-2 h-2 bg-white/30" />
        <span className="w-2 h-2 bg-white" />
      </div>
    </Panel>
  );
}

export default function FIFA15HomePage() {
  return (
    <div className="relative min-h-screen w-full bg-transparent">
      <div
        className="fixed inset-x-0 bottom-0 h-[100vh] bg-no-repeat bg-bottom z-0"
        style={{ backgroundImage: `url(${ART.grass})`, backgroundSize: "cover" }}
      />
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.25) 26%, rgba(0,0,0,0.00) 55%, rgba(0,0,0,0.00) 75%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-0rem)]">
        <DockedNav />
        <main className="mx-auto w-full max-w-[1280px] px-6 pt-0 pb-6 grid grid-cols-12 gap-5">
          <KickOffCard />
          <CatalogueCard />
          <SmallCard
            title="SKILL GAMES"
            subtitle="Improve and test your FIFA skills in a variety of mini-games."
            art={ART.skills}
          />
          <SmallCard
            title="TEAM OF THE WEEK"
            subtitle="The best players of the week are in Ultimate Team. Visit now!"
            art={ART.totw}
          />
        </main>
      </div>
    </div>
  );
}
