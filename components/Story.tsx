'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const originals = [
  {
    id: 'dm',
    name: 'Debasis',
    quote: 'Got tired of handing off Figma files. So I learned to build them myself.',
    role: 'Design → Code',
  },
  {
    id: 'gj',
    name: 'Jayaditya',
    quote: 'Components before code. Systems before screens. I draw the grid before anyone sees the page.',
    role: 'Architecture → Interface',
  },
  {
    id: 'dp',
    name: 'Dilip',
    quote: 'Built a bot to do my job. Then another. Turns out the real job was building the bots.',
    role: 'Automation → Abstraction',
  },
];

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      '.origin-card',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.1 }
    );

    const pullQuote = el.querySelector('.pull-quote');
    if (pullQuote) {
      gsap.fromTo(
        pullQuote,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.5 }
      );
    }
  }, { scope: sectionRef });

  return (
    <section id="story" ref={sectionRef} className="relative bg-bg overflow-hidden">
      <div className="py-24 sm:py-28 md:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-14 sm:mb-18">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500 mb-4">
                The origin
              </p>
              <h2 className="font-display font-[700] text-[clamp(2.2rem,6vw,4.5rem)] tracking-[-0.03em] text-stone-900 leading-[1.05]">
                Three paths collided<span className="text-accent">.</span>
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {originals.map((o) => (
                <div
                  key={o.id}
                  className="origin-card glass-panel rounded-[1.5rem] border border-black/5 p-6 sm:p-7"
                >
                  <div className="mb-3">
                    <h3 className="font-display text-lg font-semibold text-stone-900">
                      {o.name}
                    </h3>
                    <p className="text-[10px] font-mono uppercase tracking-[0.1em] text-stone-400 mt-0.5">
                      {o.role}
                    </p>
                  </div>
                  <blockquote className="text-sm leading-relaxed text-stone-600">
                    &ldquo;{o.quote}&rdquo;
                  </blockquote>
                </div>
              ))}
            </div>

            <div className="pull-quote mt-16 sm:mt-20 text-center">
              <div className="max-w-2xl mx-auto px-4">
                <p className="font-display text-xl sm:text-2xl md:text-3xl text-stone-600 leading-snug font-[600] tracking-[-0.02em]">
                  RockSpace isn&rsquo;t a studio. It&rsquo;s what happens when three people stop asking for permission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
