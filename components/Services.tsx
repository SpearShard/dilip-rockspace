'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { IconArrow } from '@/lib/icons';
import SectionLabel from '@/components/micro/SectionLabel';
import Magnetic from '@/components/micro/Magnetic';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: 'Brand & Identity', outcome: 'Look inevitable on day one.', tag: 'Identity' as const },
  { title: 'Web & Product', outcome: 'Sites and apps built to convert.', tag: 'Engineering' as const },
  { title: 'AI & Systems', outcome: 'Workflows that scale without you.', tag: 'Systems' as const },
  { title: 'Motion & 3D', outcome: 'Moments people remember.', tag: 'Motion' as const },
  { title: 'Strategy', outcome: 'Positioning before pixels.', tag: 'Strategy' as const },
  { title: 'Pitch & Narrative', outcome: 'Decks that close rooms.', tag: 'Comms' as const },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.querySelectorAll('.service-card').forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: i * 0.05,
        scrollTrigger: { trigger: card, start: 'top 90%', once: true },
      });
    });
  }, { scope: sectionRef });

  return (
    <section id="services" ref={sectionRef} className="bg-surface">
      <div className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="max-w-2xl mb-14">
            <SectionLabel className="mb-4">What we sell</SectionLabel>
            <h2 className="section-heading">Everything you need to win before your competitors catch up.</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s) => (
              <div key={s.title} className="service-card surface-card card-hover p-7 group" style={{ opacity: 0 }}>
                <span className="font-mono text-[10px] uppercase tracking-wider text-text-tertiary">{s.tag}</span>
                <h3 className="text-heading-sm text-text mt-3 mb-2">{s.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{s.outcome}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <Magnetic strength={0.15}>
              <Link href="/work" className="btn-outline">
                See it in the wild <IconArrow />
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
