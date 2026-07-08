'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

// const bullets = ['Brand systems', 'Product design', 'Web experiences', 'AI workflows'];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Use a timeline for a rhythmic, premium entrance
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Staggered reveal for lines of text
    tl.fromTo('.hero-title span', 
      { y: 120, skewY: 5, opacity: 0 }, 
      { y: 0, skewY: 0, opacity: 1, duration: 1.2, stagger: 0.1 }
    )
    .fromTo('.hero-copy', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1 }, 
      "-=0.8"
    )
    .fromTo('.hero-actions', 
      { opacity: 0, scale: 0.95 }, 
      { opacity: 1, scale: 1, duration: 0.8 }, 
      "-=0.6"
    )
    .fromTo('.hero-card', 
      { opacity: 0, rotateY: 15, scale: 0.95 }, 
      { opacity: 1, rotateY: 0, scale: 1, duration: 1.2 }, 
      "-=0.6"
    );
  }, { scope: sectionRef });

  return (
    <section id="hero" ref={sectionRef} className="relative w-full min-h-dvh flex items-center pt-24 sm:pt-20 pb-12 sm:pb-0 overflow-hidden bg-[#030303]">
      {/* Cinematic Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(217,108,74,0.06),transparent_60%)] blur-[120px] pointer-events-none" />

      <div className="section-shell relative z-10 w-full">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
          
          <div className="max-w-3xl">
<h1 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[-0.02em] font-medium text-white">
  <span className="block overflow-hidden"><span className="inline-block">We build digital</span></span>
  <span className="block overflow-hidden"><span className="inline-block text-white/40">experiences that</span></span>
  <span className="block overflow-hidden"><span className="inline-block">stop, trust, act.</span></span>
</h1>

            <p className="hero-copy mt-8 max-w-lg text-lg leading-relaxed text-white/60">
              From positioning and design to polished web experiences and AI-enabled systems, we create work that feels premium, clear, and sharp.
            </p>

            <div className="hero-actions mt-12 flex flex-wrap gap-4">
              <Link href="/work" className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition-all hover:bg-stone-200">
                See our work
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
              </Link>
              <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-8 py-4 text-sm font-bold text-white transition-all hover:border-white/50">
                Book discovery
              </Link>
            </div>

          </div>

          <div className="hero-card relative perspective-[1000px] hidden sm:block">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-2">
              <div className="aspect-[3/4] overflow-hidden rounded-[1.5rem]">
                <video 
                  className="h-full w-full object-cover" 
                  src="/logomotion.mp4" 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}