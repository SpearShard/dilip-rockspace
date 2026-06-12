'use client';

import { useRef, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import dynamic from 'next/dynamic';
import { SceneGate } from '@/lib/useInView';
import DotGrid from '@/components/patterns/DotGrid';
import DottedBoundary from '@/components/patterns/DottedBoundary';

gsap.registerPlugin(ScrollTrigger);

const ProcessScene = dynamic(() => import('@/components/scene/ProcessScene'), { ssr: false });

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(sectionRef.current.querySelector('.process-body'), { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power4.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
    });
  }, { scope: sectionRef });

  return (
    <section id="process" ref={sectionRef} className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 bg-surface overflow-hidden">
      <DottedBoundary />
      <DotGrid spacing={22} dotSize={0.5} opacity={0.25} />
      <SceneGate>
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <Suspense fallback={null}>
            <ProcessScene />
          </Suspense>
        </div>
      </SceneGate>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-2xl mb-10 sm:mb-14">
          <p className="text-[10px] sm:text-xs text-accent tracking-[0.2em] uppercase mb-2 sm:mb-3 font-mono">How we work</p>
          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl">The process<span className="text-accent">.</span></h2>
        </div>

        <div className="process-body max-w-3xl font-display text-lg sm:text-xl md:text-2xl text-text-muted leading-relaxed space-y-4 sm:space-y-6">
          <p>Listen <span className="text-text-tertiary italic">until the problem reveals itself.</span></p>
          <p>Shape <span className="text-text-tertiary italic">until the direction feels right.</span></p>
          <p>Build <span className="text-text-tertiary italic">until every pixel has purpose.</span></p>
          <p>Ship <span className="text-text-tertiary italic">until it works.</span></p>
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border/40">
            <p className="text-[11px] sm:text-xs font-mono text-text-tertiary">Then we do it again.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
