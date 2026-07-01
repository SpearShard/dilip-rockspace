'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  { id: '01', verb: 'Listen', desc: 'No templated briefs. No assumptions. Just real conversation until the true problem surfaces.', note: 'discovery & research' },
  { id: '02', verb: 'Shape', desc: 'Strategy, structure and creative direction. Built entirely on what we heard. Nothing decorative. Everything functional.', note: 'strategy & architecture' },
  { id: '03', verb: 'Build', desc: 'Design, development and motion in parallel. Every pixel and every line of code serves one unified intent.', note: 'design & development' },
  { id: '04', verb: 'Ship & Grow', desc: 'Launch. Listen. Learn. Improve. The end of one cycle is the start of the next.', note: 'launch & iteration' },
];

const accentColors = ['#D96C4A', '#7C3AED', '#E8B84B', '#059669'];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    const cards = el.querySelectorAll('.process-card');

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
            delay: i * 0.12,
          });
        },
      });
    });

    const bottomLine = el.querySelector('.process-bottom');
    if (bottomLine) {
      gsap.set(bottomLine, { opacity: 0, y: 12 });
      ScrollTrigger.create({
        trigger: bottomLine,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(bottomLine, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
          });
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section id="process" ref={sectionRef} className="relative bg-bg overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none -z-10 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-bl from-accent-warm/5 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      <div className="py-24 sm:py-28 md:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-14 sm:mb-18">
              <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-text-muted/50 mb-3 sm:mb-4">
                The process
              </p>
              <h2 className="font-display font-[700] text-[clamp(2.2rem,6vw,4.5rem)] tracking-[-0.03em] text-text leading-[1.05]">
                How it flows<span className="text-accent">.</span>
              </h2>
            </div>

            {/* Stage cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {stages.map((s, i) => {
                const accent = accentColors[i];
                return (
                  <div
                    key={s.id}
                    className="process-card group relative bg-white border border-border/20 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
                    style={{ opacity: 0, y: 20 }}
                  >
                    {/* Stage number */}
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-4 sm:mb-5 transition-all duration-500 group-hover:scale-110"
                      style={{ backgroundColor: accent + '12' }}
                    >
                      <span className="font-display font-[700] text-base sm:text-lg" style={{ color: accent }}>
                        {s.id}
                      </span>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl font-[700] text-text tracking-[-0.02em] mb-2 sm:mb-3">
                      {s.verb}
                    </h3>

                    <p className="text-sm sm:text-base text-text-muted leading-relaxed mb-3 sm:mb-4">
                      {s.desc}
                    </p>

                    <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-text-tertiary/60">
                      {s.note}
                    </span>

                    {/* Hover accent ring */}
                    <div
                      className="absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `inset 0 0 0 1px ${accent}25`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'inset 0 0 0 1px transparent';
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Bottom message */}
            <div className="process-bottom mt-14 sm:mt-18 text-center">
              <div className="max-w-md mx-auto">
                <svg className="mx-auto w-16 h-4 mb-4 text-border/50" viewBox="0 0 64 8" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h56M32 1l3 3-3 3" />
                </svg>
                <p className="font-mono text-xs sm:text-sm text-text-tertiary/60 tracking-[0.05em]">
                  Then we do it again. Better every time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
