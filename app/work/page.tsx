'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import DottedBoundary from '@/components/patterns/DottedBoundary';
import { projects } from '@/lib/projectData';

gsap.registerPlugin(ScrollTrigger);

const months = ['January', 'February', 'March'];
const monthColors = ['#D96C4A', '#7C3AED', '#059669'];

export default function WorkPage() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    const groups = el.querySelectorAll('.month-group');
    groups.forEach((group, gi) => {
      const cards = group.querySelectorAll('.project-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 30, rotateX: 3 }, {
          opacity: 1, y: 0, rotateX: 0, duration: 0.55, ease: 'power4.out', delay: gi * 0.12 + i * 0.06,
          scrollTrigger: { trigger: card, start: 'top 92%', once: true },
        });
      });
    });
  }, { scope: sectionRef });

  return (
    <>
      <Nav />
      <main className="min-h-dvh bg-bg">
        <section ref={sectionRef} className="relative pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20 md:pb-24 bg-bg overflow-hidden paper-texture">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="relative max-w-6xl mx-auto">
              <DottedBoundary dash="8,8" />
              <div className="relative z-10 px-4 md:px-10 py-8">
                <div className="mb-14 sm:mb-18 max-w-2xl">
                  <p className="font-hand text-2xl sm:text-3xl text-accent mb-1" style={{ transform: 'rotate(-0.3deg)' }}>
                    Archive
                  </p>
                  <h1 className="font-display font-[700] text-[clamp(2.5rem,6vw,5rem)] tracking-[-0.03em] text-text leading-[1.1]">
                    Selected projects<span className="text-accent">.</span>
                  </h1>
                </div>

                <div className="space-y-14 sm:space-y-16 md:space-y-20">
                  {months.map((month, mi) => {
                    const monthProjects = projects.filter(p => p.month === month);
                    return (
                      <div key={month} className="month-group">
                        <div className="flex items-center gap-3 mb-6 sm:mb-8">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ background: monthColors[mi] }}
                          />
                          <span className="font-hand text-lg sm:text-xl" style={{ color: monthColors[mi], opacity: 0.6 }}>
                            {month}
                          </span>
                          <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${monthColors[mi]}20, transparent)` }} />
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                          {monthProjects.map((p) => (
                            <div
                              key={p.id}
                              className="project-card group relative rounded-xl overflow-hidden cursor-default bg-surface border border-border/20"
                              style={{ opacity: 0, perspective: 800 }}
                            >
                              <div className="relative h-44 sm:h-48 overflow-hidden bg-[#F5F3F0]">
                                <Image
                                  src={p.image}
                                  alt={p.title}
                                  fill
                                  className="object-cover transition-all duration-700 group-hover:scale-105"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                <span
                                  className="absolute top-3 left-3 text-[10px] font-mono tracking-[0.15em] px-2 py-0.5 rounded-full backdrop-blur-sm bg-white/20 text-white/80 border border-white/10"
                                >
                                  {p.category}
                                </span>
                              </div>

                              <div className="p-4 sm:p-5">
                                <div className="flex items-baseline gap-2 mb-1">
                                  <span className="font-hand text-sm text-text-tertiary opacity-40">
                                    {p.id}
                                  </span>
                                  <h3 className="font-display text-base sm:text-lg font-[700] tracking-[-0.02em] text-text">
                                    {p.title}
                                  </h3>
                                </div>
                                <p className="font-hand text-sm text-text-muted opacity-70 mb-1.5">
                                  {p.subtitle}
                                </p>
                                <p className="text-xs sm:text-sm text-text-tertiary leading-relaxed line-clamp-2">
                                  {p.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
