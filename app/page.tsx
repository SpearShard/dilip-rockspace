'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const perspectives = [
  {
    id: 'sketchbook',
    title: 'Sketchbook',
    num: '01',
    tag: 'Current',
    desc: 'The original — hand-drawn aesthetic, sticky notes, polaroids, paper textures. A living sketchbook of the studio.',
    color: '#D96C4A',
    accent: 'rgba(217,108,74,0.15)',
    href: '/sketchbook',
  },
  {
    id: 'brutalist',
    title: 'Brutalist',
    num: '02',
    tag: 'New',
    desc: 'Dark, terminal-inspired agency site. WebGL particles, glitch typography, hacker energy. Frontend craft at its rawest.',
    color: '#00FF88',
    accent: 'rgba(0,255,136,0.12)',
    href: '/brutalist',
  },
  {
    id: 'designer',
    title: 'Design Lead',
    num: '03',
    tag: 'Coming soon',
    desc: 'The lead designer\'s vision — yet to be revealed. A different lens on the same story.',
    color: '#7C3AED',
    accent: 'rgba(124,58,237,0.12)',
    href: '/designer',
    muted: true,
  },
];

export default function Landing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dots: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = [];
    const COUNT = 60;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < COUNT; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1.2 + 0.3,
        o: Math.random() * 0.3 + 0.1,
      });
    }

    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const onMouse = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener('mousemove', onMouse);

    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < COUNT; i++) {
        const d = dots[i];
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${d.o})`;
        ctx.fill();

        for (let j = i + 1; j < COUNT; j++) {
          const d2 = dots[j];
          const dx = d.x - d2.x;
          const dy = d.y - d2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(d2.x, d2.y);
            ctx.strokeStyle = `rgba(255,255,255,${0.04 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        const dxm = d.x - mouse.x;
        const dym = d.y - mouse.y;
        const dm = Math.sqrt(dxm * dxm + dym * dym);
        if (dm < 80) {
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255,255,255,${0.08 * (1 - dm / 80)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
      frame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo('[data-hero-label]', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo('[data-hero-heading]', { opacity: 0, y: 30, rotateX: 8 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.8 }, '-=0.3')
        .fromTo('[data-hero-sub]', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
        .fromTo('.perspective-card', { opacity: 0, y: 40, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12 }, '-=0.3')
        .fromTo('[data-footer]', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.2');
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef });

  const handleMouseEnter = (el: HTMLElement | null) => {
    if (!el) return;
    const tl = gsap.timeline({ defaults: { ease: 'power2.out', overwrite: 'auto' } });
    tl.to(el, { scale: 1.02, duration: 0.35 }, 0)
      .to(el.querySelector('.card-glow'), { opacity: 1, duration: 0.3 }, 0);
  };

  const handleMouseLeave = (el: HTMLElement | null) => {
    if (!el) return;
    const tl = gsap.timeline({ defaults: { ease: 'power2.out', overwrite: 'auto' } });
    tl.to(el, { scale: 1, duration: 0.35 }, 0)
      .to(el.querySelector('.card-glow'), { opacity: 0, duration: 0.3 }, 0);
  };

  return (
    <main
      ref={containerRef}
      className="relative min-h-dvh bg-[#0a0a0a] flex items-center justify-center px-4 sm:px-6 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full py-20 sm:py-28">
        <div className="mb-12 sm:mb-16">
          <p
            data-hero-label
            className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-white/20 mb-4"
          >
            ROCKSPACE
          </p>
          <h1
            ref={headingRef}
            data-hero-heading
            className="font-display text-[clamp(2.8rem,8vw,6rem)] font-[700] tracking-[-0.04em] text-white leading-[0.9] max-w-4xl"
            style={{ perspective: 800 }}
          >
            Three perspectives<span className="text-accent">.</span>
          </h1>
          <p
            data-hero-sub
            className="text-[15px] sm:text-lg text-white/25 mt-4 max-w-md leading-relaxed"
          >
            One studio. Three ways to see it. <span className="text-white/40">Pick a lens.</span>
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
          {perspectives.map((p) => (
            <Link
              key={p.id}
              href={p.muted ? '#' : p.href}
              onMouseEnter={(e) => { if (!p.muted) handleMouseEnter(e.currentTarget as HTMLElement); }}
              onMouseLeave={(e) => { if (!p.muted) handleMouseLeave(e.currentTarget as HTMLElement); }}
              className={`perspective-card group relative block rounded-2xl overflow-hidden ${
                p.muted
                  ? 'cursor-default opacity-40'
                  : 'cursor-pointer'
              }`}
              style={{ opacity: 0 }}
            >
              <div
                className={`
                  relative p-6 sm:p-7 md:p-8 border rounded-2xl transition-colors duration-500
                  ${p.muted
                    ? 'border-white/[0.04] bg-white/[0.01]'
                    : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.15]'
                  }
                `}
              >
                <div
                  className="card-glow absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(600px circle at 50% 50%, ${p.accent}, transparent 80%)`,
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-5">
                    <span
                      className="inline-block text-[10px] sm:text-xs font-mono tracking-[0.2em] uppercase px-2.5 py-1 rounded-full border"
                      style={{ borderColor: `${p.color}30`, color: p.color }}
                    >
                      {p.tag}
                    </span>
                    <span
                      className="font-mono text-[11px] sm:text-xs tracking-wider"
                      style={{ color: `${p.color}60` }}
                    >
                      {p.num}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl font-[600] tracking-[-0.02em] text-white mb-3">
                    {p.title}
                  </h2>
                  <p className="text-sm sm:text-base text-white/35 leading-relaxed">
                    {p.desc}
                  </p>

                  {!p.muted && (
                    <div className="mt-6 flex items-center gap-1.5 text-[11px] sm:text-xs font-mono tracking-[0.15em] uppercase text-white/20 group-hover:text-white/50 transition-colors duration-500">
                      <span>Explore</span>
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p
          data-footer
          className="mt-12 sm:mt-16 text-[10px] sm:text-xs font-mono text-white/10 text-center tracking-wider"
        >
          _IST · Bengaluru, IN · Est. 2025
        </p>
      </div>
    </main>
  );
}
