'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  { title: 'Listen', copy: 'We decode the problem, the audience, and the business opportunity before we touch a screen.', note: 'Context' },
  { title: 'Shape', copy: 'We frame the experience, messaging, and visual direction as one coherent system.', note: 'Direction' },
  { title: 'Build', copy: 'We design and develop in tandem so the interface feels as intelligent as the strategy.', note: 'Execution' },
  { title: 'Refine', copy: 'We launch fast, measure what matters, and polish the experience until it compounds.', note: 'Growth' },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      '.process-card',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.1 }
    );
  }, { scope: sectionRef });

  return (
    <section id="process" ref={sectionRef} className="relative py-24 sm:py-28 lg:py-32">
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">The process</p>
          <h2 className="mt-4 font-display text-3xl leading-tight tracking-[-0.03em] text-stone-900 sm:text-4xl">
            A deliberate system for work that carries weight.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-4">
          {stages.map((stage, index) => (
            <div key={stage.title} className="process-card glass-panel rounded-[1.5rem] border border-black/5 p-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-400">0{index + 1}</span>
                <span className="text-sm font-medium text-stone-500">{stage.note}</span>
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-stone-900">{stage.title}</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">{stage.copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-black/5 bg-white/70 p-8 shadow-[0_18px_70px_rgba(23,18,15,0.06)] sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-lg leading-8 text-stone-600">
              We keep the process focused, transparent, and calm so your team can stay in motion while we do the heavy lifting.
            </p>
            <div className="rounded-full border border-black/10 bg-stone-900 px-4 py-2 text-sm font-semibold text-white">
              Fast, thoughtful, collaborative
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
