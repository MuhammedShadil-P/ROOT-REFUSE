import React, { useState } from 'react';
import { Search, ArrowUpRight, Menu, X, Sparkles, MapPin, Recycle, Layers, User, Sun, Moon } from 'lucide-react';

export default function Navbar({ currentPage, setCurrentPage, onOpenSearch, userProfile, onOpenCredits, theme, onToggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'HOME', icon: Layers },
    { id: 'scanner', label: 'AI SNAP-SORT', icon: Recycle, badge: 'AI 2.0' },
    { id: 'community', label: 'UPCYCLING HUB', icon: Sparkles },
    { id: 'map', label: 'ECO-MAP', icon: MapPin },
    { id: 'profile', label: 'PROFILE', icon: User },
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to determine rank name from score
  const getRankName = (credits = 0) => {
    if (credits >= 1500) return 'TERRA GUARDIAN';
    if (credits >= 750) return 'UPCYCLE WIZARD';
    if (credits >= 250) return 'COMPOST CADET';
    return 'SEEDLING SCOUT';
  };

  const rankName = getRankName(userProfile?.credits || 0);

  return (
    <header className="sticky top-0 z-50 bg-canvas/95 backdrop-blur-md border-b border-obsidian-900/10">
      {/* Top micro-bar with status and coordinates */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1 bg-obsidian-900 text-white/70 font-mono text-[11px] tracking-wider border-b border-obsidian-800">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lime animate-ping"></span>
            <span className="text-lime font-bold">GRID ACTIVE:</span> LOCAL RECOVERY NODES ONLINE
          </span>
          <span className="text-white/40">|</span>
          <span>SYSTEM COORD: [40.7128° N, 74.0060° W]</span>
          <span className="text-white/40">|</span>
          <span>ALGORITHM CONFIDENCE: 99.4%</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hover:text-lime transition-colors cursor-pointer" onClick={() => handleNavClick('map')}>
            DROP-OFF HUBS NEARBY: <strong className="text-white">6 VERIFIED</strong>
          </span>
          <span className="text-white/40">|</span>
          <button 
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-obsidian-800 text-white/90 hover:text-lime text-[10px] border border-white/10"
          >
            <Search className="w-3 h-3 text-lime" />
            <span>SEARCH ITEM (CTRL+K)</span>
          </button>
        </div>
      </div>

      {/* Main Agency Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with BRVND style asterisk */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 bg-obsidian-900 text-lime flex items-center justify-center font-editorial-condensed text-2xl font-black rounded-sm group-hover:bg-lime group-hover:text-obsidian-950 transition-colors shadow-brutal-sm">
              *
            </div>
            <div className="flex flex-col">
              <span className="font-editorial-condensed text-xl sm:text-2xl font-black tracking-tight leading-none text-obsidian-950">
                ROOT <span className="text-cobalt">&</span> REFUSE
              </span>
              <span className="font-mono text-[9px] tracking-widest text-obsidian-900/60 uppercase font-semibold">
                Circular Materials Agency
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-4 py-2 font-mono text-xs tracking-wider uppercase font-bold transition-all duration-200 flex items-center gap-2 rounded-sm ${
                    isActive 
                      ? 'bg-obsidian-900 text-white shadow-brutal-sm' 
                      : 'text-obsidian-900 hover:bg-obsidian-900/5'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] bg-lime text-obsidian-950 px-1.5 py-0.2 rounded font-black font-mono">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-lime ml-0.5"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons with GAMIFICATION USER BADGE & THEME TOGGLE */}
          <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3 flex-nowrap shrink-0">
            
            {/* User Gamification Profile Shortcut Badge (Click to open /profile) */}
            {userProfile && (
              <div
                onClick={() => handleNavClick('profile')}
                className="group hidden lg:flex items-center gap-2 px-2.5 py-1.5 bg-white hover:bg-canvas-100 border border-obsidian-950 rounded-full cursor-pointer shadow-brutal-sm transition-all hover:translate-x-0.5 hover:-translate-y-0.5 shrink-0"
                title="View Profile & Badge Progression"
              >
                <div className="w-6 h-6 rounded-full overflow-hidden border border-obsidian-950 shrink-0">
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                </div>

                <div className="flex flex-col text-left leading-none pr-1">
                  <span className="font-editorial-condensed text-[10px] font-black text-obsidian-950 group-hover:text-cobalt uppercase tracking-tight">
                    {rankName}
                  </span>
                  <span className="font-mono text-[9px] text-obsidian-900/60 font-semibold mt-0.5">
                    ★ {userProfile.credits.toLocaleString()} PTS
                  </span>
                </div>
              </div>
            )}

            {/* Clean, Non-Wrapping Theme Toggle Button */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider border-2 transition-all shadow-brutal-sm hover:translate-x-0.5 hover:-translate-y-0.5 shrink-0 ${
                  theme === 'dark'
                    ? 'bg-obsidian-900 text-lime border-lime hover:bg-obsidian-850 shadow-glow-lime'
                    : 'bg-white text-obsidian-950 border-obsidian-950 hover:bg-canvas-100'
                }`}
                title={theme === 'dark' ? "Switch to Clean Balanced Light Theme" : "Switch to Cyber Obsidian Dark Theme"}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-lime animate-spin shrink-0" style={{ animationDuration: '20s' }} />
                    <span className="text-lime font-black hidden xs:inline sm:inline">CYBER</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-obsidian-950 shrink-0" />
                    <span className="text-obsidian-950 font-black hidden xs:inline sm:inline">LIGHT</span>
                  </>
                )}
              </button>
            )}

            {/* Dedicated Creators / Meet the Team Button */}
            {onOpenCredits && (
              <button
                onClick={onOpenCredits}
                className="group inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 bg-lime hover:bg-lime-bright text-obsidian-950 font-editorial-condensed font-black text-xs uppercase tracking-wider rounded-full border-2 border-obsidian-950 shadow-brutal-sm hover:translate-x-0.5 hover:-translate-y-0.5 transition-all shrink-0 cursor-pointer"
                title="Meet the Creators: Muhammed Shadil & Muhammed Sawad"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-obsidian-950 animate-ping shrink-0"></span>
                <span className="hidden sm:inline">MEET THE TEAM</span>
                <span className="sm:hidden text-[11px]">CREATORS</span>
              </button>
            )}

            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:p-2.5 rounded-sm border border-obsidian-900/20 text-obsidian-900 hover:border-obsidian-950 hover:bg-white transition-colors shrink-0"
              title="Quick Search (Ctrl + K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Lime Pill Button with Diagonal Arrow */}
            <button
              onClick={() => handleNavClick('scanner')}
              className="hidden sm:inline-flex items-center gap-2 bg-lime hover:bg-lime-bright text-obsidian-950 font-editorial-condensed font-black px-3.5 sm:px-4 py-2 rounded-full text-xs tracking-wider uppercase border border-obsidian-950 shadow-brutal-sm transition-all hover:translate-x-0.5 hover:-translate-y-0.5 shrink-0"
            >
              <span>SNAP-SORT</span>
              <div className="w-4 h-4 rounded-full bg-obsidian-950 text-lime flex items-center justify-center shrink-0">
                <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-obsidian-950 hover:bg-obsidian-900/10 rounded-sm shrink-0"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-obsidian-900/10 bg-canvas px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
          
          {/* Mobile Profile Badge Card */}
          {userProfile && (
            <div 
              onClick={() => handleNavClick('profile')}
              className="p-3 bg-white border border-obsidian-950 rounded-sm flex items-center justify-between cursor-pointer mb-2 shadow-brutal-sm"
            >
              <div className="flex items-center gap-3">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-10 h-10 rounded-full object-cover border border-obsidian-950"
                />
                <div>
                  <h5 className="font-editorial-condensed text-sm font-black uppercase text-obsidian-950">
                    {userProfile.name}
                  </h5>
                  <span className="font-mono text-xs text-cobalt font-bold">
                    {rankName}
                  </span>
                </div>
              </div>

              <span className="px-2.5 py-1 bg-lime text-obsidian-950 font-mono text-xs font-black rounded-xs">
                ★ {userProfile.credits} PTS
              </span>
            </div>
          )}

          {/* Mobile Theme Toggle Button */}
          {onToggleTheme && (
            <button
              onClick={() => {
                onToggleTheme();
              }}
              className={`w-full py-2.5 px-4 font-mono text-xs font-black uppercase tracking-wider rounded-sm border-2 flex items-center justify-between transition-all ${
                theme === 'dark' 
                  ? 'bg-obsidian-900 text-lime border-lime shadow-brutal-sm' 
                  : 'bg-white text-obsidian-950 border-obsidian-950 shadow-brutal-sm'
              }`}
            >
              <span className="flex items-center gap-2">
                {theme === 'dark' ? <Sun className="w-4 h-4 text-lime" /> : <Moon className="w-4 h-4" />}
                <span>THEME: {theme === 'dark' ? 'CYBER OBSIDIAN' : 'LIGHT EDITORIAL'}</span>
              </span>
              <span className="px-2 py-0.5 bg-lime text-obsidian-950 text-[10px] font-mono rounded font-black">
                SWITCH
              </span>
            </button>
          )}

          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center justify-between px-4 py-3 font-editorial-condensed text-base font-bold tracking-wider rounded-sm ${
                  isActive 
                    ? 'bg-obsidian-900 text-white' 
                    : 'text-obsidian-900 hover:bg-obsidian-900/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-lime" />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] bg-lime text-obsidian-950 px-2 py-0.5 rounded font-black font-mono">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}

          {onOpenCredits && (
            <button
              onClick={() => {
                onOpenCredits();
                setMobileMenuOpen(false);
              }}
              className="w-full mt-2 py-3 px-4 bg-lime text-obsidian-950 font-editorial-condensed font-black text-xs uppercase tracking-wider border-2 border-obsidian-950 shadow-brutal-sm text-center flex items-center justify-center gap-2 hover:bg-lime-bright transition-colors"
            >
              <span>✦ DEV TEAM: MUHAMMED SHADIL & MUHAMMED SAWAD</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
}
