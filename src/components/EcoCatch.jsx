import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Recycle, Sparkles, X, Volume2, VolumeX, ArrowDownRight, Target } from 'lucide-react';

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
  const [isDragging, setIsDragging] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const [binCenter, setBinCenter] = useState({ x: 0, y: 0 });
  const [soundEnabled, setSoundEnabled] = useState(true);

  const binRef = useRef(null);
  const animFrameRef = useRef(null);
  const isDraggingRef = useRef(false);
  const isSnappingRef = useRef(false);
  const startPointerRef = useRef({ x: 0, y: 0, time: 0 });

  // Update bin center coordinates
  const updateBinCenter = useCallback(() => {
    if (binRef.current) {
      const rect = binRef.current.getBoundingClientRect();
      setBinCenter({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    }
  }, []);

  useEffect(() => {
    updateBinCenter();
    window.addEventListener('resize', updateBinCenter);
    window.addEventListener('scroll', updateBinCenter, { passive: true });
    return () => {
      window.removeEventListener('resize', updateBinCenter);
      window.removeEventListener('scroll', updateBinCenter);
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [updateBinCenter]);

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

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.36);
    } catch (e) {
      // Audio policy
    }
  }, [soundEnabled]);

  // Recycle action
  const recycleItem = useCallback((item, clickX, clickY) => {
    try {
      const originX = clickX ? clickX / window.innerWidth : 0.88;
      const originY = clickY ? clickY / window.innerHeight : 0.88;
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { x: originX, y: originY },
        colors: ['#CCFF00', '#2563EB', '#0B0B0B', '#10B981'],
        disableForReducedMotion: true
      });
    } catch (e) {}

    playEcoChime();

    if (onReward) {
      onReward(10, item);
    }

    setCatchCount(prev => prev + 1);

    setToast({
      title: '+10 ECO-CREDITS',
      desc: `${item.name.toUpperCase()} DIVERTED!`,
      category: item.category,
      icon: item.icon
    });

    setFallingItem(null);
    setIsDragging(false);
    setIsSnapping(false);
    setIsHoveringBin(false);
    isDraggingRef.current = false;
    isSnappingRef.current = false;
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
  }, [onReward, playEcoChime]);

  // Gentle Spawning Timer (Initial spawn 10s, then every 28-40s)
  useEffect(() => {
    if (!isEnabled) {
      setFallingItem(null);
      return;
    }

    let timeoutId;
    const scheduleNextSpawn = (delay) => {
      timeoutId = setTimeout(() => {
        const randomItem = SCRAP_ITEMS[Math.floor(Math.random() * SCRAP_ITEMS.length)];
        const minX = Math.max(35, window.innerWidth * 0.12);
        const maxX = Math.min(window.innerWidth - 65, window.innerWidth * 0.88);
        const startX = Math.random() * (maxX - minX) + minX;

        setFallingItem({
          item: randomItem,
          x: startX,
          y: -60,
          startX: startX,
          createdAt: Date.now(),
          id: `scrap-${Date.now()}`
        });

        const nextDelay = Math.floor(Math.random() * 12000) + 28000;
        scheduleNextSpawn(nextDelay);
      }, delay);
    };

    scheduleNextSpawn(10000);
    return () => clearTimeout(timeoutId);
  }, [isEnabled]);

  // Physics animation loop for falling item
  useEffect(() => {
    if (!fallingItem || !isEnabled) return;

    let startTime = Date.now();
    const speed = 44; // pixels per second (~16-18s)

    const animate = () => {
      if (isDraggingRef.current || isSnappingRef.current) {
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = (Date.now() - startTime) / 1000;
      const newY = -60 + elapsed * speed;
      const sway = Math.sin(elapsed * 2.5) * 20;
      const newX = fallingItem.startX + sway;

      if (newY > window.innerHeight + 80) {
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

  // Magnetic Snap to Bin helper
  const triggerSnapToBin = useCallback((item) => {
    if (!binRef.current) return;
    const rect = binRef.current.getBoundingClientRect();
    const targetX = rect.left + rect.width / 2;
    const targetY = rect.top + rect.height / 2;

    isSnappingRef.current = true;
    setIsSnapping(true);
    setIsHoveringBin(true);

    setFallingItem(prev => (prev ? { ...prev, x: targetX, y: targetY } : null));

    setTimeout(() => {
      recycleItem(item, targetX, targetY);
    }, 220);
  }, [recycleItem]);

  // Extract coordinates from pointer or touch event
  const getEventCoords = (e) => {
    if (e.touches && e.touches.length > 0) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    if (e.changedTouches && e.changedTouches.length > 0) {
      return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  // Drag-and-drop pointer / touch handlers with body scroll lock
  const handlePointerDown = (e) => {
    e.stopPropagation();
    if (e.cancelable) e.preventDefault();

    // Lock page background scrolling on mobile while dragging trash
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    isDraggingRef.current = true;
    setIsDragging(true);

    const { x, y } = getEventCoords(e);
    startPointerRef.current = { x, y, time: Date.now() };
    updateBinCenter();

    const handlePointerMove = (moveEvent) => {
      if (!isDraggingRef.current || isSnappingRef.current) return;
      if (moveEvent.cancelable) moveEvent.preventDefault();

      const coords = getEventCoords(moveEvent);

      if (binRef.current) {
        const binRect = binRef.current.getBoundingClientRect();
        const bCenterX = binRect.left + binRect.width / 2;
        const bCenterY = binRect.top + binRect.height / 2;
        const dist = Math.hypot(coords.x - bCenterX, coords.y - bCenterY);

        // Hover proximity detection
        setIsHoveringBin(dist < 115);

        // Auto-snap when dragged directly into the bin vortex
        if (dist < 48 && fallingItem) {
          cleanup();
          triggerSnapToBin(fallingItem.item);
          return;
        }
      }

      setFallingItem(prev => (prev ? { ...prev, x: coords.x, y: coords.y } : null));
    };

    const handlePointerUp = (upEvent) => {
      cleanup();

      if (isSnappingRef.current) return;

      const coords = getEventCoords(upEvent);
      const deltaX = Math.abs(coords.x - startPointerRef.current.x);
      const deltaY = Math.abs(coords.y - startPointerRef.current.y);
      const elapsed = Date.now() - startPointerRef.current.time;

      const wasTap = (deltaX < 14 && deltaY < 14) || elapsed < 220;

      if (wasTap) {
        // Direct tap on falling item recycles immediately
        if (fallingItem) {
          recycleItem(fallingItem.item, coords.x, coords.y);
        }
      } else if (binRef.current) {
        const binRect = binRef.current.getBoundingClientRect();
        const bCenterX = binRect.left + binRect.width / 2;
        const bCenterY = binRect.top + binRect.height / 2;
        const dist = Math.hypot(coords.x - bCenterX, coords.y - bCenterY);

        if (dist < 125 && fallingItem) {
          triggerSnapToBin(fallingItem.item);
        } else {
          setIsDragging(false);
          isDraggingRef.current = false;
          setIsHoveringBin(false);
        }
      } else {
        setIsDragging(false);
        isDraggingRef.current = false;
        setIsHoveringBin(false);
      }
    };

    const handlePointerCancel = () => {
      cleanup();
      setIsDragging(false);
      isDraggingRef.current = false;
      setIsHoveringBin(false);
    };

    const cleanup = () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerCancel);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      window.removeEventListener('touchcancel', handlePointerCancel);
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: false });
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerCancel);
    window.addEventListener('touchmove', handlePointerMove, { passive: false });
    window.addEventListener('touchend', handlePointerUp);
    window.addEventListener('touchcancel', handlePointerCancel);
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
      {/* 1. Drag Directional Guide Line (SVG overlay when dragging) */}
      {isDragging && fallingItem && binCenter.x > 0 && (
        <svg className="fixed inset-0 pointer-events-none z-45 w-full h-full">
          <defs>
            <linearGradient id="ecoGuideGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#CCFF00" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.95" />
            </linearGradient>
            <filter id="glowLine">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Animated Connecting Guide Dashed Line */}
          <line
            x1={fallingItem.x}
            y1={fallingItem.y}
            x2={binCenter.x}
            y2={binCenter.y}
            stroke="url(#ecoGuideGrad)"
            strokeWidth="3"
            strokeDasharray="8 8"
            className="animate-dash-flow"
            strokeLinecap="round"
            filter="url(#glowLine)"
          />

          {/* Pulsing Target Ring at Bin Center */}
          <circle
            cx={binCenter.x}
            cy={binCenter.y}
            r="42"
            fill="none"
            stroke="#CCFF00"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            className="animate-spin"
            style={{ animationDuration: '4s' }}
            opacity="0.85"
          />
          <circle
            cx={binCenter.x}
            cy={binCenter.y}
            r="24"
            fill="#CCFF00"
            fillOpacity="0.15"
            stroke="#CCFF00"
            strokeWidth="1.5"
          />
        </svg>
      )}

      {/* 2. Falling Digital Scrap Element */}
      {fallingItem && (
        <div
          className={`fixed z-50 select-none cursor-grab active:cursor-grabbing transform -translate-x-1/2 -translate-y-1/2 touch-none ${
            isSnapping
              ? 'scale-0 rotate-180 opacity-20 duration-200 transition-all ease-in'
              : 'animate-fadeIn'
          }`}
          style={{
            left: `${fallingItem.x}px`,
            top: `${fallingItem.y}px`,
            transition: isDraggingRef.current && !isSnapping ? 'none' : isSnapping ? 'all 0.22s cubic-bezier(0.2, 0.9, 0.3, 1)' : 'transform 0.05s linear',
            touchAction: 'none'
          }}
          onPointerDown={handlePointerDown}
          onTouchStart={handlePointerDown}
          onClick={(e) => {
            e.stopPropagation();
            recycleItem(fallingItem.item, fallingItem.x, fallingItem.y);
          }}
          title="Click or drag to Smart Bin to recycle (+10 Eco-Credits)"
        >
          <div className="relative group flex items-center gap-1.5 sm:gap-2">
            {/* Scrap Badge & Icon */}
            <div className={`relative p-2 sm:p-2.5 md:p-3 bg-obsidian-950/95 text-white border-2 rounded-full transition-all flex items-center justify-center ${
              isHoveringBin
                ? 'border-emerald-400 scale-120 shadow-[0_0_25px_#10B981]'
                : isDragging
                ? 'border-lime scale-110 shadow-glow-lime'
                : 'border-lime shadow-glow-lime hover:scale-110 active:scale-95'
            }`}>
              <span className="text-xl sm:text-2xl md:text-3xl filter drop-shadow-md select-none">{fallingItem.item.icon}</span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-lime rounded-full animate-ping"></span>
            </div>

            {/* Drag Guidance Directional Pill */}
            {isDragging ? (
              <div className="bg-lime text-obsidian-950 border-2 border-obsidian-950 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-mono text-[9px] sm:text-[10px] uppercase font-black tracking-wider pointer-events-none shadow-brutal-sm flex items-center gap-1 sm:gap-1.5 animate-bounce whitespace-nowrap">
                <span className="hidden sm:inline">DRAG TO BIN</span>
                <span className="sm:hidden">DRAG ↘</span>
                <ArrowDownRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
              </div>
            ) : (
              <div className="bg-obsidian-950/90 text-lime border border-lime/40 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-xs font-mono text-[8px] sm:text-[9px] uppercase font-bold tracking-wider pointer-events-none shadow-brutal-sm hidden xs:flex sm:flex items-center gap-1 whitespace-nowrap">
                <span>{fallingItem.item.tag}</span>
                <span className="text-white ml-0.5 sm:ml-1 font-black">● +10</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. Docked Smart Recycle Bin Target (Responsive Mobile Drop Zone) */}
      <div
        ref={binRef}
        className={`fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40 select-none transition-all duration-300 animate-bounce-subtle ${
          isHoveringBin
            ? 'scale-110 -translate-y-1 sm:scale-120 sm:-translate-y-2'
            : isDragging
            ? 'scale-105 sm:scale-115 -translate-y-0.5 sm:-translate-y-1'
            : fallingItem
            ? 'scale-105'
            : 'scale-100'
        }`}
      >
        {/* Floating Directional Banner: "DROP HERE!" on mobile, "DROP HERE TO RECYCLE!" on desktop */}
        <div
          className={`absolute -top-7 sm:-top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-mono font-black uppercase tracking-wider transition-all duration-200 shadow-brutal flex items-center gap-1 sm:gap-1.5 border-2 ${
            isHoveringBin
              ? 'bg-emerald-400 text-obsidian-950 border-obsidian-950 scale-105 sm:scale-110 animate-pulse shadow-[0_0_20px_#10B981]'
              : isDragging
              ? 'bg-lime text-obsidian-950 border-obsidian-950 scale-105 animate-bounce shadow-glow-lime'
              : fallingItem
              ? 'bg-obsidian-950 text-lime border-lime animate-pulse-glow'
              : 'bg-obsidian-950 text-lime border-lime/80 shadow-glow-lime'
          }`}
        >
          <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isHoveringBin ? 'bg-obsidian-950 animate-ping' : 'bg-lime animate-ping'}`}></span>
          <span className="hidden sm:inline">{isHoveringBin ? 'RELEASE TO SNAP!' : 'DROP HERE TO RECYCLE!'}</span>
          <span className="sm:hidden">{isHoveringBin ? 'SNAP!' : 'DROP HERE!'}</span>
        </div>

        {/* Main Docked Bin Capsule */}
        <div
          className={`flex items-center gap-1.5 sm:gap-3 p-1.5 sm:px-3.5 sm:py-2.5 rounded-full border-2 transition-all shadow-brutal backdrop-blur-md ${
            isHoveringBin
              ? 'bg-lime text-obsidian-950 border-obsidian-950 ring-4 ring-lime/80 shadow-[0_0_40px_#CCFF00]'
              : isDragging
              ? 'bg-obsidian-950 text-white border-lime ring-4 ring-lime/40 shadow-[0_0_30px_rgba(204,255,0,0.6)] animate-pulse-glow'
              : 'bg-obsidian-950 text-white border-lime animate-pulse-glow'
          }`}
        >
          {/* Recycle Icon Badge */}
          <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border-2 transition-all shrink-0 ${
            isHoveringBin
              ? 'bg-obsidian-950 text-lime border-obsidian-950 scale-110'
              : 'bg-lime text-obsidian-950 border-lime'
          }`}>
            <Recycle
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5] ${
                isHoveringBin
                  ? 'animate-spin'
                  : isDragging || fallingItem
                  ? 'animate-spin'
                  : ''
              }`}
              style={{ animationDuration: isHoveringBin ? '1s' : '4s' }}
            />
          </div>

          {/* Details Label (Hidden on small mobile screens to keep bin compact & non-intrusive) */}
          <div className="hidden sm:flex flex-col pr-1 text-left">
            <span className="font-editorial-condensed text-xs font-black uppercase tracking-wider leading-none">
              {isHoveringBin ? 'MAGNETIC DUMP' : 'SMART RECYCLE BIN'}
            </span>
            <span className={`font-mono text-[9px] font-bold mt-1 ${isHoveringBin ? 'text-obsidian-950' : 'text-lime'}`}>
              {catchCount > 0 ? `★ ${catchCount} RECYCLED` : '+10 PTS ECO-CATCH'}
            </span>
          </div>

          {/* Sound Mute Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSoundEnabled(!soundEnabled);
            }}
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-obsidian-900 border border-white/20 hover:border-lime flex items-center justify-center text-white/70 hover:text-lime transition-colors shrink-0"
            title={soundEnabled ? "Mute Eco-Catch Sound" : "Enable Eco-Catch Sound"}
          >
            {soundEnabled ? <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-lime" /> : <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/40" />}
          </button>

          {/* Quiet Close / Disable Button */}
          {onToggle && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-obsidian-900 border border-white/20 hover:border-rose-500 hover:text-rose-400 flex items-center justify-center text-white/60 transition-colors shrink-0"
              title="Turn Off Eco-Catch Game"
            >
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 4. Sleek Cyber-Green Toast Notification */}
      {toast && (
        <div className="fixed top-20 sm:top-24 right-3 sm:right-5 z-50 animate-bounce max-w-[calc(100vw-24px)] sm:max-w-sm select-none">
          <div className="bg-obsidian-950 text-white border-2 border-lime shadow-brutal-lime p-2.5 sm:p-3.5 rounded-sm flex items-center gap-2.5 sm:gap-3">
            <div className="w-7 h-7 sm:w-9 sm:h-9 bg-lime text-obsidian-950 flex items-center justify-center rounded-xs text-base sm:text-xl shrink-0">
              {toast.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-editorial-condensed font-black text-[11px] sm:text-xs text-lime uppercase tracking-wider">
                  {toast.title}
                </span>
                <span className="font-mono text-[8px] sm:text-[9px] text-white/50 uppercase">VERIFIED</span>
              </div>
              <p className="font-mono text-[10px] sm:text-[11px] text-white font-bold truncate mt-0.5">
                {toast.desc}
              </p>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-white/40 hover:text-white p-1 shrink-0"
            >
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
