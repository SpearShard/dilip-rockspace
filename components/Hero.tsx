'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const bullets = ['Brand systems', 'Product design', 'Web experiences', 'AI workflows'];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.hero-title', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8 })
      .fromTo('.hero-copy', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.25')
      .fromTo('.hero-actions', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')
      .fromTo('.hero-card', { opacity: 0, y: 20, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.9 }, '-=0.2');
  }, { scope: sectionRef });

  return (
    <section id="hero" ref={sectionRef} className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[-8%] top-[10%] h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(217,108,74,0.18),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[-8%] right-[-6%] h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(122,75,51,0.12),transparent_70%)] blur-3xl" />
      </div>

      <div className="section-shell relative z-10 flex min-h-screen items-center py-24 sm:py-28 lg:py-32">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="max-w-3xl">
            <h1 className="hero-title mt-6 font-display text-5xl leading-[0.9] tracking-[-0.04em] text-stone-900 sm:text-6xl lg:text-7xl">
              We build digital experiences that make people stop, trust, and act.
            </h1>

            <p className="hero-copy mt-6 max-w-2xl text-lg leading-8 text-stone-600 sm:text-xl">
              From positioning and product design to polished web experiences and AI-enabled systems, we create work that feels premium, clear, and commercially sharp.
            </p>

            <div className="hero-actions mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/work" className="group inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-stone-800 hover:shadow-xl">
                See our work
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/contact" className="group inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white/70 px-6 py-3.5 text-sm font-semibold text-stone-700 transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-lg hover:border-stone-300">
                Book a discovery call
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 7h10v10M7 17L17 7" />
                </svg>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {bullets.map((item) => (
                <span key={item} className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-sm text-stone-600">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-card glass-panel relative overflow-hidden rounded-[2.2rem] border border-black/5 p-3 sm:p-4">
            <div className="overflow-hidden rounded-[1.7rem] border border-black/5 bg-stone-950">
              <div className="relative aspect-[9/16] max-h-[600px] mx-auto">
                <video className="absolute inset-0 h-full w-full object-cover" src="/logomotion.mp4" autoPlay muted loop playsInline />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
