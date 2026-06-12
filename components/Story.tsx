'use client';

import { useRef, useState, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import dynamic from 'next/dynamic';

gsap.registerPlugin(ScrollTrigger);

const StoryScene = dynamic(() => import('@/components/scene/StoryScene'), { ssr: false });

const beats = [
  {
    number: '01',
    title: 'A classroom, a spark',
    text: 'Three students. One elective. Debasis had the vision, Jayaditya the code, Dilip the systems. They built because they couldn\'t stop.',
    accent: '#A78BFA',
  },
  {
    number: '02',
    title: 'Late nights, big ideas',
    text: 'Dorm room → studio. Coffee → fuel. Websites for local shops, motion for festivals, tools for professors. Every failure was a shortcut.',
    accent: '#7C3AED',
  },
  {
    number: '03',
    title: 'RockSpace was born',
    text: 'No funding. No network. Just a belief that design + code + automation could make anything. They picked a name, built a brand, and never looked back.',
    accent: '#FF8A65',
  },
];

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const [reduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useGSAP(() => {
    if (reduced || !sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll('.story-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 80, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, stagger: 0.4, ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', end: 'bottom 40%', scrub: 1.2 } }
    );
  }, { dependencies: [reduced], scope: sectionRef });

  return (
    <section id="story" ref={sectionRef} className="relative py-32 md:py-40 px-6 bg-bg overflow-hidden section-frame">
      <span className="section-number hidden lg:block">●</span>

      <div className="absolute inset-0 pointer-events-none opacity-40">
        <Suspense fallback={null}>
          <StoryScene />
        </Suspense>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-accent-light/10 via-transparent to-accent-warm/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl mb-20 md:mb-24 section-corner">
          <p className="text-xs font-mono text-accent-dark tracking-[0.2em] uppercase mb-5 flex items-center gap-3">
            <span className="w-8 h-px bg-accent-dark/40" />
            The origin story
          </p>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[1.05] text-text">
            Built by <span className="text-gradient">classmates</span>
            <span className="text-accent">.</span>
          </h2>
        </div>

        <div className="relative space-y-28 md:space-y-36">
          {beats.map((beat, i) => (
            <div key={beat.number} className="story-card grid md:grid-cols-12 gap-8 md:gap-12 items-start relative">
              <div className="hidden md:block md:col-span-1 relative">
                <span className="absolute text-[7rem] font-bold leading-none select-none" style={{ color: beat.accent, opacity: 0.06, top: '-2rem', left: '-1rem' }}>
                  {beat.number}
                </span>
              </div>

              <div className="md:col-span-5">
                <div className="w-12 h-px mb-6" style={{ backgroundColor: beat.accent, opacity: 0.4 }} />
                <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-text mb-4">
                  {beat.title}
                </h3>
              </div>

              <div className="md:col-span-6">
                <p className="text-base md:text-lg text-text-muted leading-relaxed">{beat.text}</p>
                {i < beats.length - 1 && (
                  <div className="mt-8 flex items-center gap-3">
                    <span className="w-6 h-px bg-accent/30" />
                    <span className="text-[10px] font-mono text-text-tertiary tracking-widest">
                      {String(i + 2).padStart(2, '0')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
