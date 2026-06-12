'use client';

import { useRef, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { teamMembers } from '@/lib/projectData';
import dynamic from 'next/dynamic';
import { SceneGate } from '@/lib/useInView';
import DotGrid from '@/components/patterns/DotGrid';
import DottedBoundary from '@/components/patterns/DottedBoundary';

gsap.registerPlugin(ScrollTrigger);

const TeamScene = dynamic(() => import('@/components/scene/TeamScene'), { ssr: false });

const roles = [
  'Founder & Creative Director',
  'Technical Lead — Frontend',
  'AI & Automation Polymath',
];

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;
    gsap.fromTo(el.querySelectorAll('.person'), { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power4.out',
      scrollTrigger: { trigger: el, start: 'top 80%', once: true },
    });
  }, { scope: sectionRef });

  return (
    <section id="team" ref={sectionRef} className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 bg-bg overflow-hidden">
      <DottedBoundary />
      <DotGrid spacing={24} dotSize={0.5} opacity={0.2} />
      <SceneGate>
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <Suspense fallback={null}>
            <TeamScene persona={0} />
          </Suspense>
        </div>
      </SceneGate>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-2xl mb-10 sm:mb-14">
          <p className="text-[10px] sm:text-xs text-accent tracking-[0.2em] uppercase mb-2 sm:mb-3 font-mono">The people</p>
          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Who we are<span className="text-accent">.</span></h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          {teamMembers.map((m, i) => (
            <div key={m.name} className="person">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden mb-3 sm:mb-4 shadow-md ring-1 ring-border/50">
                <Image
                  src={['/debasispfp.png', '/jayadityapfp.png', '/dilippfp.png'][i]}
                  alt={m.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-display text-lg sm:text-xl font-[500] text-text">{m.name}</h3>
              <p className="text-xs sm:text-sm text-text-muted mt-0.5">{roles[i]}</p>
              <p className="text-xs sm:text-sm text-text-tertiary mt-2 sm:mt-3 leading-relaxed">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
