'use client';

import { useRef, useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { AnimatePresence, motion } from 'framer-motion';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { projects, workStats, featuredProjectIds } from '@/lib/projectData';

gsap.registerPlugin(ScrollTrigger);

type Project = (typeof projects)[0];
type Category = 'All' | 'Websites' | 'Designs' | 'Projects' | 'Thumbnails';

const CATS: { id: Category; label: string }[] = [
  { id: 'All', label: 'All Work' },
  { id: 'Websites', label: 'Websites' },
  { id: 'Designs', label: 'Designs' },
  { id: 'Projects', label: 'Projects' },
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

/* ── Image Lightbox ── */

function ImageLightbox({ project, onClose }: { project: Project; onClose: () => void }) {
  const allImages = [project.image, ...(project.images ?? [])].filter(Boolean);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIdx(p => (p + 1) % allImages.length);
      if (e.key === 'ArrowLeft') setIdx(p => (p - 1 + allImages.length) % allImages.length);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose, allImages.length]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black" onClick={onClose}>
      <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
        onClick={e => e.stopPropagation()} className="relative w-full h-full max-w-5xl max-h-[85vh] flex items-center justify-center p-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={allImages[idx]} alt="" className="max-w-full max-h-full w-auto h-auto object-contain" />
      </motion.div>
      <button onClick={onClose} className="absolute top-4 right-4 z-50 text-white/60 hover:text-white">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
      {allImages.length > 1 && (
        <>
          <button onClick={e => { e.stopPropagation(); setIdx(p => (p - 1 + allImages.length) % allImages.length); }} className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white/60 hover:text-white">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button onClick={e => { e.stopPropagation(); setIdx(p => (p + 1) % allImages.length); }} className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white/60 hover:text-white">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2">
            {allImages.map((_, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); setIdx(i); }}
                className={`w-2 h-2 border transition-colors ${i === idx ? 'bg-white border-white' : 'border-white/50 hover:border-white'}`} />
            ))}
          </div>
        </>
      )}
    </div>
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
    if (project.category === 'Websites' && project.url && !webError) return [heroSrc, ...extra].filter(Boolean);
    return [project.image, ...extra].filter(Boolean);
  }, [project, heroSrc, webError]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8" onClick={onClose}>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
        onClick={e => e.stopPropagation()} className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <button onClick={onClose} className="absolute top-4 right-4 z-50 text-black/40 hover:text-black">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
        <div className="p-8 sm:p-12">
          <div className="flex items-center gap-4 mb-5">
            <span className="text-[11px] font-mono tracking-[0.1em] uppercase px-3 py-1 border border-black">{project.category}</span>
            <span className="text-[11px] font-mono text-black/40">{project.month} {project.year}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-black leading-[1.02] mb-3">{project.title}</h2>
          <p className="text-lg sm:text-xl text-black/60 mb-6">{project.subtitle}</p>
          <div className="relative w-full aspect-video border border-black mb-8">
            <Image src={heroSrc} alt={project.title} fill
              className={`object-cover transition-opacity duration-500 ${webLoaded || project.category !== 'Websites' ? 'opacity-100' : 'opacity-0'}`}
              sizes="(max-width: 1200px) 100vw, 900px"
              onLoad={() => setWebLoaded(true)}
              onError={() => { if (project.category === 'Websites' && !webError) setWebError(true); }} />
            {!webLoaded && project.category === 'Websites' && !webError && (
              <div className="absolute inset-0 flex items-center justify-center bg-white">
                <span className="text-[10px] font-mono tracking-widest uppercase text-black/30">Loading preview</span>
              </div>
            )}
          </div>
          {allImages.length > 1 && (
            <div className="grid grid-cols-2 gap-3 mb-8">
              {allImages.slice(1).map((img, i) => (
                <div key={i} className="relative aspect-video border border-black">
                  <Image src={img} alt="" fill className="object-cover" sizes="(max-width: 768px) 50vw, 400px" />
                </div>
              ))}
            </div>
          )}
          <p className="text-base sm:text-lg text-black/70 leading-relaxed max-w-2xl mb-8">{project.description}</p>
          <div className="flex flex-wrap gap-3">
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-bold transition-opacity hover:opacity-80">
                Visit Project
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-black text-black text-sm font-bold transition-opacity hover:opacity-60">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                View Source
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE COMPONENTS
═══════════════════════════════════════════════════════════ */

