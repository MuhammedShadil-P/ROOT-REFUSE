import React, { useState } from 'react';
import { X, Heart, Clock, Scale, Share2, Bookmark, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export default function TutorialDetailModal({ tutorial, isOpen, onClose, onToggleUpvote, isUpvoted }) {
  const [checkedMaterials, setCheckedMaterials] = useState({});
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !tutorial) return null;

  const toggleMaterial = (idx) => {
    setCheckedMaterials(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="w-full max-w-4xl bg-canvas border-2 border-obsidian-950 shadow-2xl overflow-hidden flex flex-col my-6 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="bg-obsidian-900 text-white px-5 py-3 flex items-center justify-between border-b border-obsidian-800">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-lime"></span>
            <span className="font-mono text-xs text-lime tracking-widest uppercase font-bold">
              BLUEPRINT: {tutorial.id.toUpperCase()}
            </span>
            <span className="text-white/30 hidden sm:inline">|</span>
            <span className="font-mono text-xs text-white/60 hidden sm:inline">
              CATEGORY: {tutorial.categoryLabel}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono bg-white/10 hover:bg-white/20 text-white/90 rounded transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'COPIED!' : 'SHARE'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:text-lime transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto p-6 space-y-8 bg-canvas">
          
          {/* Hero Section with Image and Metadata */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 relative group overflow-hidden border-2 border-obsidian-950 rounded-sm">
              <img
                src={tutorial.image}
                alt={tutorial.title}
                className="w-full h-72 sm:h-80 object-cover"
              />
              <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                <span className={`px-2.5 py-1 text-xs font-mono font-black uppercase tracking-wider rounded-xs shadow-brutal-sm ${tutorial.difficultyColor}`}>
                  {tutorial.difficulty}
                </span>
                <span className="px-2.5 py-1 text-xs font-mono font-bold bg-obsidian-950 text-white uppercase tracking-wider rounded-xs border border-white/20">
                  {tutorial.categoryLabel}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              {/* Author badge */}
              <div className="flex items-center gap-3 p-3 bg-white border border-obsidian-900/15 rounded-sm">
                <img
                  src={tutorial.author.avatar}
                  alt={tutorial.author.name}
                  className="w-12 h-12 rounded-full object-cover border border-obsidian-950"
                />
                <div>
                  <h5 className="font-editorial-condensed font-black text-sm uppercase text-obsidian-950">
                    {tutorial.author.name}
                  </h5>
                  <div className="font-mono text-xs text-obsidian-900/60 flex items-center gap-2">
                    <span>{tutorial.author.handle}</span>
                    <span className="text-cobalt font-semibold">• {tutorial.author.level}</span>
                  </div>
                </div>
              </div>

              <h1 className="font-editorial-condensed text-2xl sm:text-3xl font-black uppercase tracking-tight text-obsidian-950 leading-tight">
                {tutorial.title}
              </h1>

              <p className="font-sans text-sm text-obsidian-900/80 leading-relaxed">
                {tutorial.summary}
              </p>

              {/* Metrics row */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-canvas-200 border border-obsidian-900/10">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-obsidian-900/60 uppercase">
                    <Clock className="w-3.5 h-3.5" />
                    <span>TIME REQUIRED</span>
                  </div>
                  <span className="font-editorial-condensed text-base font-bold text-obsidian-950 block mt-1">
                    {tutorial.timeRequired}
                  </span>
                </div>

                <div className="p-3 bg-canvas-200 border border-obsidian-900/10">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-obsidian-900/60 uppercase">
                    <Scale className="w-3.5 h-3.5" />
                    <span>WASTE INTERCEPTED</span>
                  </div>
                  <span className="font-editorial-condensed text-base font-bold text-obsidian-950 block mt-1">
                    {tutorial.wasteDiverted}
                  </span>
                </div>
              </div>

              {/* Upvote CTA */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => onToggleUpvote(tutorial.id)}
                  className={`flex-1 py-3 px-4 font-editorial-condensed font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-obsidian-950 transition-all ${
                    isUpvoted
                      ? 'bg-rose-500 text-white shadow-brutal-sm'
                      : 'bg-white text-obsidian-950 hover:bg-lime shadow-brutal-sm'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isUpvoted ? 'fill-current text-white' : 'text-rose-500'}`} />
                  <span>{isUpvoted ? 'UPVOTED' : 'UPVOTE GUIDE'} ({tutorial.upvotes + (isUpvoted ? 1 : 0)})</span>
                </button>
              </div>
            </div>
          </div>

          {/* Section: Materials and Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-obsidian-900/10">
            {/* Materials with interactive checklist */}
            <div className="bg-white p-5 border border-obsidian-900/15 rounded-sm">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-editorial-condensed text-base uppercase font-black text-obsidian-950">
                  REQUIRED MATERIALS (SALVAGE LIST)
                </h4>
                <span className="font-mono text-xs text-obsidian-900/50">
                  Check off as you gather
                </span>
              </div>
              
              <ul className="space-y-2.5">
                {tutorial.materials?.map((mat, idx) => {
                  const isChecked = !!checkedMaterials[idx];
                  return (
                    <li
                      key={idx}
                      onClick={() => toggleMaterial(idx)}
                      className={`flex items-start gap-3 p-2.5 rounded-xs cursor-pointer transition-all border ${
                        isChecked 
                          ? 'bg-lime/15 border-lime-dark/30 text-obsidian-950 line-through opacity-70' 
                          : 'bg-canvas/50 border-transparent hover:border-obsidian-900/20 text-obsidian-900'
                      }`}
                    >
                      <div className={`w-4 h-4 mt-0.5 rounded-xs flex items-center justify-center border ${
                        isChecked ? 'bg-lime border-obsidian-950 text-obsidian-950' : 'border-obsidian-900/40 bg-white'
                      }`}>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="font-mono text-xs leading-relaxed select-none">
                        {mat}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Tools required & Safety */}
            <div className="space-y-4">
              <div className="bg-white p-5 border border-obsidian-900/15 rounded-sm">
                <h4 className="font-editorial-condensed text-base uppercase font-black text-obsidian-950 mb-3">
                  WORKSHOP TOOLS REQUIRED
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tutorial.tools?.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-canvas-200 border border-obsidian-900/10 font-mono text-xs text-obsidian-900 rounded-xs"
                    >
                      🔧 {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Safety notice */}
              <div className="p-4 bg-amber-500/10 border-l-4 border-amber-500 rounded-xs flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="font-mono text-xs text-amber-900 leading-relaxed">
                  <strong>SAFETY PROTOCOL:</strong> Wear eye goggles when handling broken skateboard plies, molten plastics, or scoring glass. Ensure adequate cross-ventilation when soldering electronics.
                </div>
              </div>
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="pt-4 border-t border-obsidian-900/10">
            <h3 className="font-editorial-condensed text-xl uppercase font-black text-obsidian-950 mb-6 flex items-center gap-2">
              <span>STEP-BY-STEP FABRICATION BLUEPRINT</span>
              <span className="font-mono text-xs text-obsidian-900/50">({tutorial.steps?.length} PHASES)</span>
            </h3>

            <div className="space-y-4">
              {tutorial.steps?.map((step) => (
                <div 
                  key={step.stepNumber}
                  className="p-5 bg-white border border-obsidian-900/15 rounded-sm relative overflow-hidden"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 shrink-0 bg-obsidian-950 text-lime flex items-center justify-center font-editorial-condensed text-lg font-black rounded-xs shadow-brutal-sm">
                      0{step.stepNumber}
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-editorial-condensed text-base uppercase font-bold text-obsidian-950">
                        {step.title}
                      </h4>
                      <p className="font-sans text-sm text-obsidian-900/80 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-canvas-200 px-6 py-3.5 border-t border-obsidian-900/15 flex items-center justify-between font-mono text-xs text-obsidian-900/70">
          <span>ROOT & REFUSE OPEN-SOURCE HARDWARE REPOSITORY</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-obsidian-950 text-white font-mono text-xs uppercase font-bold hover:bg-lime hover:text-obsidian-950 transition-colors"
          >
            CLOSE GUIDE
          </button>
        </div>
      </div>
    </div>
  );
}
