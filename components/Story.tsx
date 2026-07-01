'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const originals = [
  {
    id: 'dm',
    name: 'Debasis',
    quote: 'Got tired of handing off Figma files. So I learned to build them myself.',
    role: 'Design \u2192 Code',
    accent: '#D96C4A',
  },
  {
    id: 'gj',
    name: 'Jayaditya',
    quote: 'Components before code. Systems before screens. I draw the grid before anyone sees the page.',
    role: 'Architecture \u2192 Interface',
    accent: '#E8B84B',
  },
  {
    id: 'dp',
    name: 'Dilip',
    quote: 'Built a bot to do my job. Then another. Turns out the real job was building the bots.',
    role: 'Automation \u2192 Abstraction',
    accent: '#7C3AED',
  },
];

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    const items = el.querySelectorAll('.origin-item');

    gsap.set(items, { opacity: 0, y: 30 });

    items.forEach((item, i) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            delay: i * 0.15,
          });
        },
      });
    });

    const pullQuote = el.querySelector('.pull-quote');
    if (pullQuote) {
      gsap.set(pullQuote, { opacity: 0, y: 20 });
      ScrollTrigger.create({
        trigger: pullQuote,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(pullQuote, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
          });
        },
      });
    }

    // Animate the timeline line
    const line = lineRef.current;
    if (line) {
      gsap.set(line, { scaleY: 0, transformOrigin: 'top center' });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 70%',
        end: 'bottom 60%',
        once: true,
        onEnter: () => {
          gsap.to(line, {
            scaleY: 1,
            duration: 1.2,
            ease: 'power3.inOut',
          });
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section id="story" ref={sectionRef} className="relative bg-bg overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none -z-10 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-tr from-accent-warm/5 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      <div className="py-24 sm:py-28 md:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-14 sm:mb-18">
              <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-text-muted/50 mb-3 sm:mb-4">
                The origin
              </p>
              <h2 className="font-display font-[700] text-[clamp(2.2rem,6vw,4.5rem)] tracking-[-0.03em] text-text leading-[1.05]">
                Three paths collided<span className="text-accent">.</span>
              </h2>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div
                ref={lineRef}
                className="absolute left-[18px] sm:left-[22px] top-0 bottom-0 w-px bg-border/40"
              />

              <div className="space-y-10 sm:space-y-12">
                {originals.map((o) => (
                  <div key={o.id} className="origin-item relative pl-12 sm:pl-14">
                    {/* Dot on timeline */}
                    <div
                      className="absolute left-[10px] sm:left-[14px] top-1 w-[18px] h-[18px] rounded-full border-2 border-bg shadow-sm"
                      style={{ backgroundColor: o.accent, borderColor: o.accent }}
                    />

                    {/* Content */}
                    <div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <h3 className="font-display text-xl sm:text-2xl font-[700] text-text tracking-[-0.02em]">
                          {o.name}
                        </h3>
                        <span className="text-[10px] sm:text-xs font-mono text-text-tertiary tracking-[0.1em] uppercase">
                          {o.role}
                        </span>
                      </div>

                      <blockquote className="text-base sm:text-lg text-text-muted leading-relaxed italic border-l-2 pl-4 sm:pl-5 mt-2 sm:mt-3" style={{ borderColor: o.accent + '40' }}>
                        &ldquo;{o.quote}&rdquo;
                      </blockquote>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pull quote */}
            <div className="pull-quote relative mt-20 sm:mt-24 md:mt-28 text-center">
              <div className="max-w-2xl mx-auto px-4">
                <span className="block font-display text-[4rem] sm:text-[6rem] text-accent/5 leading-none select-none tracking-[-0.06em]">
                  &amp;
                </span>
                <p className="font-display text-xl sm:text-2xl md:text-3xl text-text-muted mt-[-0.6em] leading-snug font-[600] tracking-[-0.02em]">
                  RockSpace isn&rsquo;t a studio. It&rsquo;s what happens when three people stop asking for permission.
                </p>
                <div className="flex justify-center gap-1.5 mt-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-text-tertiary/30" />
                  <span className="w-1.5 h-1.5 rounded-full bg-text-tertiary/30" />
                  <span className="w-1.5 h-1.5 rounded-full bg-text-tertiary/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
