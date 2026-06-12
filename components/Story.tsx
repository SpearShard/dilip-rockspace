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

const StoryScene = dynamic(() => import('@/components/scene/StoryScene'), { ssr: false });

const beats = [
  { number: '01', title: 'The one who couldn&rsquo;t stop building', text: 'Debasis would design in Figma, then build it himself. Not because he had to — because the gap between thinking and making bothered him.' },
  { number: '02', title: 'The one who saw the grid in everything', text: 'Jayaditya doesn&rsquo;t just write code. He feels architecture. Components, systems, flows — he maps them before they exist.' },
  { number: '03', title: 'The one who automated his own job', text: 'Dilip built a bot to do his work. Then he built another one. Then he realized the real job was building the bots.' },
];

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll('.story-card');
    cards.forEach((card) => {
      gsap.fromTo(card, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power4.out',
        scrollTrigger: { trigger: card, start: 'top 85%', once: true },
      });
    });
    const pull = sectionRef.current.querySelector('.story-pull');
    if (pull) {
      gsap.fromTo(pull, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power4.out',
        scrollTrigger: { trigger: pull, start: 'top 85%', once: true },
      });
    }
  }, { scope: sectionRef });

  return (
    <section id="story" ref={sectionRef} className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 bg-surface overflow-hidden">
      <DottedBoundary />
      <DotGrid spacing={20} dotSize={0.5} opacity={0.25} />
      <SceneGate>
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <Suspense fallback={null}>
            <StoryScene />
          </Suspense>
        </div>
      </SceneGate>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-2xl mb-10 sm:mb-14">
          <p className="text-[10px] sm:text-xs text-accent tracking-[0.2em] uppercase mb-2 sm:mb-3 font-mono">How we met</p>
          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Three paths collided<span className="text-accent">.</span></h2>
        </div>

        <div className="space-y-10 sm:space-y-12 md:space-y-16">
          {beats.map((beat) => (
            <div key={beat.number} className="story-card grid md:grid-cols-12 gap-3 sm:gap-4 md:gap-8 items-start">
              <div className="md:col-span-4 md:col-start-2">
                <span className="font-display text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-[400] italic leading-none text-accent/15 select-none">
                  {beat.number}
                </span>
                <h3 className="font-display text-base sm:text-lg md:text-xl font-[500] tracking-[-0.02em] text-text mt-1">{beat.title}</h3>
              </div>
              <div className="md:col-span-5">
                <p className="text-sm sm:text-base text-text-muted leading-relaxed">{beat.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="story-pull mt-16 sm:mt-20 md:mt-24 text-center">
          <p className="font-display text-lg sm:text-xl md:text-2xl font-[400] italic text-text-muted max-w-2xl mx-auto leading-relaxed px-4">
            &ldquo;RockSpace isn&rsquo;t a studio. It&rsquo;s what happens when three people stop asking for permission.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
