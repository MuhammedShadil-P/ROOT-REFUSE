import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Recycle, Sparkles, X, Check, Volume2, VolumeX, Award } from 'lucide-react';

const SCRAP_ITEMS = [
  { id: 'bottle', name: 'PET Water Bottle', icon: '🧴', category: 'Recyclable Plastic', color: '#2563EB', tag: 'PLASTIC #1' },
  { id: 'can', name: 'Aluminum Soda Can', icon: '🥫', category: 'Precious Metal', color: '#CCFF00', tag: 'CAN RECYCLING' },
  { id: 'peel', name: 'Organic Banana Peel', icon: '🍌', category: 'Bio-Compost', color: '#EAB308', tag: 'COMPOST' },
  { id: 'battery', name: 'Lithium Battery Cell', icon: '🔋', category: 'E-Waste Depo', color: '#EF4444', tag: 'HAZMAT E-WASTE' },
  { id: 'cup', name: 'Takeaway Coffee Cup', icon: '☕', category: 'Composite Fiber', color: '#8B5CF6', tag: 'FIBER RECYCLE' },
  { id: 'box', name: 'Cardboard Shipping Box', icon: '📦', category: 'Cellulose Cardboard', color: '#F97316', tag: 'CELLULOSE' },
];

export default function EcoCatch({ onReward, isEnabled, onToggle }) {
  const [fallingItem, setFallingItem] = useState(null);
  const [toast, setToast] = useState(null);
  const [catchCount, setCatchCount] = useState(0);
  const [isHoveringBin, setIsHoveringBin] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const binRef = useRef(null);
  const animFrameRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragPosRef = useRef({ x: 0, y: 0 });
  const startPointerRef = useRef({ x: 0, y: 0 });

  // Web Audio synthetic cyber chime
  const playEcoChime = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';

      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.1); // A5
      osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.22); // D6

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.33);
    } catch (e) {
      // AudioContext blocked by browser policy until gesture
    }
  }, [soundEnabled]);

  // Recycle action
  const recycleItem = useCallback((item, clickX, clickY) => {
    // 1. Particle Confetti burst
    try {
      const originX = clickX ? clickX / window.innerWidth : 0.85;
      const originY = clickY ? clickY / window.innerHeight : 0.85;
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { x: originX, y: originY },
        colors: ['#CCFF00', '#2563EB', '#0B0B0B'],
        disableForReducedMotion: true
      });
    } catch (e) {}

    // 2. Play Audio
    playEcoChime();

    // 3. Trigger Reward
    if (onReward) {
      onReward(10, item);
    }

    // 4. Update count
    setCatchCount(prev => prev + 1);

    // 5. Show toast
    setToast({
      title: '+10 ECO-CREDITS',
      desc: `${item.name.toUpperCase()} DIVERTED!`,
      category: item.category,
      icon: item.icon
    });

    // 6. Clear falling item
    setFallingItem(null);
    isDraggingRef.current = false;
  }, [onReward, playEcoChime]);

  // Spawning timer
  useEffect(() => {
    if (!isEnabled) {
      setFallingItem(null);
      return;
    }

    // Initial spawn after 10 seconds, then every 28-38 seconds
    let timeoutId;
    const scheduleNextSpawn = (delay) => {
      timeoutId = setTimeout(() => {
        // Pick random item
        const randomItem = SCRAP_ITEMS[Math.floor(Math.random() * SCRAP_ITEMS.length)];
        const minX = Math.max(40, window.innerWidth * 0.15);
        const maxX = Math.min(window.innerWidth - 80, window.innerWidth * 0.85);
        const startX = Math.random() * (maxX - minX) + minX;

        setFallingItem({
          item: randomItem,
          x: startX,
          y: -60,
          startX: startX,
          createdAt: Date.now(),
          id: `scrap-${Date.now()}`
        });

        // Schedule next after 28 - 40 seconds
        const nextDelay = Math.floor(Math.random() * 12000) + 28000;
        scheduleNextSpawn(nextDelay);
      }, delay);
    };

    scheduleNextSpawn(10000);

    return () => clearTimeout(timeoutId);
  }, [isEnabled]);

  // Animation Loop for falling item
  useEffect(() => {
    if (!fallingItem || !isEnabled) return;

    let startTime = Date.now();
    const speed = 45; // pixels per second (~16-20 seconds to reach bottom)

    const animate = () => {
      if (isDraggingRef.current) {
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = (Date.now() - startTime) / 1000;
      const newY = -60 + elapsed * speed;
      const sway = Math.sin(elapsed * 2.5) * 22; // gentle horizontal sway
      const newX = fallingItem.startX + sway;

      if (newY > window.innerHeight + 80) {
        // Missed, reset
        setFallingItem(null);
      } else {
        setFallingItem(prev => (prev ? { ...prev, x: newX, y: newY } : null));
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [fallingItem?.id, isEnabled]);

  // Pointer drag events
  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    isDraggingRef.current = true;
    startPointerRef.current = { x: e.clientX, y: e.clientY };
    dragPosRef.current = { x: e.clientX, y: e.clientY };

    const handlePointerMove = (moveEvent) => {
      if (!isDraggingRef.current) return;
      dragPosRef.current = { x: moveEvent.clientX, y: moveEvent.clientY };

      // Check proximity to bin
      if (binRef.current) {
        const binRect = binRef.current.getBoundingClientRect();
        const dist = Math.hypot(
          moveEvent.clientX - (binRect.left + binRect.width / 2),
          moveEvent.clientY - (binRect.top + binRect.height / 2)
        );
        setIsHoveringBin(dist < 90);
      }

      setFallingItem(prev => (prev ? { ...prev, x: moveEvent.clientX, y: moveEvent.clientY } : null));
    };

    const handlePointerUp = (upEvent) => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);

      const deltaX = Math.abs(upEvent.clientX - startPointerRef.current.x);
      const deltaY = Math.abs(upEvent.clientY - startPointerRef.current.y);
      const wasClick = deltaX < 8 && deltaY < 8;

      if (wasClick) {
        // Direct click/tap
        if (fallingItem) {
          recycleItem(fallingItem.item, upEvent.clientX, upEvent.clientY);
        }
      } else if (binRef.current) {
        // Dropped on bin
        const binRect = binRef.current.getBoundingClientRect();
        const dist = Math.hypot(
          upEvent.clientX - (binRect.left + binRect.width / 2),
          upEvent.clientY - (binRect.top + binRect.height / 2)
        );

        if (dist < 110 && fallingItem) {
          recycleItem(fallingItem.item, binRect.left + binRect.width / 2, binRect.top + binRect.height / 2);
        }
      }

      isDraggingRef.current = false;
      setIsHoveringBin(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  // Toast timer auto-dismiss
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3800);
    return () => clearTimeout(timer);
  }, [toast]);

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      {/* 1. Falling Digital Scrap Element (Non-Intrusive, pointer-events-none container) */}
      {fallingItem && (
        <div
          className="fixed z-50 select-none cursor-grab active:cursor-grabbing transform -translate-x-1/2 -translate-y-1/2 touch-none animate-fadeIn"
          style={{
            left: `${fallingItem.x}px`,
            top: `${fallingItem.y}px`,
            transition: isDraggingRef.current ? 'none' : 'transform 0.05s linear'
          }}
          onPointerDown={handlePointerDown}
          onClick={(e) => {
            e.stopPropagation();
            recycleItem(fallingItem.item, fallingItem.x, fallingItem.y);
          }}
          title="Click or drag to Smart Bin to recycle (+10 Eco-Credits)"
        >
          <div className="relative group flex items-center gap-2">
            {/* Scrap Badge & Icon */}
            <div className="relative p-2 sm:p-2.5 bg-obsidian-950/95 text-white border-2 border-lime rounded-full shadow-glow-lime hover:scale-110 active:scale-95 transition-transform flex items-center justify-center">
              <span className="text-2xl sm:text-3xl filter drop-shadow-md">{fallingItem.item.icon}</span>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-lime rounded-full animate-ping"></span>
            </div>

            {/* Subtle Tag Pill */}
            <div className="bg-obsidian-950/90 text-lime border border-lime/40 px-2 py-0.5 rounded-xs font-mono text-[9px] uppercase font-bold tracking-wider pointer-events-none shadow-brutal-sm hidden sm:block whitespace-nowrap">
              <span>{fallingItem.item.tag}</span>
              <span className="text-white ml-1">● +10 PTS</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Docked Smart Recycle Bin Target (Bottom-Right) */}
      <div
        ref={binRef}
        className={`fixed bottom-5 right-5 z-40 select-none transition-all duration-300 ${
          isHoveringBin
            ? 'scale-110 -translate-y-1'
            : fallingItem
            ? 'animate-pulse scale-105'
            : 'scale-100'
        }`}
      >
        <div
          className={`flex items-center gap-2.5 px-3 py-2 rounded-full border-2 transition-all shadow-brutal backdrop-blur-md ${
            isHoveringBin
              ? 'bg-lime text-obsidian-950 border-obsidian-950 shadow-glow-lime'
              : 'bg-obsidian-950 text-white border-lime'
          }`}
        >
          {/* Recycle Icon with rotation on active */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
            isHoveringBin
              ? 'bg-obsidian-950 text-lime border-obsidian-950'
              : 'bg-lime text-obsidian-950 border-lime'
          }`}>
            <Recycle className={`w-4 h-4 ${fallingItem ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </div>

          {/* Details Label */}
          <div className="flex flex-col pr-1 text-left">
            <span className="font-editorial-condensed text-[11px] font-black uppercase tracking-wider leading-none">
              {isHoveringBin ? 'DROP HERE!' : 'SMART RECYCLE BIN'}
            </span>
            <span className="font-mono text-[9px] text-lime font-bold mt-0.5">
              {catchCount > 0 ? `★ ${catchCount} RECYCLED` : '+10 PTS ECO-CATCH'}
            </span>
          </div>

          {/* Sound Mute Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSoundEnabled(!soundEnabled);
            }}
            className="w-6 h-6 rounded-full bg-obsidian-900 border border-white/20 hover:border-lime flex items-center justify-center text-white/70 hover:text-lime transition-colors"
            title={soundEnabled ? "Mute Eco-Catch Sound" : "Enable Eco-Catch Sound"}
          >
            {soundEnabled ? <Volume2 className="w-3 h-3 text-lime" /> : <VolumeX className="w-3 h-3 text-white/40" />}
          </button>

          {/* Quiet Close / Disable Button */}
          {onToggle && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className="w-6 h-6 rounded-full bg-obsidian-900 border border-white/20 hover:border-rose-500 hover:text-rose-400 flex items-center justify-center text-white/60 transition-colors"
              title="Turn Off Eco-Catch Game"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* 3. Sleek Cyber-Green Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-5 z-50 animate-bounce max-w-sm select-none">
          <div className="bg-obsidian-950 text-white border-2 border-lime shadow-brutal-lime p-3.5 rounded-sm flex items-center gap-3">
            <div className="w-9 h-9 bg-lime text-obsidian-950 flex items-center justify-center rounded-xs text-xl shrink-0">
              {toast.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-editorial-condensed font-black text-xs text-lime uppercase tracking-wider">
                  {toast.title}
                </span>
                <span className="font-mono text-[9px] text-white/50 uppercase">VERIFIED</span>
              </div>
              <p className="font-mono text-[11px] text-white font-bold truncate mt-0.5">
                {toast.desc}
              </p>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-white/40 hover:text-white p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
