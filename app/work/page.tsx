'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { projects } from '@/lib/projectData';

type Project = (typeof projects)[0];
type Category = 'All' | 'Websites' | 'Designs' | 'Projects' | 'Thumbnails';

const CATS: { id: Category; label: string }[] = [
  { id: 'All',        label: 'All Work'   },
  { id: 'Websites',   label: 'Websites'   },
  { id: 'Designs',    label: 'Designs'    },
  { id: 'Projects',   label: 'Projects'   },
  { id: 'Thumbnails', label: 'Thumbnails' },
];

const webShot = (url: string) =>
  `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;

const ytThumb = (url: string) => {
  const id = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : '';
};

/* ── Icons ── */

function IconArrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

/* ── Image Lightbox (for Designs) ── */

function ImageLightbox({ project, onClose }: { project: Project; onClose: () => void }) {
  const allImages = [project.image, ...(project.images ?? [])].filter(Boolean);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIdx(p => (p + 1) % allImages.length);
      if (e.key === 'ArrowLeft') setIdx(p => (p - 1 + allImages.length) % allImages.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, allImages.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      <motion.div
        key={idx}
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full h-full max-w-5xl max-h-[85vh] flex items-center justify-center"
      >
        <img
          src={allImages[idx]}
          alt=""
          className="max-w-full max-h-full w-auto h-auto object-contain drop-shadow-2xl"
        />
      </motion.div>

      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-colors"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {allImages.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); setIdx(p => (p - 1 + allImages.length) % allImages.length); }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setIdx(p => (p + 1) % allImages.length); }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2">
            {allImages.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setIdx(i); }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === idx ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}

/* ── Case Study Modal ── */

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [webLoaded, setWebLoaded] = useState(false);
  const [webError, setWebError] = useState(false);

  const heroSrc = useMemo(() => {
    if (project.category === 'Websites' && project.url && !webError) return webShot(project.url);
    return project.image;
  }, [project, webError]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <motion.div
        initial={{ scale: 0.92, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 20, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-bg border border-border/30 rounded-2xl sm:rounded-3xl shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-border/40 shadow-lg text-text-muted hover:text-text transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[11px] font-mono tracking-[0.15em] uppercase px-3 py-1.5 rounded-full border border-border/30 text-text-muted bg-surface/50">
              {project.category}
            </span>
            <span className="text-[11px] font-mono tracking-wider text-text-tertiary">
              {project.month} {project.year}
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-[700] tracking-[-0.03em] text-text leading-[1.05] mb-3">
            {project.title}
          </h2>
          <p className="text-lg sm:text-xl text-text-muted mb-6">
            {project.subtitle}
          </p>

          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border/20 bg-surface mb-8">
            <Image
              src={heroSrc}
              alt={project.title}
              fill
              className={`object-cover transition-opacity duration-500 ${webLoaded || project.category !== 'Websites' ? 'opacity-100' : 'opacity-0'}`}
              sizes="(max-width: 1200px) 100vw, 900px"
              onLoad={() => setWebLoaded(true)}
              onError={() => {
                if (project.category === 'Websites' && !webError) setWebError(true);
              }}
            />
            {!webLoaded && project.category === 'Websites' && !webError && (
              <div className="absolute inset-0 flex items-center justify-center bg-surface">
                <div className="flex flex-col items-center gap-2">
                  <svg className="w-5 h-5 text-text-muted/40 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-text-muted/30">Loading preview</span>
                </div>
              </div>
            )}
          </div>

          <p className="text-base sm:text-lg text-text-muted leading-relaxed max-w-2xl mb-8">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-3">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-sm font-bold rounded-full hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 hover:shadow-accent/30"
              >
                Visit Project <IconArrow className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Filter Pills ── */

function FilterPills({ active, onChange }: { active: Category; onChange: (c: Category) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATS.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`relative px-4 py-2 text-sm font-medium tracking-tight rounded-xl transition-all duration-300 ${
            active === cat.id
              ? 'bg-stone-900 text-white shadow-md'
              : 'bg-white/70 text-stone-500 border border-stone-200/60 hover:border-stone-300 hover:text-stone-800'
          }`}
        >
          <span className="relative z-10">{cat.label}</span>
        </button>
      ))}
    </div>
  );
}

/* ── Thumbnail Card ── */

function ThumbnailCard({ url, title }: { url: string; title: string }) {
  const thumb = ytThumb(url);
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.a
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-2xl border border-stone-200/60 bg-white aspect-video block"
    >
      {thumb && (
        <Image
          src={thumb}
          alt={title}
          fill
          className={`object-cover transition-all duration-700 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          sizes="(max-width: 640px) 100vw, 33vw"
          onLoad={() => setLoaded(true)}
        />
      )}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-400" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
          <svg className="w-5 h-5 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </motion.a>
  );
}

