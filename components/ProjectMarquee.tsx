'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { projects } from '@/lib/projectData';
import SectionLabel from '@/components/micro/SectionLabel';

export default function ProjectMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    const items = track.children;
    if (!items.length) return;

    const totalW = Array.from(items).reduce((sum, el) => sum + (el as HTMLElement).offsetWidth + 16, 0);

    gsap.to(track, {
      x: -totalW / 2,
      duration: 40,
      ease: 'none',
      repeat: -1,
    });

    track.addEventListener('mouseenter', () => {
      gsap.to(track, { timeScale: 0.3, duration: 0.4, ease: 'power2.out' });
    });
    track.addEventListener('mouseleave', () => {
      gsap.to(track, { timeScale: 1, duration: 0.6, ease: 'power2.out' });
    });
  }, []);

  const items = [...projects.slice(0, 12), ...projects.slice(0, 12)];

  return (
    <section className="bg-bg border-t border-border/50 overflow-hidden">
      <div className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-10">
          <SectionLabel>Featured work</SectionLabel>
        </div>
        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

          <div ref={trackRef} className="flex gap-4" style={{ width: 'max-content' }}>
            {items.map((p, i) => (
              <div
                key={`${p.id}-${i}`}
                className="shrink-0 w-[280px] sm:w-[320px] h-[200px] sm:h-[240px] rounded-2xl border border-border/40 bg-surface overflow-hidden relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10" />
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${p.image})`, backgroundColor: '#f5f5f5' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-xs font-mono uppercase tracking-wider text-white/70">{p.category}</p>
                  <p className="text-sm font-semibold-ui text-white mt-0.5">{p.title || p.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
