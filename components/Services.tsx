'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const offerings = [
  {
    title: 'Brand Identity',
    desc: 'Visual systems, identity and language. Design that speaks without words.',
    tag: 'IDENTITY',
  },
  {
    title: 'Web Development',
    desc: 'Sites, apps and WebGL. Built to perform. Built to last. Every pixel has a purpose.',
    tag: 'ENGINEERING',
  },
  {
    title: 'AI & Automation',
    desc: 'AI agents, automated pipelines and smart workflows. If it can be systemized, we do it.',
    tag: 'SYSTEMS',
  },
  {
    title: 'Motion & 3D',
    desc: 'Animation, WebGL and immersive spatial work. Production that stops the scroll.',
    tag: 'MOTION',
  },
  {
    title: 'Product Strategy',
    desc: 'Positioning, architecture and roadmaps. The strategic thinking before the first pixel.',
    tag: 'STRATEGY',
  },
  {
    title: 'Narrative & Decks',
    desc: 'Brand stories, investor decks and sales pitches. Presentations that actually close deals.',
    tag: 'COMMS',
  },
];

const cardSize = (i: number) => {
  // Bento pattern: large | medium | small | medium | small | large
  const sizes = ['lg', 'md', 'sm', 'md', 'sm', 'lg'];
  return sizes[i];
};

const accentColors: Record<string, string> = {
  IDENTITY: '#D96C4A',
  ENGINEERING: '#7C3AED',
  SYSTEMS: '#E8B84B',
  MOTION: '#3B82F6',
  STRATEGY: '#059669',
  COMMS: '#D946EF',
};

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    const cards = el.querySelectorAll('.service-card');

    cards.forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
            delay: i * 0.08,
          });
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section id="services" ref={sectionRef} className="relative bg-surface overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] pointer-events-none -z-10 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      <div className="py-24 sm:py-28 md:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-14 sm:mb-18">
              <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-text-muted/50 mb-3 sm:mb-4">
                Capabilities
              </p>
              <h2 className="font-display font-[700] text-[clamp(2.2rem,6vw,4.5rem)] tracking-[-0.03em] text-text leading-[1.05]">
                The work<span className="text-accent">.</span>
              </h2>
            </div>

            {/* Bento grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {offerings.map((o, i) => {
                const size = cardSize(i);
                const accent = accentColors[o.tag] || '#D96C4A';

                const spanClass = size === 'lg'
                  ? 'sm:col-span-2'
                  : size === 'sm'
                  ? ''
                  : '';

                return (
                  <div
                    key={o.title}
                    className={`service-card group relative bg-white border border-border/20 rounded-2xl p-6 sm:p-7 md:p-8 shadow-sm hover:shadow-lg transition-all duration-500 ${spanClass}`}
                    style={{ opacity: 0, y: 20 }}
                  >
                    {/* Top accent bar */}
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl transition-all duration-500 group-hover:h-1"
                      style={{ backgroundColor: accent }}
                    />

                    {/* Number */}
                    <span className="font-mono text-[10px] sm:text-xs tracking-[0.15em] text-text-tertiary/50 mb-4 sm:mb-5 block">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Icon */}
                    <div
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg mb-4 sm:mb-5 flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                      style={{ backgroundColor: accent + '12' }}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl md:text-2xl font-[700] text-text tracking-[-0.02em] mb-2 sm:mb-3">
                      {o.title}
                    </h3>

                    <p className="text-sm sm:text-base text-text-muted leading-relaxed mb-4 sm:mb-5">
                      {o.desc}
                    </p>

                    <span
                      className="inline-block text-[9px] sm:text-[10px] font-mono tracking-[0.15em] uppercase px-2.5 py-1 rounded-full transition-colors duration-300"
                      style={{
                        color: accent,
                        backgroundColor: accent + '10',
                      }}
                    >
                      {o.tag}
                    </span>

                    {/* Hover accent ring */}
                    <div
                      className="absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `inset 0 0 0 1px ${accent}30`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'inset 0 0 0 1px transparent';
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-14 sm:mt-18 text-center">
              <Link
                href="/work"
                className="group inline-flex items-center gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 bg-accent text-white text-sm sm:text-base font-bold rounded-full hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 hover:shadow-accent/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                View projects
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 8h8M8 4l4 4-4 4" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
