import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowUpRight, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { WASTE_ITEMS } from '../data/wasteItemsData';

export default function QuickSearchModal({ isOpen, onClose, onSelectItem }) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedCategory('all');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onSelectItem ? onSelectItem(null) : null;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredItems = WASTE_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery =
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())) ||
      item.categoryLabel.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-obsidian-950/80 backdrop-blur-sm animate-fadeIn">
      {/* Modal Dialog */}
      <div 
        className="w-full max-w-2xl bg-canvas border-2 border-obsidian-950 shadow-2xl relative overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-obsidian-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-obsidian-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-lime rounded-full"></span>
            <span className="font-editorial-condensed text-base tracking-wider uppercase">
              QUICK DISPOSAL DICTIONARY
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/70">
              ESC TO CLOSE
            </span>
            <button 
              onClick={onClose}
              className="p-1 hover:text-lime transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 border-b border-obsidian-900/10 bg-white">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-obsidian-900/50 absolute left-3.5 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type an item (e.g. 'pizza box', 'batteries', 'coffee cup')..."
              className="w-full pl-11 pr-4 py-3 bg-canvas border border-obsidian-900/20 font-mono text-sm focus:outline-none focus:border-obsidian-950 focus:ring-1 focus:ring-obsidian-950"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-1 text-xs font-mono">
            {[
              { id: 'all', label: 'ALL' },
              { id: 'compost', label: 'COMPOST' },
              { id: 'recyclable', label: 'RECYCLABLE' },
              { id: 'hazardous', label: 'HAZARDOUS E-WASTE' },
              { id: 'special', label: 'SPECIAL DROP' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 uppercase tracking-wider rounded-sm text-[11px] font-bold transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-obsidian-950 text-lime'
                    : 'bg-obsidian-900/5 text-obsidian-900/70 hover:bg-obsidian-900/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 space-y-3 flex-1">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="w-8 h-8 text-obsidian-900/40 mx-auto mb-2" />
              <p className="font-editorial-condensed text-lg uppercase font-bold text-obsidian-900/80">
                NO DIRECT MATCH FOUND
              </p>
              <p className="font-mono text-xs text-obsidian-900/60 mt-1">
                Try scanning the object via camera on the AI Snap-Sort Page.
              </p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectItem(item);
                  onClose();
                }}
                className="group p-3.5 bg-white border border-obsidian-900/10 hover:border-obsidian-950 transition-all cursor-pointer flex items-center justify-between gap-4 rounded-sm hover:shadow-brutal-sm"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover border border-obsidian-900/20 grayscale group-hover:grayscale-0 transition-all rounded-sm"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-editorial-condensed text-base font-black uppercase text-obsidian-950 group-hover:text-cobalt transition-colors">
                        {item.name}
                      </h4>
                      <span className={`px-2 py-0.5 rounded-xs font-mono text-[10px] font-bold ${item.badgeColor}`}>
                        {item.binCode}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-obsidian-900/70 mt-0.5 line-clamp-1">
                      {item.instructions[0]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-obsidian-900 group-hover:text-lime-dark">
                  <span className="font-mono text-xs font-bold hidden sm:inline">INSPECT</span>
                  <div className="w-7 h-7 rounded-full bg-obsidian-950 text-lime flex items-center justify-center group-hover:bg-lime group-hover:text-obsidian-950 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="bg-canvas-200 px-4 py-2.5 border-t border-obsidian-900/10 flex items-center justify-between font-mono text-[11px] text-obsidian-900/60">
          <span>{filteredItems.length} MATERIALS INDEXED</span>
          <span>PRESS ESC OR CLICK OUTSIDE</span>
        </div>
      </div>
    </div>
  );
}
