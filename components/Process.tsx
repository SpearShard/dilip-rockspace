'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import DottedBoundary from '@/components/patterns/DottedBoundary';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  { id: '01', verb: 'Listen', desc: 'No briefs. No assumptions. Just conversation, context, and curiosity until the problem reveals itself.', note: 'discovery & research' },
  { id: '02', verb: 'Shape', desc: 'Strategy, structure, creative direction — built entirely on what we heard. Nothing decorative.', note: 'strategy & architecture' },
  { id: '03', verb: 'Build', desc: 'Design, dev, and motion in parallel. Every pixel and every line of code serves the same intent.', note: 'design & development' },
  { id: '04', verb: 'Ship & Grow', desc: 'Launch. Listen. Learn. The end of one cycle is the beginning of the next.', note: 'launch & iteration' },
];

const connectorPaths = [
  'M0,30 C40,30 60,10 100,10',
  'M0,30 C40,30 60,50 100,50',
  'M0,30 C40,30 60,10 100,10',
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    const circles = el.querySelectorAll('.cycle-circle');
    const lines = el.querySelectorAll('.cycle-line');
    const labels = el.querySelectorAll('.cycle-label');

    gsap.set(circles, { opacity: 0, scale: 0.4 });
    gsap.set(labels, { opacity: 0, y: 12 });
    gsap.set(lines, { strokeDashoffset: 120 });

    circles.forEach((c, i) => {
      ScrollTrigger.create({
        trigger: c,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(c, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            delay: i * 0.15,
          });
        },
      });
    });

    labels.forEach((l, i) => {
      ScrollTrigger.create({
        trigger: l,
        start: 'top 92%',
        once: true,
        onEnter: () => {
          gsap.to(l, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power3.out',
            delay: i * 0.15 + 0.3,
          });
        },
      });
    });

    const drawLines = () => {
      lines.forEach((line, i) => {
        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          delay: i * 0.15 + 0.25,
        });
      });
    };

    ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      once: true,
      onEnter: drawLines,
    });
  }, { scope: sectionRef });

  return (
    <section id="process" ref={sectionRef} className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-[#F8F6F4] overflow-hidden paper-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative max-w-5xl mx-auto">
          <DottedBoundary dash="8,8" />
          <div className="relative z-10 px-6 md:px-10 py-6">
            <div className="mb-12 sm:mb-16 max-w-2xl">
              <p className="font-hand text-2xl sm:text-3xl text-accent mb-1" style={{ transform: 'rotate(0.5deg)' }}>
                The process
              </p>
              <h2 className="section-title">
                How it flows<span className="text-accent">.</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-y-12 sm:gap-y-16 lg:gap-y-0 gap-x-6 lg:gap-x-8 relative">
              {stages.map((s, i) => (
                <div key={s.id} className="relative flex flex-col items-center">
                  {i < stages.length - 1 && (
                    <svg
                      className="cycle-connector hidden lg:block absolute -right-[calc(50%+1.5rem)] top-[50px] w-[calc(100%+3rem)] h-24 pointer-events-none z-0"
                      viewBox="0 0 100 60"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        className="cycle-line"
                        d={connectorPaths[i] || 'M0,30 L100,30'}
                        stroke="var(--color-border)"
                        strokeWidth="1.5"
                        fill="none"
                        strokeDasharray="120"
                        strokeLinecap="round"
                        opacity="0.4"
                      />
                    </svg>
                  )}

                  <div className="cycle-circle relative z-10 mb-5">
                    <svg width="100" height="100" viewBox="0 0 100 100" className="overflow-visible">
                      <circle
                        cx="50" cy="50" r="47"
                        fill="none"
                        stroke="var(--color-border)"
                        strokeWidth="1"
                        opacity="0.25"
                      />
                      <circle
                        cx="50" cy="50" r="37"
                        fill="none"
                        stroke="var(--color-border)"
                        strokeWidth="1"
                        opacity="0.15"
                      />
                      <text
                        x="50" y="38"
                        textAnchor="middle"
                        fill="var(--color-text-muted)"
                        fontSize="18"
                        fontFamily="var(--font-hand)"
                        opacity="0.5"
                      >
                        {s.id}
                      </text>
                      <text
                        x="50" y="62"
                        textAnchor="middle"
                        fill="var(--color-text)"
                        fontSize="18"
                        fontFamily="var(--font-hand)"
                        fontWeight="600"
                      >
                        {s.verb}
                      </text>
                    </svg>
                  </div>

                  <div className="cycle-label text-center max-w-[260px]">
                    <p className="text-base sm:text-lg text-text-muted leading-relaxed">
                      {s.desc}
                    </p>
                    <span className="inline-block mt-3 font-hand text-lg text-text-tertiary opacity-70">
                      {s.note}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 sm:mt-20 text-center relative">
              <svg className="absolute left-1/2 -translate-x-1/2 top-0 w-40 h-10 pointer-events-none" viewBox="0 0 120 20" aria-hidden="true">
                <path
                  d="M10,15 C30,5 50,15 70,5 C90,15 110,5 115,10"
                  stroke="var(--color-border)"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.3"
                />
              </svg>
              <p className="font-hand text-lg sm:text-xl text-text-tertiary pt-10" style={{ transform: 'rotate(-0.3deg)' }}>
                Then we do it again — each time better.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
