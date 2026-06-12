'use client';

import { useRef, useState, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import BackgroundBeams from './ui/background-beams';
import dynamic from 'next/dynamic';
import { SceneGate } from '@/lib/useInView';

gsap.registerPlugin(ScrollTrigger);

const ContactScene = dynamic(() => import('@/components/scene/ContactScene'), { ssr: false });

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [reduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useGSAP(() => {
    if (reduced || !headingRef.current) return;
    gsap.fromTo(headingRef.current, { y: 120, opacity: 0 }, {
      y: 0, opacity: 1, duration: 2.5, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', end: 'top 20%', scrub: 1.5 },
    });
  }, { dependencies: [reduced], scope: sectionRef });

  useGSAP(() => {
    if (reduced || !contentRef.current) return;
    gsap.fromTo(contentRef.current.children, { opacity: 0, y: 50 }, {
      opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power4.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
    });
  }, { dependencies: [reduced], scope: sectionRef });

  return (
    <section id="contact" ref={sectionRef} className="relative min-h-screen flex flex-col justify-center px-6 pt-28 pb-0 overflow-hidden" style={{ contain: 'layout style paint' }}>
      <SceneGate margin="150%">
        {!reduced && <BackgroundBeams />}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <Suspense fallback={null}>
            <ContactScene />
          </Suspense>
        </div>
      </SceneGate>

      <div className="absolute top-1/4 right-1/4 w-[30rem] h-[30rem] bg-accent/10 rounded-full blur-[80px] pointer-events-none glow-pulse" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="section-corner max-w-3xl">
          <p className="text-sm text-accent-dark tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-accent-dark/40" />
            <span className="font-hand text-base lowercase tracking-normal">get in</span>
            <span className="font-mono">touch</span>
          </p>

          <h2 ref={headingRef} className="text-[clamp(3rem,9vw,7rem)] font-bold tracking-[-0.04em] leading-[1.0] text-text max-w-4xl mb-6">
            Let&apos;s build something <span className="text-shimmer">great</span>.
          </h2>

          <div ref={contentRef}>
            <a href="mailto:hello@rockspace.io" className="inline-block text-xl md:text-2xl text-text-muted hover:text-accent-dark transition-colors font-mono mb-10 group">
              hello@rockspace.io
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">↗</span>
            </a>

            <div className="flex flex-wrap gap-4">
              <a href="https://meet.google.com" target="_blank" rel="noopener noreferrer"
                className="px-8 py-3.5 bg-accent-dark text-white text-[15px] font-medium rounded-full hover:bg-accent-dark/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-accent-dark/20">
                Book a Google Meet
              </a>
              <a href="mailto:hello@rockspace.io"
                className="px-8 py-3.5 border border-border text-text-muted text-[15px] rounded-full hover:border-accent/50 hover:text-text transition-all">
                Send an email
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ——— Footer ——— */}
      <footer className="relative mt-28 md:mt-40 w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-light to-accent/10 pointer-events-none" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[1px] bg-gradient-to-r from-transparent via-accent-dark/20 to-transparent" />
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(1px 1px at 10% 20%, rgba(124,58,237,0.08), transparent), radial-gradient(1px 1px at 30% 60%, rgba(167,139,250,0.06), transparent), radial-gradient(1.5px 1.5px at 50% 10%, rgba(124,58,237,0.1), transparent), radial-gradient(1px 1px at 70% 40%, rgba(167,139,250,0.04), transparent), radial-gradient(1px 1px at 90% 80%, rgba(255,138,101,0.06), transparent), radial-gradient(1.5px 1.5px at 20% 90%, rgba(124,58,237,0.04), transparent), radial-gradient(1px 1px at 80% 15%, rgba(167,139,250,0.06), transparent), radial-gradient(1px 1px at 45% 45%, rgba(124,58,237,0.05), transparent), radial-gradient(1.5px 1.5px at 60% 75%, rgba(255,138,101,0.08), transparent), radial-gradient(1px 1px at 15% 50%, rgba(167,139,250,0.03), transparent)',
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div className="col-span-2 md:col-span-1">
              <span className="text-text font-bold tracking-tight text-base md:text-lg">
                Rock<span className="text-text/40">Space</span>
              </span>
              <p className="text-text-muted text-xs md:text-sm mt-2 leading-relaxed max-w-xs">
                Design, development, AI automation &amp; content. From Bengaluru, for the world.
              </p>
            </div>

            <div>
              <h4 className="text-text/60 text-[11px] md:text-xs font-mono tracking-[0.15em] uppercase mb-3 md:mb-4 font-semibold">Navigate</h4>
              <div className="flex flex-col gap-2 md:gap-2.5">
                {['Services', 'Work', 'Process', 'Team', 'Contact'].map((l) => (
                  <a key={l} href={`#${l.toLowerCase()}`} className="text-text-muted hover:text-accent-dark text-xs md:text-sm transition-colors font-medium">
                    {l}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-text/60 text-[11px] md:text-xs font-mono tracking-[0.15em] uppercase mb-3 md:mb-4 font-semibold">Connect</h4>
              <div className="flex flex-col gap-2 md:gap-2.5">
                {[['Instagram', '#'], ['LinkedIn', '#'], ['GitHub', '#'], ['Dribbble', '#']].map(([name, url]) => (
                  <a key={name} href={url} className="text-text-muted hover:text-accent-dark text-xs md:text-sm transition-colors flex items-center gap-1.5 group font-medium">
                    {name}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] md:text-[10px]">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 md:mt-16 pt-5 md:pt-6 border-t border-accent/10 flex flex-row flex-wrap items-center justify-between gap-x-4 md:gap-x-6 gap-y-1.5">
            <p className="text-text-muted/80 text-[11px] md:text-xs font-mono">© 2026 RockSpace</p>
            <p className="text-text-muted/80 text-[11px] md:text-xs font-mono tracking-wider">12.9716° N / 77.5946° E — Bengaluru, India</p>
            <p className="text-text-muted/80 text-[11px] md:text-xs font-mono">∞</p>
          </div>
        </div>
      </footer>
    </section>
  );
}
