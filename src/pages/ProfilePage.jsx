import React, { useState } from 'react';
import { Camera, Edit3, Check, Award, Sparkles, Scale, RefreshCw, Layers, ShieldCheck, Heart, ArrowUpRight, Clock, MapPin, UserCheck } from 'lucide-react';
import BadgeProgression from '../components/BadgeProgression';

const AVATAR_PRESETS = [
  { id: 'av-1', name: 'Artisan Maker', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80' },
  { id: 'av-2', name: 'Material Chemist', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80' },
  { id: 'av-3', name: 'Cyber Tinkerer', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80' },
  { id: 'av-4', name: 'Textile Weaver', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80' },
  { id: 'av-5', name: 'Urban Forager', url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=250&q=80' },
  { id: 'av-6', name: 'Bio Microbiologist', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80' }
];

export default function ProfilePage({ userProfile, onUpdateProfile, onAddCredits, onResetCredits, onNavigate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userProfile.name);
  const [handle, setHandle] = useState(userProfile.handle);
  const [role, setRole] = useState(userProfile.role);
  const [customAvatarUrl, setCustomAvatarUrl] = useState(userProfile.avatar);
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);

  const handleSaveInfo = (e) => {
    e.preventDefault();
    onUpdateProfile({
      ...userProfile,
      name,
      handle,
      role,
      avatar: customAvatarUrl
    });
    setIsEditing(false);
  };

  const selectAvatar = (url) => {
    setCustomAvatarUrl(url);
    onUpdateProfile({ ...userProfile, avatar: url });
    setAvatarModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-canvas pb-24">
      
      {/* Editorial Profile Header */}
      <section className="border-b-2 border-obsidian-950 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            {/* User identity & avatar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              
              {/* Avatar with click to customize badge */}
              <div className="relative group">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-obsidian-950 overflow-hidden shadow-brutal bg-obsidian-950">
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <button
                  onClick={() => setAvatarModalOpen(true)}
                  className="absolute bottom-0 right-0 p-2.5 bg-lime hover:bg-lime-bright text-obsidian-950 rounded-full border-2 border-obsidian-950 shadow-sm transition-transform hover:scale-110"
                  title="Change Avatar"
                >
                  <Camera className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

              {/* User Bio and credentials */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 bg-obsidian-950 text-lime px-2.5 py-0.5 rounded-xs font-mono text-[10px] font-bold">
                    <UserCheck className="w-3 h-3" />
                    <span>VERIFIED RECLAIMER</span>
                  </span>
                  <span className="font-mono text-xs text-obsidian-900/60">
                    ID: #RR-924-PRO
                  </span>
                </div>

                {isEditing ? (
                  <form onSubmit={handleSaveInfo} className="space-y-2 pt-1">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="px-2.5 py-1 text-xl font-editorial-condensed uppercase font-black border border-obsidian-950 bg-canvas"
                    />
                    <input
                      type="text"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      className="block px-2 py-0.5 text-xs font-mono border border-obsidian-950 bg-canvas"
                    />
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="block px-2 py-0.5 text-xs font-sans border border-obsidian-950 bg-canvas w-full max-w-sm"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1 bg-lime text-obsidian-950 font-mono text-xs font-bold uppercase rounded-xs"
                    >
                      Save Changes
                    </button>
                  </form>
                ) : (
                  <div>
                    <h1 className="font-editorial-condensed text-3xl sm:text-5xl font-black uppercase text-obsidian-950 tracking-tight leading-none">
                      {userProfile.name}
                    </h1>
                    <div className="flex items-center gap-2 text-obsidian-900/70 font-mono text-xs mt-1">
                      <span className="text-cobalt font-bold">{userProfile.handle}</span>
                      <span>•</span>
                      <span>{userProfile.role}</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4 pt-1 font-mono text-xs text-obsidian-900/60">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{userProfile.district}</span>
                  </span>
                  <span>•</span>
                  <span>MEMBER SINCE {userProfile.joinedDate}</span>
                </div>
              </div>

            </div>

            {/* Right: Quick Edit & Total Score Pill */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2.5 bg-canvas border border-obsidian-900/20 hover:border-obsidian-950 font-mono text-xs uppercase font-bold text-obsidian-900 flex items-center justify-center gap-2 transition-colors rounded-xs"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'CANCEL' : 'EDIT PROFILE'}</span>
              </button>

              <div className="p-4 bg-lime text-obsidian-950 border-2 border-obsidian-950 shadow-brutal-sm rounded-xs font-mono">
                <span className="text-[10px] uppercase font-black block tracking-wider opacity-80">
                  LIVE ECO-CREDITS
                </span>
                <span className="font-editorial-condensed text-3xl font-black block">
                  ★ {userProfile.credits.toLocaleString()}
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        
        {/* ========================================================
            PERSONAL IMPACT METRICS BREAKDOWN
           ======================================================== */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b-2 border-obsidian-950 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cobalt"></span>
              <h2 className="font-editorial-condensed text-xl uppercase font-black text-obsidian-950 tracking-wider">
                PERSONAL ECOLOGICAL FOOTPRINT BREAKDOWN
              </h2>
            </div>
            <span className="font-mono text-xs text-obsidian-900/60">
              AUDITED PER ISO-14001
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            <div className="p-6 bg-white border-2 border-obsidian-950 shadow-brutal rounded-xs space-y-1">
              <span className="font-mono text-[10px] uppercase text-obsidian-900/60 font-bold block">
                01 // ITEMS SEGREGATED
              </span>
              <div className="font-editorial-condensed text-4xl font-black text-obsidian-950">
                {userProfile.itemsSorted}
              </div>
              <p className="font-sans text-xs text-obsidian-900/70">
                Scanned & categorized without bin contamination.
              </p>
            </div>

            <div className="p-6 bg-white border-2 border-obsidian-950 shadow-brutal rounded-xs space-y-1">
              <span className="font-mono text-[10px] uppercase text-obsidian-900/60 font-bold block">
                02 // WASTE DIVERTED
              </span>
              <div className="font-editorial-condensed text-4xl font-black text-emerald-600">
                {userProfile.wasteDivertedKg} <span className="text-xl font-mono text-obsidian-950">KG</span>
              </div>
              <p className="font-sans text-xs text-obsidian-900/70">
                Intercepted from local landfill methane burial.
              </p>
            </div>

            <div className="p-6 bg-white border-2 border-obsidian-950 shadow-brutal rounded-xs space-y-1">
              <span className="font-mono text-[10px] uppercase text-obsidian-900/60 font-bold block">
                03 // CO2e AVOIDED
              </span>
              <div className="font-editorial-condensed text-4xl font-black text-cobalt">
                {userProfile.co2SavedKg} <span className="text-xl font-mono text-obsidian-950">KG</span>
              </div>
              <p className="font-sans text-xs text-obsidian-900/70">
                Net greenhouse gases averted through recycling.
              </p>
            </div>

            <div className="p-6 bg-white border-2 border-obsidian-950 shadow-brutal rounded-xs space-y-1">
              <span className="font-mono text-[10px] uppercase text-obsidian-900/60 font-bold block">
                04 // DIY BLUEPRINTS
              </span>
              <div className="font-editorial-condensed text-4xl font-black text-obsidian-950">
                {userProfile.blueprintsCreated}
              </div>
              <p className="font-sans text-xs text-obsidian-900/70">
                Published guides with {userProfile.upvotesReceived} community upvotes.
              </p>
            </div>

          </div>
        </section>

        {/* ========================================================
            BADGE PROGRESSION COMPONENT
           ======================================================== */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b-2 border-obsidian-950 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-lime"></span>
              <h2 className="font-editorial-condensed text-xl uppercase font-black text-obsidian-950 tracking-wider">
                BADGE PROGRESSION & CERTIFIED RANKS
              </h2>
            </div>
            <span className="font-mono text-xs text-obsidian-900/60">
              TIER GATES (0 / 250 / 750 / 1500 PTS)
            </span>
          </div>

          <BadgeProgression
            credits={userProfile.credits}
            onAddCredits={onAddCredits}
            onResetCredits={onResetCredits}
          />
        </section>

        {/* ========================================================
            RECENT ACTIVITY TIMELINE
           ======================================================== */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b-2 border-obsidian-950 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cobalt"></span>
              <h2 className="font-editorial-condensed text-xl uppercase font-black text-obsidian-950 tracking-wider">
                AUDITED ACTIVITY LOG
              </h2>
            </div>
            <span className="font-mono text-xs text-obsidian-900/60">
              LEDGER SYNCED
            </span>
          </div>

          <div className="bg-white border-2 border-obsidian-950 shadow-brutal p-6 rounded-sm divide-y divide-obsidian-900/10">
            
            <div className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-lime text-obsidian-950 flex items-center justify-center font-bold font-mono text-xs">
                  +50
                </div>
                <div>
                  <h4 className="font-editorial-condensed text-sm font-bold uppercase text-obsidian-950">
                    OPTICAL SCAN: Takeaway Pizza Box
                  </h4>
                  <p className="font-mono text-xs text-obsidian-900/60">
                    Clean lid separated into Blue Bin, greasy base composted.
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs text-obsidian-900/40">2 HOURS AGO</span>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cobalt text-white flex items-center justify-center font-bold font-mono text-xs">
                  +150
                </div>
                <div>
                  <h4 className="font-editorial-condensed text-sm font-bold uppercase text-obsidian-950">
                    BLUEPRINT PUBLISHED: Skateboard Deck Minimalist Sconce
                  </h4>
                  <p className="font-mono text-xs text-obsidian-900/60">
                    Diverted 1.6 kg 7-ply maple timber from incineration.
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs text-obsidian-900/40">YESTERDAY</span>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold font-mono text-xs">
                  +350
                </div>
                <div>
                  <h4 className="font-editorial-condensed text-sm font-bold uppercase text-obsidian-950">
                    PHYSICAL DROP-OFF: Apex Circular Metallurgy Vault
                  </h4>
                  <p className="font-mono text-xs text-obsidian-900/60">
                    Deposited 3.2 kg lithium cells and defunct smartphone motherboards.
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs text-obsidian-900/40">3 DAYS AGO</span>
            </div>

          </div>
        </section>

      </div>

      {/* ========================================================
          CUSTOMIZABLE AVATAR SELECTOR MODAL
         ======================================================== */}
      {avatarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl bg-canvas border-2 border-obsidian-950 shadow-2xl p-6 relative">
            
            <div className="flex items-center justify-between pb-3 border-b border-obsidian-900/10 mb-5">
              <div>
                <h3 className="font-editorial-condensed text-xl font-black uppercase text-obsidian-950">
                  SELECT RECLAIMER AVATAR
                </h3>
                <p className="font-mono text-xs text-obsidian-900/60 mt-0.5">
                  Pick from curated maker personas or input a custom photo URL.
                </p>
              </div>

              <button
                onClick={() => setAvatarModalOpen(false)}
                className="p-1 hover:text-lime"
              >
                ✕
              </button>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {AVATAR_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => selectAvatar(preset.url)}
                  className={`p-3 bg-white border-2 cursor-pointer transition-all text-center rounded-xs group ${
                    customAvatarUrl === preset.url
                      ? 'border-obsidian-950 bg-lime/20 shadow-brutal-sm'
                      : 'border-obsidian-900/15 hover:border-obsidian-950'
                  }`}
                >
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="w-16 h-16 rounded-full mx-auto object-cover border border-obsidian-950 mb-2 group-hover:scale-105 transition-transform"
                  />
                  <span className="font-mono text-[11px] font-bold text-obsidian-950 block">
                    {preset.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Custom URL Input */}
            <div className="space-y-2 pt-2 border-t border-obsidian-900/10">
              <label className="font-mono text-xs uppercase font-bold text-obsidian-950 block">
                Or Paste Image Web URL:
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={customAvatarUrl}
                  onChange={(e) => setCustomAvatarUrl(e.target.value)}
                  placeholder="https://..."
                  className="flex-1 px-3 py-2 bg-white border border-obsidian-900/20 font-mono text-xs focus:outline-none focus:border-obsidian-950"
                />
                <button
                  onClick={() => selectAvatar(customAvatarUrl)}
                  className="px-4 py-2 bg-lime text-obsidian-950 font-editorial-condensed font-black text-xs uppercase tracking-wider border border-obsidian-950"
                >
                  Apply
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
