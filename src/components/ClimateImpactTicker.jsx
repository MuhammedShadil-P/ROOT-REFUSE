import React, { useState, useEffect } from 'react';

export default function ClimateImpactTicker() {
  const [metrics, setMetrics] = useState({
    plastics: 1420.4,
    co2: 3250.8,
    warriors: 84,
    trees: 310,
    landfillM3: 18.4,
    gridPurity: 99.4
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        plastics: Number((prev.plastics + 0.3).toFixed(1)),
        co2: Number((prev.co2 + 0.7).toFixed(1)),
        warriors: prev.warriors + (Math.random() > 0.7 ? 1 : 0),
        trees: prev.trees + (Math.random() > 0.85 ? 1 : 0),
        landfillM3: Number((prev.landfillM3 + 0.04).toFixed(2)),
        gridPurity: 99.4
      }));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-full bg-obsidian-950 text-white border-b-2 border-lime/40 py-2.5 px-2.5 sm:px-4 overflow-hidden relative z-30 select-none shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
        {/* Live Status Indicator Pill */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 bg-lime/10 border border-lime/30 px-2 sm:px-3 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-lime animate-ping"></span>
          <span className="font-mono text-[10px] sm:text-[11px] font-black text-lime uppercase tracking-wider sm:tracking-widest flex items-center gap-1.5">
            <span className="hidden sm:inline">● LIVE CLIMATE TELEMETRY</span>
            <span className="sm:hidden">● TELEMETRY</span>
          </span>
        </div>

        {/* Marquee ticker stream */}
        <div className="flex-1 overflow-hidden relative">
          <div className="flex w-max animate-marquee font-mono text-xs tracking-wider items-center gap-8 whitespace-nowrap">
            {[1, 2].map((k) => (
              <React.Fragment key={k}>
                <div className="flex items-center gap-2">
                  <span className="text-white/60 uppercase">PLASTICS DIVERTED:</span>
                  <span className="text-lime font-black text-sm">{metrics.plastics.toLocaleString()} KG</span>
                  <span className="text-lime text-[10px] bg-lime/10 px-1 py-0.2 rounded font-mono font-bold">▲ +0.3/3s</span>
                </div>
                <span className="text-lime/40">✦</span>

                <div className="flex items-center gap-2">
                  <span className="text-white/60 uppercase">CO2 OFFSET:</span>
                  <span className="text-white font-black text-sm">{metrics.co2.toLocaleString()} KG</span>
                  <span className="text-lime text-[10px] bg-lime/10 px-1 py-0.2 rounded font-mono font-bold">▲ +0.7/3s</span>
                </div>
                <span className="text-lime/40">✦</span>

                <div className="flex items-center gap-2">
                  <span className="text-white/60 uppercase">ACTIVE ECO-WARRIORS:</span>
                  <span className="text-lime font-black text-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime inline-block animate-pulse"></span>
                    {metrics.warriors} ONLINE
                  </span>
                </div>
                <span className="text-lime/40">✦</span>

                <div className="flex items-center gap-2">
                  <span className="text-white/60 uppercase">TREES SAVED:</span>
                  <span className="text-white font-black text-sm">{metrics.trees} TREES</span>
                </div>
                <span className="text-lime/40">✦</span>

                <div className="flex items-center gap-2">
                  <span className="text-white/60 uppercase">LANDFILL SPARED:</span>
                  <span className="text-lime font-black text-sm">{metrics.landfillM3} M³</span>
                </div>
                <span className="text-lime/40">✦</span>

                <div className="flex items-center gap-2">
                  <span className="text-white/60 uppercase">GRID PURITY:</span>
                  <span className="text-cobalt-light font-black text-sm">{metrics.gridPurity}%</span>
                </div>
                <span className="text-lime/40">✦</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right Tag */}
        <div className="hidden md:flex items-center gap-2 text-white/50 font-mono text-[10px] shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-lime"></span>
          <span>AUTONOMOUS STREAM ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