/* ── Empty State ── */

function EmptyState({ category }: { category: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-36 text-center"
    >
      <p className="font-display text-2xl sm:text-3xl font-[700] text-stone-300 tracking-[-0.02em]">
        Coming soon
      </p>
      <p className="text-sm text-stone-400 mt-3">We&rsquo;re crafting something for this space.</p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   WORK PAGE
════════════════════════════════════════════════════════════ */

export default function WorkPage() {
  const [cat, setCat] = useState<Category>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<Project | null>(null);

  const filtered = useMemo(
    () =>
      cat === 'All'
        ? projects.filter(p => p.category !== 'Thumbnails')
        : cat === 'Thumbnails'
        ? []
        : projects.filter(p => p.category === cat),
    [cat],
  );

  const handleOpen = (p: Project) => {
    if (p.category === 'Designs') setSelectedDesign(p);
    else setSelectedProject(p);
  };

  return (
    <>
      <Nav />
      <main className="min-h-dvh bg-bg selection:bg-accent/20">
        <section className="pt-28 sm:pt-36 pb-24 sm:pb-32">
          {/* Header */}
          <div className="max-w-[90rem] mx-auto px-6 sm:px-10 mb-12 sm:mb-16">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-400 mb-4">
                Selected work
              </p>
              <h1 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-[700] leading-[1.05] tracking-[-0.03em] text-stone-900">
                Things we&rsquo;ve built for people who care about craft.
              </h1>
            </div>
          </div>

          {/* Filters */}
          <div className="max-w-[90rem] mx-auto px-6 sm:px-10 mb-10 sm:mb-14">
            <FilterPills active={cat} onChange={setCat} />
          </div>

          {/* Grid */}
          <div className="max-w-[90rem] mx-auto px-6 sm:px-10">
            {cat === 'Thumbnails' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                <AnimatePresence mode="wait">
                  {[
                    { url: 'https://youtu.be/z-e4S3C155w', title: 'Product Showcase Reel' },
                    { url: 'https://youtu.be/-UORHKxp_xA', title: 'Behind the Build' },
                    { url: 'https://youtu.be/VUlADlxWiZo', title: 'Design Process Breakdown' },
                  ].map((yt, i) => (
                    <ThumbnailCard key={`yt-${i}`} url={yt.url} title={yt.title} />
                  ))}
                </AnimatePresence>
              </div>
            ) : !filtered.length ? (
              <AnimatePresence mode="wait">
                <EmptyState key={cat} category={cat} />
              </AnimatePresence>
            ) : (
              <AnimatePresence mode="popLayout">
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {filtered.map((p, index) => {
                    const imgSrc = p.category === 'Websites' && p.url ? webShot(p.url) : p.image;

                    return (
                      <motion.button
                        key={p.id}
                        layout
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        type="button"
                        onClick={() => handleOpen(p)}
                        className="group flex flex-col gap-4 rounded-2xl border border-stone-200/50 bg-white/50 p-4 text-left transition-all duration-300 hover:border-stone-300 hover:bg-white hover:shadow-lg hover:-translate-y-0.5 sm:p-5"
                      >
                        {/* Image */}
                        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-stone-100">
                          {imgSrc && (
                            <Image
                              src={imgSrc}
                              alt={p.title}
                              fill
                              className="object-cover transition-all duration-700 group-hover:scale-[1.03]"
                              sizes="(max-width: 640px) 100vw, 50vw"
                            />
                          )}
                          <div className="absolute inset-0 ring-1 ring-inset ring-black/[0.04] rounded-xl pointer-events-none" />
                        </div>

                        {/* Content */}
                        {p.category !== 'Designs' && (
                          <div className="flex flex-col">
  
                            <h3 className="font-display text-lg sm:text-xl font-bold tracking-[-0.02em] text-stone-900 leading-tight">
                              {p.title}
                            </h3>
                            {p.subtitle && (
                              <p className="mt-1 text-sm text-stone-500">
                                {p.subtitle}
                              </p>
                            )}
                            <p className="mt-2 text-sm leading-relaxed text-stone-500 line-clamp-2 max-w-prose">
                              {p.description}
                            </p>
                            <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-stone-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              View project
                              <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Decorative gradient */}
          <div className="fixed top-0 right-0 w-[600px] h-[600px] pointer-events-none -z-10 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-bl from-accent/5 via-transparent to-transparent rounded-full blur-3xl" />
          </div>
        </section>

        <Footer />
      </main>

      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            key={selectedProject.id}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
        {selectedDesign && (
          <ImageLightbox
            key={selectedDesign.id}
            project={selectedDesign}
            onClose={() => setSelectedDesign(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
