import React, { useState, useRef, useEffect } from 'react';
import { Search, ArrowUpRight, Menu, X, Sparkles, MapPin, Recycle, Layers, User, Sun, Moon } from 'lucide-react';

export default function Navbar({ currentPage, setCurrentPage, onOpenSearch, userProfile, onOpenCredits, theme, onToggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    if (profileDropdownOpen) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => window.removeEventListener('click', handleClickOutside);
  }, [profileDropdownOpen]);

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
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-2 sm:gap-4 lg:gap-8 w-full max-w-full">
          
          {/* Left: Logo & Desktop Navigation Container with guaranteed flex gaps */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 shrink-0">
            {/* Logo with BRVND style asterisk */}
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group select-none shrink-0"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-obsidian-900 text-lime flex items-center justify-center font-editorial-condensed text-xl md:text-2xl font-black rounded-sm group-hover:bg-lime group-hover:text-obsidian-950 transition-colors shadow-brutal-sm shrink-0">
                *
              </div>
              <div className="flex flex-col shrink-0">
                <span className="font-editorial-condensed text-base sm:text-lg md:text-2xl font-black tracking-tight leading-none text-obsidian-950 whitespace-nowrap">
                  ROOT <span className="text-cobalt">&</span> REFUSE
                </span>
                <span className="font-mono text-[7.5px] sm:text-[8px] md:text-[9px] tracking-wider sm:tracking-widest text-obsidian-900/60 uppercase font-semibold hidden xs:block">
                  Circular Materials Agency
                </span>
              </div>
            </div>

            {/* Desktop Nav Items */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2 shrink-0">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`relative px-3 lg:px-4 py-2 font-mono text-xs tracking-wider uppercase font-bold transition-all duration-200 flex items-center gap-1.5 lg:gap-2 rounded-sm shrink-0 ${
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
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 flex-nowrap shrink-0">
            
            {/* 1. Theme Toggle Button */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className={`inline-flex items-center justify-center gap-1 sm:gap-1.5 p-1.5 md:px-3 md:py-1.5 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider border-2 transition-all shadow-brutal-sm hover:translate-x-0.5 hover:-translate-y-0.5 shrink-0 min-w-[32px] ${
                  theme === 'dark'
                    ? 'bg-obsidian-900 text-lime border-lime hover:bg-obsidian-850 shadow-glow-lime'
                    : 'bg-white text-obsidian-950 border-obsidian-950 hover:bg-canvas-100'
                }`}
                title={theme === 'dark' ? "Switch to Clean Balanced Light Theme" : "Switch to Cyber Obsidian Dark Theme"}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-lime animate-spin shrink-0" style={{ animationDuration: '20s' }} />
                    <span className="text-lime font-black hidden md:inline">CYBER</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-obsidian-950 shrink-0" />
                    <span className="text-obsidian-950 font-black hidden md:inline">LIGHT</span>
                  </>
                )}
              </button>
            )}

            {/* 2. Creators / Meet the Team Button (Tablet & PC) */}
            {onOpenCredits && (
              <button
                onClick={onOpenCredits}
                className="hidden sm:inline-flex items-center gap-1 sm:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 bg-lime hover:bg-lime-bright text-obsidian-950 font-editorial-condensed font-black text-[10px] md:text-xs uppercase tracking-wider rounded-full border-2 border-obsidian-950 shadow-brutal-sm hover:translate-x-0.5 hover:-translate-y-0.5 transition-all shrink-0 cursor-pointer"
                title="Meet the Creators: Muhammed Shadil & Muhammed Sawad"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-obsidian-950 animate-ping shrink-0"></span>
                <span className="hidden md:inline">MEET THE TEAM</span>
                <span className="md:hidden text-[11px]">CREATORS</span>
              </button>
            )}

            {/* 3. Quick Search Button (Desktop Only) */}
            <button
              onClick={onOpenSearch}
              className="hidden md:flex p-2.5 rounded-sm border border-obsidian-900/20 text-obsidian-900 hover:border-obsidian-950 hover:bg-white transition-colors shrink-0"
              title="Quick Search (Ctrl + K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* 4. Compact Profile / Upcycle Wizard Photo Avatar with Dropdown (PC & Mobile) */}
            {userProfile && (
              <div className="relative shrink-0" ref={dropdownRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfileDropdownOpen(prev => !prev);
                  }}
                  className="relative w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden border-2 border-obsidian-950 ring-2 ring-lime/40 hover:ring-lime hover:scale-105 active:scale-95 transition-all shadow-brutal-sm cursor-pointer shrink-0 flex items-center justify-center bg-obsidian-950"
                  title={`Alex Sterling // ${rankName} - Click for Dossier`}
                >
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2 h-2 md:w-2.5 md:h-2.5 bg-lime rounded-full border border-obsidian-950"></span>
                </button>

                {/* Profile Dropdown Popover Card */}
                {profileDropdownOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white border-2 border-obsidian-950 shadow-brutal p-4 rounded-sm z-50 animate-modal-pop text-obsidian-950"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-obsidian-900/10 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-obsidian-950 shrink-0">
                          <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-editorial-condensed text-sm font-black uppercase text-obsidian-950 leading-none">
                            {userProfile.name}
                          </h4>
                          <span className="font-mono text-[10px] text-obsidian-900/60 block mt-0.5">
                            {userProfile.handle || '@alex_reclaims'}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setProfileDropdownOpen(false)}
                        className="w-6 h-6 rounded-xs bg-canvas-200 border border-obsidian-900/20 hover:border-obsidian-950 flex items-center justify-center text-obsidian-900"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="p-2.5 bg-obsidian-950 text-white rounded-xs mb-3 flex items-center justify-between">
                      <div>
                        <span className="font-mono text-[9px] text-lime font-bold uppercase block">CIVIC RANK:</span>
                        <span className="font-editorial-condensed text-xs font-black uppercase tracking-wider text-lime">
                          {rankName}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-[9px] text-white/50 uppercase block">BALANCE:</span>
                        <span className="font-mono text-xs font-black text-white">
                          ★ {userProfile.credits.toLocaleString()} PTS
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 p-2 bg-canvas-100 border border-obsidian-900/10 rounded-xs mb-3 text-center font-mono">
                      <div>
                        <span className="text-[8px] text-obsidian-900/60 block uppercase">SORTED</span>
                        <strong className="text-xs text-obsidian-950">{userProfile.itemsSorted || 142}</strong>
                      </div>
                      <div>
                        <span className="text-[8px] text-obsidian-900/60 block uppercase">DIVERTED</span>
                        <strong className="text-xs text-cobalt">{userProfile.wasteDivertedKg || 58.4}kg</strong>
                      </div>
                      <div>
                        <span className="text-[8px] text-obsidian-900/60 block uppercase">CO2 SAVED</span>
                        <strong className="text-xs text-emerald-600">{userProfile.co2SavedKg || 192.6}kg</strong>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        handleNavClick('profile');
                      }}
                      className="w-full py-2 px-3 bg-lime hover:bg-lime-bright text-obsidian-950 font-editorial-condensed font-black text-xs uppercase tracking-wider rounded-xs border border-obsidian-950 shadow-brutal-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>VIEW FULL PROFILE DOSSIER</span>
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 5. Snap-Sort Action Pill (Desktop Only) */}
            <button
              onClick={() => handleNavClick('scanner')}
              className="hidden md:inline-flex items-center gap-2 bg-lime hover:bg-lime-bright text-obsidian-950 font-editorial-condensed font-black px-4 py-2 rounded-full text-xs tracking-wider uppercase border border-obsidian-950 shadow-brutal-sm transition-all hover:translate-x-0.5 hover:-translate-y-0.5 shrink-0"
            >
              <span>SNAP-SORT</span>
              <div className="w-4 h-4 rounded-full bg-obsidian-950 text-lime flex items-center justify-center shrink-0">
                <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
              </div>
            </button>

            {/* 6. Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-obsidian-950 hover:bg-obsidian-900/10 rounded-sm shrink-0 flex items-center justify-center min-w-[34px] w-8 h-8"
              title="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-obsidian-900/10 bg-canvas px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
          {/* Mobile Quick Search Bar Button in Drawer */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSearch();
            }}
            className="w-full flex items-center justify-between p-3 bg-white border-2 border-obsidian-950 rounded-xs font-mono text-xs text-obsidian-900 hover:border-lime hover:bg-lime/10 transition-all shadow-brutal-sm cursor-pointer mb-2"
          >
            <div className="flex items-center gap-2.5 text-obsidian-900/80">
              <Search className="w-4 h-4 text-obsidian-950 shrink-0" />
              <span className="font-semibold">SEARCH MATERIALS & GUIDES...</span>
            </div>
            <span className="px-2 py-0.5 bg-canvas-200 border border-obsidian-900/20 text-[10px] font-bold font-mono rounded-xs">
              CMD+K
            </span>
          </button>
          
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
