import React, { useEffect, useRef } from 'react';

export default function InteractiveParticleBackground({ theme = 'light' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse coordinates
    const mouse = {
      x: null,
      y: null,
      radius: 130
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Particle nodes definition
    const particleCount = Math.min(50, Math.floor((width * height) / 22000));
    const particles = [];

    const isDark = theme === 'dark';
    const primaryColor = isDark ? '204, 255, 0' : '40, 60, 20';
    const nodeColor = isDark ? '#CCFF00' : '#222222';

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1.2,
        alpha: Math.random() * 0.35 + 0.15,
        pulse: Math.random() * Math.PI
      });
    }

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;

        // Wrap edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse interaction (gentle repelling & laser thread)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            // Repel slightly
            const force = (mouse.radius - distance) / mouse.radius;
            p.x -= (dx / distance) * force * 1.5;
            p.y -= (dy / distance) * force * 1.5;

            // Draw laser thread to mouse
            const lineAlpha = (1 - distance / mouse.radius) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(204, 255, 0, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw particle dot
        const currentRadius = p.radius + Math.sin(p.pulse) * 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.8, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(204, 255, 0, ${p.alpha})`
          : `rgba(11, 11, 11, ${p.alpha * 0.5})`;
        ctx.fill();

        // Connect nearby particles with subtle grid web
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          const maxDist = 95;

          if (dist < maxDist) {
            const edgeAlpha = (1 - dist / maxDist) * (isDark ? 0.2 : 0.08);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${primaryColor}, ${edgeAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      style={{ willChange: 'transform' }}
    />
  );
}
