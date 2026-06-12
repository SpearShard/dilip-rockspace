'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('@/components/scene/HeroScene'), { ssr: false });

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
    <a ref={ref} href={href} onMouseMove={handleMouse} onMouseLeave={handleLeave} className={className}>
      {children}
    </a>
  );
}

function WordSplit({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [reduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useGSAP(() => {
    if (reduced || !ref.current) return;
    const words = ref.current.querySelectorAll('.word-split-inner');
    gsap.fromTo(words, { opacity: 0, x: 60, rotateZ: -5 }, {
      opacity: 1, x: 0, rotateZ: 0,
      duration: 1, stagger: 0.08, ease: 'power4.out',
    });
  }, { dependencies: [reduced], scope: ref });

  const words = text.split(' ');

  if (reduced) return <span>{text}</span>;

  return (
    <span ref={ref}>
      {words.map((word, i) => (
        <span key={i} className="word-split">
          <span className="word-split-inner" style={{ willChange: 'transform, opacity' }}>
            {word}
            {'\u00A0'}
          </span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [reduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useGSAP(() => {
    if (reduced || !sectionRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    const bgGlow = sectionRef.current.querySelector('.hero-bg-glow');
    const preTitle = sectionRef.current.querySelector('.hero-pre-title');
    const words = sectionRef.current.querySelectorAll('.hero-headline .word-split-inner');
    const subtitle = sectionRef.current.querySelector('.hero-subtitle');
    const ctaGroup = sectionRef.current.querySelector('.hero-ctas');
    const scrollInd = sectionRef.current.querySelector('.hero-scroll');

    if (bgGlow) tl.fromTo(bgGlow, { opacity: 0 }, { opacity: 1, duration: 1.2 }, 0);
    if (preTitle) tl.fromTo(preTitle, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.3);
    if (words?.length) tl.fromTo(words, { opacity: 0, y: 40, rotateZ: -3 }, { opacity: 1, y: 0, rotateZ: 0, duration: 0.9, stagger: 0.06, ease: 'power4.out' }, 0.6);
    if (subtitle) tl.fromTo(subtitle, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, 1.0);
    if (ctaGroup) tl.fromTo(ctaGroup, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 1.2);
    if (scrollInd) tl.fromTo(scrollInd, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1.5);

    return () => { tl.kill(); };
  }, { dependencies: [reduced], scope: sectionRef });

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center px-6 pt-24 overflow-hidden">
      <HeroScene />

      <div className="hero-bg-glow absolute inset-0 bg-gradient-to-b from-accent-light/20 via-accent/8 to-bg pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[50rem] h-[50rem] bg-accent/8 rounded-full blur-[200px] pointer-events-none glow-pulse" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-accent-warm/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="section-corner max-w-4xl">
          <p className="hero-pre-title text-xs font-mono text-accent-dark mb-8 tracking-[0.25em] uppercase flex items-center gap-3">
            <span className="w-8 h-px bg-accent-dark/40" />
            Three classmates
          </p>

          <h1 className="hero-headline text-[clamp(2.8rem,9vw,6.5rem)] font-bold tracking-[-0.04em] leading-[1.0] text-text mb-8">
            <span className="block">
              We build the <span className="text-gradient">internet&rsquo;s</span>
            </span>
            <span className="block text-accent-dark mt-1">
              <WordSplit text="favorite things." />
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
              className="group px-8 py-3.5 bg-accent-dark text-white text-[15px] font-medium rounded-full flex items-center gap-2 shadow-lg shadow-accent-dark/20"
            >
              Read our story
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </MagneticButton>
            <a
              href="https://meet.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 border border-border text-text-muted text-[15px] rounded-full hover:border-accent/50 hover:text-text transition-all"
            >
              Book a Google Meet ↗
            </a>
          </div>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-8 right-8 hidden lg:flex flex-col items-end gap-1.5">
        <span className="w-12 h-px bg-accent/30" />
        <span className="text-[10px] font-mono text-text-tertiary tracking-widest">SCROLL</span>
      </div>
    </section>
  );
}
