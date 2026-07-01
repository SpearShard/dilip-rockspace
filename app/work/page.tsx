'use client';

import { useRef, useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { AnimatePresence, motion } from 'framer-motion';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { projects } from '@/lib/projectData';

gsap.registerPlugin(ScrollTrigger);

type Project = (typeof projects)[0];
type Category = 'All' | 'Websites' | 'Designs' | 'Projects' | 'Thumbnails';

const CATS: { id: Category; label: string }[] = [
  { id: 'All',        label: 'All Work'   },
  { id: 'Websites',   label: 'Websites'   },
  { id: 'Designs',    label: 'Designs'    },
  { id: 'Projects',   label: 'Projects'   },
  { id: 'Thumbnails', label: 'Thumbnails' },
];

const YT_LINKS: { url: string; title: string }[] = [
  { url: 'https://youtu.be/z-e4S3C155w', title: 'Product Showcase Reel' },
  { url: 'https://youtu.be/-UORHKxp_xA', title: 'Behind the Build' },
  { url: 'https://youtu.be/VUlADlxWiZo', title: 'Design Process Breakdown' },
];

const webShot = (url: string) =>
  `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;

const ghShot = (ghUrl: string) => {
  const m = ghUrl?.match(/github\.com\/([^/]+\/[^/?# ]+)/);
  return m ? `https://opengraph.githubassets.com/1/${m[1]}` : '';
};

const ytThumb = (url: string) => {
  const id = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : '';
};

