import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Layers, ShieldCheck, Clock, Phone, ExternalLink, Plus, Minus, RotateCcw } from 'lucide-react';

export default function InteractiveMapCanvas({ facilities, selectedFacility, onSelectFacility }) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredPin, setHoveredPin] = useState(null);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="relative w-full h-[520px] bg-obsidian-950 border-2 border-obsidian-950 overflow-hidden select-none rounded-sm">
      
      {/* Background Editorial Radar / Vector Blueprint */}
      <div 
        className="w-full h-full relative transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        {/* SVG Map Graphics: Blueprint streets, river/waterway, and concentric radar rings */}
        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none" 
          className="w-full h-full absolute inset-0 opacity-40 pointer-events-none"
        >
          {/* Subtle Grid System */}
          <defs>
            <pattern id="radarGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#222222" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#radarGrid)" />

          {/* Organic Waterway / Coastal River */}
          <path 
            d="M 0,40 Q 25,48 45,35 T 80,65 T 100,60 L 100,75 L 0,85 Z" 
            fill="#0f1b2b" 
            opacity="0.8"
          />

          {/* Arterial Boulevard Roads */}
          <line x1="0" y1="20" x2="100" y2="45" stroke="#333333" strokeWidth="1" />
          <line x1="15" y1="0" x2="40" y2="100" stroke="#333333" strokeWidth="1.2" />
          <line x1="50" y1="0" x2="85" y2="100" stroke="#333333" strokeWidth="1.4" />
          <line x1="0" y1="70" x2="100" y2="70" stroke="#333333" strokeWidth="0.8" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#2563EB" strokeWidth="0.3" strokeDasharray="1,2" opacity="0.4" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="#CCFF00" strokeWidth="0.4" strokeDasharray="2,2" opacity="0.5" />
        </svg>

        {/* District Labels */}
        <div className="absolute top-6 left-8 font-mono text-[9px] text-white/30 tracking-widest uppercase pointer-events-none">
          ZONE 01 // METRO TECH CORRIDOR
        </div>
        <div className="absolute bottom-8 left-12 font-mono text-[9px] text-white/30 tracking-widest uppercase pointer-events-none">
          ZONE 02 // MARITIME RECOVERY DOCKS
        </div>
        <div className="absolute top-10 right-10 font-mono text-[9px] text-white/30 tracking-widest uppercase pointer-events-none">
          ZONE 03 // GREENWOOD RESIDENTIAL COMMONS
        </div>

        {/* Interactive Facility Pins */}
        {facilities.map((fac) => {
          const isSelected = selectedFacility?.id === fac.id;
          const isHovered = hoveredPin === fac.id;

          return (
            <div
              key={fac.id}
              onClick={() => onSelectFacility(fac)}
              onMouseEnter={() => setHoveredPin(fac.id)}
              onMouseLeave={() => setHoveredPin(null)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
              style={{ left: `${fac.coords.x}%`, top: `${fac.coords.y}%` }}
            >
              {/* Pulsing Radar Ring */}
              <div 
                className={`absolute inset-0 rounded-full animate-ping opacity-60 pointer-events-none ${
                  isSelected ? 'scale-150' : 'scale-100'
                }`}
                style={{ backgroundColor: fac.pinColor, width: isSelected ? '28px' : '18px', height: isSelected ? '28px' : '18px' }}
              ></div>

              {/* Pin Center Marker */}
              <div 
                className={`relative flex items-center justify-center font-mono font-bold text-[10px] transition-all duration-300 shadow-lg ${
                  isSelected 
                    ? 'w-9 h-9 border-2 border-white scale-125 z-30 ring-4 ring-lime/40' 
                    : 'w-7 h-7 border border-obsidian-950 hover:scale-110'
                }`}
                style={{ 
                  backgroundColor: fac.pinColor || '#FF0055', 
                  color: fac.category === 'compost' ? '#0B0B0B' : '#FFFFFF' 
                }}
              >
                {fac.isIncident || fac.category === 'incident' ? '🚨' : fac.id.replace('fac-0', '')}
              </div>

              {/* Tooltip on Hover */}
              {(isHovered || isSelected) && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-obsidian-900 border border-white/20 p-2.5 rounded-xs shadow-2xl z-40 pointer-events-none text-left animate-fadeIn">
                  <div className="flex items-center justify-between font-mono text-[9px] text-lime mb-0.5">
                    <span>{fac.categoryLabel}</span>
                    <span>{fac.distance}</span>
                  </div>
                  <h6 className="font-editorial-condensed text-xs font-bold text-white uppercase line-clamp-1">
                    {fac.name}
                  </h6>
                  <p className="font-mono text-[9px] text-white/60 mt-1 line-clamp-1">
                    {fac.address}
                  </p>
                  <div className="mt-1.5 flex items-center gap-1 font-mono text-[9px] text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>{fac.isOpen ? 'OPEN NOW' : 'SCHEDULED'}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Floating Coordinate HUD overlay (Top Right) */}
      <div className="absolute top-4 right-4 bg-obsidian-900/90 border border-white/10 px-3 py-2 font-mono text-[10px] text-white/70 backdrop-blur-sm z-30 pointer-events-none space-y-0.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-lime animate-pulse"></span>
          <span className="text-white font-bold">RADAR SENSORS: 6 ACTIVE NODES</span>
        </div>
        <div className="text-white/50">ZOOM: {(zoomLevel * 100).toFixed(0)}% // EPSG:3857</div>
      </div>

      {/* Floating Zoom and Reset Controls (Bottom Right) */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 z-30">
        <button
          onClick={handleZoomIn}
          className="w-8 h-8 bg-obsidian-900 border border-white/20 text-white flex items-center justify-center hover:bg-lime hover:text-obsidian-950 transition-colors rounded-xs shadow"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-8 h-8 bg-obsidian-900 border border-white/20 text-white flex items-center justify-center hover:bg-lime hover:text-obsidian-950 transition-colors rounded-xs shadow"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetZoom}
          className="w-8 h-8 bg-obsidian-900 border border-white/20 text-white flex items-center justify-center hover:bg-lime hover:text-obsidian-950 transition-colors rounded-xs shadow"
          title="Reset Zoom"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Left: Interactive Map Legend */}
      <div className="absolute bottom-4 left-4 bg-obsidian-900/95 border border-white/10 p-2.5 font-mono text-[10px] text-white backdrop-blur-sm z-30 max-w-xs hidden sm:block">
        <span className="text-white/50 block mb-1 font-bold">LEGEND:</span>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cobalt"></span> E-Waste Vault
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-lime"></span> Compost Bio-Hub
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span> MRF Recycler
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span> Textile Swap
          </span>
        </div>
      </div>

    </div>
  );
}
