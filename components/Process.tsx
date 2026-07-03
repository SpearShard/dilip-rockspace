'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionLabel from '@/components/micro/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { n: '01', title: 'Listen', text: 'We find the real problem, not the brief you thought you had.' },
  { n: '02', title: 'Shape', text: 'Strategy and structure. Nothing decorative.' },
  { n: '03', title: 'Build', text: 'Design, code, motion. One team, one intent.' },
  { n: '04', title: 'Ship', text: 'Launch, learn, iterate. Then do it better.' },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.querySelectorAll('.process-step').forEach((step, i) => {
      gsap.fromTo(step, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.5, delay: i * 0.08,
        scrollTrigger: { trigger: step, start: 'top 90%', once: true },
      });
    });
  }, { scope: sectionRef });

  return (
    <section id="process" ref={sectionRef} className="bg-bg border-t border-border/50">
      <div className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <SectionLabel className="mb-4">How we work</SectionLabel>
          <h2 className="section-heading mb-14">Ruthless process. Flawless execution.</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/60 rounded-2xl overflow-hidden border border-border/40">
            {steps.map((s) => (
              <div key={s.n} className="process-step bg-bg p-8 sm:p-9 group cursor-default">
                <span className="font-mono text-xs text-accent transition-transform duration-300 group-hover:translate-x-1 inline-block">{s.n}</span>
                <h3 className="text-heading-sm text-text mt-4 mb-2">{s.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
