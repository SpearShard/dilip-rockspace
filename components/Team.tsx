'use client';

import { useRef, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { teamMembers } from '@/lib/projectData';
import dynamic from 'next/dynamic';
import { SceneGate } from '@/lib/useInView';
import SectionLabel from '@/components/micro/SectionLabel';
import TiltCard from '@/components/micro/TiltCard';

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
    el.querySelectorAll('.team-card').forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0, y: 32 }, {
        opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', delay: i * 0.1,
        scrollTrigger: { trigger: card, start: 'top 88%', once: true },
      });
    });
  }, { scope: sectionRef });

  return (
    <section id="team" ref={sectionRef} className="relative bg-surface overflow-hidden">
      <SceneGate>
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
          <Suspense fallback={null}><TeamScene persona={0} /></Suspense>
        </div>
      </SceneGate>

      <div className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div>
              <SectionLabel className="mb-4">The people</SectionLabel>
              <h2 className="section-heading">Small team.<br className="hidden sm:block" /> Undeniable output.</h2>
            </div>
            <p className="text-text-muted max-w-sm text-body-lg leading-[1.55] lg:text-right font-medium-ui">
              No layers. No handoffs. The people you meet are the people who ship.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {teamMembers.map((m, i) => (
              <TiltCard key={m.name}>
                <article className="team-card surface-card card-hover overflow-hidden h-full" style={{ opacity: 0 }}>
                  <div className="relative aspect-[5/4] bg-surface overflow-hidden">
                    <span className="absolute top-4 left-4 z-10 font-mono text-[10px] tracking-[0.15em] text-white/90 bg-text/40 backdrop-blur-sm px-2 py-1 rounded-full">
                      0{i + 1}
                    </span>
                    <Image
                      src={['/debasispfp.png', '/jayadityapfp.png', '/dilippfp.png'][i]}
                      alt={m.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-text/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-6">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-accent mb-2">{m.role}</p>
                    <h3 className="text-heading-sm text-text">{m.name}</h3>
                    <p className="mt-2 text-sm text-text-muted leading-relaxed">{notes[i]}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {m.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wide text-text-tertiary border border-border/60 rounded-md transition-colors duration-200 hover:border-accent/30 hover:text-accent"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
