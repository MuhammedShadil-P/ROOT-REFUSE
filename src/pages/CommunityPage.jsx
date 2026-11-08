import React, { useState } from 'react';
import { Sparkles, Plus, Search, Filter, Heart, Clock, Scale, ArrowUpRight, Check, BookOpen, Layers } from 'lucide-react';
import { INITIAL_TUTORIALS } from '../data/tutorialsData';
import SubmitGuideModal from '../components/SubmitGuideModal';
import TutorialDetailModal from '../components/TutorialDetailModal';
import CommunityActivityFeed from '../components/CommunityActivityFeed';

export default function CommunityPage({ onOpenTutorial, onRewardPoints }) {
  const [tutorials, setTutorials] = useState(INITIAL_TUTORIALS);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('upvotes');
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const [upvotedGuides, setUpvotedGuides] = useState({});

  const filterTabs = [
    { id: 'all', label: 'ALL BLUEPRINTS' },
    { id: 'plastic', label: 'PLASTIC UPCYCLING' },
    { id: 'ewaste', label: 'E-WASTE DIY' },
    { id: 'textile', label: 'TEXTILE REVIVAL' },
    { id: 'wood', label: 'WOOD & SALVAGE' },
    { id: 'glass', label: 'GLASS & METAL' },
    { id: 'compost', label: 'COMPOSTING TIPS' },
  ];

  const handleAddGuide = (newGuide) => {
    setTutorials([newGuide, ...tutorials]);
    if (onRewardPoints) onRewardPoints(150);
  };

  const toggleUpvote = (id) => {
    setUpvotedGuides(prev => {
      const isCurrentlyUpvoted = !!prev[id];
      const updated = { ...prev, [id]: !isCurrentlyUpvoted };
      
      setTutorials(currTutorials =>
        currTutorials.map(tut => {
          if (tut.id === id) {
            return {
              ...tut,
              upvotes: tut.upvotes + (isCurrentlyUpvoted ? -1 : 1)
            };
          }
          return tut;
        })
      );

      return updated;
    });
  };

  const filteredTutorials = tutorials
    .filter((tut) => {
      const matchesCat = activeCategory === 'all' || tut.category === activeCategory;
      const matchesSearch =
        tut.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tut.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tut.materials?.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'upvotes') return b.upvotes - a.upvotes;
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      return 0;
    });

  return (
    <div className="min-h-screen bg-canvas pb-24">
      
      {/* Editorial Header Section */}
      <section className="border-b-2 border-obsidian-950 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-lime px-3 py-0.5 text-obsidian-950 font-editorial-condensed font-black text-xs uppercase tracking-wider border border-obsidian-950">
                <span>✦ TRASH TO TREASURE REPOSITORY</span>
              </div>
              <h1 className="font-editorial-condensed text-4xl sm:text-6xl font-black uppercase tracking-tight text-obsidian-950 leading-[0.9]">
                UPCYCLING <br />
                <span className="text-cobalt">COMMUNITY</span> HUB.
              </h1>
              <p className="font-sans text-sm sm:text-base text-obsidian-900/80 max-w-xl">
                Open-source DIY blueprints, CNC toolpaths, and verified guides created by a worldwide collective turning post-consumer refuse into high-end functional design.
              </p>
            </div>

            {/* Submit New Blueprint CTA */}
            <button
              onClick={() => setIsSubmitOpen(true)}
              className="group flex items-center gap-2.5 bg-lime hover:bg-lime-bright text-obsidian-950 font-editorial-condensed font-black px-6 py-4 rounded-full text-sm uppercase tracking-wider border-2 border-obsidian-950 shadow-brutal transition-all hover:translate-x-1 hover:-translate-y-1 self-start lg:self-auto"
            >
              <Plus className="w-5 h-5 stroke-[3]" />
              <span>SUBMIT DIY BLUEPRINT</span>
              <div className="w-6 h-6 rounded-full bg-obsidian-950 text-lime flex items-center justify-center group-hover:rotate-45 transition-transform">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </button>

          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8">

        {/* LIVE COMMUNITY ACTIVITY FEED (Feature 3) */}
        <CommunityActivityFeed onRewardPoints={onRewardPoints} />
        
        {/* Filter Tabs and Search Bar */}
        <div className="bg-white border-2 border-obsidian-950 p-4 sm:p-5 shadow-brutal-sm space-y-4">
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-obsidian-900/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tutorials by keyword, tool, or material..."
                className="w-full pl-10 pr-4 py-2.5 bg-canvas border border-obsidian-900/20 font-mono text-xs focus:outline-none focus:border-obsidian-950"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-obsidian-900/60 uppercase">SORT BY:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-canvas border border-obsidian-900/20 text-xs font-mono font-bold focus:outline-none focus:border-obsidian-950"
              >
                <option value="upvotes">Most Upvoted</option>
                <option value="newest">Newest Releases</option>
              </select>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono text-xs pt-1">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1.5 uppercase font-bold tracking-wider rounded-xs whitespace-nowrap transition-colors ${
                  activeCategory === tab.id
                    ? 'bg-obsidian-950 text-lime'
                    : 'bg-canvas-200 text-obsidian-900/70 hover:bg-canvas-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* Tutorials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTutorials.map((tutorial, idx) => {
            const isUpvoted = !!upvotedGuides[tutorial.id];

            return (
              <div
                key={tutorial.id}
                className="group bg-white border-2 border-obsidian-950 shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all rounded-xs flex flex-col justify-between overflow-hidden cursor-pointer"
                onClick={() => setSelectedTutorial(tutorial)}
              >
                <div>
                  {/* Card Header with Author Tag */}
                  <div className="p-3 bg-canvas-100 border-b border-obsidian-950 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={tutorial.author.avatar}
                        alt={tutorial.author.name}
                        className="w-7 h-7 rounded-full object-cover border border-obsidian-950"
                      />
                      <div className="font-mono text-[11px] leading-tight">
                        <span className="font-bold text-obsidian-950 block">{tutorial.author.name}</span>
                        <span className="text-obsidian-900/50 text-[9px]">{tutorial.author.handle}</span>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded-xs font-mono text-[10px] font-bold uppercase ${tutorial.difficultyColor}`}>
                      {tutorial.difficulty}
                    </span>
                  </div>

                  {/* Thumbnail Image */}
                  <div className="relative h-56 overflow-hidden bg-obsidian-950">
                    <img
                      src={tutorial.image}
                      alt={tutorial.title}
                      className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-obsidian-950 text-white font-mono text-[10px] px-2 py-0.5 rounded-xs border border-white/20 uppercase font-bold">
                      {tutorial.categoryLabel}
                    </div>

                    <div className="absolute bottom-2 right-2 bg-lime text-obsidian-950 font-mono text-[10px] px-2 py-0.5 rounded-xs font-black shadow-sm">
                      {tutorial.wasteDiverted}
                    </div>
                  </div>

                  {/* Content details */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-editorial-condensed text-xl font-black uppercase tracking-tight text-obsidian-950 group-hover:text-cobalt transition-colors leading-tight">
                      {tutorial.title}
                    </h3>

                    <p className="font-sans text-xs text-obsidian-900/80 line-clamp-2 leading-relaxed">
                      {tutorial.summary}
                    </p>

                    {/* Metadata specs */}
                    <div className="flex items-center gap-4 font-mono text-[11px] text-obsidian-900/60 pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-obsidian-900/40" />
                        <span>{tutorial.timeRequired}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-obsidian-900/40" />
                        <span>{tutorial.steps?.length || 4} Steps</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div 
                  className="p-3 bg-canvas-50 border-t border-obsidian-900/15 flex items-center justify-between"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => toggleUpvote(tutorial.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs font-mono text-xs font-bold transition-colors ${
                      isUpvoted
                        ? 'bg-rose-500 text-white'
                        : 'bg-white border border-obsidian-900/20 text-obsidian-900 hover:bg-rose-50 hover:text-rose-600'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isUpvoted ? 'fill-current' : ''}`} />
                    <span>{tutorial.upvotes}</span>
                  </button>

                  <button
                    onClick={() => setSelectedTutorial(tutorial)}
                    className="flex items-center gap-1 font-editorial-condensed text-xs uppercase font-bold text-obsidian-950 hover:text-cobalt transition-colors"
                  >
                    <span>VIEW BLUEPRINT</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Submit Guide Modal */}
      <SubmitGuideModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        onAddGuide={handleAddGuide}
      />

      {/* Tutorial Deep Dive Modal */}
      <TutorialDetailModal
        tutorial={selectedTutorial}
        isOpen={!!selectedTutorial}
        onClose={() => setSelectedTutorial(null)}
        onToggleUpvote={toggleUpvote}
        isUpvoted={selectedTutorial ? !!upvotedGuides[selectedTutorial.id] : false}
      />

    </div>
  );
}
