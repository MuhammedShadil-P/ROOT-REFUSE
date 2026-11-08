import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, ThumbsUp, Send, Check, ShieldCheck, Flame, MessageSquare, ArrowUpRight } from 'lucide-react';

const INITIAL_ACTIVITIES = [
  {
    id: 'act-01',
    user: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    role: 'Compost Cadet',
    action: 'Diverted 3.4 kg PET bottles into micro-filament spools',
    type: 'scan',
    typeLabel: 'OPTICAL SORT',
    badge: '+50 PTS',
    time: '2m ago',
    kudos: 14,
    district: 'Sector 04 // West MRF'
  },
  {
    id: 'act-02',
    user: 'Devon Miller',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    role: 'Upcycle Wizard',
    action: 'Published CAD blueprint: "HDPE Acoustic Wall Sconce"',
    type: 'diy',
    typeLabel: 'DIY BLUEPRINT',
    badge: '+150 PTS',
    time: '6m ago',
    kudos: 29,
    district: 'Maker Lab 02'
  },
  {
    id: 'act-03',
    user: 'Aisha Patel',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    role: 'Terra Guardian',
    action: 'Reported Civic Hazard: Overflowing e-waste depot on 5th Ave',
    type: 'report',
    typeLabel: 'CIVIC ALERT',
    badge: '+75 PTS',
    time: '12m ago',
    kudos: 38,
    district: 'Downtown Core'
  },
  {
    id: 'act-04',
    user: 'Marco Rossi',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    role: 'Seedling Scout',
    action: 'Separated greasy pizza box lid from compostable cellulose base',
    type: 'scan',
    typeLabel: 'OPTICAL SORT',
    badge: '+50 PTS',
    time: '18m ago',
    kudos: 8,
    district: 'Sector 07 // North'
  },
  {
    id: 'act-05',
    user: 'Elena Vance',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    role: 'Upcycle Wizard',
    action: 'Upcycled 4 deadstock denim jackets into sound-dampening panels',
    type: 'diy',
    typeLabel: 'DIY BLUEPRINT',
    badge: '+150 PTS',
    time: '24m ago',
    kudos: 42,
    district: 'Textile Hub 01'
  }
];

const POOL_ACTIVITIES = [
  {
    user: 'Liam Thorne',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    role: 'Circular Architect',
    action: 'Scanned 12v Lithium battery array for R2 metallurgy vault extraction',
    type: 'scan',
    typeLabel: 'OPTICAL SORT',
    badge: '+50 PTS',
    district: 'E-Waste Corridor'
  },
  {
    user: 'Maya Lin',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    role: 'Compost Cadet',
    action: 'Added community drop-off point: "Green Thumb Bio-Tumbler #09"',
    type: 'report',
    typeLabel: 'FACILITY ADD',
    badge: '+100 PTS',
    district: 'Urban Farm Sector'
  },
  {
    user: 'Kenji Sato',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    role: 'Terra Guardian',
    action: 'Melted 48 HDPE milk jug lids into marbled skate deck core',
    type: 'diy',
    typeLabel: 'DIY BLUEPRINT',
    badge: '+150 PTS',
    district: 'Community Workshop'
  }
];

