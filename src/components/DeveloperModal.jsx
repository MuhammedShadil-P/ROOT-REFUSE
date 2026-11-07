import React, { useState } from 'react';
import { X, ExternalLink, Award, ArrowUpRight, Code, ShieldCheck, Heart, UserCheck, Sparkles } from 'lucide-react';

export default function DeveloperModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'shadil', 'sawad'

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-obsidian-950/85 backdrop-blur-md overflow-y-auto animate-backdrop-fade"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-canvas border-2 border-obsidian-950 shadow-2xl overflow-hidden my-6 animate-modal-pop"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Editorial Bar */}
        <div className="bg-obsidian-950 text-white px-6 py-4 flex items-center justify-between border-b-2 border-obsidian-950">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-lime animate-pulse"></span>
            <span className="font-mono text-xs uppercase text-lime font-bold tracking-widest">
              // ENGINEERING DOSSIER • ROOT & REFUSE DEVELOPMENT TEAM
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xs bg-obsidian-900 border border-white/20 hover:border-lime hover:text-lime flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Controls / Filter Tabs */}
        <div className="bg-canvas-100 px-6 py-3 border-b-2 border-obsidian-950 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-obsidian-900/60 font-bold uppercase mr-1">SHOWCASE:</span>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 uppercase font-bold rounded-xs transition-colors ${
                activeTab === 'all' ? 'bg-obsidian-950 text-lime' : 'bg-canvas-200 text-obsidian-900 hover:bg-canvas-300'
              }`}
            >
              ALL CREATORS (2)
            </button>
            <button
              onClick={() => setActiveTab('shadil')}
              className={`px-3 py-1 uppercase font-bold rounded-xs transition-colors ${
                activeTab === 'shadil' ? 'bg-obsidian-950 text-lime' : 'bg-canvas-200 text-obsidian-900 hover:bg-canvas-300'
              }`}
            >
              MUHAMMED SHADIL
            </button>
            <button
              onClick={() => setActiveTab('sawad')}
              className={`px-3 py-1 uppercase font-bold rounded-xs transition-colors ${
                activeTab === 'sawad' ? 'bg-obsidian-950 text-lime' : 'bg-canvas-200 text-obsidian-900 hover:bg-canvas-300'
              }`}
            >
              MUHAMMED SAWAD
            </button>
          </div>

          <div className="font-mono text-[11px] text-obsidian-900/60">
            <span>OFFICIAL SUBMISSION CREDITS</span>
          </div>
        </div>

        {/* Modal Body: Developers Showcase */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* ========================================================
                CARD 1: MUHAMMED SHADIL (LEAD DEVELOPER & CREATOR)
               ======================================================== */}
            {(activeTab === 'all' || activeTab === 'shadil') && (
              <div className={`p-6 sm:p-7 bg-white border-2 border-obsidian-950 shadow-brutal flex flex-col justify-between ${
                activeTab === 'shadil' ? 'lg:col-span-2' : ''
              }`}>
                <div>
                  {/* Top Badge Pill */}
                  <div className="flex items-center justify-between pb-4 border-b border-obsidian-900/10 mb-5">
                    <span className="inline-flex items-center gap-1.5 bg-lime text-obsidian-950 font-mono text-[10px] font-black uppercase px-2.5 py-0.5 rounded-xs shadow-sm">
                      <Sparkles className="w-3 h-3" />
                      <span>LEAD DEVELOPER & CREATOR</span>
                    </span>
                    <span className="font-mono text-[10px] text-obsidian-900/50 uppercase font-bold">
                      ARCHITECT // 01
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                    {/* Portrait Photo in Acid Lime Frame */}
                    <div className="sm:col-span-5 flex justify-center">
                      <div className="relative group w-full max-w-[200px]">
                        <div className="absolute inset-0 bg-lime translate-x-2.5 translate-y-2.5 border-2 border-obsidian-950 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
                        <div className="relative bg-obsidian-950 border-2 border-obsidian-950 overflow-hidden aspect-[3/4] shadow-md">
                          <img
                            src="./developer.jpg"
                            alt="Muhammed Shadil - Lead Developer & Creator"
                            className="w-full h-full object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-300"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
                            }}
                          />
                          <div className="absolute top-2 left-2 bg-obsidian-950 text-lime font-mono text-[8px] px-1.5 py-0.5 border border-lime uppercase font-black">
                            LEAD
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Developer Info */}
                    <div className="sm:col-span-7 space-y-3">
                      <div>
                        <h3 className="font-editorial-condensed text-2xl sm:text-3xl font-black uppercase text-obsidian-950 leading-tight">
                          MUHAMMED <br />
                          <span className="text-lime-dark">SHADIL</span>
                        </h3>
                        <p className="font-mono text-xs text-cobalt font-bold tracking-wider mt-1 uppercase">
                          Lead Developer & Creator of Root & Refuse
                        </p>
                      </div>

                      <p className="font-sans text-xs text-obsidian-900/80 leading-relaxed font-medium">
                        Architected and engineered Root & Refuse end-to-end, combining machine perception waste segregation with community circular blueprints and gamification logic.
                      </p>

                      <div className="flex flex-wrap gap-1.5 font-mono text-[10px] pt-1">
                        <span className="px-2 py-0.5 bg-canvas-200 border border-obsidian-900/10 font-bold">Full-Stack Architect</span>
                        <span className="px-2 py-0.5 bg-canvas-200 border border-obsidian-900/10 font-bold">UI/UX Editorial</span>
                        <span className="px-2 py-0.5 bg-canvas-200 border border-obsidian-900/10 font-bold">ViT Vision Model</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Connect Buttons */}
                <div className="pt-6 border-t border-obsidian-900/10 mt-6 flex flex-wrap gap-2.5">
                  <a
                    href="https://www.linkedin.com/in/muhammed-shadil-752181430/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 bg-cobalt hover:bg-cobalt-dark text-white font-editorial-condensed font-black text-xs uppercase tracking-wider rounded-xs border border-obsidian-950 shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect width="4" height="12" x="2" y="9"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                    <span>LINKEDIN</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>

                  <a
                    href="https://www.instagram.com/_.shaaaad?psln=Y3k2b2R3c2YwNmhz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 bg-lime hover:bg-lime-bright text-obsidian-950 font-editorial-condensed font-black text-xs uppercase tracking-wider rounded-xs border border-obsidian-950 shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                    <span>INSTAGRAM</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {/* ========================================================
                CARD 2: MUHAMMED SAWAD (CO-DEVELOPER & CONTRIBUTOR)
               ======================================================== */}
            {(activeTab === 'all' || activeTab === 'sawad') && (
              <div className={`p-6 sm:p-7 bg-white border-2 border-obsidian-950 shadow-brutal flex flex-col justify-between ${
                activeTab === 'sawad' ? 'lg:col-span-2' : ''
              }`}>
                <div>
                  {/* Top Badge Pill */}
                  <div className="flex items-center justify-between pb-4 border-b border-obsidian-900/10 mb-5">
                    <span className="inline-flex items-center gap-1.5 bg-obsidian-950 text-lime font-mono text-[10px] font-black uppercase px-2.5 py-0.5 rounded-xs shadow-sm border border-lime/40">
                      <UserCheck className="w-3 h-3" />
                      <span>CO-DEVELOPER & CONTRIBUTOR</span>
                    </span>
                    <span className="font-mono text-[10px] text-obsidian-900/50 uppercase font-bold">
                      ARCHITECT // 02
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                    {/* Portrait Photo in Neon Acid-Green / Cobalt Frame */}
                    <div className="sm:col-span-5 flex justify-center">
                      <div className="relative group w-full max-w-[200px]">
                        <div className="absolute inset-0 bg-cobalt translate-x-2.5 translate-y-2.5 border-2 border-obsidian-950 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
                        <div className="relative bg-obsidian-950 border-2 border-obsidian-950 overflow-hidden aspect-[3/4] shadow-md">
                          <img
                            src="./sawad.jpg"
                            alt="Muhammed Sawad - Co-Developer & Contributor"
                            className="w-full h-full object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-300"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';
                            }}
                          />
                          <div className="absolute top-2 left-2 bg-obsidian-950 text-white font-mono text-[8px] px-1.5 py-0.5 border border-white/30 uppercase font-black">
                            CO-DEV
                          </div>
                          <div className="absolute bottom-2 right-2 bg-lime text-obsidian-950 font-editorial-condensed text-[9px] font-black px-1.5 py-0.5 uppercase shadow-sm">
                            VERIFIED
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Developer Info */}
                    <div className="sm:col-span-7 space-y-3">
                      <div>
                        <h3 className="font-editorial-condensed text-2xl sm:text-3xl font-black uppercase text-obsidian-950 leading-tight">
                          MUHAMMED <br />
                          <span className="text-cobalt">SAWAD</span>
                        </h3>
                        <p className="font-mono text-xs text-lime-dark font-bold tracking-wider mt-1 uppercase">
                          Co-Developer & Contributor
                        </p>
                      </div>

                      <p className="font-sans text-xs text-obsidian-900/80 leading-relaxed font-medium">
                        Contributed to core development pipelines, community DIY integration modules, feature enhancements, and system refinement for the Root & Refuse platform.
                      </p>

                      <div className="flex flex-wrap gap-1.5 font-mono text-[10px] pt-1">
                        <span className="px-2 py-0.5 bg-canvas-200 border border-obsidian-900/10 font-bold">Platform Contributor</span>
                        <span className="px-2 py-0.5 bg-canvas-200 border border-obsidian-900/10 font-bold">Community Module</span>
                        <span className="px-2 py-0.5 bg-canvas-200 border border-obsidian-900/10 font-bold">Feature Engineer</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Connect Buttons (With Neon Acid-Green Outline) */}
                <div className="pt-6 border-t border-obsidian-900/10 mt-6 flex flex-wrap gap-2.5">
                  <a
                    href="https://www.instagram.com/muh_sa_v_ad?mdxt=NXA4aXNoYno2aDNr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-2.5 bg-obsidian-950 hover:bg-lime text-lime hover:text-obsidian-950 font-editorial-condensed font-black text-xs uppercase tracking-wider rounded-xs border-2 border-lime shadow-glow-lime hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                    <span>INSTAGRAM (@muh_sa_v_ad)</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-canvas-200 px-6 py-4 border-t-2 border-obsidian-950 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
          <span className="text-obsidian-900/60">
            ROOT & REFUSE — ENGINEERED BY MUHAMMED SHADIL & MUHAMMED SAWAD
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-obsidian-950 text-white font-editorial-condensed font-black uppercase tracking-wider hover:bg-lime hover:text-obsidian-950 border border-obsidian-950 transition-colors"
          >
            CLOSE DOSSIER
          </button>
        </div>

      </div>
    </div>
  );
}
