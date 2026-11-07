import React from 'react';
import { Award, Lock, CheckCircle2, Sparkles, Shield, Zap, Flame, Compass } from 'lucide-react';

export const BADGES_DATA = [
  {
    id: 'seedling-scout',
    name: 'Seedling Scout',
    tier: 'Tier 01 // Novice',
    requiredCredits: 0,
    icon: Compass,
    color: 'bg-emerald-500/20 text-emerald-500 border-emerald-500',
    accentColor: '#10B981',
    description: 'First steps in municipal waste segregation & initial material scanning.',
    perks: ['Access to basic AI scanning', 'Community forum read access'],
    unlockedAt: 'UNLOCKED AT REGISTRATION'
  },
  {
    id: 'compost-cadet',
    name: 'Compost Cadet',
    tier: 'Tier 02 // Apprentice',
    requiredCredits: 250,
    icon: Flame,
    color: 'bg-lime/20 text-obsidian-950 border-lime-dark',
    accentColor: '#CCFF00',
    description: 'Mastery over organic bio-digestion and zero-food-waste home diversion.',
    perks: ['Priority intake at compost hubs', 'Bokashi fermenter blueprints unlocked'],
    unlockedAt: 'UNLOCKED AT 250 PTS'
  },
  {
    id: 'upcycle-wizard',
    name: 'Upcycle Wizard',
    tier: 'Tier 03 // Artisan',
    requiredCredits: 750,
    icon: Sparkles,
    color: 'bg-cobalt/20 text-cobalt border-cobalt',
    accentColor: '#2563EB',
    description: 'Fabrication of physical furniture, lighting, and textiles from scrap streams.',
    perks: ['Publish DIY blueprints to directory', 'Custom profile badge & verified tick'],
    unlockedAt: 'UNLOCKED AT 750 PTS'
  },
  {
    id: 'terra-guardian',
    name: 'Terra Guardian',
    tier: 'Tier 04 // Master Architect',
    requiredCredits: 1500,
    icon: Shield,
    color: 'bg-purple-500/20 text-purple-400 border-purple-500',
    accentColor: '#A855F7',
    description: 'Supreme ecological stewardship, certified metallurgy salvage, and civic leadership.',
    perks: ['Municipal drop-off validator status', 'VIP invite to annual Circular Gala'],
    unlockedAt: 'UNLOCKED AT 1,500 PTS'
  }
];

