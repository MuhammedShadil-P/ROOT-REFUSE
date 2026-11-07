import React, { useState } from 'react';
import { Search, Sparkles, Filter, AlertTriangle, ArrowRight, CheckCircle2, ChevronRight, MapPin, Info, ArrowUpRight } from 'lucide-react';
import AIUploadZone from '../components/AIUploadZone';
import { WASTE_ITEMS } from '../data/wasteItemsData';

export default function ScannerPage({ onNavigate, initialSelectedItem, onRewardPoints }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeItem, setActiveItem] = useState(initialSelectedItem || WASTE_ITEMS[0]);

  const categories = [
    { id: 'all', label: 'ALL MATERIALS' },
    { id: 'compost', label: 'COMPOSTABLE / ORGANIC' },
    { id: 'recyclable', label: 'DRY RECYCLABLE' },
    { id: 'hazardous', label: 'HAZARDOUS E-WASTE' },
    { id: 'special', label: 'SPECIAL / TEXTILE' },
  ];

  const filteredItems = WASTE_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.materialBreakdown.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAIResult = (item) => {
    setActiveItem(item);
    if (onRewardPoints) onRewardPoints(50);
    // Smooth scroll down to details
    const element = document.getElementById('item-inspection-panel');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-canvas pb-20">
      
      {/* Editorial Page Header */}
      <section className="border-b-2 border-obsidian-950 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-lime px-3 py-0.5 text-obsidian-950 font-editorial-condensed font-black text-xs uppercase tracking-wider border border-obsidian-950">
                <span>✦ MACHINE PERCEPTION PROTOCOL</span>
              </div>
              <h1 className="font-editorial-condensed text-4xl sm:text-6xl font-black uppercase tracking-tight text-obsidian-950 leading-[0.9]">
                WHERE DOES <br />
                <span className="text-cobalt">IT GO?</span>
              </h1>
              <p className="font-sans text-sm sm:text-base text-obsidian-900/80 max-w-xl">
                Scan any household item or search our high-fidelity material classification database to prevent bin contamination and divert recoverable resources.
              </p>
            </div>

            {/* Quick Stat Pill */}
            <div className="bg-canvas border border-obsidian-900/20 p-4 rounded-xs font-mono text-xs text-obsidian-900 space-y-1 self-start lg:self-auto">
              <div className="flex items-center justify-between gap-6">
                <span className="text-obsidian-900/60 uppercase">CLASSIFICATION CONFIDENCE:</span>
                <strong className="text-emerald-600 font-bold">99.4% VERIFIED</strong>
              </div>
              <div className="flex items-center justify-between gap-6">
                <span className="text-obsidian-900/60 uppercase">MUNICIPAL ACCREDITATION:</span>
                <strong className="text-obsidian-950 font-bold">ISO-14001:2015</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        
        {/* ========================================================
            FEATURE 1: MOCK AI IMAGE UPLOAD ZONE & CAMERA SCANNER
           ======================================================== */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-lime"></div>
            <h2 className="font-editorial-condensed text-xl uppercase font-black text-obsidian-950 tracking-wider">
              STAGE 01: OPTICAL NEURAL SCANNER
            </h2>
          </div>
          
          <AIUploadZone onResultFound={handleAIResult} />
        </section>

        {/* ========================================================
            FEATURE 2: REAL-TIME SEARCH BAR & MATERIAL DICTIONARY
           ======================================================== */}
        <section id="item-inspection-panel" className="space-y-6">
          <div className="flex items-center justify-between border-b-2 border-obsidian-950 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cobalt"></div>
              <h2 className="font-editorial-condensed text-xl uppercase font-black text-obsidian-950 tracking-wider">
                STAGE 02: MATERIAL INSPECTION & SEGREGATION DICTIONARY
              </h2>
            </div>
            <span className="font-mono text-xs text-obsidian-900/60">
              {filteredItems.length} RECOGNIZED MATERIALS
            </span>
          </div>

          {/* Search Input and Filter Bar */}
          <div className="bg-white border-2 border-obsidian-950 p-4 sm:p-5 shadow-brutal-sm space-y-4">
            <div className="relative">
              <Search className="w-5 h-5 text-obsidian-900/40 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by item name, material, or keyword (e.g. 'pizza box', 'batteries', 'denim', 'can')..."
                className="w-full pl-12 pr-4 py-3 bg-canvas border border-obsidian-900/20 font-mono text-sm focus:outline-none focus:border-obsidian-950"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 font-mono text-xs">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 uppercase font-bold tracking-wider rounded-xs whitespace-nowrap transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-obsidian-950 text-lime'
                      : 'bg-canvas-200 text-obsidian-900/70 hover:bg-canvas-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2-Column Split: Item List and Selected Deep-Dive Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Item Grid / List */}
            <div className="lg:col-span-5 space-y-3">
              {filteredItems.map((item) => {
                const isSelected = activeItem.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveItem(item)}
                    className={`p-4 border-2 transition-all cursor-pointer rounded-xs flex items-center justify-between gap-4 group ${
                      isSelected
                        ? 'bg-obsidian-950 text-white border-obsidian-950 shadow-brutal-sm'
                        : 'bg-white hover:bg-canvas-50 border-obsidian-900/15 text-obsidian-950'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-xs border border-obsidian-900/20 shrink-0"
                      />
                      <div>
                        <h4 className={`font-editorial-condensed text-base uppercase font-black transition-colors ${
                          isSelected ? 'text-lime' : 'group-hover:text-cobalt'
                        }`}>
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`px-2 py-0.2 rounded-xs font-mono text-[10px] font-bold ${
                            isSelected ? 'bg-white/20 text-white' : item.badgeColor
                          }`}>
                            {item.binCode}
                          </span>
                          <span className={`font-mono text-[10px] ${isSelected ? 'text-white/60' : 'text-obsidian-900/50'}`}>
                            {item.categoryLabel}
                          </span>
                        </div>
                      </div>
                    </div>

                    <ChevronRight className={`w-5 h-5 transition-transform ${
                      isSelected ? 'text-lime translate-x-1' : 'text-obsidian-900/30 group-hover:translate-x-1'
                    }`} />
                  </div>
                );
              })}
            </div>

            {/* Right Column: Deep-Dive Item Specification Card */}
            <div className="lg:col-span-7 bg-white border-2 border-obsidian-950 shadow-brutal p-6 sm:p-8 rounded-sm space-y-6">
              
              {/* Card Header with Badges */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-obsidian-900/10 gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs uppercase text-obsidian-900/60 font-bold">
                      OFFICIAL DISPOSAL DIRECTIVE // {activeItem.binCode}
                    </span>
                  </div>
                  <h3 className="font-editorial-condensed text-3xl font-black uppercase tracking-tight text-obsidian-950">
                    {activeItem.name}
                  </h3>
                </div>

                <span className={`px-3 py-1 rounded-xs font-mono text-xs font-black uppercase tracking-wider self-start sm:self-auto ${activeItem.badgeColor}`}>
                  {activeItem.binType}
                </span>
              </div>

              {/* Photo & Material Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-5 h-44 rounded-xs overflow-hidden border border-obsidian-950">
                  <img
                    src={activeItem.image}
                    alt={activeItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="sm:col-span-7 space-y-3 bg-canvas p-4 border border-obsidian-900/10 rounded-xs">
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase text-obsidian-900/60 block">
                      MATERIAL COMPOSITION:
                    </span>
                    <p className="font-sans text-xs font-bold text-obsidian-950 mt-0.5">
                      {activeItem.materialBreakdown}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase text-obsidian-900/60 block">
                      DEGRADATION TIMELINE:
                    </span>
                    <p className="font-mono text-xs text-rose-600 font-semibold mt-0.5">
                      {activeItem.degradationTime}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase text-obsidian-900/60 block">
                      NET CARBON OFFSET:
                    </span>
                    <p className="font-mono text-xs text-emerald-600 font-bold mt-0.5">
                      {activeItem.carbonImpact}
                    </p>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Segregation Instructions */}
              <div className="space-y-3">
                <h4 className="font-editorial-condensed text-base uppercase font-black text-obsidian-950 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>STEP-BY-STEP PREPARATION PROTOCOL</span>
                </h4>

                <div className="space-y-2 bg-canvas p-4 border border-obsidian-900/10 rounded-xs">
                  {activeItem.instructions.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs font-sans text-obsidian-900">
                      <span className="w-5 h-5 rounded-full bg-obsidian-950 text-white font-mono text-[10px] flex items-center justify-center shrink-0 font-bold mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Pitfall Warning */}
              <div className="p-4 bg-amber-500/10 border-l-4 border-amber-500 rounded-xs flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-amber-900 block">
                    CRITICAL CONTAMINATION PITFALL:
                  </span>
                  <p className="font-sans text-xs text-amber-900/90 mt-0.5">
                    {activeItem.commonMistakes}
                  </p>
                </div>
              </div>

              {/* Upcycle & Drop-Off Action Bar */}
              <div className="pt-4 border-t border-obsidian-900/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-obsidian-900 font-mono text-xs">
                  <span className="text-lime-dark font-black">TIP:</span>
                  <span className="line-clamp-1">{activeItem.upcyclingTip}</span>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={() => onNavigate('community')}
                    className="flex-1 sm:flex-initial px-4 py-2.5 bg-canvas-200 hover:bg-white text-obsidian-950 font-editorial-condensed font-black text-xs uppercase tracking-wider border border-obsidian-950 rounded-xs transition-colors"
                  >
                    DIY IDEAS
                  </button>

                  <button
                    onClick={() => onNavigate('map')}
                    className="flex-1 sm:flex-initial px-4 py-2.5 bg-cobalt hover:bg-blue-600 text-white font-editorial-condensed font-black text-xs uppercase tracking-wider rounded-xs transition-colors shadow-brutal-sm flex items-center justify-center gap-1.5"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>NEAREST DROP-OFF</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
