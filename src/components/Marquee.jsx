import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export default function Marquee({ text, speed = "normal", bg = "bg-lime", textColor = "text-obsidian-950" }) {
  const items = [
    "SMART SEGREGATION",
    "CIRCULAR ECONOMY",
    "ZERO TO LANDFILL",
    "AI OPTICAL SORTING",
    "UPCYCLED TREASURES",
    "METALLURGY RECOVERY",
    "COMMUNITY COMPOST",
    "RE-ENGINEERING TOMORROW"
  ];

  return (
    <div className={`w-full ${bg} ${textColor} py-3.5 border-y-2 border-obsidian-900 overflow-hidden select-none relative z-20`}>
      <div className="flex w-max animate-marquee font-editorial-condensed text-sm sm:text-base tracking-widest whitespace-nowrap items-center font-black">
        {[...items, ...items, ...items].map((phrase, i) => (
          <div key={i} className="flex items-center mx-4 gap-4">
            <span>{phrase}</span>
            <span className="text-obsidian-900 font-mono text-xs opacity-70">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
