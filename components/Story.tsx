'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionLabel from '@/components/micro/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const beats = [
  { name: 'Debasis', path: 'Design → Code', quote: 'Got tired of handing off Figma files. So I learned to build them myself.' },
  { name: 'Jayaditya', path: 'Architecture → Interface', quote: 'Components before code. Systems before screens.' },
  { name: 'Dilip', path: 'Automation → Abstraction', quote: 'Built a bot to do my job. Then built the replacement.' },
];

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.querySelectorAll('.story-beat').forEach((item, i) => {
      gsap.fromTo(item, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: i * 0.08,
        scrollTrigger: { trigger: item, start: 'top 88%', once: true },
      });
    });
    gsap.fromTo(el.querySelector('.story-quote'), { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: '.story-quote', start: 'top 88%', once: true },
    });
  }, { scope: sectionRef });

  return (
    <section id="story" ref={sectionRef} className="bg-bg border-t border-border/50">
      <div className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <SectionLabel className="mb-4">The origin</SectionLabel>
              <h2 className="section-heading">How RockSpace happened.</h2>
              <p className="mt-4 text-text-muted text-body-lg leading-[1.6] font-medium-ui">
                Three specialists who stopped waiting for permission and started owning outcomes.
              </p>
            </div>

            <div className="lg:col-span-8 space-y-0 divide-y divide-border/60">
              {beats.map((b, i) => (
                <article key={b.name} className="story-beat grid sm:grid-cols-[80px_1fr] gap-4 sm:gap-8 py-10 first:pt-0 group">
                  <span className="font-mono text-sm text-text-tertiary transition-colors duration-300 group-hover:text-accent">0{i + 1}</span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-accent mb-2">{b.path}</p>
                    <h3 className="text-heading-sm text-text mb-3">{b.name}</h3>
                    <p className="text-text-muted text-lg leading-relaxed italic">&ldquo;{b.quote}&rdquo;</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <blockquote className="story-quote mt-20 pt-16 border-t border-border/50 max-w-3xl relative">
            <span className="absolute -top-3 left-0 font-display text-6xl text-accent/20 leading-none select-none" aria-hidden>&ldquo;</span>
            <p className="pull-quote pl-6">
              RockSpace isn&rsquo;t a studio. It&rsquo;s what happens when three people decide to be the best in the room.
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
