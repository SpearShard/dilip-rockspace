'use client';

import { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { projects } from '@/lib/projectData';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════════ */

type Project = (typeof projects)[0];
type Category = 'All' | 'Websites' | 'Designs' | 'Projects' | 'Thumbnails';

/* ═══════════════════════════════════════════════════════════
   STATIC DATA
═══════════════════════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════ */

const webShot = (url: string) =>
  `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;

const ghShot = (ghUrl: string) => {
  const m = ghUrl?.match(/github\.com\/([^/]+\/[^/?# ]+)/);
  return m ? `https://opengraph.githubassets.com/1/${m[1]}` : '';
};

const ytId = (url: string) =>
  url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1] ?? '';

const ytThumb = (url: string) => {
  const id = ytId(url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : '';
};

/* ═══════════════════════════════════════════════════════════
   MICRO ICONS
═══════════════════════════════════════════════════════════ */

function IconGH({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function IconExternal({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  );
}

function IconExpand({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}

function IconChevron({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function IconClose({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   LIGHTBOX MODAL
═══════════════════════════════════════════════════════════ */

function LightboxModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const allImages = [project.image, ...(project.images ?? [])].filter(Boolean);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 sm:p-8"
      onClick={onClose}
    >
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 p-2"
      >
        <IconClose className="w-8 h-8" />
      </button>

      <div className="relative w-full h-full max-w-7xl flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={allImages[idx]} 
          className="max-w-full max-h-full object-contain shadow-2xl" 
          alt={project.title || 'Project design view'} 
        />
        
        {allImages.length > 1 && (
          <>
            <button 
              onClick={() => setIdx((prev) => (prev - 1 + allImages.length) % allImages.length)} 
              className="absolute left-2 sm:left-6 p-3 bg-black/60 text-white rounded-full hover:bg-black/90 transition-colors backdrop-blur-md border border-white/10"
            >
              <IconChevron className="w-6 h-6" style={{ transform: 'rotate(180deg)' }} />
            </button>
            <button 
              onClick={() => setIdx((prev) => (prev + 1) % allImages.length)} 
              className="absolute right-2 sm:right-6 p-3 bg-black/60 text-white rounded-full hover:bg-black/90 transition-colors backdrop-blur-md border border-white/10"
            >
              <IconChevron className="w-6 h-6" />
            </button>
            <div className="absolute bottom-4 flex gap-2 bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === idx ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CTA BUTTON ROW
═══════════════════════════════════════════════════════════ */

function CTAButtons({ project }: { project: Project }) {
  return (
    <div className="flex gap-1.5 flex-wrap justify-end">
      {project.category === 'Projects' && project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-border/20 text-text text-[11px] font-mono tracking-wide border border-border/40 hover:bg-[#24292e] hover:text-white hover:border-transparent transition-colors duration-200"
        >
          <IconGH className="w-3.5 h-3.5 flex-shrink-0" /> Repo
        </a>
      )}
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-border/20 text-text text-[11px] font-mono tracking-wide border border-border/40 hover:bg-accent hover:text-white hover:border-transparent transition-colors duration-200"
        >
          <IconExternal className="w-3.5 h-3.5 flex-shrink-0" /> Live
        </a>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DESIGN CARD - Fully Uniform Frame
═══════════════════════════════════════════════════════════ */

function DesignCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  const allImages = useMemo(
    () => [project.image, ...(project.images ?? [])].filter(Boolean),
    [project],
  );
  const isFlow = allImages.length > 1;
  const stripRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const scrollToSlide = useCallback((i: number) => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
  }, []);

  const onStripScroll = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    if (idx !== activeIdx) setActiveIdx(idx);
  }, [activeIdx]);

  return (
    <div className="project-card group relative overflow-hidden bg-surface border border-border/20 rounded-2xl sm:rounded-3xl w-full aspect-square sm:aspect-[4/3] lg:aspect-[1.2] shadow-sm hover:shadow-xl transition-shadow duration-500">
      
      {isFlow ? (
        <div
          ref={stripRef}
          onScroll={onStripScroll}
          className="absolute inset-0 flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-none"
        >
          {allImages.map((src, i) => (
            <div key={i} className="snap-start shrink-0 w-full h-full overflow-hidden bg-black/5 flex items-center justify-center p-4">
              {/* Force object-contain so un-even images don't get chopped */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                loading={i === 0 ? 'eager' : 'lazy'}
                className="w-full h-full object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="absolute inset-0 overflow-hidden flex items-center justify-center bg-black/5 p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt=""
            loading="lazy"
            className="w-full h-full object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}

      {/* Dim overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-400 pointer-events-none z-10" />
      
      {/* Expand Click Target */}
      <button 
        onClick={onClick}
        className="absolute inset-0 w-full h-full z-10 flex items-center justify-center cursor-zoom-in outline-none"
      >
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
          <IconExpand className="w-5 h-5 text-white shadow-sm" />
        </div>
      </button>

      {/* Chevron Carousel Next Button */}
      {isFlow && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            const el = stripRef.current;
            if (el) {
              const nextScroll = el.scrollLeft + el.clientWidth;
              if (nextScroll >= el.scrollWidth - 10) {
                 el.scrollTo({ left: 0, behavior: 'smooth' });
              } else {
                 el.scrollBy({ left: el.clientWidth, behavior: 'smooth' });
              }
            }
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer outline-none"
        >
          <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/90 transition-colors">
            <IconChevron className="w-5 h-5 text-white" />
          </div>
        </button>
      )}

      {/* Dot indicators */}
      {isFlow && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          {allImages.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === activeIdx
                  ? 'w-5 h-1.5 bg-white'
                  : 'w-1.5 h-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CONTENT CARD - Premium "Floating Window" Layout
═══════════════════════════════════════════════════════════ */

function ContentCard({
  project,
  imageSrc,
}: {
  project: Project;
  imageSrc: string;
}) {
  const [imgStatus, setImgStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [useFallback, setUseFallback] = useState(false);

  // If the API fails, it will smoothly fallback to your hardcoded project.image
  const src = useFallback || !imageSrc ? project.image : imageSrc;

  return (
    <div className="project-card group relative flex flex-col overflow-hidden bg-surface border border-border/20 rounded-2xl sm:rounded-3xl w-full aspect-square sm:aspect-[4/3] lg:aspect-[1.2] shadow-sm hover:shadow-xl transition-shadow duration-500">
      
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

      {/* Header Info Section */}
      <div className="relative z-20 p-5 sm:p-6 pb-0 w-full flex-shrink-0 flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <span className="inline-block text-[10px] font-mono tracking-[0.15em] uppercase px-2.5 py-1 mb-3 rounded-full bg-text/5 text-text border border-text/10 shadow-sm">
            {project.category}
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-[700] tracking-[-0.02em] text-text leading-tight truncate">
            {project.title}
          </h3>
          <p className="text-sm text-text-muted font-hand mt-1.5 truncate">
            {project.subtitle || project.description}
          </p>
        </div>
        
        {/* CTA floats in on hover */}
        <div className="opacity-0 translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0 pt-1">
          <CTAButtons project={project} />
        </div>
      </div>

      {/* Floating Mockup Area */}
      <div className="relative z-10 flex-grow mx-4 sm:mx-6 mt-6 sm:mt-8 rounded-t-xl sm:rounded-t-2xl overflow-hidden border border-b-0 border-border/30 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] bg-surface/50 transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:scale-[1.02]">
        
        {/* Browser Top Bar Mockup */}
        <div className="h-6 sm:h-7 w-full bg-border/20 flex items-center px-3 sm:px-4 gap-1.5 border-b border-border/30 backdrop-blur-md">
          <div className="w-2 h-2 rounded-full bg-text-muted/30" />
          <div className="w-2 h-2 rounded-full bg-text-muted/30" />
          <div className="w-2 h-2 rounded-full bg-text-muted/30" />
        </div>
        
        <div className="relative w-full h-full bg-border/5">
          
          {/* Advanced Loading State */}
          {imgStatus === 'loading' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 animate-pulse bg-gradient-to-br from-transparent to-border/10">
               <svg className="w-5 h-5 text-text-muted/40 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
               </svg>
               <span className="text-[10px] font-mono tracking-widest uppercase text-text-muted/40">Fetching Live Preview</span>
            </div>
          )}

          {/* Hard Error State */}
          {imgStatus === 'error' && (
            <div className="absolute inset-0 flex items-center justify-center bg-surface">
               <span className="text-[10px] font-mono tracking-widest uppercase text-red-400/50">Preview Unavailable</span>
            </div>
          )}

          {/* Image Renderer */}
          {src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={project.title}
              loading="lazy"
              onLoad={() => setImgStatus('loaded')}
              onError={() => { 
                if (!useFallback && project.image) {
                  // If the API fails, fall back to the native project image
                  setUseFallback(true);
                  setImgStatus('loading');
                } else {
                  // If both fail, show error state
                  setImgStatus('error'); 
                }
              }}
              className={`w-full h-full object-cover object-top transition-opacity duration-700 ${imgStatus === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   THUMBNAIL CARD - Clean & Minimalist
═══════════════════════════════════════════════════════════ */

function ThumbnailCard({ url, title }: { url: string; title: string }) {
  const thumb = ytThumb(url);
  const [thumbLoaded, setThumbLoaded] = useState(false);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card group relative flex flex-col overflow-hidden bg-surface border border-border/20 rounded-2xl sm:rounded-3xl w-full aspect-video shadow-sm hover:shadow-xl transition-shadow duration-500"
    >
      <div className="relative w-full h-full bg-black/5">
        {thumb && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={thumb}
            alt={title}
            loading="lazy"
            onLoad={() => setThumbLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${thumbLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        )}

        {/* Dim overlay matching the Design Card */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-400 pointer-events-none z-10" />

        {/* Minimalist Glassy Play Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
            <svg className="w-5 h-5 text-white shadow-sm ml-0.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}

/* ═══════════════════════════════════════════════════════════
   FILTER TABS
═══════════════════════════════════════════════════════════ */

function FilterTabs({
  active,
  onChange,
}: {
  active: Category;
  onChange: (c: Category) => void;
}) {
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pillRef = useRef<HTMLSpanElement>(null);

  const movePill = useCallback(() => {
    const idx = CATS.findIndex(c => c.id === active);
    const btn = btnRefs.current[idx];
    const pill = pillRef.current;
    if (!btn || !pill) return;
    pill.style.left  = `${btn.offsetLeft}px`;
    pill.style.width = `${btn.offsetWidth}px`;
  }, [active]);

  useEffect(() => {
    const raf = requestAnimationFrame(movePill);
    window.addEventListener('resize', movePill);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', movePill); };
  }, [movePill]);

  return (
    <div className="relative inline-flex items-center bg-surface border border-border/30 rounded-full p-1.5 gap-1 max-w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden shadow-sm">
      <span
        ref={pillRef}
        className="absolute top-1.5 bottom-1.5 rounded-full pointer-events-none"
        style={{
          background: '#D96C4A',
          boxShadow: '0 4px 15px rgba(217,108,74,0.3)',
          transition: 'left 0.3s cubic-bezier(0.4,0,0.2,1), width 0.3s cubic-bezier(0.4,0,0.2,1)',
        }}
      />

      {CATS.map((cat, i) => (
        <button
          key={cat.id}
          ref={el => { btnRefs.current[i] = el; }}
          onClick={() => onChange(cat.id)}
          className={`relative z-10 whitespace-nowrap px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-[600] tracking-wide transition-colors duration-200 ${
            active === cat.id ? 'text-white' : 'text-text-muted/70 hover:text-text'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   EMPTY STATE
═══════════════════════════════════════════════════════════ */

const EMPTY_META: Record<string, { icon: string; message: string; sub: string }> = {
  Designs: {
    icon: 'M2 4a2 2 0 012-2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4z',
    message: 'Nothing here yet',
    sub: "We're sketching something new for this space.",
  },
  Projects: {
    icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    message: 'Nothing yet',
    sub: 'Shipping something soon.',
  },
};

function EmptyState({ category }: { category: string }) {
  const meta = EMPTY_META[category] ?? {
    icon: 'M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    message: 'Coming soon',
    sub: "We're crafting something for this space.",
  };
  return (
    <div className="flex flex-col items-center justify-center py-36 text-center">
      <div className="w-16 h-16 rounded-full bg-surface border border-border/30 flex items-center justify-center mb-6 shadow-sm">
        <svg className="w-6 h-6 text-text-tertiary/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d={meta.icon} />
        </svg>
      </div>
      <p className="font-display text-2xl sm:text-3xl font-[700] text-text-muted/60 tracking-[-0.02em]">
        {meta.message}
      </p>
      <p className="font-hand text-sm text-text-tertiary/50 mt-3">{meta.sub}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   WORK PAGE
═══════════════════════════════════════════════════════════ */

export default function WorkPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [cat, setCat] = useState<Category>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = useMemo(
    () =>
      cat === 'All'
        ? projects
        : cat === 'Thumbnails'
        ? []
        : projects.filter(p => p.category === cat),
    [cat],
  );

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    const cards = Array.from(el.querySelectorAll('.project-card'));
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 30, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.05,
      },
    );
  }, [cat]);

  /* ── Clean, Uniform Grid Renderer ──────────────────────── */

  const uniformGrid = (items: Project[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
      {items.map((p) => {
        if (p.category === 'Designs') {
          return (
            <DesignCard 
              key={p.id} 
              project={p} 
              onClick={() => setSelectedProject(p)}
            />
          );
        }

        const imgSrc =
          p.category === 'Websites' && p.url
            ? webShot(p.url)
            : p.category === 'Projects' && p.githubUrl
            ? ghShot(p.githubUrl)
            : p.image;

        return <ContentCard key={p.id} project={p} imageSrc={imgSrc} />;
      })}
    </div>
  );

  const renderGrid = () => {
    if (cat === 'Thumbnails') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {YT_LINKS.map((yt, i) => (
            <ThumbnailCard key={i} url={yt.url} title={yt.title} />
          ))}
        </div>
      );
    }

    if (!filtered.length) return <EmptyState category={cat} />;

    return uniformGrid(filtered);
  };

  return (
    <>
      <Nav />
      <main className="min-h-dvh bg-bg selection:bg-accent/20">
        <section
          ref={sectionRef}
          className="relative pt-28 sm:pt-36 pb-24 sm:pb-32 bg-bg overflow-hidden"
        >
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

          {/* Reduced margin-bottom here to close the gap */}
          <div className="max-w-[90rem] mx-auto px-6 sm:px-10 mb-6 sm:mb-10">
            <div className="max-w-4xl">
              <p className="font-hand text-xl sm:text-2xl text-accent/80 mb-3 tracking-wide">
                Portfolio
              </p>
              <h1 className="font-display font-[700] text-[clamp(3rem,8vw,6rem)] tracking-[-0.03em] text-text leading-[1.05]">
                Things we&apos;ve made<span className="text-accent">.</span>
              </h1>
              <p className="mt-5 sm:mt-6 text-lg sm:text-xl text-text-muted max-w-2xl leading-relaxed">
                Websites, designs, tools, and thumbnails — built with intention and crafted for impact.
              </p>
            </div>
          </div>

          {/* Reduced margin-bottom here to close the gap */}
          <div className="max-w-[90rem] mx-auto px-6 sm:px-10 mb-8 sm:mb-12">
            <FilterTabs active={cat} onChange={setCat} />
          </div>

          <div className="max-w-[90rem] mx-auto px-6 sm:px-10">
            {renderGrid()}
          </div>
        </section>

        <Footer />
      </main>

      {selectedProject && (
        <LightboxModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
}