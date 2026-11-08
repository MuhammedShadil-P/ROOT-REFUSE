import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, Scan, Globe, Shield, Zap, RefreshCw, Layers, Award, ArrowRight, Heart } from 'lucide-react';
import Marquee from '../components/Marquee';
import ClimateImpactTicker from '../components/ClimateImpactTicker';
import { INITIAL_TUTORIALS } from '../data/tutorialsData';

export default function HomePage({ onNavigate, onOpenTutorial, onOpenCredits }) {
  const [selectedPreview, setSelectedPreview] = useState(INITIAL_TUTORIALS[0]);

  const stats = [
    { value: "14.8M+", label: "ITEMS DIVERTED", sub: "FROM MUNICIPAL LANDFILLS", badge: "+24% YOY" },
    { value: "620K+", label: "KG CO2 AVERTED", sub: "NET GREENHOUSE OFFSET", badge: "VERIFIED" },
    { value: "92.4K+", label: "COMMUNITY MAKERS", sub: "ACTIVE RECLAIM ARCHITECTS", badge: "GLOBAL" },
    { value: "99.4%", label: "OPTICAL ACCURACY", sub: "ViT NEURAL RECOGNITION", badge: "ISO-14001" },
  ];

  const bentoServices = [
    {
      title: "AI WASTE SCANNING",
      desc: "Sub-millimeter edge contour and multi-spectral neural detection segregating bio-compost, plastics #1-7, and toxic metallurgy in 400ms.",
      icon: Scan,
      tag: "REAL-TIME"
    },
    {
      title: "CIRCULAR SWAP BOARD",
      desc: "Hyper-local peer-to-peer exchange for reclaimed maple skateboards, deadstock denim rolls, pallet timber, and copper wiring.",
      icon: RefreshCw,
      tag: "P2P NETWORK"
    },
    {
      title: "COMMUNITY ECO-DRIVES",
      desc: "Neighborhood clean-up cohorts, repair cafes, and pop-up electronic disassembly workshops across 14 municipal districts.",
      icon: Layers,
      tag: "CIVIC ACTION"
    },
    {
      title: "MATERIAL INTELLIGENCE",
      desc: "Audited lifecycle breakdown calculating exact methane suppression, embodied energy preservation, and landfill diversion volume.",
      icon: Zap,
      tag: "ANALYTICS"
    },
    {
      title: "UPCYCLING BLUEPRINTS",
      desc: "Tested CAD schematics, vector cutting profiles, and step-by-step maker tutorials transforming discarded packaging into high design.",
      icon: Sparkles,
      tag: "OPEN SOURCE"
    },
    {
      title: "VERIFIED FACILITY MAP",
      desc: "Real-time operating status, weight-bridge wait times, and accepted item protocols for R2-certified recyclers and compost hubs.",
      icon: Shield,
      tag: "GPS DIRECTED"
    },
  ];

  return (
    <div className="min-h-screen bg-canvas text-obsidian-950">
      
      {/* Feature 1: Live Climate Impact Ticker Banner */}
      <ClimateImpactTicker />

      {/* ========================================================
          HERO SECTION (Bold Agency Editorial Style - BRVND Inspired)
         ======================================================== */}
      <section className="relative border-b-2 border-obsidian-950 editorial-grid pt-8 pb-16 lg:py-20 overflow-hidden">
        
        {/* Editorial Crosshairs in corner */}
        <div className="absolute top-6 left-6 font-mono text-xs text-obsidian-900/40 pointer-events-none crosshair-corner">
          COORD: [REF: 2026-ECO-01]
        </div>
        <div className="absolute top-6 right-6 font-mono text-xs text-obsidian-900/40 pointer-events-none hidden sm:block">
          REV: V2.4 // PROTOCOL_ONLINE
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Massive Headline & Dual CTAs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Highlight Pill like BRVND "A CREATIVE DESIGN AGENCY" */}
              <div className="inline-flex items-center gap-2 bg-lime px-3.5 py-1 text-obsidian-950 font-editorial-condensed font-black text-xs uppercase tracking-widest border border-obsidian-950 shadow-brutal-sm">
                <span>✦ A CIRCULAR MATERIALS & RE-ENGINEERING PLATFORM</span>
              </div>

              {/* Massive Bold Headline */}
              <h1 className="font-editorial-condensed text-3xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-black tracking-tight leading-[0.92] uppercase text-obsidian-950 break-words">
                RE-ENGINEERING <br />
                <span className="text-cobalt">TOMORROW'S</span> <br />
                WASTE<span className="text-lime">*</span> TODAY.
              </h1>

              {/* Mission Statement */}
              <p className="font-sans text-base sm:text-lg text-obsidian-900/80 max-w-xl leading-relaxed pt-2">
                <strong>Root & Refuse</strong> is a radical open-source platform fusing neural computer vision waste sorting, peer-to-peer upcycling blueprints, and verified local reclamation infrastructure into one unified ecosystem.
              </p>

              {/* Dual Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                
                {/* Primary Button: Try AI Snap-Sort */}
                <button
                  onClick={() => onNavigate('scanner')}
                  className="group flex items-center justify-center gap-3 bg-lime hover:bg-lime-bright text-obsidian-950 font-editorial-condensed font-black px-5 sm:px-7 py-3.5 sm:py-4 rounded-full text-xs sm:text-base tracking-wider uppercase border-2 border-obsidian-950 shadow-brutal transition-all hover:translate-x-0.5 hover:-translate-y-0.5 w-full sm:w-auto"
                >
                  <span>TRY AI SNAP-SORT</span>
                  <div className="w-6 h-6 rounded-full bg-obsidian-950 text-lime flex items-center justify-center group-hover:rotate-45 transition-transform duration-300 shrink-0">
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                </button>

                {/* Secondary Button: Explore Upcycling */}
                <button
                  onClick={() => onNavigate('community')}
                  className="group flex items-center justify-center gap-2.5 bg-obsidian-950 hover:bg-obsidian-800 text-white font-editorial-condensed font-black px-5 sm:px-7 py-3.5 sm:py-4 rounded-full text-xs sm:text-base tracking-wider uppercase border-2 border-obsidian-950 shadow-brutal transition-all hover:translate-x-0.5 hover:-translate-y-0.5 w-full sm:w-auto"
                >
                  <span>EXPLORE UPCYCLING</span>
                  <ArrowRight className="w-4 h-4 text-lime group-hover:translate-x-1 transition-transform shrink-0" />
                </button>

              </div>

              {/* Metadata Micro-List */}
              <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-obsidian-900/70 border-t border-obsidian-900/15">
                <span className="flex items-center gap-1.5 cursor-pointer hover:text-obsidian-950" onClick={() => onNavigate('scanner')}>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Zero-Landfill Mission
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="cursor-pointer hover:text-obsidian-950" onClick={() => onNavigate('map')}>
                  ISO-14001 Standard
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="text-cobalt font-bold cursor-pointer hover:underline" onClick={() => onNavigate('community')}>
                  Free Open Access
                </span>
              </div>

            </div>

            {/* Right Column: Editorial Visual Composition (Reference 1 & 2 Aesthetic) */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              
              {/* Outer decorative card frame with brutal border */}
              <div className="relative w-full max-w-md aspect-[4/5] bg-obsidian-950 border-2 border-obsidian-950 shadow-brutal overflow-hidden rounded-sm p-4 flex flex-col justify-between">
                
                {/* Top Corner Details */}
                <div className="flex items-center justify-between text-white font-mono text-xs z-10">
                  <div className="flex items-center gap-1.5 bg-obsidian-900 px-2 py-1 rounded-xs border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-lime animate-pulse"></span>
                    <span className="text-lime font-bold">OPTIC HUD 01/05</span>
                  </div>
                  <span className="text-white/50">[LAT: 40.7128° N]</span>
                </div>

                {/* Center Graphic: 3D Iridescent Fluid Orb + Wireframe Globe */}
                <div className="relative my-auto flex items-center justify-center">
                  
                  {/* Subtle 3D Wireframe Globe overlay */}
                  <div className="absolute w-64 h-64 border border-white/15 rounded-full flex items-center justify-center animate-spin-slow">
                    <div className="w-48 h-48 border border-white/20 rounded-full"></div>
                    <div className="absolute inset-0 border border-lime/30 rounded-full rotate-45"></div>
                  </div>

                  {/* Organic Iridescent Glowing Glass Shape */}
                  <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-gradient-to-tr from-cobalt via-purple-600 to-lime opacity-90 blur-[1px] shadow-glow-lime animate-float flex items-center justify-center overflow-hidden border-2 border-white/30">
                    <div className="absolute -inset-10 bg-radial from-white/30 to-transparent blur-md"></div>
                    <div className="text-center font-editorial-condensed text-obsidian-950 font-black p-4">
                      <span className="text-3xl block leading-none">RE-</span>
                      <span className="text-4xl block leading-none text-white">TURN</span>
                      <span className="text-xs font-mono text-white/90 uppercase mt-1 block">To Biosphere</span>
                    </div>
                  </div>

                  {/* Rotating Circular Sticker Badge (like yellow BRVND sticker!) */}
                  <div 
                    onClick={() => onNavigate('map')}
                    className="absolute -bottom-4 -right-2 sm:-right-4 w-28 h-28 rounded-full bg-lime text-obsidian-950 border-2 border-obsidian-950 flex items-center justify-center p-2 cursor-pointer shadow-brutal hover:scale-105 transition-transform z-20 group"
                  >
                    <div className="relative w-full h-full flex items-center justify-center animate-spin-slow">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path
                          id="circlePath"
                          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                          fill="none"
                        />
                        <text className="text-[10.5px] font-mono font-bold uppercase tracking-widest fill-obsidian-950">
                          <textPath href="#circlePath">
                            • ROOT & REFUSE • LOCAL NODES •
                          </textPath>
                        </text>
                      </svg>
                      <div className="absolute w-8 h-8 rounded-full bg-obsidian-950 text-lime flex items-center justify-center group-hover:rotate-45 transition-transform">
                        <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bottom Card Bar */}
                <div className="bg-obsidian-900 p-3 border border-white/10 rounded-xs flex items-center justify-between text-white font-mono text-[11px] z-10">
                  <span className="text-white/70">NEXT GENERATION MRF PROTOCOL</span>
                  <span className="text-lime font-bold">100% RECLAIMABLE</span>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          LIVE IMPACT COUNTERS (High-Contrast Metric Boxes)
         ======================================================== */}
      <section id="circular-metrics" className="border-b-2 border-obsidian-950 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div 
                key={idx}
                className="relative p-6 bg-canvas border border-obsidian-900/15 hover:border-obsidian-950 transition-all rounded-xs hover:shadow-brutal-sm group"
              >
                <div className="flex items-center justify-between font-mono text-[10px] text-obsidian-900/60 mb-2">
                  <span>METRIC // 0{idx + 1}</span>
                  <span className="bg-lime text-obsidian-950 px-1.5 py-0.2 rounded font-bold font-mono">
                    {stat.badge}
                  </span>
                </div>
                <div className="font-editorial-condensed text-4xl sm:text-5xl font-black text-obsidian-950 tracking-tight group-hover:text-cobalt transition-colors">
                  {stat.value}
                </div>
                <div className="font-mono text-xs font-bold text-obsidian-950 mt-1 uppercase">
                  {stat.label}
                </div>
                <div className="font-sans text-[11px] text-obsidian-900/60 mt-0.5">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          ACID LIME MARQUEE TICKER (BRVND Style)
         ======================================================== */}
      <Marquee speed="normal" bg="bg-lime" textColor="text-obsidian-950" />

      {/* ========================================================
          "STRATEGY BY DESIGN. WASTE BY ACCIDENT." (Editorial Strip)
         ======================================================== */}
      <section className="border-b-2 border-obsidian-950 py-16 bg-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: High-Contrast Monochromatic Graphic with Neon Marker */}
            <div className="lg:col-span-5 relative">
              <div className="relative border-2 border-obsidian-950 overflow-hidden rounded-sm shadow-brutal">
                <img
                  src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80"
                  alt="Circular industrial recycling and sorting"
                  className="w-full h-80 object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute top-4 left-4 bg-lime text-obsidian-950 px-3 py-1 font-editorial-condensed font-black text-xs uppercase tracking-wider border border-obsidian-950">
                  SYSTEM OVERVIEW
                </div>
              </div>
            </div>

            {/* Right: Bold Editorial Statement with Marker Stroke */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-cobalt"></div>
                <span className="font-mono text-xs uppercase tracking-widest text-obsidian-900/60 font-bold">
                  // THE CORE PARADIGM
                </span>
              </div>

              <h2 className="font-editorial-condensed text-4xl sm:text-6xl font-black uppercase text-obsidian-950 tracking-tight leading-none">
                CIRCULARITY <br />
                <span className="marker-highlight">BY ARCHITECTURE.</span>
              </h2>

              <p className="font-sans text-base sm:text-lg text-obsidian-900/80 leading-relaxed">
                Most recycling fails because citizens are left guessing at contaminated bins, while creative makers lack access to clean post-consumer streams. We bridge that gap with open-source machine vision, community blueprints, and physical drop hubs.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('scanner')}
                  className="inline-flex items-center gap-2 font-editorial-condensed text-sm font-bold uppercase tracking-wider text-obsidian-950 hover:text-cobalt border-b-2 border-obsidian-950 hover:border-cobalt pb-1 transition-all"
                >
                  <span>HOW THE AI CLASSIFIER WORKS</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          "WHAT WE DO BEST" BENTO GRID (Reference 2 Inspired)
         ======================================================== */}
      <section className="border-b-2 border-obsidian-950 bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-2 border-obsidian-950">
            
            {/* Box 1: Left Cobalt Blue Headline Bento Block */}
            <div className="lg:col-span-4 bg-cobalt text-white p-8 sm:p-10 flex flex-col justify-between border-b-2 lg:border-b-0 lg:border-r-2 border-obsidian-950">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-widest uppercase text-white/80 font-bold">
                    SYSTEM CAPABILITIES
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white text-cobalt flex items-center justify-center font-editorial-condensed font-black text-lg">
                    *
                  </span>
                </div>

                <h3 className="font-editorial-condensed text-4xl sm:text-5xl font-black uppercase tracking-tight leading-[0.95] pt-4">
                  WHAT WE DO <br />
                  <span className="text-lime">BEST.</span>
                </h3>

                <p className="font-sans text-sm text-white/80 leading-relaxed pt-2">
                  From machine perception at the bin lid to communal drill presses turning pallets into furniture. Everything engineered for permanence and transparency.
                </p>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => onNavigate('community')}
                  className="w-full py-3 px-4 bg-lime hover:bg-lime-bright text-obsidian-950 font-editorial-condensed font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <span>BROWSE COMMUNITY CAPABILITIES</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Box 2: Center 6-Item Grid with Hairline Dividers */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-obsidian-900/15">
              {bentoServices.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 bg-canvas hover:bg-white transition-colors flex flex-col justify-between border-b border-obsidian-900/15 group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xs bg-obsidian-950 text-lime flex items-center justify-center group-hover:bg-lime group-hover:text-obsidian-950 transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-[9px] uppercase font-bold text-obsidian-900/60 bg-white px-2 py-0.5 border border-obsidian-900/10">
                          {service.tag}
                        </span>
                      </div>

                      <h4 className="font-editorial-condensed text-base uppercase font-black text-obsidian-950 group-hover:text-cobalt transition-colors">
                        {service.title}
                      </h4>

                      <p className="font-sans text-xs text-obsidian-900/70 leading-relaxed mt-2">
                        {service.desc}
                      </p>
                    </div>

                    <div className="pt-4 font-mono text-[10px] text-obsidian-900/40 flex items-center justify-between">
                      <span>MODULE_0{idx + 1}</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          SELECTED WORKS / FEATURED DIY BLUEPRINTS
         ======================================================== */}
      <section className="border-b-2 border-obsidian-950 py-16 bg-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b-2 border-obsidian-950 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-lime"></span>
                <span className="font-mono text-xs uppercase tracking-widest text-obsidian-900/60 font-bold">
                  TRASH TO TREASURE CURATION
                </span>
              </div>
              <h2 className="font-editorial-condensed text-4xl sm:text-5xl font-black uppercase tracking-tight text-obsidian-950">
                SELECTED WORKS <span className="text-lime">*</span>
              </h2>
            </div>

            <button
              onClick={() => onNavigate('community')}
              className="flex items-center gap-2 bg-obsidian-950 hover:bg-lime hover:text-obsidian-950 text-white font-editorial-condensed font-black px-5 py-2.5 text-xs uppercase tracking-wider rounded-full transition-colors border border-obsidian-950 self-start sm:self-auto"
            >
              <span>VIEW ALL WORK</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4-Column Editorial Project Cards (Matching Reference 1 & 2 "SELECTED WORK" 01-04) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INITIAL_TUTORIALS.slice(0, 4).map((tutorial, idx) => (
              <div
                key={tutorial.id}
                onClick={() => onOpenTutorial(tutorial)}
                className="group bg-white border-2 border-obsidian-950 shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Top card header with lime number badge */}
                  <div className="p-3 bg-canvas-100 border-b border-obsidian-950 flex items-center justify-between font-mono text-xs">
                    <span className="w-7 h-7 bg-lime text-obsidian-950 font-bold flex items-center justify-center font-editorial-condensed">
                      0{idx + 1}
                    </span>
                    <span className="font-bold text-obsidian-900/70 uppercase">
                      {tutorial.categoryLabel}
                    </span>
                  </div>

                  {/* Thumbnail Image */}
                  <div className="relative h-52 overflow-hidden bg-obsidian-950">
                    <img
                      src={tutorial.image}
                      alt={tutorial.title}
                      className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                    />
                    <div className="absolute bottom-2 left-2 bg-obsidian-950/90 text-white px-2 py-0.5 font-mono text-[10px] rounded-xs">
                      {tutorial.wasteDiverted}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 space-y-2">
                    <h4 className="font-editorial-condensed text-lg uppercase font-black text-obsidian-950 group-hover:text-cobalt transition-colors line-clamp-2 leading-tight">
                      {tutorial.title}
                    </h4>

                    <p className="font-sans text-xs text-obsidian-900/70 line-clamp-2">
                      {tutorial.summary}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-3 bg-canvas-50 border-t border-obsidian-900/10 flex items-center justify-between font-mono text-[11px]">
                  <span className="text-obsidian-900/70">BY {tutorial.author.name}</span>
                  <div className="flex items-center gap-1 text-rose-500 font-bold">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>{tutorial.upvotes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          KIND WORDS / TESTIMONIALS (Reference 2 Style)
         ======================================================== */}
      <section className="border-b-2 border-obsidian-950 py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-3 mb-8">
            <span className="w-3 h-3 rounded-full bg-cobalt"></span>
            <h3 className="font-editorial-condensed text-2xl font-black uppercase tracking-tight text-obsidian-950">
              KIND WORDS FROM THE NETWORK
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x-2 divide-obsidian-950 border-2 border-obsidian-950 bg-canvas">
            
            <div className="p-8 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-4xl font-serif text-cobalt font-bold">“</span>
                <p className="font-sans text-sm text-obsidian-900/80 leading-relaxed italic">
                  Root & Refuse eliminated the guessing game in our creative studio. We diverted 400kg of HDPE offcuts and made stunning acoustic sound-tiles for our client offices.
                </p>
              </div>
              <div className="pt-4 border-t border-obsidian-900/10 font-mono text-xs">
                <strong className="text-obsidian-950 block uppercase">MARA SOLIS</strong>
                <span className="text-obsidian-900/60">FOUNDER, KINETIC DESIGN LAB</span>
              </div>
            </div>

            <div className="p-8 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-4xl font-serif text-lime-dark font-bold">“</span>
                <p className="font-sans text-sm text-obsidian-900/80 leading-relaxed italic">
                  The AI image scanner has over 99% accuracy on contaminated takeout containers. It is the single most practical sustainability tool we have integrated into our city campus.
                </p>
              </div>
              <div className="pt-4 border-t border-obsidian-900/10 font-mono text-xs">
                <strong className="text-obsidian-950 block uppercase">JULIAN GREY</strong>
                <span className="text-obsidian-900/60">DIRECTOR OF CIVIC RESILIENCE</span>
              </div>
            </div>

            <div className="p-8 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-4xl font-serif text-obsidian-950 font-bold">“</span>
                <p className="font-sans text-sm text-obsidian-900/80 leading-relaxed italic">
                  The local drop-off map with live open status saved us three trips to hazardous depots. A masterclass in utilitarian, high-fashion editorial software.
                </p>
              </div>
              <div className="pt-4 border-t border-obsidian-900/10 font-mono text-xs">
                <strong className="text-obsidian-950 block uppercase">TARA OKONJO</strong>
                <span className="text-obsidian-900/60">ARCHITECTURAL RECLAIMER</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          FEATURED CREATOR & DEVELOPMENT TEAM (SHADIL & SAWAD)
         ======================================================== */}
      <section className="bg-obsidian-950 text-white border-b-2 border-obsidian-950 py-16 lg:py-20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="font-mono text-xs uppercase text-lime font-bold tracking-widest block mb-2">
                // SYSTEM ARCHITECTS & DEVELOPERS
              </span>
              <h2 className="font-editorial-condensed text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none">
                MEET THE <span className="text-lime">CREATORS.</span>
              </h2>
            </div>

            {onOpenCredits && (
              <button
                onClick={onOpenCredits}
                className="inline-flex items-center gap-2 px-5 py-3 bg-lime hover:bg-lime-bright text-obsidian-950 font-editorial-condensed font-black text-xs uppercase tracking-wider rounded-full transition-colors shadow-glow-lime self-start sm:self-auto"
              >
                <span>OPEN FULL TEAM DOSSIER</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* DEVELOPER 1: MUHAMMED SHADIL */}
            <div className="border-2 border-white/20 bg-obsidian-900/90 p-4 sm:p-7 md:p-8 rounded-sm shadow-brutal-lime flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-6">
                  <span className="inline-flex items-center gap-1.5 bg-lime px-3 py-0.5 text-obsidian-950 font-mono text-[10px] font-black uppercase rounded-xs">
                    <span>✦ LEAD DEVELOPER & CREATOR</span>
                  </span>
                  <span className="font-mono text-[10px] text-white/50">#01 // LEAD</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  <div className="sm:col-span-5 flex justify-center">
                    <div className="relative group w-36 sm:w-full max-w-[170px] sm:max-w-[190px] mx-auto">
                      <div className="absolute inset-0 bg-lime translate-x-2.5 translate-y-2.5 border-2 border-obsidian-950 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
                      <div className="relative bg-obsidian-950 border-2 border-white/30 overflow-hidden aspect-[3/4] shadow-xl">
                        <img
                          src="./developer.jpg"
                          alt="Muhammed Shadil - Lead Developer & Creator"
                          className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-300"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-7 space-y-3">
                    <div>
                      <h3 className="font-editorial-condensed text-2xl sm:text-3xl font-black uppercase text-white leading-tight">
                        MUHAMMED <br />
                        <span className="text-lime">SHADIL</span>
                      </h3>
                      <p className="font-mono text-xs text-cobalt-light font-bold tracking-wider mt-1 uppercase">
                        Lead Developer & Creator of Root & Refuse
                      </p>
                    </div>

                    <p className="font-sans text-xs text-white/80 leading-relaxed">
                      Conceived and built the core architecture, ViT neural classification pipeline, and gamified circular ecosystem.
                    </p>

                    <div className="flex flex-wrap gap-1 font-mono text-[9px] text-white/70 pt-1">
                      <span className="px-2 py-0.5 bg-obsidian-800 border border-white/10">Full-Stack Architect</span>
                      <span className="px-2 py-0.5 bg-obsidian-800 border border-white/10">UI/UX Editorial</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5 sm:pt-6 border-t border-white/10 mt-5 sm:mt-6 flex flex-col sm:flex-row gap-2.5">
                <a
                  href="https://www.linkedin.com/in/muhammed-shadil-752181430/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 min-h-[42px] bg-cobalt hover:bg-blue-600 text-white font-editorial-condensed font-black text-xs uppercase tracking-wider rounded-xs border border-white/20 shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
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
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 min-h-[42px] bg-lime hover:bg-lime-bright text-obsidian-950 font-editorial-condensed font-black text-xs uppercase tracking-wider rounded-xs border border-obsidian-950 shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
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

            {/* DEVELOPER 2: MUHAMMED SAWAD */}
            <div className="border-2 border-white/20 bg-obsidian-900/90 p-4 sm:p-7 md:p-8 rounded-sm shadow-brutal-blue flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-6">
                  <span className="inline-flex items-center gap-1.5 bg-obsidian-950 text-lime border border-lime/40 px-3 py-0.5 font-mono text-[10px] font-black uppercase rounded-xs">
                    <span>✦ CO-DEVELOPER & CONTRIBUTOR</span>
                  </span>
                  <span className="font-mono text-[10px] text-white/50">#02 // CO-DEV</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  <div className="sm:col-span-5 flex justify-center">
                    <div className="relative group w-36 sm:w-full max-w-[170px] sm:max-w-[190px] mx-auto">
                      <div className="absolute inset-0 bg-cobalt translate-x-2.5 translate-y-2.5 border-2 border-obsidian-950 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
                      <div className="relative bg-obsidian-950 border-2 border-white/30 overflow-hidden aspect-[3/4] shadow-xl">
                        <img
                          src="./sawad.jpg"
                          alt="Muhammed Sawad - Co-Developer & Contributor"
                          className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-300"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-7 space-y-3">
                    <div>
                      <h3 className="font-editorial-condensed text-2xl sm:text-3xl font-black uppercase text-white leading-tight">
                        MUHAMMED <br />
                        <span className="text-cobalt-light">SAWAD</span>
                      </h3>
                      <p className="font-mono text-xs text-lime font-bold tracking-wider mt-1 uppercase">
                        Co-Developer & Contributor
                      </p>
                    </div>

                    <p className="font-sans text-xs text-white/80 leading-relaxed">
                      Collaborated on platform integration pipelines, community repository workflows, and feature enhancements.
                    </p>

                    <div className="flex flex-wrap gap-1 font-mono text-[9px] text-white/70 pt-1">
                      <span className="px-2 py-0.5 bg-obsidian-800 border border-white/10">Feature Contributor</span>
                      <span className="px-2 py-0.5 bg-obsidian-800 border border-white/10">Community Module</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6">
                <a
                  href="https://www.instagram.com/muh_sa_v_ad?mdxt=NXA4aXNoYno2aDNr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-2.5 min-h-[42px] bg-obsidian-950 hover:bg-lime text-lime hover:text-obsidian-950 font-editorial-condensed font-black text-xs uppercase tracking-wider rounded-xs border-2 border-lime shadow-glow-lime hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  <span>INSTAGRAM (@muh_sa_v_ad)</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          MASSIVE EDITORIAL BOTTOM CTA BANNER (Reference 1 & 2 Style)
         ======================================================== */}
      <section className="bg-canvas border-b-2 border-obsidian-950">
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x-2 divide-obsidian-950">
          
          {/* Lime Bento Block: LET'S BUILD SOMETHING ICONIC */}
          <div className="lg:col-span-6 bg-lime p-8 sm:p-14 flex flex-col justify-between group">
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-obsidian-950 font-bold block">
                [READY TO ACT]
              </span>
              <h2 className="font-editorial-condensed text-4xl sm:text-6xl font-black uppercase text-obsidian-950 tracking-tight leading-[0.9]">
                LET’S BUILD <br />
                SOMETHING <span className="text-cobalt">BOLD.</span>
              </h2>
              <p className="font-sans text-sm text-obsidian-900 max-w-md leading-relaxed">
                Start by scanning your first mystery item or open an upcycling blueprint to reclaim waste into your living room.
              </p>
            </div>

            <div className="pt-8">
              <button
                onClick={() => onNavigate('scanner')}
                className="w-14 h-14 rounded-full bg-obsidian-950 text-lime flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-all shadow-brutal-sm"
              >
                <ArrowUpRight className="w-6 h-6 stroke-[3]" />
              </button>
            </div>
          </div>

          {/* Right Bento Block: HAVE A DISPOSAL QUESTION? */}
          <div className="lg:col-span-6 bg-obsidian-950 text-white p-8 sm:p-14 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-lime font-bold block">
                [COMMUNITY DROP-OFF]
              </span>
              <h3 className="font-editorial-condensed text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-[0.95]">
                FIND LOCAL <br />
                VERIFIED DROP-OFFS.
              </h3>
              <p className="font-sans text-sm text-white/70 max-w-md leading-relaxed">
                6 municipal recovery nodes, e-waste metallurgy depots, and community compost tumblers operating today.
              </p>
            </div>

            <div className="pt-8">
              <button
                onClick={() => onNavigate('map')}
                className="inline-flex items-center gap-3 bg-cobalt hover:bg-blue-600 text-white font-editorial-condensed font-black px-6 py-3.5 rounded-full text-xs sm:text-sm uppercase tracking-wider transition-colors"
              >
                <span>OPEN INTERACTIVE ECO-MAP</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
