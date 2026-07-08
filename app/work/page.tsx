'use client';

import { useState, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/lib/projectData';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CaseStudyModal from '@/components/CaseStudyModal';
import ImageLightbox from '@/components/ImageLightbox';

type Project = (typeof projects)[0];
type Category = 'All' | 'Websites' | 'Designs' | 'Projects';

const CATS: { id: Category; label: string }[] = [
  { id: 'All', label: 'All Work' },
  { id: 'Websites', label: 'Websites' },
  { id: 'Designs', label: 'Designs' },
  { id: 'Projects', label: 'Projects' },
];

const PLACEHOLDER =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750"%3E%3Crect fill="%230a0a0a" width="1200" height="750"/%3E%3C/svg%3E';

function getSrc(p: Project): string {
  if (p.category === 'Websites' && p.url) {
    return `/api/screenshot?url=${encodeURIComponent(p.url)}`;
  }
  return p.image || PLACEHOLDER;
}

export default function WorkPage() {
  const [cat, setCat] = useState<Category>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<Project | null>(null);
  const fallbackMap = useRef<Map<string, number>>(new Map());

  const filtered = useMemo(
    () =>
      cat === 'All'
        ? projects
        : projects.filter((p) => p.category === cat),
    [cat]
  );

  const handleImgError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>, p: Project) => {
      const target = e.target as HTMLImageElement;
      const attempt = fallbackMap.current.get(p.id) || 0;

      if (attempt === 0 && p.category === 'Websites' && p.image) {
        fallbackMap.current.set(p.id, 1);
        target.src = p.image;
      } else if (attempt === 1 || !p.image) {
        fallbackMap.current.set(p.id, 2);
        target.src = PLACEHOLDER;
      }
    },
    []
  );

  return (
    <main className="min-h-screen bg-[#030303] text-white">
      <Nav />

      <section className="pt-28 sm:pt-32 pb-24">
        <div className="section-shell mb-16 sm:mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-8"
          >
            03 // Selected Archives
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-[clamp(2rem,6vw,5rem)] font-bold tracking-[-0.03em] leading-none"
          >
            THINGS WE&apos;VE BUILT FOR
            <br />
            <span className="text-white/30">
              PEOPLE WHO CARE ABOUT CRAFT.
            </span>
          </motion.h1>
        </div>

        <div className="section-shell mb-12 sm:mb-16">
          <div className="flex flex-wrap gap-3">
            {CATS.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`px-6 sm:px-8 py-3 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-500 border ${
                  cat === c.id
                    ? 'bg-white text-black border-white'
                    : 'border-white/10 text-white/50 hover:border-white/50'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="section-shell">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <motion.button
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() =>
                    p.category === 'Designs'
                      ? setSelectedDesign(p)
                      : setSelectedProject(p)
                  }
                  className="group relative flex flex-col gap-4 sm:gap-6 text-left"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl sm:rounded-2xl bg-[#0a0a0a]">
                    <img
                      src={getSrc(p)}
                      alt={p.title}
                      className="object-cover w-full h-full filter grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                      onError={(e) => handleImgError(e, p)}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>

                  <div className="px-1">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1.5 group-hover:text-white/80 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-[10px] text-white/40 font-mono uppercase tracking-[0.3em]">
                      {p.category}
                    </p>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Footer />

      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
        {selectedDesign && (
          <ImageLightbox
            project={selectedDesign}
            onClose={() => setSelectedDesign(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
