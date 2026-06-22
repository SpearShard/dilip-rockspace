'use client';

import { useRef, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { teamMembers } from '@/lib/projectData';
import dynamic from 'next/dynamic';
import { SceneGate } from '@/lib/useInView';
import DottedBoundary from '@/components/patterns/DottedBoundary';

gsap.registerPlugin(ScrollTrigger);

const TeamScene = dynamic(() => import('@/components/scene/TeamScene'), { ssr: false });

const rotations = [-1.5, 2, -1];
const notes = [
  'He thinks in visual systems. If it doesn\'t feel right, it doesn\'t ship.',
  'He architects before he codes. The grid is the first draft.',
  'He automated himself out of a job. Then built the replacement.',
];

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    const cards = el.querySelectorAll('.polaroid-card');

    cards.forEach((card, i) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          once: true,
        },
      });

      tl.fromTo(card, { opacity: 0, y: 40, rotate: 0, scale: 0.92 }, {
        opacity: 1, y: 0, rotate: rotations[i], scale: 1, duration: 0.7, ease: 'back.out(1.4)',
      })
      .fromTo(card.querySelectorAll('.bio-line'), { opacity: 0, x: -6 }, {
        opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out',
      }, '-=0.3');
    });
  }, { scope: sectionRef });

  return (
    <section id="team" ref={sectionRef} className="relative bg-white overflow-hidden paper-texture">
      <div className="hidden md:block absolute inset-y-0 left-1/2 pointer-events-none z-0" style={{ width: '64rem', marginLeft: '-32rem' }}>
        <div className="relative h-full">
          <DottedBoundary dash="8,8" />
        </div>
      </div>

      <SceneGate>
        <div className="absolute inset-0 pointer-events-none opacity-6">
          <Suspense fallback={null}>
            <TeamScene persona={0} />
          </Suspense>
        </div>
      </SceneGate>

      <div className="py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative max-w-5xl mx-auto">
            <div className="relative z-10 px-6 md:px-10 py-6">
            <div className="mb-10 sm:mb-14 max-w-2xl">
              <p className="font-hand text-2xl sm:text-3xl text-accent mb-1" style={{ transform: 'rotate(0.3deg)' }}>
                The people
              </p>
              <h2 className="section-title">
                Behind the studio<span className="text-accent">.</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-6 md:gap-10 items-start">
              {teamMembers.map((m, i) => (
                <div
                  key={m.name}
                  className="polaroid-card polaroid rounded-xl p-4 sm:p-5"
                  style={{ transform: `rotate(${rotations[i]}deg)`, opacity: 0 }}
                >
                  <div className="rounded-lg overflow-hidden mb-3 bg-[#F5F3F0]">
                    <Image
                      src={['/debasispfp.png', '/jayadityapfp.png', '/dilippfp.png'][i]}
                      alt={m.name}
                      width={400}
                      height={300}
                      className="w-full h-44 sm:h-52 object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>

                  <div className="px-0.5">
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-[700] text-text">
                        {m.name}
                      </h3>
                      <span className="text-xs sm:text-sm font-mono text-text-tertiary tracking-[0.1em] uppercase opacity-60">
                        {m.role}
                      </span>
                    </div>

                    <div className="space-y-0.5 mt-2 bio-line">
                      <p className="font-hand text-base sm:text-lg text-text-muted leading-snug">
                        {notes[i]}
                      </p>
                    </div>


                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
