'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { projects } from '@/lib/projectData';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'WEB', 'BRAND', 'MOTION', '3D', 'DATA', 'VR'];

function ProjectCard({ project, isHero }: { project: typeof projects[number]; isHero: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  return (
    <div className={isHero ? 'md:col-span-2' : ''}>
      <div
        ref={ref}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="card-border group relative overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-500 cursor-pointer"
        style={{
          transform: hover ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: hover ? '0 20px 40px -12px rgba(124,58,237,0.15)' : '0 0 0 0 transparent',
        }}
      >
        {/* Image area */}
        <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-accent-light/40 to-accent/10">
          <div className="absolute inset-0 grid-pattern opacity-[0.04]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-12 h-12 md:w-14 md:h-14 transition-all duration-500" style={{ transform: hover ? 'scale(1.15)' : 'scale(1)' }}>
              <div className="absolute inset-0 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors" />
              <Image src="/rockspace.png" alt="" width={48} height={48} className="relative z-10 w-full h-full object-contain p-2.5" />
            </div>
          </div>
          <div className="absolute top-3 left-3 z-10">
            <span className="text-[10px] font-mono text-accent-dark bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-accent/20 font-medium">
              {project.category}
            </span>
          </div>
          <div className="absolute inset-0 bg-accent-dark/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-text-tertiary tracking-wider">{project.id}</span>
              <h3 className="text-base md:text-lg font-semibold text-text mt-1 group-hover:text-accent-dark transition-colors">{project.title}</h3>
              <p className="text-xs text-text-muted/70 font-mono mt-0.5">{project.subtitle}</p>
            </div>
            <span className="shrink-0 w-9 h-9 rounded-full border border-border flex items-center justify-center text-text-muted group-hover:border-accent-dark group-hover:text-accent-dark group-hover:bg-accent-light/20 transition-all duration-300">
              <span className="arrow-bounce">→</span>
            </span>
          </div>
          <p className="text-sm text-text-muted mt-3 leading-relaxed line-clamp-2">{project.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const [filter, setFilter] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll('.work-card');
    if (!cards || !cards.length) return;
    gsap.fromTo(cards, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.05, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
    });
    const pills = sectionRef.current?.querySelectorAll('.filter-pill');
    if (pills?.length) {
      gsap.fromTo(pills, { opacity: 0, y: 10 }, {
        opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      });
    }
  }, { dependencies: [filter], scope: sectionRef });

  return (
    <section id="work" ref={sectionRef} className="relative py-28 md:py-36 px-6 section-frame overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-warm/5 via-transparent to-accent/5 pointer-events-none" />
      <span className="section-number hidden lg:block">03</span>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-14 section-corner">
          <p className="text-xs font-mono text-accent-dark tracking-[0.2em] uppercase mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-accent-dark/40" />
            Our work
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] text-text">
            <span className="text-shimmer">Projects</span><span className="text-accent">.</span>
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`filter-pill px-4 py-2 text-sm rounded-full border transition-all duration-300 ${
                filter === cat
                  ? 'bg-accent-dark text-white border-accent-dark shadow-lg shadow-accent-dark/20 scale-[1.02]'
                  : 'border-border text-text-muted hover:border-accent/50 hover:text-text hover:scale-[1.02]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={i === 0 || i === 4 ? 'md:col-span-2' : ''}
              >
                <div className="work-card">
                  <ProjectCard project={project} isHero={i === 0 || i === 4} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