export default function CommunityActivityFeed({ onRewardPoints }) {
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [filter, setFilter] = useState('all');
  const [kudosState, setKudosState] = useState({});
  const [kudosFeedbackToast, setKudosFeedbackToast] = useState(null);

  // Periodic simulated live community activity influx
  useEffect(() => {
    let poolIndex = 0;
    const interval = setInterval(() => {
      const nextAct = POOL_ACTIVITIES[poolIndex % POOL_ACTIVITIES.length];
      poolIndex++;

      const newEntry = {
        ...nextAct,
        id: `act-${Date.now()}`,
        time: 'Just now',
        kudos: Math.floor(Math.random() * 6) + 1,
        isNew: true
      };

      setActivities(prev => [newEntry, ...prev.slice(0, 11)]);
    }, 14000);

    return () => clearInterval(interval);
  }, []);

  const handleSendKudos = (e, act) => {
    e.stopPropagation();
    const current = kudosState[act.id] || { count: act.kudos, sent: false };

    if (current.sent) return; // Already sent kudos

    // Confetti pop
    try {
      const rect = e.currentTarget.getBoundingClientRect();
      confetti({
        particleCount: 22,
        spread: 45,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight
        },
        colors: ['#CCFF00', '#2563EB', '#0B0B0B'],
        disableForReducedMotion: true
      });
    } catch (err) {}

    // Update state
    setKudosState(prev => ({
      ...prev,
      [act.id]: {
        count: current.count + 1,
        sent: true
      }
    }));

    // Reward points for communal engagement
    if (onRewardPoints) {
      onRewardPoints(2);
    }

    // Toast feedback
    setKudosFeedbackToast(`👏 Kudos delivered to ${act.user}! (+2 Eco-Credits)`);
    setTimeout(() => setKudosFeedbackToast(null), 3000);
  };

  const filteredActivities = activities.filter(act => {
    if (filter === 'all') return true;
    return act.type === filter;
  });

  return (
    <div className="bg-white border-2 border-obsidian-950 shadow-brutal p-5 sm:p-7 rounded-sm space-y-6">
      
      {/* Header with Live Pulsing Telemetry */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-obsidian-950 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-lime animate-ping"></div>
          <div>
            <h3 className="font-editorial-condensed text-xl sm:text-2xl font-black uppercase text-obsidian-950 tracking-tight leading-none">
              LIVE CIVIC ACTIVITY FEED
            </h3>
            <span className="font-mono text-[10px] text-obsidian-900/60 uppercase">
              Global Decentralized Recovery Ledger • Real-Time Stream
            </span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono text-[11px] whitespace-nowrap">
          {[
            { id: 'all', label: 'ALL ACTIONS' },
            { id: 'scan', label: 'OPTICAL SCANS' },
            { id: 'diy', label: 'BLUEPRINTS' },
            { id: 'report', label: 'CIVIC ALERTS' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-2.5 py-1 uppercase font-bold rounded-xs transition-colors ${
                filter === tab.id
                  ? 'bg-obsidian-950 text-lime'
                  : 'bg-canvas-200 text-obsidian-900/70 hover:bg-canvas-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Kudos Feedback Banner */}
      {kudosFeedbackToast && (
        <div className="bg-lime text-obsidian-950 px-3.5 py-2 border border-obsidian-950 rounded-xs font-mono text-xs font-bold animate-fadeIn flex items-center justify-between">
          <span>{kudosFeedbackToast}</span>
          <span className="font-black">★ +2 PTS</span>
        </div>
      )}

      {/* Activity List Stream */}
      <div className="divide-y divide-obsidian-900/10 max-h-[460px] overflow-y-auto pr-1 space-y-1">
        {filteredActivities.map(act => {
          const currentKudos = kudosState[act.id] || { count: act.kudos, sent: false };

          return (
            <div
              key={act.id}
              className={`pt-3 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-canvas-50 p-2.5 rounded-xs transition-colors ${
                act.isNew ? 'animate-fadeIn bg-lime/10' : ''
              }`}
            >
              {/* User Identity & Description */}
              <div className="flex items-start gap-3 min-w-0">
                <div className="relative shrink-0">
                  <img
                    src={act.avatar}
                    alt={act.user}
                    className="w-10 h-10 rounded-full object-cover border-2 border-obsidian-950"
                  />
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-lime rounded-full border border-obsidian-950 flex items-center justify-center text-[8px] font-black font-mono">
                    ✦
                  </span>
                </div>

                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <strong className="font-editorial-condensed text-sm uppercase text-obsidian-950 tracking-tight">
                      {act.user}
                    </strong>
                    <span className="font-mono text-[9px] text-cobalt font-bold bg-cobalt/10 px-1.5 py-0.2 rounded-xs uppercase">
                      {act.role}
                    </span>
                    <span className="font-mono text-[9px] text-obsidian-900/50">
                      {act.time}
                    </span>
                  </div>

                  <p className="font-sans text-xs text-obsidian-900/80 leading-snug">
                    {act.action}
                  </p>

                  <div className="flex items-center gap-2 font-mono text-[10px] text-obsidian-900/60 pt-0.5">
                    <span className="text-lime-dark font-bold">{act.typeLabel}</span>
                    <span>•</span>
                    <span>{act.district}</span>
                  </div>
                </div>
              </div>

              {/* Reward Badge & Interactive Send Kudos Button */}
              <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
                <span className="font-mono text-[10px] bg-canvas-200 border border-obsidian-900/10 text-obsidian-950 px-2 py-0.5 rounded-xs font-black">
                  {act.badge}
                </span>

                <button
                  onClick={(e) => handleSendKudos(e, act)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs font-black uppercase tracking-wider border transition-all ${
                    currentKudos.sent
                      ? 'bg-lime text-obsidian-950 border-obsidian-950 shadow-sm cursor-default'
                      : 'bg-white hover:bg-canvas-100 text-obsidian-950 border-obsidian-950 hover:border-lime shadow-brutal-sm hover:translate-x-0.5 hover:-translate-y-0.5'
                  }`}
                  title="Deliver community kudos (+2 Eco-Credits)"
                >
                  <span className="text-sm">{currentKudos.sent ? '✓' : '👏'}</span>
                  <span>{currentKudos.sent ? 'KUDOS SENT' : 'KUDOS'}</span>
                  <span className="px-1.5 py-0.2 bg-obsidian-950 text-white rounded-full text-[10px]">
                    {currentKudos.count}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer status summary */}
      <div className="bg-canvas-100 p-3 border border-obsidian-900/10 rounded-xs flex flex-col sm:flex-row items-center justify-between font-mono text-[11px] text-obsidian-900/60 gap-2">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>LEDGER CONNECTED: 1,420 VERIFIED DIVERSIONS TODAY</span>
        </span>
        <span className="text-obsidian-950 font-bold">
          INTERACTIVE KUDOS ENABLES +2 CIVIC CREDITS
        </span>
      </div>

    </div>
  );
}
