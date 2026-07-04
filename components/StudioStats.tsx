'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 20, suffix: '+', label: 'Projects shipped' },
  { value: 6, suffix: '+', label: 'Industries served' },
  { value: 3, suffix: '', label: 'Core team' },
  { value: 15, suffix: '+', label: 'Years combined' },
];

export default function StudioStats() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    el.querySelectorAll('.stat-number').forEach((stat) => {
      const target = parseInt(stat.getAttribute('data-target') || '0', 10);

      gsap.fromTo(
        stat,
        { textContent: 0 },
        {
          textContent: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stat,
            start: 'top 90%',
            once: true,
          },
          snap: { textContent: 1 },
        },
      );
    });

    el.querySelectorAll('.stat-item').forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: i * 0.1,
          scrollTrigger: { trigger: item, start: 'top 90%', once: true },
        },
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="bg-surface border-t border-border/50">
      <div className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((s) => (
              <div key={s.label} className="stat-item text-center" style={{ opacity: 0 }}>
                <p className="stat-value text-text">
                  <span
                    className="stat-number inline-block"
                    data-target={s.value}
                  >
                    0
                  </span>
                  {s.suffix}
                </p>
                <p className="font-mono text-[11px] font-medium tracking-[0.08em] text-text-tertiary mt-2 uppercase">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
