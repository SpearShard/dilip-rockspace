'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import dynamic from 'next/dynamic';
import CircleHighlight from './CircleHighlight';

const HeroScene = dynamic(() => import('@/components/scene/HeroScene'), { ssr: false });

function useReducedMotion() {
  const [reduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  return reduced;
}

/* ---------------------------------------------------------------- */
/* Magnetic button — cursor-following + shine sweep on hover         */
/* ---------------------------------------------------------------- */

function MagneticButton({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power3.out' });
  };

  const handleLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={`group relative isolate overflow-hidden transition-transform duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${className ?? ''}`}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[250%]" />
      <span className="relative">{children}</span>
    </a>
  );
}

/* ---------------------------------------------------------------- */
/* Secondary button — fill expand from left on hover                 */
/* ---------------------------------------------------------------- */

function GhostButton({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative isolate overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${className ?? ''}`}
    >
      <span className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-accent-light/40 transition-transform duration-400 ease-out group-hover:scale-x-100" />
      <span className="relative">{children}</span>
    </a>
  );
}

/* ---------------------------------------------------------------- */
/* Word split — masked reveal, animation now owned by parent tl     */
/* ---------------------------------------------------------------- */

function WordSplit({ text }: { text: string }) {
  const words = text.split(' ');

  return (
    <>
      {words.map((word, i) => (
        <span key={i} className="word-split">
          <span className="word-split-inner" style={{ willChange: 'transform, opacity, filter' }}>
            {word}
            {'\u00A0'}
          </span>
        </span>
      ))}
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Signature underline — hand-drawn swoosh in the gradient palette   */
/* ---------------------------------------------------------------- */

function Swoosh() {
  return (
    <svg
      className="swoosh-path absolute -bottom-2 left-0 h-[0.18em] w-full sm:-bottom-3"
      viewBox="0 0 300 24"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="swooshGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="55%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#FF8A65" />
        </linearGradient>
      </defs>
      <path
        d="M2 16C45 6 85 22 130 13C175 4 215 20 260 11C278 7 292 13 298 11"
        stroke="url(#swooshGrad)"
        strokeWidth="4"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="1"
      />
    </svg>
  );
}

/* ---------------------------------------------------------------- */
/* Hero                                                               */
/* ---------------------------------------------------------------- */

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Cursor spotlight — direct DOM writes, no re-renders
  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;

    let raf = 0;
    let mx = 0.5, my = 0.35;

    const apply = () => {
      glow.style.setProperty('--spot-x', `${mx * 100}%`);
      glow.style.setProperty('--spot-y', `${my * 100}%`);
      raf = 0;
    };

    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mx = (e.clientX - rect.left) / rect.width;
      my = (e.clientY - rect.top) / rect.height;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const handleEnter = () => glow.style.setProperty('--spot-opacity', '1');
    const handleLeave = () => glow.style.setProperty('--spot-opacity', '0');

    section.addEventListener('mousemove', handleMove);
    section.addEventListener('mouseenter', handleEnter);
    section.addEventListener('mouseleave', handleLeave);
    return () => {
      section.removeEventListener('mousemove', handleMove);
      section.removeEventListener('mouseenter', handleEnter);
      section.removeEventListener('mouseleave', handleLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  useGSAP(() => {
    if (reduced || !sectionRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    const bgGlow = sectionRef.current.querySelector('.hero-bg-glow');
    const preTitle = sectionRef.current.querySelector('.hero-pre-title');
    const lines = sectionRef.current.querySelectorAll('.hero-headline .word-split-inner');
    const swoosh = sectionRef.current.querySelector('.swoosh-path path');
    const subtitle = sectionRef.current.querySelector('.hero-subtitle');
    const ctaGroup = sectionRef.current.querySelector('.hero-ctas');
    const scrollInd = sectionRef.current.querySelector('.hero-scroll');

    if (bgGlow) tl.fromTo(bgGlow, { opacity: 0 }, { opacity: 1, duration: 1.4 }, 0);
    if (preTitle) tl.fromTo(preTitle, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, 0.2);

    if (lines?.length) {
      tl.fromTo(
        lines,
        { opacity: 0, y: '110%', rotateZ: -3, filter: 'blur(8px)' },
        { opacity: 1, y: '0%', rotateZ: 0, filter: 'blur(0px)', duration: 1, stagger: 0.05, ease: 'power4.out' },
        0.45
      );
    }

    if (swoosh) {
      tl.fromTo(
        swoosh,
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' },
        '>-0.25'
      );
    }

    if (subtitle) tl.fromTo(subtitle, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, 1.15);
    if (ctaGroup) tl.fromTo(ctaGroup, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 1.35);
    if (scrollInd) tl.fromTo(scrollInd, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1.7);

    return () => { tl.kill(); };
  }, { dependencies: [reduced], scope: sectionRef });

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center px-6 pt-24 overflow-hidden">
      <HeroScene />

      {/* Base atmosphere */}
      <div className="hero-bg-glow absolute inset-0 bg-gradient-to-b from-accent-light/20 via-accent/8 to-bg pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[50rem] h-[50rem] bg-accent/8 rounded-full blur-[200px] pointer-events-none glow-pulse" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-accent-warm/8 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle grid, faded toward edges */}
      <div
        className="absolute inset-0 grid-pattern pointer-events-none"
        style={{ maskImage: 'radial-gradient(ellipse 70% 60% at 50% 35%, black, transparent)', WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 35%, black, transparent)' }}
      />

      {/* Cursor-following spotlight */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          '--spot-x': '50%',
          '--spot-y': '35%',
          '--spot-opacity': 0,
          opacity: 'var(--spot-opacity)',
          background: 'radial-gradient(480px circle at var(--spot-x) var(--spot-y), rgba(167,139,250,0.16), transparent 70%)',
        } as React.CSSProperties}
      />

      {/* Twinkling field, echoing the brand asteroid scene */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[
          { top: '18%', left: '12%', size: 3, delay: '0s' },
          { top: '64%', left: '8%', size: 2, delay: '1.1s' },
          { top: '30%', left: '85%', size: 4, delay: '0.6s' },
          { top: '72%', left: '78%', size: 2, delay: '1.8s' },
          { top: '45%', left: '92%', size: 3, delay: '2.4s' },
          { top: '12%', left: '60%', size: 2, delay: '0.3s' },
        ].map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-accent-dark animate-[twinkle_3.5s_ease-in-out_infinite]"
            style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: s.delay }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="section-frame section-corner max-w-4xl pl-6">
          <p className="hero-pre-title text-sm text-accent-dark mb-8 tracking-[0.25em] uppercase flex items-center gap-3">
            <span className="font-hand text-base lowercase tracking-normal">three</span>
            <span className="font-mono">classmates</span>
          </p>

          <h1 className="hero-headline text-[clamp(2.8rem,9vw,6.5rem)] font-bold tracking-[-0.04em] leading-[1.0] text-text mb-8">
            <span className="word-split block">
              <span className="word-split-inner block">
                We build the <span className="text-gradient">internet&rsquo;s</span>
              </span>
            </span>
            <span className="relative inline-block text-accent-dark mt-1">
              <CircleHighlight>
                <WordSplit text="favorite things." />
              </CircleHighlight>
              <Swoosh />
            </span>
          </h1>

          <div className="hero-subtitle">
            <p className="text-lg md:text-xl text-text-muted max-w-xl leading-relaxed">
              Design, code, AI, motion — from Bengaluru, for the world.
            </p>
          </div>

          <div className="hero-ctas flex flex-wrap gap-4 mt-10">
            <MagneticButton
              href="#story"
              className="btn-glow px-8 py-3.5 bg-accent-dark text-white text-[15px] font-medium rounded-full flex items-center gap-2 shadow-lg shadow-accent-dark/20 hover:shadow-xl hover:shadow-accent-dark/30 hover:-translate-y-0.5"
            >
              <span className="flex items-center gap-2">
                Read our story
                <span className="arrow-bounce inline-block">→</span>
              </span>
            </MagneticButton>
            <GhostButton
              href="https://meet.google.com"
              className="px-8 py-3.5 border border-border text-text-muted text-[15px] rounded-full hover:border-accent/50 hover:text-text"
            >
              Book a Google Meet ↗
            </GhostButton>
          </div>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2">
        <span className="relative w-px h-10 bg-gradient-to-b from-accent/40 to-transparent overflow-hidden">
          <span className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-dark animate-bounce" />
        </span>
        <span className="text-[10px] font-mono text-text-tertiary tracking-widest">SCROLL</span>
      </div>

      {/* Film grain */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '180px 180px',
        }}
      />
    </section>
  );
}
