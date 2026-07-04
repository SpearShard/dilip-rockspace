'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const offerings = [
  { title: 'Brand systems', desc: 'Identity, launch messaging, and visual language that feel effortless and premium.', tag: 'Brand' },
  { title: 'Product design', desc: 'Interfaces and flows shaped for clarity, trust, and conversion.', tag: 'Product' },
  { title: 'Web experiences', desc: 'Fast, refined sites and product surfaces designed to feel like a luxury brand.', tag: 'Web' },
  { title: 'AI workflows', desc: 'Operations, automations, and smart tools that remove friction behind the scenes.', tag: 'Automation' },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      '.service-card',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
    );
  }, { scope: sectionRef });

  return (
    <section id="services" ref={sectionRef} className="relative py-24 sm:py-28 lg:py-32">
      <div className="section-shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">Capabilities</p>
            <h2 className="mt-4 font-display text-3xl leading-tight tracking-[-0.03em] text-stone-900 sm:text-4xl">
              Premium solutions for companies that want to look unmistakable.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-stone-600">
            We build the full surface of a modern company: strategy, visuals, product, and the subtle systems that make it all feel seamless.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {offerings.map((service, index) => (
            <div key={service.title} className="service-card glass-panel group rounded-[1.6rem] border border-black/5 p-6 transition hover:-translate-y-1 hover:border-stone-300 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-400">0{index + 1}</span>
                <span className="rounded-full border border-black/5 bg-white/70 px-3 py-1 text-xs font-medium text-stone-600">{service.tag}</span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.02em] text-stone-900">{service.title}</h3>
              <p className="mt-3 text-base leading-7 text-stone-600">{service.desc}</p>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-stone-700">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Built for clarity and growth
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 rounded-[2rem] border border-black/5 bg-white/70 p-6 shadow-[0_18px_70px_rgba(23,18,15,0.06)] sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">Most requested</p>
            <p className="mt-2 font-display text-2xl text-stone-900">Launches that feel like they were always meant to exist.</p>
          </div>
          <Link href="/work" className="group inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-stone-800 hover:shadow-lg">
            See selected work
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
