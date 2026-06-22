'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import DottedBoundary from '@/components/patterns/DottedBoundary';

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

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    const items = el.querySelectorAll('.work-item');

    items.forEach((item) => {
      const q = gsap.utils.selector(item as HTMLElement);
      const check = q('.check-circle path');
      const title = q('.work-title');
      const desc = q('.work-desc');
      const tag = q('.work-tag');

      gsap.set(check, { strokeDashoffset: 40 });
      gsap.set(title, { opacity: 0, x: -12 });
      gsap.set(desc, { opacity: 0, y: 6 });
      gsap.set(tag, { opacity: 0 });

      ScrollTrigger.create({
        trigger: item,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({
            defaults: { ease: 'power3.out' },
          });
          tl.to(check, {
            strokeDashoffset: 0,
            duration: 0.4,
            ease: 'power2.inOut',
          })
          .to(title, { opacity: 1, x: 0, duration: 0.4 }, '-=0.2')
          .to(desc, { opacity: 1, y: 0, duration: 0.35 }, '-=0.15')
          .to(tag, { opacity: 0.5, duration: 0.3 }, '-=0.1');
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section id="services" ref={sectionRef} className="relative bg-white overflow-hidden paper-texture">
      <div className="hidden md:block absolute inset-y-0 left-1/2 pointer-events-none z-0" style={{ width: '64rem', marginLeft: '-32rem' }}>
        <div className="relative h-full">
          <DottedBoundary dash="8,8" />
        </div>
      </div>
      <div className="py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative max-w-5xl mx-auto">
            <div className="relative z-10 px-6 md:px-10 py-6">
            <div className="mb-10 sm:mb-14 max-w-2xl">
              <p className="font-hand text-2xl sm:text-3xl text-text-tertiary mb-0.5 line-through decoration-accent/30 decoration-2" style={{ transform: 'rotate(-0.5deg)' }}>
                Capabilities
              </p>
              <p className="font-hand text-2xl sm:text-3xl text-accent mt-[-0.5em] ml-8 sm:ml-10" style={{ transform: 'rotate(0.5deg)' }}>
                what we actually make
              </p>
              <h2 className="section-title mt-2">
                The work<span className="text-accent">.</span>
              </h2>
            </div>

            <div className="divide-y divide-border/20">
              {offerings.map((o) => (
                <div
                  key={o.title}
                  className="work-item flex items-start gap-5 sm:gap-6 py-5 sm:py-6 md:py-7"
                >
                  <div className="check-circle shrink-0 mt-0.5">
                    <svg width="28" height="28" viewBox="0 0 28 28">
                      <circle
                        cx="14" cy="14" r="12"
                        fill="none"
                        stroke="var(--color-border)"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M8,14.5 L12,18.5 L20,9.5"
                        fill="none"
                        stroke="#D96C4A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="40"
                      />
                    </svg>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 sm:gap-4 flex-wrap">
                      <h3 className="work-title font-display text-xl sm:text-2xl md:text-3xl font-[700] tracking-[-0.02em] text-text">
                        {o.title}
                      </h3>
                    </div>
                    <p className="work-desc text-base sm:text-lg text-text-muted mt-1.5 leading-relaxed max-w-xl">
                      {o.desc}
                    </p>
                  </div>

                  <span className="work-tag shrink-0 text-[11px] font-mono tracking-[0.2em] text-text-tertiary mt-1.5 hidden sm:inline">
                    {o.tag}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border/20 text-center">
              <a
                href="/work"
                className="group inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 bg-accent text-white text-sm sm:text-base font-bold rounded-full hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 hover:shadow-accent/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                View projects
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 8h8M8 4l4 4-4 4" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

