'use client';

import { useRef, useState, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import dynamic from 'next/dynamic';
import { SceneGate } from '@/lib/useInView';

gsap.registerPlugin(ScrollTrigger);

const ProcessScene = dynamic(() => import('@/components/scene/ProcessScene'), { ssr: false });

const phases = [
  { id: '01', title: 'Discovery', desc: 'We find the signal in the noise.', items: ['Competitive Benchmarking', 'User Research', 'Behavioral Mapping'], color: '#A78BFA' },
  { id: '02', title: 'Strategy', desc: 'A narrative that scales across every touchpoint.', items: ['Brand Positioning', 'Information Architecture', 'Conversion Design'], color: '#7C3AED' },
  { id: '03', title: 'Design & Build', desc: 'High-fidelity, radical minimalism. Every pixel counts.', items: ['Design Systems', 'UI/UX Development', 'Motion Design'], color: '#DDD6FE' },
  { id: '04', title: 'Launch & Iterate', desc: 'Ship fast, measure, improve.', items: ['Performance Optimization', 'Analytics Setup', 'Ongoing Support'], color: '#FF8A65' },
];

function PhaseNode({ phase }: { phase: typeof phases[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<SVGTextElement>(null);
  const [reduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useGSAP(() => {
    if (reduced || !numRef.current) return;
    const target = parseInt(phase.id);
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target, duration: 2.5, ease: 'power4.out',
      scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      onUpdate: () => { numRef.current!.textContent = String(Math.round(obj.val)).padStart(2, '0'); },
    });
  }, { dependencies: [reduced, phase.id] });

  return (
    <div ref={ref} className="phase-node group relative flex flex-col items-center text-center">
      <div className="relative mb-6">
        <svg width="56" height="56" viewBox="0 0 56 56" className="transition-transform duration-500 group-hover:scale-110">
          <circle cx="28" cy="28" r="26" fill="none" stroke={phase.color} strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="28" cy="28" r="20" fill={phase.color} fillOpacity="0.12" />
          <text ref={numRef} x="28" y="28" textAnchor="middle" dominantBaseline="central" fill={phase.color} fillOpacity="0.85" fontSize="20" fontFamily="var(--font-mono)" fontWeight="700">
            {phase.id}
          </text>
        </svg>
      </div>

      <h3 className="text-xl font-semibold text-text mb-2">{phase.title}</h3>
      <p className="text-sm text-text-muted leading-relaxed max-w-xs">{phase.desc}</p>

      <ul className="mt-5 space-y-1.5 text-left">
        {phase.items.map((item) => (
          <li key={item} className="text-xs text-text-muted/60 font-mono flex items-center gap-2">
            <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: phase.color }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const nodes = gridRef.current?.querySelectorAll('.phase-node');
    if (!nodes || !nodes.length) return;
    gsap.fromTo(nodes, { opacity: 0, y: 50 }, {
      opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power4.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
    });
  }, { scope: sectionRef });

  return (
    <section id="process" ref={sectionRef} className="relative py-28 md:py-36 px-6 bg-surface section-frame overflow-hidden">
      <SceneGate>
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <Suspense fallback={null}>
            <ProcessScene />
          </Suspense>
        </div>
      </SceneGate>

      <div className="absolute inset-0 bg-gradient-to-t from-accent/5 via-transparent to-accent-warm/5 pointer-events-none" />
      <span className="section-number hidden lg:block">04</span>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-2xl mb-20 section-corner">
          <p className="text-sm text-accent-dark tracking-[0.2em] uppercase mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-accent-dark/40" />
            <span className="font-hand text-base lowercase tracking-normal">from spark</span>
            <span className="font-mono">to launch</span>
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] text-text">
            How ideas become <span className="text-shimmer">reality</span><span className="text-accent">.</span>
          </h2>
          <p className="text-lg text-text-muted mt-4 max-w-md leading-relaxed">
            Four movements. One rhythm. Every project flows through the same proven arc — from raw insight to living product.
          </p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-6">
          {phases.map((phase) => (
            <PhaseNode key={phase.id} phase={phase} />
          ))}
        </div>
      </div>
    </section>
  );
}