function FilterTabs({ active, onChange }: { active: Category; onChange: (c: Category) => void }) {
  return (
    <div className="flex gap-6 sm:gap-8 border-b border-black pb-3 overflow-x-auto scrollbar-none">
      {CATS.map(cat => (
        <button key={cat.id} onClick={() => onChange(cat.id)}
          className={`text-sm font-medium tracking-wide whitespace-nowrap transition-colors pb-0.5 ${active === cat.id ? 'text-black' : 'text-black/40 hover:text-black/70'}`}
          style={{ borderBottom: active === cat.id ? '2px solid #000' : '2px solid transparent' }}>
          {cat.label}
        </button>
      ))}
    </div>
  );
}

function TrustBar() {
  return (
    <div className="flex gap-8 sm:gap-12 py-6 border-t border-b border-black">
      {workStats.map(s => (
        <div key={s.label}>
          <p className="font-display font-bold text-2xl sm:text-3xl tracking-[-0.03em] text-black">{s.value}</p>
          <p className="font-mono text-[11px] tracking-[0.08em] text-black/50 mt-0.5 uppercase">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

function FeaturedProject({ project, onClick }: { project: Project; onClick: () => void }) {
  const imgSrc = project.url ? webShot(project.url) : project.image;
  return (
    <button onClick={onClick} className="group relative w-full aspect-[2/1] sm:aspect-[3/1] bg-black text-left cursor-pointer overflow-hidden border border-black">
      <Image src={imgSrc} alt={project.title} fill className="object-cover object-top transition-opacity duration-500 group-hover:opacity-80" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
        <p className="text-white/60 text-xs sm:text-sm font-mono tracking-wider mb-1">{project.category} &middot; {project.month} {project.year}</p>
        <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-white mb-1 leading-[1.1]">{project.title}</h3>
        <p className="text-white/60 text-sm sm:text-base max-w-xl line-clamp-1">{project.subtitle}</p>
      </div>
    </button>
  );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const imgSrc = project.url ? webShot(project.url) : project.image;
  return (
    <button onClick={onClick} className="w-full text-left cursor-pointer border border-black bg-white transition-opacity hover:opacity-85">
      <div className="relative aspect-[16/10] bg-[#f5f5f5]">
        <Image src={imgSrc} alt={project.title} fill
          className={`object-cover object-top transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          sizes="(max-width: 1024px) 100vw, 50vw" onLoad={() => setLoaded(true)} />
      </div>
      <div className="p-5 border-t border-black">
        <div className="flex items-center gap-3 text-[11px] font-mono text-black/50 uppercase tracking-[0.08em] mb-1.5">
          <span>{project.category}</span>
          <span className="text-black/30">/</span>
          <span>{project.month} {project.year}</span>
        </div>
        <h3 className="font-display text-lg sm:text-xl font-bold tracking-[-0.02em] text-black leading-tight">{project.title}</h3>
        <p className="text-sm text-black/60 mt-1 line-clamp-2">{project.subtitle}</p>
      </div>
    </button>
  );
}

function DesignTile({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <button onClick={onClick} className="group relative aspect-[4/5] bg-black text-left cursor-pointer overflow-hidden border border-black">
      <Image src={project.image} alt={project.title} fill className="object-cover transition-opacity duration-500 group-hover:opacity-75" sizes="33vw" />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black">
        <p className="text-white text-sm font-medium">{project.title}</p>
      </div>
    </button>
  );
}

function OpenSourceTile({ project, onClick }: { project: Project; onClick: () => void }) {
  const imgSrc = project.githubUrl ? ghShot(project.githubUrl) : project.image;
  return (
    <button onClick={onClick} className="w-full text-left cursor-pointer border border-black bg-white transition-opacity hover:opacity-85">
      <div className="relative aspect-[16/9] bg-[#f5f5f5]">
        <Image src={imgSrc || project.image} alt={project.title} fill className="object-cover" sizes="50vw" />
      </div>
      <div className="p-5 border-t border-black">
        <span className="text-[11px] font-mono text-black/50 uppercase tracking-[0.08em]">Open source</span>
        <h3 className="font-display text-lg sm:text-xl font-bold tracking-[-0.02em] text-black mt-1">{project.title}</h3>
        <p className="text-sm text-black/60 mt-1 line-clamp-2">{project.description}</p>
      </div>
    </button>
  );
}

function ThumbnailCard({ url, title }: { url: string; title: string }) {
  const thumb = ytThumb(url);
  const [loaded, setLoaded] = useState(false);
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      className="group relative aspect-video bg-black block border border-black overflow-hidden">
      {thumb && <Image src={thumb} alt={title} fill
        className={`object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        sizes="(max-width: 640px) 100vw, 33vw" onLoad={() => setLoaded(true)} />}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-12 h-12 flex items-center justify-center border border-white/60 text-white/80">
          <svg className="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/80">
        <p className="text-white text-xs sm:text-sm font-medium line-clamp-1">{title}</p>
      </div>
    </a>
  );
}

function EmptyState({ category }: { category: string }) {
  const meta: Record<string, { message: string; sub: string }> = {
    Designs: { message: 'Nothing here yet', sub: "We're sketching something new for this space." },
    Projects: { message: 'Nothing yet', sub: 'Shipping something soon.' },
  };
  const m = meta[category] ?? { message: 'Coming soon', sub: "We're crafting something for this space." };
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-2xl font-bold text-black">{m.message}</p>
      <p className="text-sm text-black/40 mt-2">{m.sub}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   WORK PAGE
═══════════════════════════════════════════════════════════ */

export default function WorkPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [cat, setCat] = useState<Category>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<Project | null>(null);

  const filtered = useMemo(() =>
    cat === 'All' ? projects.filter(p => p.category !== 'Thumbnails')
      : cat === 'Thumbnails' ? []
      : projects.filter(p => p.category === cat), [cat]);

  const featured = useMemo(() => projects.find(p => p.id === featuredProjectIds[0]) || projects[0], []);

  const spotlight = useMemo(() =>
    featuredProjectIds.map(id => projects.find(p => p.id === id)).filter(Boolean) as Project[], []);

  const websites = useMemo(() => filtered.filter(p => p.category === 'Websites'), [filtered]);
  const designs = useMemo(() => filtered.filter(p => p.category === 'Designs'), [filtered]);
  const devProjects = useMemo(() => filtered.filter(p => p.category === 'Projects'), [filtered]);

  useGSAP(() => {
    const h = headerRef.current;
    if (!h) return;
    gsap.fromTo(h.querySelectorAll('.reveal-up'), { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.1 });
  }, []);

  return (
    <>
      <Nav />
      <main className="min-h-dvh bg-white">
        <section className="pt-28 sm:pt-36 pb-24 sm:pb-32">
          <div ref={headerRef} className="max-w-7xl mx-auto px-6 sm:px-10">
            <p className="reveal-up font-mono text-[12px] tracking-[0.1em] uppercase text-black/50 mb-4" style={{ opacity: 0 }}>
              Selected work
            </p>
            <h1 className="reveal-up font-display font-bold text-[clamp(2.5rem,6vw,4.5rem)] tracking-[-0.03em] text-black leading-[1.02] mb-4" style={{ opacity: 0 }}>
              Proof, not promises.
            </h1>
            <p className="reveal-up text-lg text-black/60 max-w-xl mb-8" style={{ opacity: 0 }}>
              Real launches for real clients. Every project here shipped and held up under scrutiny.
            </p>
            <div className="reveal-up" style={{ opacity: 0 }}>
              <TrustBar />
            </div>
          </div>

          {cat === 'All' && featured && (
            <div className="max-w-7xl mx-auto px-6 sm:px-10 mt-14 sm:mt-18">
              <FeaturedProject project={featured} onClick={() => setSelectedProject(featured)} />
            </div>
          )}

          {cat === 'All' && spotlight.length > 1 && (
            <div className="max-w-7xl mx-auto px-6 sm:px-10 mt-10">
              <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-black/50 mb-4">Spotlight</p>
              <div className="flex gap-4 overflow-x-auto scrollbar-none pb-2">
                {spotlight.slice(1).map(p => {
                  const src = p.url ? webShot(p.url) : p.image;
                  return (
                    <button key={p.id} onClick={() => setSelectedProject(p)}
                      className="w-[280px] sm:w-[320px] shrink-0 text-left border border-black bg-white hover:opacity-85 transition-opacity">
                      <div className="relative aspect-[16/10] bg-[#f5f5f5]">
                        <Image src={src} alt={p.title} fill className="object-cover object-top" sizes="320px" />
                      </div>
                      <div className="p-4 border-t border-black">
                        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-black/50">{p.category}</span>
                        <h3 className="font-display text-base font-bold tracking-[-0.02em] text-black mt-1">{p.title}</h3>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="sticky top-20 z-30 bg-white border-b border-black mt-14 sm:mt-18">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 py-3">
              <FilterTabs active={cat} onChange={setCat} />
            </div>
          </div>

          <div ref={gridRef} className="max-w-7xl mx-auto px-6 sm:px-10 mt-8">
            <div key={cat} className="animate-fade">
              {cat === 'Thumbnails' ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {YT_LINKS.map((yt, i) => (
                    <ThumbnailCard key={`yt-${i}`} url={yt.url} title={yt.title} />
                  ))}
                </div>
              ) : cat === 'All' ? (
                <div className="space-y-14">
                  {websites.length > 0 && (
                    <section>
                      <h2 className="font-display text-xl sm:text-2xl font-bold tracking-[-0.02em] text-black mb-5">Client launches</h2>
                      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                        {websites.map(p => <ProjectCard key={p.id} project={p} onClick={() => setSelectedProject(p)} />)}
                      </div>
                    </section>
                  )}
                  {designs.length > 0 && (
                    <section>
                      <h2 className="font-display text-xl sm:text-2xl font-bold tracking-[-0.02em] text-black mb-5">Visual systems</h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                        {designs.map(p => <DesignTile key={p.id} project={p} onClick={() => setSelectedDesign(p)} />)}
                      </div>
                    </section>
                  )}
                  {devProjects.length > 0 && (
                    <section>
                      <h2 className="font-display text-xl sm:text-2xl font-bold tracking-[-0.02em] text-black mb-5">Tools we shipped</h2>
                      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                        {devProjects.map(p => <OpenSourceTile key={p.id} project={p} onClick={() => setSelectedProject(p)} />)}
                      </div>
                    </section>
                  )}
                </div>
              ) : cat === 'Websites' ? (
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  {websites.map(p => <ProjectCard key={p.id} project={p} onClick={() => setSelectedProject(p)} />)}
                </div>
              ) : cat === 'Designs' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {designs.map(p => <DesignTile key={p.id} project={p} onClick={() => setSelectedDesign(p)} />)}
                </div>
              ) : cat === 'Projects' ? (
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  {devProjects.map(p => <OpenSourceTile key={p.id} project={p} onClick={() => setSelectedProject(p)} />)}
                </div>
              ) : (
                <EmptyState category={cat} />
              )}
            </div>
          </div>
        </section>

        <Footer />
      </main>

      <AnimatePresence>
        {selectedProject && <CaseStudyModal key={selectedProject.id} project={selectedProject} onClose={() => setSelectedProject(null)} />}
        {selectedDesign && <ImageLightbox key={selectedDesign.id} project={selectedDesign} onClose={() => setSelectedDesign(null)} />}
      </AnimatePresence>
    </>
  );
}