export default function BadgeProgression({ credits, onAddCredits, onResetCredits }) {
  // Determine current active tier
  const currentBadgeIndex = BADGES_DATA.reduce((acc, badge, idx) => {
    return credits >= badge.requiredCredits ? idx : acc;
  }, 0);

  const currentBadge = BADGES_DATA[currentBadgeIndex];
  const nextBadge = BADGES_DATA[currentBadgeIndex + 1];

  const nextTierProgress = nextBadge
    ? Math.min(
        100,
        Math.max(
          0,
          ((credits - currentBadge.requiredCredits) /
            (nextBadge.requiredCredits - currentBadge.requiredCredits)) *
            100
        )
      )
    : 100;

  return (
    <div className="space-y-6">
      
      {/* Tier Overview Banner */}
      <div className="bg-obsidian-950 text-white p-6 sm:p-8 rounded-sm border-2 border-obsidian-950 shadow-brutal space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <span className="font-mono text-xs uppercase text-lime font-bold tracking-widest block">
              // CURRENT ECOLOGICAL RANK
            </span>
            <h3 className="font-editorial-condensed text-3xl sm:text-4xl font-black uppercase text-white mt-0.5 tracking-tight">
              {currentBadge.name} <span className="text-lime">✦</span>
            </h3>
            <span className="font-mono text-xs text-white/60">
              STATUS: {currentBadge.tier}
            </span>
          </div>

          <div className="bg-obsidian-900 px-5 py-3 border border-white/10 rounded-xs font-mono text-right">
            <span className="text-white/50 text-[10px] uppercase block font-bold">TOTAL ACCUMULATED SCORE</span>
            <div className="font-editorial-condensed text-3xl font-black text-lime">
              {credits.toLocaleString()} <span className="text-sm font-mono text-white">ECO-PTS</span>
            </div>
          </div>
        </div>

        {/* Progress bar to next rank */}
        {nextBadge ? (
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-white/70">
                PROGRESS TOWARDS <strong className="text-white">{nextBadge.name.toUpperCase()}</strong>:
              </span>
              <span className="text-lime font-bold">
                {credits} / {nextBadge.requiredCredits} PTS ({nextTierProgress.toFixed(0)}%)
              </span>
            </div>

            <div className="w-full bg-obsidian-800 h-3 rounded-full overflow-hidden border border-white/10 p-0.5">
              <div 
                className="bg-lime h-full rounded-full transition-all duration-500 shadow-glow-lime"
                style={{ width: `${nextTierProgress}%` }}
              ></div>
            </div>

            <div className="font-mono text-[11px] text-white/50 text-right">
              {nextBadge.requiredCredits - credits} PTS NEEDED TO UNLOCK NEXT TIER
            </div>
          </div>
        ) : (
          <div className="p-3 bg-lime/20 border border-lime text-lime font-mono text-xs font-bold rounded-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>PINNACLE RANK ACHIEVED: TERRA GUARDIAN ACTIVE!</span>
          </div>
        )}

        {/* Gamification Action Simulator (Easy Testing) */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-[11px] text-white/60 uppercase font-bold">
            TEST GAMIFICATION ACTIONS:
          </span>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onAddCredits(50)}
              className="px-3 py-1.5 bg-obsidian-800 hover:bg-lime hover:text-obsidian-950 text-white font-mono text-xs uppercase font-bold border border-white/20 rounded-xs transition-colors"
            >
              +50 PTS (SCAN ITEM)
            </button>
            <button
              onClick={() => onAddCredits(150)}
              className="px-3 py-1.5 bg-obsidian-800 hover:bg-lime hover:text-obsidian-950 text-white font-mono text-xs uppercase font-bold border border-white/20 rounded-xs transition-colors"
            >
              +150 PTS (BUILD DIY)
            </button>
            <button
              onClick={() => onAddCredits(350)}
              className="px-3 py-1.5 bg-cobalt hover:bg-blue-600 text-white font-mono text-xs uppercase font-bold border border-cobalt rounded-xs transition-colors"
            >
              +350 PTS (DROP-OFF)
            </button>
            <button
              onClick={onResetCredits}
              className="px-2.5 py-1.5 bg-white/5 hover:bg-rose-500 text-white/70 hover:text-white font-mono text-[10px] uppercase rounded-xs transition-colors"
              title="Reset score to default"
            >
              RESET
            </button>
          </div>
        </div>

      </div>

      {/* Grid of All 4 Badges with Unlocked/Locked States */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {BADGES_DATA.map((badge, idx) => {
          const isUnlocked = credits >= badge.requiredCredits;
          const Icon = badge.icon;

          return (
            <div
              key={badge.id}
              className={`p-6 border-2 transition-all rounded-xs flex flex-col justify-between relative overflow-hidden group ${
                isUnlocked
                  ? 'bg-white border-obsidian-950 shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1'
                  : 'bg-canvas-200/80 border-obsidian-900/15 opacity-75'
              }`}
            >
              {/* Corner Status Badge */}
              <div className="flex items-center justify-between pb-3 border-b border-obsidian-900/10">
                <span className="font-mono text-[10px] uppercase font-bold text-obsidian-900/60">
                  BADGE // 0{idx + 1}
                </span>

                {isUnlocked ? (
                  <span className="flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                    <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                    <span>UNLOCKED</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 font-mono text-[10px] font-bold text-obsidian-900/50 bg-obsidian-900/10 px-2 py-0.5 rounded">
                    <Lock className="w-3 h-3" />
                    <span>{badge.requiredCredits} PTS</span>
                  </span>
                )}
              </div>

              {/* Badge Icon & Graphic */}
              <div className="my-6 flex flex-col items-center text-center space-y-3">
                <div 
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm ${
                    isUnlocked
                      ? badge.color
                      : 'bg-obsidian-900/10 text-obsidian-900/30 border border-obsidian-900/20'
                  }`}
                >
                  <Icon className="w-8 h-8 stroke-[2.2]" />
                </div>

                <div>
                  <h4 className={`font-editorial-condensed text-xl uppercase font-black tracking-tight ${
                    isUnlocked ? 'text-obsidian-950' : 'text-obsidian-900/60'
                  }`}>
                    {badge.name}
                  </h4>
                  <span className="font-mono text-[11px] text-obsidian-900/60 block mt-0.5">
                    {badge.tier}
                  </span>
                </div>

                <p className="font-sans text-xs text-obsidian-900/70 leading-relaxed px-1">
                  {badge.description}
                </p>
              </div>

              {/* Perks List */}
              <div className="pt-3 border-t border-obsidian-900/10 space-y-1 font-mono text-[10px] text-obsidian-900/80">
                <strong className="block text-obsidian-950 uppercase mb-1">UNLOCKED PRIVILEGES:</strong>
                {badge.perks.map((perk, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-1.5">
                    <span className={isUnlocked ? 'text-lime-dark font-bold' : 'text-obsidian-900/40'}>✦</span>
                    <span className={isUnlocked ? '' : 'text-obsidian-900/50'}>{perk}</span>
                  </div>
                ))}
              </div>

              {/* Bottom unlocked badge indicator */}
              <div className={`mt-4 pt-2 border-t font-mono text-[10px] text-center font-bold uppercase ${
                isUnlocked ? 'text-cobalt border-cobalt/20' : 'text-obsidian-900/40 border-obsidian-900/10'
              }`}>
                {isUnlocked ? badge.unlockedAt : `LOCKED (NEEDS ${badge.requiredCredits - credits} MORE PTS)`}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
