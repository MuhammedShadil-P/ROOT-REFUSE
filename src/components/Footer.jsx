import React, { useState } from 'react';
import { ArrowUpRight, Globe, Sparkles, Send, CheckCircle2 } from 'lucide-react';

export default function Footer({ onNavigate, onOpenCredits }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-obsidian-900 text-white border-t-2 border-obsidian-800 relative overflow-hidden select-none">
      
      {/* Top Banner section: Bold callout like reference image */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-lime"></span>
                <span className="font-mono text-xs uppercase tracking-widest text-lime font-bold">
                  CIRCULAR MATERIALS MANIFESTO
                </span>
              </div>
              <h2 className="font-editorial-condensed text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[0.95]">
                WASTE IS ONLY WASTE <br />
                WHEN WE LOSE <span className="text-lime">IMAGINATION.</span>
              </h2>

              {/* Dedicated Creators / Meet the Team Footer CTA */}
              {onOpenCredits && (
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={onOpenCredits}
                    className="px-6 py-3.5 bg-lime hover:bg-lime-bright text-obsidian-950 font-editorial-condensed font-black text-xs sm:text-sm uppercase tracking-wider rounded-full border-2 border-obsidian-950 shadow-brutal hover:translate-x-0.5 hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>✦ MEET THE TEAM</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              )}
            </div>
            
            <div className="lg:col-span-5 bg-obsidian-800/80 p-6 sm:p-8 border border-white/10 rounded-sm">
              <span className="font-mono text-xs uppercase text-white/60 tracking-wider block mb-2 font-bold">
                [NEWSLETTER & CIR-INTEL DISPATCH]
              </span>
              <p className="text-sm text-white/80 mb-4 font-sans leading-relaxed">
                Receive weekly breakdown intelligence on hard-to-recycle items, open-source CNC upcycling blueprints, and local salvage drives.
              </p>
              
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER WORK EMAIL..."
                  className="flex-1 bg-obsidian-950 border border-white/20 text-white px-3.5 py-2.5 font-mono text-xs focus:outline-none focus:border-lime transition-colors"
                />
                <button
                  type="submit"
                  className="bg-lime text-obsidian-950 font-editorial-condensed font-black px-4 py-2.5 text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-lime-bright transition-colors"
                >
                  {subscribed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-obsidian-950" />
                      <span>JOINED</span>
                    </>
                  ) : (
                    <>
                      <span>TRANSMIT</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Center 4-Column Editorial Matrix */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Col 1: Platform */}
          <div>
            <span className="font-mono text-xs uppercase text-lime tracking-widest block mb-4 font-bold">
              // PLATFORM
            </span>
            <ul className="space-y-2.5 font-mono text-xs text-white/70">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  01. Home & Impact Index
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('scanner')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  02. AI Vision Snap-Sort <span className="text-[10px] bg-lime/20 text-lime px-1 rounded">NEW</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('community')} className="hover:text-white transition-colors">
                  03. Upcycling Blueprints
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('map')} className="hover:text-white transition-colors">
                  04. Eco-Map & Drop-Offs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('profile')} className="hover:text-white transition-colors">
                  05. Member Profile & Ranks
                </button>
              </li>
              {onOpenCredits && (
                <li>
                  <button onClick={onOpenCredits} className="text-lime hover:underline font-bold transition-colors flex items-center gap-1">
                    <span>✦ 06. Dev Team: Muhammed Shadil & Muhammed Sawad</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 2: Categories */}
          <div>
            <span className="font-mono text-xs uppercase text-lime tracking-widest block mb-4 font-bold">
              // SORT CATEGORIES
            </span>
            <ul className="space-y-2.5 font-mono text-xs text-white/70">
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('scanner')}>
                • Compostable Bio-Mass
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('scanner')}>
                • Rigid Polymers (#1 to #7)
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('scanner')}>
                • E-Waste & Precious Metals
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('scanner')}>
                • Textiles & Post-Consumer Denim
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('scanner')}>
                • Cullet Glass & Aluminum
              </li>
            </ul>
          </div>

          {/* Col 3: Research & Standards */}
          <div>
            <span className="font-mono text-xs uppercase text-lime tracking-widest block mb-4 font-bold">
              // STANDARDS & API
            </span>
            <ul className="space-y-2.5 font-mono text-xs text-white/70">
              <li className="flex items-center gap-1.5">
                <span className="text-white/40">RFC:</span> ISO-14001 Protocol
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-white/40">AUDIT:</span> R2v3 Metallurgy
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-white/40">MODEL:</span> EcoVision ViT-Large
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-white/40">API:</span> /v2/segregation/classify
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-white/40">STATUS:</span> 100% Operational
              </li>
            </ul>
          </div>

          {/* Col 4: Coordinates & Direct */}
          <div>
            <span className="font-mono text-xs uppercase text-lime tracking-widest block mb-4 font-bold">
              // TERMINAL DISPATCH
            </span>
            <div className="font-mono text-xs text-white/70 space-y-2">
              <p className="text-white">HELLO@ROOTREFUSE.ECO</p>
              <p>+1 (800) 732-9253 [RE-CYCLE]</p>
              <p className="text-white/50 text-[11px] pt-1">
                OPERATING ACROSS 14 METROPOLITAN REGIONS & 42 DROP-OFF VAULTS.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Editorial Bar with Wireframe Grid Visual & Barcode (Reference 2 style) */}
      <div className="border-t border-white/10 bg-obsidian-950 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Wireframe Globe & Location */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-lime relative overflow-hidden">
              <Globe className="w-5 h-5 animate-spin-slow" />
            </div>
            <div className="font-mono text-[10px] text-white/60">
              <span className="text-white block font-bold">BASED ON PLANET EARTH</span>
              <span>40.7128° N, 74.0060° W // ZERO-LANDFILL SECTOR</span>
              {onOpenCredits && (
                <div className="mt-1">
                  <span>DEV TEAM: </span>
                  <button onClick={onOpenCredits} className="text-lime font-bold hover:underline">
                    MUHAMMED SHADIL
                  </button>
                  <span className="text-white/40"> (LEAD) & </span>
                  <button onClick={onOpenCredits} className="text-lime font-bold hover:underline">
                    MUHAMMED SAWAD
                  </button>
                  <span className="text-white/40"> (CO-DEV)</span>
                </div>
              )}
            </div>
          </div>

          {/* Center Perspective Grid Tunnel Graphic (SVG) */}
          <div className="hidden lg:block w-56 h-12 relative overflow-hidden opacity-75">
            <svg viewBox="0 0 200 60" className="w-full h-full stroke-lime fill-none stroke-[0.8]">
              {/* Converging perspective lines */}
              <line x1="0" y1="60" x2="100" y2="25" />
              <line x1="40" y1="60" x2="100" y2="25" />
              <line x1="80" y1="60" x2="100" y2="25" />
              <line x1="120" y1="60" x2="100" y2="25" />
              <line x1="160" y1="60" x2="100" y2="25" />
              <line x1="200" y1="60" x2="100" y2="25" />
              {/* Transverse horizontal lines */}
              <ellipse cx="100" cy="35" rx="80" ry="12" />
              <ellipse cx="100" cy="30" rx="50" ry="8" />
              <ellipse cx="100" cy="27" rx="25" ry="4" />
            </svg>
          </div>

          {/* Barcode and Copyright with Asterisk badge */}
          <div className="flex items-center gap-4">
            {/* Visual barcode */}
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-0.5 h-6">
                {[3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 2, 3, 1, 1, 2, 3].map((w, i) => (
                  <div key={i} className="bg-white/70 h-full" style={{ width: `${w}px` }}></div>
                ))}
              </div>
              <span className="font-mono text-[8px] text-white/40 tracking-widest mt-0.5">
                REF-2026-ROOT-099
              </span>
            </div>

            {/* Asterisk Badge */}
            <div className="w-9 h-9 bg-lime text-obsidian-950 flex items-center justify-center font-editorial-condensed text-xl font-black">
              *
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
