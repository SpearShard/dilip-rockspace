'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import DotGrid from '@/components/patterns/DotGrid';
import DottedBoundary from '@/components/patterns/DottedBoundary';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: 'Brand Identity', desc: 'Visual systems, identity, design that speaks without words.' },
  { title: 'Web Development', desc: 'Sites, apps, WebGL — built to perform, built to last.' },
  { title: 'AI & Automation', desc: 'Agents, workflows, pipelines. Systemize everything.' },
  { title: 'Motion Design', desc: 'Animation, video, production that stops the scroll.' },
  { title: 'Product Strategy', desc: 'Positioning, architecture, the thinking before the making.' },
  { title: 'Narrative', desc: 'Decks, stories, presentations that actually close.' },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;
    gsap.fromTo(el.querySelectorAll('.service-card'), { opacity: 0, y: 15 }, {
      opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  }, { scope: sectionRef });

  return (
    <section id="services" ref={sectionRef} className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 bg-bg overflow-hidden">
      <DottedBoundary />
      <DotGrid spacing={28} dotSize={0.5} opacity={0.15} />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-2xl mb-10 sm:mb-14">
          <p className="text-[10px] sm:text-xs text-accent tracking-[0.2em] uppercase mb-2 sm:mb-3 font-mono">What we do</p>
          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl">The work<span className="text-accent">.</span></h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {services.map((s) => (
            <div key={s.title} className="service-card p-4 sm:p-5 rounded-2xl border border-border bg-white card-hover cursor-default">
              <h3 className="text-xs sm:text-sm font-medium text-text">{s.title}</h3>
              <p className="text-[11px] sm:text-xs text-text-muted mt-1 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