const categoryMeta: Record<string, { icon: string; color: string; gradient: string }> = {
  Websites:   { icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9', color: '#D96C4A', gradient: 'from-amber-500/20 to-orange-500/10' },
  Designs:    { icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', color: '#E8B84B', gradient: 'from-yellow-500/20 to-amber-500/10' },
  Projects:   { icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', color: '#7C3AED', gradient: 'from-violet-500/20 to-purple-500/10' },
  Thumbnails: { icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z', color: '#3B82F6', gradient: 'from-blue-500/20 to-cyan-500/10' },
};

/* ── Icons ── */

function IconGH({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

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
        {/* eslint-disable-next-line @next/next/no-img-element */}
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

  const allImages = useMemo(() => {
    const extra = project.images ?? [];
    if (project.category === 'Websites' && project.url && !webError) {
      return [heroSrc, ...extra].filter(Boolean);
    }
    return [project.image, ...extra].filter(Boolean);
  }, [project, heroSrc, webError]);

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
          <p className="text-lg sm:text-xl text-text-muted mb-4 font-hand">
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
                if (project.category === 'Websites' && !webError) {
                  setWebError(true);
                }
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

          {allImages.length > 1 && (
            <div className="grid grid-cols-2 gap-3 mb-8">
              {allImages.slice(1).map((img, i) => (
                <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-border/20 bg-surface">
                  <Image
                    src={img}
                    alt={`${project.title} ${i + 2}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 400px"
                  />
                </div>
              ))}
            </div>
          )}

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
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-surface text-text text-sm font-bold rounded-full border border-border/30 hover:bg-border/20 transition-all"
              >
                <IconGH className="w-4 h-4" /> View Source
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Filter Pills ── */

function FilterPills({
  active,
  onChange,
}: {
  active: Category;
  onChange: (c: Category) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="flex flex-wrap gap-2">
      {CATS.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`relative px-5 py-2.5 text-sm font-[600] tracking-wide rounded-full transition-all duration-300 ${
            active === cat.id
              ? 'text-white shadow-lg'
              : 'text-text-muted/70 bg-surface/50 border border-border/20 hover:border-border/40 hover:text-text'
          }`}
        >
          {active === cat.id && (
            <motion.span
              layoutId="activePill"
              className="absolute inset-0 rounded-full bg-accent"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{cat.label}</span>
        </button>
      ))}
    </div>
  );
}

/* ── Featured Project Hero ── */

function FeaturedProject({ project, onClick }: { project: Project; onClick: () => void }) {
  const imgSrc = project.url ? webShot(project.url) : project.image;

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative w-full aspect-[2/1] sm:aspect-[3/1] rounded-2xl sm:rounded-3xl overflow-hidden border border-border/20 bg-surface text-left cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent z-10" />
      <Image
        src={imgSrc}
        alt={project.title}
        fill
        className="object-cover object-top transition-all duration-700 group-hover:scale-105"
        sizes="100vw"
      />
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
        <span className="inline-block text-[10px] font-mono tracking-[0.15em] uppercase px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20 shadow-lg">
          Featured Project
        </span>
      </div>
      <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 z-20">
        <p className="text-white/70 text-xs sm:text-sm font-mono tracking-wider mb-1 sm:mb-2">
          {project.category} &middot; {project.month} {project.year}
        </p>
        <h3 className="font-display text-xl sm:text-3xl lg:text-4xl font-[700] tracking-[-0.02em] text-white mb-1 sm:mb-2">
          {project.title}
        </h3>
        <p className="text-white/60 text-sm sm:text-base max-w-xl line-clamp-1">
          {project.subtitle}
        </p>
        <span className="inline-flex items-center gap-1.5 text-white/80 text-sm font-[600] mt-3 sm:mt-4 group-hover:text-white transition-colors">
          View case study <IconArrow className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </motion.button>
  );
}

/* ── Project Showcase Card ── */

function ShowcaseCard({
  project,
  size = 'medium',
  noText,
  onClick,
}: {
  project: Project;
  size?: 'large' | 'medium' | 'small' | 'tall';
  noText?: boolean;
  onClick: () => void;
}) {
  const [imgStatus, setImgStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [useFallback, setUseFallback] = useState(false);

  const imgSrc = useMemo(() => {
    if (useFallback || noText) return project.image;
    if (project.category === 'Websites' && project.url) return webShot(project.url);
    if (project.category === 'Projects' && project.githubUrl) return ghShot(project.githubUrl);
    return project.image;
  }, [project, useFallback, noText]);

  const sizeClasses = {
    large: 'col-span-1 sm:col-span-2 row-span-1 sm:row-span-1 aspect-[2/1] sm:aspect-[2.4/1]',
    medium: 'col-span-1 row-span-1 aspect-[4/3]',
    small: 'col-span-1 row-span-1 aspect-square',
    tall: 'col-span-1 row-span-2 aspect-[3/5] sm:aspect-[3/4]',
  };

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-xl sm:rounded-2xl border border-border/20 bg-surface text-left cursor-pointer ${sizeClasses[size]}`}
    >
      {/* Background image */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface to-border/10">
        {imgSrc && (
          <Image
            src={imgSrc}
            alt={project.title}
            fill
            className={`transition-all duration-700 group-hover:scale-105 ${
              noText ? 'object-contain p-2 sm:p-3' : 'object-cover object-top'
            } ${
              imgStatus === 'loaded' ? 'opacity-100' : 'opacity-0'
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onLoad={() => setImgStatus('loaded')}
            onError={() => {
              if (!useFallback && project.image) {
                setUseFallback(true);
                setImgStatus('loading');
              } else {
                setImgStatus('error');
              }
            }}
          />
        )}
      </div>

      {/* Gradient overlay — only visible on hover for non-design */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        noText
          ? 'bg-black/0 group-hover:bg-black/10 pointer-events-none'
          : 'bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100'
      }`} />

      {/* Category badge */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
        <span
          className={`inline-block text-[9px] sm:text-[10px] font-mono tracking-[0.12em] uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border transition-all duration-300 ${
            imgStatus === 'loaded'
              ? 'bg-black/30 backdrop-blur-md text-white/90 border-white/20 group-hover:bg-white/20'
              : 'bg-surface/80 text-text-muted border-border/30'
          }`}
        >
          {project.category}
        </span>
      </div>

      {/* Content — hidden for noText */}
      {!noText && (
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 z-10">
          <div className="transition-all duration-500">
            <h3 className={`font-display font-[700] tracking-[-0.02em] leading-tight transition-colors duration-500 ${
              imgStatus === 'loaded'
                ? 'text-white text-sm sm:text-base'
                : 'text-text text-sm sm:text-base'
            }`}>
              {project.title}
            </h3>
            <p className={`text-xs sm:text-sm mt-0.5 sm:mt-1 line-clamp-1 transition-colors duration-500 ${
              imgStatus === 'loaded' ? 'text-white/70' : 'text-text-muted'
            }`}>
              {project.subtitle}
            </p>
          </div>
        </div>
      )}

      {/* Zoom hint on hover for noText */}
      {noText && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center scale-50 group-hover:scale-100 transition-transform duration-300">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </div>
        </div>
      )}

      {/* Hover glow accent */}
      <div className={`absolute inset-0 rounded-xl sm:rounded-2xl ring-1 ring-inset transition-all duration-500 pointer-events-none ${
        noText
          ? 'ring-transparent group-hover:ring-accent/40'
          : 'ring-transparent group-hover:ring-accent/30'
      }`} />
    </motion.button>
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
      className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-border/20 bg-surface aspect-video block"
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
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-400" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
          <svg className="w-5 h-5 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3 left-3 right-3 z-10">
        <p className="text-white text-xs sm:text-sm font-[600] line-clamp-1 drop-shadow-lg">
          {title}
        </p>
      </div>
    </motion.a>
  );
}

/* ── Empty State ── */

const EMPTY_META: Record<string, { message: string; sub: string }> = {
  Designs: {
    message: 'Nothing here yet',
    sub: "We're sketching something new for this space.",
  },
  Projects: {
    message: 'Nothing yet',
    sub: 'Shipping something soon.',
  },
};

function EmptyState({ category }: { category: string }) {
  const meta = EMPTY_META[category] ?? {
    message: 'Coming soon',
    sub: "We're crafting something for this space.",
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-36 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-surface border border-border/30 flex items-center justify-center mb-6 shadow-sm">
        <svg className="w-6 h-6 text-text-tertiary/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d={categoryMeta[category]?.icon || 'M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'} />
        </svg>
      </div>
      <p className="font-display text-2xl sm:text-3xl font-[700] text-text-muted/60 tracking-[-0.02em]">
        {meta.message}
      </p>
      <p className="text-sm text-text-tertiary/50 mt-3">{meta.sub}</p>
    </motion.div>
  );
}

/* ── Grid Renderer ── */

const sizeFor = (category: string, index: number): 'large' | 'medium' | 'small' | 'tall' => {
  if (index === 0) return 'large';
  if (category === 'Designs' && index % 3 === 1) return 'tall';
  if (index % 4 === 3) return 'medium';
  if (index % 5 === 2) return 'small';
  return 'medium';
};

/* ═══════════════════════════════════════════════════════════
   WORK PAGE
═══════════════════════════════════════════════════════════ */

export default function WorkPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
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

  const featured = useMemo(
    () => projects.find(p => p.category === 'Websites' && p.url) || projects[0],
    [],
  );

  useGSAP(() => {
    const el = headerRef.current;
    if (!el) return;
    const items = el.querySelectorAll('.gsap-reveal');
    gsap.fromTo(
      items,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.1 }
    );
  }, []);

  return (
    <>
      <Nav />
      <main className="min-h-dvh bg-bg selection:bg-accent/20">
        <section
          ref={sectionRef}
          className="relative pt-28 sm:pt-36 pb-24 sm:pb-32 bg-bg overflow-hidden"
        >
          {/* Back home */}
          <Link
            href="/"
            className="absolute top-6 sm:top-8 left-6 sm:left-10 z-10 w-10 h-8 sm:w-12 sm:h-[38px] cursor-pointer group"
            aria-label="Go home"
          >
            <Image
              src="/Vector 2173.png"
              alt=""
              fill
              className="object-contain object-left-top brightness-0 opacity-40 group-hover:opacity-70 transition-opacity duration-300"
              sizes="48px"
            />
          </Link>

          <div ref={headerRef} className="max-w-[90rem] mx-auto px-6 sm:px-10 mb-8 sm:mb-14">
            <div className="max-w-4xl">
              <p className="gsap-reveal font-hand text-xl sm:text-2xl text-accent/80 mb-3 tracking-wide">
                Portfolio
              </p>
              <h1 className="gsap-reveal font-display font-[700] text-[clamp(2.5rem,7vw,5.5rem)] tracking-[-0.03em] text-text leading-[1.05]">
                Things we&apos;ve made<span className="text-accent">.</span>
              </h1>
              <p className="gsap-reveal mt-4 sm:mt-5 text-base sm:text-lg text-text-muted max-w-2xl leading-relaxed">
                Websites, designs, tools, and thumbnails — built with intention and crafted for impact.
              </p>
            </div>
          </div>

          {/* Featured project */}
          {cat === 'All' && featured && (
            <div className="max-w-[90rem] mx-auto px-6 sm:px-10 mb-10 sm:mb-14">
              <FeaturedProject
                project={featured}
                onClick={() => setSelectedProject(featured)}
              />
            </div>
          )}

          {/* Filters */}
          <div className="max-w-[90rem] mx-auto px-6 sm:px-10 mb-8 sm:mb-12">
            <FilterPills active={cat} onChange={setCat} />
          </div>

          {/* Grid */}
          <div className="max-w-[90rem] mx-auto px-6 sm:px-10">
            {cat === 'Thumbnails' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                <AnimatePresence mode="wait">
                  {YT_LINKS.map((yt, i) => (
                    <ThumbnailCard key={`yt-${i}`} url={yt.url} title={yt.title} />
                  ))}
                </AnimatePresence>
              </div>
            ) : !filtered.length ? (
              <AnimatePresence mode="wait">
                <EmptyState key={cat} category={cat} />
              </AnimatePresence>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                <AnimatePresence mode="popLayout">
                  {filtered.map((p, i) => {
                    if (p.category === 'Designs') {
                      return (
                        <ShowcaseCard
                          key={p.id}
                          project={p}
                          size={sizeFor(p.category, i)}
                          noText
                          onClick={() => setSelectedDesign(p)}
                        />
                      );
                    }

                    return (
                      <ShowcaseCard
                        key={p.id}
                        project={p}
                        size={sizeFor(p.category, i)}
                        onClick={() => setSelectedProject(p)}
                      />
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Decorative corner gradient */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none -z-10 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-bl from-accent/5 via-transparent to-transparent rounded-full blur-3xl" />
          </div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none -z-10 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-warm/5 via-transparent to-transparent rounded-full blur-3xl" />
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
