'use client';

import { useRef, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { teamMembers } from '@/lib/projectData';
import dynamic from 'next/dynamic';
import { SceneGate } from '@/lib/useInView';

gsap.registerPlugin(ScrollTrigger);

const TeamScene = dynamic(() => import('@/components/scene/TeamScene'), { ssr: false });

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

    const cards = el.querySelectorAll('.team-card');

    cards.forEach((card, i) => {
      const tl = gsap.timeline({ delay: 0.15 + i * 0.1 });

      tl.fromTo(card,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' }
      )
      .fromTo(card.querySelectorAll('.card-line'),
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.06, ease: 'power2.out' },
        '-=0.3'
      );
    });
  }, { scope: sectionRef });

  return (
    <section id="team" ref={sectionRef} className="relative bg-surface overflow-hidden">
      <SceneGate>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <Suspense fallback={null}>
            <TeamScene persona={0} />
          </Suspense>
        </div>
      </SceneGate>

      {/* Gradient accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none -z-10 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-bl from-accent/5 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      <div className="py-24 sm:py-28 md:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-14 sm:mb-18">
              <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-text-muted/50 mb-3 sm:mb-4">
                The people
              </p>
              <h2 className="font-display font-[700] text-[clamp(2.2rem,6vw,4.5rem)] tracking-[-0.03em] text-text leading-[1.05]">
                Behind the studio<span className="text-accent">.</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-5 md:gap-6">
              {teamMembers.map((m, i) => (
                <div
                  key={m.name}
                  className="team-card group relative bg-white/60 backdrop-blur-sm border border-border/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
                  style={{ opacity: 0 }}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                    <Image
                      src={['/debasispfp.png', '/jayadityapfp.png', '/dilippfp.png'][i]}
                      alt={m.name}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <div className="card-line flex items-baseline gap-2 mb-2">
                      <h3 className="font-display text-xl sm:text-2xl font-[700] text-text tracking-[-0.02em]">
                        {m.name}
                      </h3>
                      <span className="text-[10px] sm:text-xs font-mono text-text-tertiary tracking-[0.1em] uppercase">
                        {m.role}
                      </span>
                    </div>

                    <p className="card-line text-sm sm:text-base text-text-muted leading-relaxed">
                      {notes[i]}
                    </p>
                  </div>

                  {/* Hover accent ring */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent group-hover:ring-accent/20 transition-all duration-500 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
