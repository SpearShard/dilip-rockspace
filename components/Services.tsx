'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: 'Brand Identity & Design', desc: 'Logo systems, visual identity, full design systems for companies that mean business.', tag: 'Brand' },
  { title: 'Web & App Development', desc: 'Next.js, React, full-stack, WebGL — engineered for performance.', tag: 'Dev' },
  { title: 'AI Automation', desc: 'Custom agents, workflow automation, internal tools that amplify your team.', tag: 'AI' },
  { title: 'Motion & Video', desc: 'Editing, animation, reels, motion graphics that stop the scroll.', tag: 'Motion' },
  { title: 'Pitch Decks & Design', desc: 'Investor decks, presentations, pitch materials that close deals.', tag: 'Deck' },
  { title: 'Content & Thumbnails', desc: 'YouTube thumbnails, social assets, templates optimized for engagement.', tag: 'Content' },
];

function ServiceCard({ s }: { s: typeof services[number] }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      className="group relative p-8 rounded-2xl border border-border bg-surface/80 backdrop-blur-sm transition-all duration-500 h-full overflow-hidden cursor-default"
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(167,139,250,0.15), transparent 60%)',
        }}
      />
      <div className="relative z-10">
        <span className="text-[10px] font-mono text-accent-dark tracking-wider uppercase">{s.tag}</span>
        <h3 className="text-xl font-semibold text-text mt-4 mb-3 group-hover:text-accent-dark transition-colors">{s.title}</h3>
        <p className="text-sm text-text-muted leading-relaxed">{s.desc}</p>
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gridRef.current?.querySelectorAll('.service-card');
    if (!cards || !cards.length) return;
    gsap.fromTo(cards, { opacity: 0, y: 60, scale: 0.9 }, {
      opacity: 1, y: 0, scale: 1,
      duration: 0.9, stagger: 0.08, ease: 'power4.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
    });
  }, { scope: sectionRef });

  return (
    <section id="services" ref={sectionRef} className="relative py-28 md:py-36 px-6 section-frame overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent-warm/5 pointer-events-none" />
      <span className="section-number hidden lg:block">02</span>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 section-corner">
          <p className="text-xs font-mono text-accent-dark tracking-[0.2em] uppercase mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-accent-dark/40" />
            What we do
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-text">
            Services<span className="text-accent">.</span>
          </h2>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <div key={s.title} className="service-card">
              <ServiceCard s={s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
