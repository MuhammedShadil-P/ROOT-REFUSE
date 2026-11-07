import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailing, setTrailing] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e) => {
      setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Trailing ring smoothing
  useEffect(() => {
    let animationFrame;
    const updateTrailing = () => {
      setTrailing((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.2,
        y: prev.y + (position.y - prev.y) * 0.2,
      }));
      animationFrame = requestAnimationFrame(updateTrailing);
    };
    animationFrame = requestAnimationFrame(updateTrailing);
    return () => cancelAnimationFrame(animationFrame);
  }, [position]);

  // Detect hovered interactive elements
  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Central small dot */}
      <div
        className="fixed w-2 h-2 bg-lime rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovered ? 2 : 1})`,
        }}
      />
      {/* Outer trailing ring */}
      <div
        className={`fixed rounded-full -translate-x-1/2 -translate-y-1/2 border transition-all duration-300 pointer-events-none ${
          isHovered
            ? 'w-10 h-10 border-lime bg-lime/10 scale-110'
            : 'w-6 h-6 border-obsidian-950/40'
        }`}
        style={{
          left: `${trailing.x}px`,
          top: `${trailing.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
}
