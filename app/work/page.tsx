'use client';

import { useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { projects } from '@/lib/projectData';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: 'All', label: 'All Work', color: '#1C1816' },
  { id: 'Websites', label: 'Websites', color: '#D96C4A' },
  { id: 'Designs', label: 'Designs', color: '#7C3AED' },
  { id: 'Editing', label: 'Editing', color: '#059669' },
  { id: 'PPT', label: 'PPT', color: '#E8B84B' },
  { id: 'Thumbnails', label: 'Thumbnails', color: '#2563EB' },
];

// Each entry: span classes + whether the card is a row-spanning hero
// Hero cards must NOT use aspect-ratio on the image — they stretch to fill their full grid cell
const categoryGridMap: Record<string, { span: string; hero?: boolean }> = {
  '001': { span: 'md:col-span-2 md:row-span-2', hero: true },
  '004': { span: 'md:col-span-2' },
  '008': { span: 'md:col-span-2' },
  '011': { span: 'md:col-span-2' },
  '014': { span: 'md:col-span-2' },
  '020': { span: 'md:col-span-2' },
  '023': { span: 'md:col-span-2' },
};

export default function WorkPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(
    () => activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory),
    [activeCategory]
  );

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('.project-card');
    cards.forEach((card) => {
      gsap.fromTo(card, { opacity: 0, y: 40, scale: 0.97 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power4.out',
        scrollTrigger: { trigger: card, start: 'top 90%', once: true },
      });
    });
  }, [activeCategory, { scope: sectionRef }]);

  return (
    <>
      <Nav />
      <main className="min-h-dvh bg-bg">
        <section ref={sectionRef} className="relative pt-28 sm:pt-32 pb-20 sm:pb-28 bg-bg overflow-hidden">
          <Link
            href="/"
            className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10 w-10 h-8 sm:w-12 sm:h-[38px] cursor-pointer"
            aria-label="Go home"
          >
            <Image
              src="/Vector 2173.png"
              alt=""
              fill
              className="object-contain object-left-top brightness-0 opacity-30 hover:opacity-50 transition-opacity duration-200"
              sizes="48px"
            />
          </Link>

          {/* Hero header */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10 sm:mb-14">
            <div className="max-w-4xl">
              <p className="font-hand text-lg sm:text-xl text-accent/70 mb-2 tracking-wide">
                Portfolio
              </p>
              <h1 className="font-display font-[700] text-[clamp(2.8rem,7vw,5.5rem)] tracking-[-0.03em] text-text leading-[1.05]">
                Things we&apos;ve made<span className="text-accent">.</span>
              </h1>
              <p className="mt-4 sm:mt-5 text-base sm:text-lg text-text-muted max-w-xl leading-relaxed">
                Websites, brands, films, decks, thumbnails — every project is a collision of craft and intent.
              </p>
            </div>
          </div>

          {/* Category filter */}
          <div ref={filterRef} className="max-w-7xl mx-auto px-4 sm:px-6 mb-10 sm:mb-14">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm font-[700] tracking-wide transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'text-white shadow-lg'
                      : 'text-text-muted/70 hover:text-text bg-surface/50 hover:bg-surface border border-border/30'
                  }`}
                  style={{
                    background: activeCategory === cat.id ? cat.color : undefined,
                    boxShadow: activeCategory === cat.id ? `0 4px 20px ${cat.color}30` : undefined,
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

{/* Project grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* FIX 1: Removed style={{ gridAutoRows: '1fr' }} so rows size naturally 
              based on their actual content rather than blowing up to the max height.
            */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filtered.map((p) => {
                const meta = categoryGridMap[p.id];
                const gridSpan = meta?.span || '';
                const isHero = meta?.hero === true;

                return (
                  <div
                    key={p.id}
                    // FIX 2: Added conditional 'h-fit' for non-hero cards. 
                    // This strictly prevents the ugly white space stretch!
                    className={`project-card group relative rounded-2xl overflow-hidden cursor-default bg-surface border border-border/20 card-hover flex flex-col ${gridSpan} ${isHero ? '' : 'h-fit'}`}
                    style={{ opacity: 0 }}
                  >
                    {/* ── Image area ── */}
                    <div
                      className={`relative w-full overflow-hidden bg-[#F5F3F0] ${
                        isHero
                          ? 'flex-1 min-h-0'
                          : 'aspect-[4/3] flex-shrink-0'
                      }`}
                    >
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        unoptimized
                        className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />

                      {/* Subtle dark vignette always on — deeper on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-500" />

                      {/* Category badge */}
                      <span className="absolute top-3 sm:top-4 left-3 sm:left-4 text-[10px] sm:text-[11px] font-mono tracking-[0.15em] uppercase px-2.5 py-1 rounded-full backdrop-blur-md bg-white/90 text-text shadow-sm border border-border/20">
                        {p.category}
                      </span>

                      {/* Project number */}
                      <span className="absolute top-3 sm:top-4 right-3 sm:right-4 text-[11px] font-mono text-white/50 tracking-wider">
                        {p.id}
                      </span>

                      {/* Live site pill — slides up on hover */}
                      {p.url && (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-text text-[11px] font-mono tracking-wide shadow-md border border-border/20 hover:bg-accent hover:text-white hover:border-transparent"
                        >
                          <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                          </svg>
                          Live site
                        </a>
                      )}
                    </div>

                    {/* ── Content strip ── */}
                    <div className="p-4 sm:p-5 md:p-6 flex-shrink-0">
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <h3 className="font-display text-lg sm:text-xl md:text-2xl font-[700] tracking-[-0.02em] text-text leading-tight">
                          {p.title}
                        </h3>
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-text-tertiary/30 group-hover:text-accent transition-all duration-300 flex-shrink-0 mt-0.5 -translate-x-1 group-hover:translate-x-0 opacity-0 group-hover:opacity-100"
                          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                        >
                          <path d="M7 17L17 7M17 7H8M17 7V16" />
                        </svg>
                      </div>
                      <p className="font-hand text-sm sm:text-base text-text-muted/80 mb-2">
                        {p.subtitle}
                      </p>
                      <p className="text-xs sm:text-sm text-text-tertiary leading-relaxed line-clamp-2">
                        {p.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 sm:py-28">
                <p className="text-text-muted/50 font-hand text-lg">No projects found</p>
              </div>
            )}
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}