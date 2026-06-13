'use client';

import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: 'Frontend Engineering', desc: 'React, Next.js, TypeScript, GSAP, WebGL — we build pixel-perfect browser interfaces.' },
  { title: 'Brand Identity', desc: 'From logomarks to design systems. We craft visual languages that stick.' },
  { title: 'Motion Design', desc: 'LOTTIE, Rive, GSAP timelines. Every interaction tells a story.' },
  { title: '3D Experiences', desc: 'Three.js, R3F, shaders. Immersive web for product showcases.' },
];

const stats = [
  { value: 15, suffix: '+', label: 'Projects engineered' },
  { value: 3, suffix: '', label: 'Core stack pillars' },
  { value: 100, suffix: '%', label: 'Commitment to craft' },
];

const timeline = [
  { year: '01', title: 'Discovery', desc: 'Understand the problem, the user, and the constraints. Research, audit, scope.' },
  { year: '02', title: 'Architect', desc: 'Structure, component tree, data flow, and animation strategy. Blueprint phase.' },
  { year: '03', title: 'Build & Ship', desc: 'Iterative development, code reviews, performance tuning. Deploy with confidence.' },
  { year: '04', title: 'Evolve', desc: 'Monitor, iterate, and scale. The launch is just the beginning.' },
];

const methods = [
  { title: 'Atomic Design', desc: 'Building UIs from the molecule up for consistency at scale.' },
  { title: 'Performance First', desc: 'Lighthouse 95+, bundle splitting, and early data fetching.' },
  { title: 'Motion Skeleton', desc: 'Animations are not decoration — they are part of the structure.' },
  { title: 'Open Source', desc: 'We contribute back. Tools, utilities, and lessons learned.' },
];

const team = [
  { name: 'AD', role: 'Founder, Design & Code', emoji: '⚡' },
  { name: 'RK', role: 'Frontend Engineer', emoji: '🛠' },
  { name: 'SM', role: '3D Artist', emoji: '🌀' },
];

function ThreeBackground({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const count = 1200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;

      const c = new THREE.Color().setHSL(0.4 + Math.random() * 0.1, 0.8, 0.4 + Math.random() * 0.3);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 8;

    let mouseX = 0, mouseY = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouse);

    const container = containerRef.current;
    const observer = new ResizeObserver(() => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });
    observer.observe(container);

    let frame: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();

      particles.rotation.x = Math.sin(t * 0.03) * 0.1 + mouseY * 0.02;
      particles.rotation.y = Math.sin(t * 0.02) * 0.15 + mouseX * 0.03;

      const positions2 = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions2[i3 + 1] += Math.sin(t * 0.5 + i * 0.01) * 0.0005;
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMouse);
      observer.disconnect();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

function GlitchText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    const interval = setInterval(() => {
      if (Math.random() > 0.05) return;
      const spans = el.querySelectorAll('.glitch-char');
      spans.forEach((span) => {
        const s = span as HTMLElement;
        if (Math.random() > 0.15) {
          s.textContent = s.dataset.original || '';
          return;
        }
        s.textContent = chars[Math.floor(Math.random() * chars.length)];
        setTimeout(() => { s.textContent = s.dataset.original || ''; }, 60);
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <h2 ref={ref} className={className}>
      {text.split('').map((ch, i) => (
        <span key={i} className="glitch-char" data-original={ch}>{ch}</span>
      ))}
    </h2>
  );
}

function CountUp({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            textContent: value,
            duration: 1.5,
            ease: 'power3.out',
            snap: { textContent: 1 },
            onUpdate: () => {
              el!.textContent = Math.round(Number(el!.textContent || 0)).toString() + suffix;
            },
          });
        },
      });
    }, el);
    return () => ctx.revert();
  }, [value, suffix]);

  useEffect(() => {
    if (ref.current) ref.current.textContent = '0' + suffix;
  }, [suffix]);

  return (
    <div className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
      <p ref={ref} className="text-3xl sm:text-4xl md:text-5xl font-[700] text-[#00FF88] font-display tracking-tight">0{suffix}</p>
      <p className="text-xs sm:text-sm text-white/40 mt-2 leading-relaxed">{label}</p>
    </div>
  );
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, { rotateX: -y * 8, rotateY: x * 8, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.4, ease: 'power2.out' });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ transformStyle: 'preserve-3d', perspective: 800 }}
    >
      {children}
    </div>
  );
}

export default function Brutalist() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), wheelMultiplier: 0.8 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); gsap.ticker.lagSmoothing(0); };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el, i) => {
        gsap.fromTo(el, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, delay: i * 0.04, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((parent) => {
        const children = parent.children;
        gsap.fromTo(children, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: parent, start: 'top 85%', once: true },
        });
      });

      gsap.fromTo('[data-hero-line]', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.2 });
      gsap.fromTo('[data-hero-title]', { y: 40, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power4.out', delay: 0.4 });
      gsap.fromTo('[data-hero-sub]', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.7 });
      gsap.fromTo('[data-hero-cta]', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.9 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const sectionClass = 'relative z-10 px-4 sm:px-6 py-24 sm:py-32 md:py-40';

  return (
    <div
      ref={containerRef}
      className="bg-[#0a0a0a] text-[#e0e0e0] font-mono min-h-dvh overflow-x-hidden selection:bg-[#00FF88]/20 selection:text-[#00FF88]"
    >
      <ThreeBackground containerRef={containerRef} />

      {/* Scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1]" style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,136,0.015) 2px, rgba(0,255,136,0.015) 4px)',
      }} />

      {/* CRT vignette */}
      <div className="fixed inset-0 pointer-events-none z-[1]" style={{
        background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.4) 100%)',
      }} />

      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/70 backdrop-blur-lg border-b border-[#00FF88]/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6">
          <Link href="/" className="relative group">
            <span className="text-[#00FF88] text-sm font-semibold tracking-widest">ROCKSPACE</span>
            <span className="text-white/20 text-[10px] tracking-[0.3em]">_BRUTAL</span>
            <span className="absolute -bottom-px left-0 right-0 h-px bg-[#00FF88]/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </Link>
          <nav className="hidden sm:flex items-center gap-6">
            {['work', 'services', 'method', 'team', 'contact'].map((s) => (
              <a key={s} href={`#${s}`} className="text-[11px] uppercase tracking-[0.25em] text-white/25 hover:text-[#00FF88] transition-colors relative group">
                {s}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00FF88] scale-0 group-hover:scale-100 transition-transform" />
              </a>
            ))}
          </nav>
          <a href="#contact" className="text-[11px] sm:text-[10px] px-4 py-1.5 rounded-full border border-[#00FF88]/20 text-[#00FF88] hover:bg-[#00FF88]/10 hover:border-[#00FF88]/40 transition-all tracking-[0.25em] uppercase font-mono">
            Reach out
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-dvh flex items-center justify-center px-4 sm:px-6 pt-16 z-10">
        <div className="text-center max-w-4xl mx-auto">
          <p data-hero-line className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-[#00FF88]/50 mb-4 sm:mb-6">
            {'>'} _init — IST · Bengaluru · Est. 2025
          </p>
          <h1 data-hero-title className="text-[clamp(3rem,12vw,8rem)] font-[700] tracking-[-0.05em] leading-[0.9] select-none font-display"
            style={{ textShadow: '0 0 40px rgba(0,255,136,0.15)' }}>
            ROCKSPACE
          </h1>
          <p data-hero-sub className="text-lg sm:text-xl md:text-2xl text-white/30 mt-4 sm:mt-6 max-w-2xl mx-auto leading-relaxed">
            A frontend engineering studio that builds <span className="text-[#00FF88] font-medium">expressive</span>,{' '}
            performant interfaces for the modern web.
          </p>
          <div data-hero-cta className="flex items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">
            <a href="#work" className="px-6 sm:px-8 py-3 sm:py-3.5 bg-[#00FF88] text-[#0a0a0a] text-sm font-semibold rounded-full hover:bg-[#00FF88]/90 hover:shadow-[0_0_30px_rgba(0,255,136,0.3)] transition-all tracking-wider">
              {'>'} See work
            </a>
            <a href="#contact" className="px-6 sm:px-8 py-3 sm:py-3.5 border border-white/15 text-white/60 text-sm rounded-full hover:border-white/30 hover:text-white transition-all tracking-wider">
              {'>'} Contact
            </a>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div ref={marqueeRef} className="relative z-10 py-10 sm:py-14 border-y border-[#00FF88]/5 overflow-hidden">
        <div className="flex whitespace-nowrap" style={{ maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
          <div className="marquee-inner flex gap-12 sm:gap-16 animate-marquee">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-12 sm:gap-16 items-center">
                {['React/Next.js', 'TypeScript', 'Three.js/WebGL', 'GSAP + Lenis', 'Framer Motion', 'Tailwind v4', 'Node.js', 'WebGL', 'shadcn/ui', 'Lighthouse 100', 'Rive/Lottie', 'Rust'].map((t) => (
                  <span key={t} className="text-[13px] sm:text-sm tracking-[0.3em] uppercase text-white/[0.07] whitespace-nowrap font-mono">{`// ${t}`}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <section className={sectionClass} id="work">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#00FF88]/40 mb-3">_METRICS</p>
          <GlitchText text="By the numbers" className="text-2xl sm:text-3xl md:text-4xl font-[600] tracking-[-0.03em] text-white mb-10 sm:mb-14 font-display" />
          <div data-stagger className="grid sm:grid-cols-3 gap-3 sm:gap-4">
            {stats.map((s) => (
              <CountUp key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className={sectionClass} id="services">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#00FF88]/40 mb-3">_SERVICES</p>
          <GlitchText text="What we build" className="text-2xl sm:text-3xl md:text-4xl font-[600] tracking-[-0.03em] text-white mb-10 sm:mb-14 font-display" />
          <div data-stagger className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {services.map((s, i) => (
              <TiltCard key={i}>
                <div data-reveal className="border border-white/[0.06] rounded-xl p-5 sm:p-7 bg-white/[0.015] hover:border-[#00FF88]/20 hover:bg-white/[0.03] transition-colors duration-500">
                  <p className="text-xs font-mono text-[#00FF88]/40 mb-2">{`0${i + 1}`}</p>
                  <h3 className="text-lg sm:text-xl font-[500] text-white tracking-tight mb-2 font-display">{s.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{s.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={sectionClass} id="method">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#00FF88]/40 mb-3">_PROCESS</p>
          <GlitchText text="How we ship" className="text-2xl sm:text-3xl md:text-4xl font-[600] tracking-[-0.03em] text-white mb-10 sm:mb-14 font-display" />
          <div className="relative">
            <div className="absolute left-[11px] sm:left-[13px] top-3 bottom-3 w-px bg-gradient-to-b from-[#00FF88]/30 via-[#00FF88]/10 to-transparent" />
            {timeline.map((t, i) => (
              <div key={i} data-reveal className="relative flex gap-5 sm:gap-7 pb-10 sm:pb-12 last:pb-0 group">
                <div className="relative z-10 w-5 sm:w-6 h-5 sm:h-6 rounded-full border-2 border-[#00FF88]/40 bg-[#0a0a0a] flex items-center justify-center mt-0.5 shrink-0 group-hover:border-[#00FF88] transition-colors">
                  <div className="w-2 h-2 rounded-full bg-[#00FF88]/80 group-hover:bg-[#00FF88] group-hover:shadow-[0_0_10px_rgba(0,255,136,0.5)] transition-all" />
                </div>
                <div>
                  <p className="text-xs font-mono text-[#00FF88]/40 mb-0.5">{t.year}</p>
                  <h3 className="text-lg sm:text-xl font-[500] text-white tracking-tight mb-1 font-display">{t.title}</h3>
                  <p className="text-sm text-white/30 max-w-lg leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Method */}
      <section className={sectionClass}>
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#00FF88]/40 mb-3">_METHOD</p>
          <GlitchText text="Principles" className="text-2xl sm:text-3xl md:text-4xl font-[600] tracking-[-0.03em] text-white mb-10 sm:mb-14 font-display" />
          <div data-stagger className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {methods.map((m, i) => (
              <div key={i} data-reveal className="border border-white/[0.06] rounded-xl p-5 sm:p-7 bg-white/[0.015]">
                <span className="text-xs font-mono text-[#00FF88]/40 block mb-2">{`› ${m.title}`}</span>
                <p className="text-sm text-white/40 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={sectionClass} id="team">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#00FF88]/40 mb-3">_TEAM</p>
          <GlitchText text="The engineers" className="text-2xl sm:text-3xl md:text-4xl font-[600] tracking-[-0.03em] text-white mb-10 sm:mb-14 font-display" />
          <div data-stagger className="grid sm:grid-cols-3 gap-3 sm:gap-4">
            {team.map((m, i) => (
              <TiltCard key={i}>
                <div data-reveal className="border border-white/[0.06] rounded-xl p-5 sm:p-7 bg-white/[0.015] group hover:border-[#00FF88]/20 transition-colors duration-500">
                  <p className="text-2xl sm:text-3xl mb-3">{m.emoji}</p>
                  <p className="text-lg font-[500] text-white tracking-tight font-display">{m.name}</p>
                  <p className="text-xs text-white/40 mt-1 font-mono">{m.role}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className={sectionClass} id="contact">
        <div className="max-w-6xl mx-auto">
          <div className="relative border border-[#00FF88]/10 rounded-2xl p-8 sm:p-12 md:p-16 text-center bg-[#00FF88]/[0.015] overflow-hidden group">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{ background: 'radial-gradient(800px circle at 50% 50%, rgba(0,255,136,0.04), transparent 80%)' }}
            />
            <div className="relative z-10">
              <p className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-[#00FF88]/40 mb-4 font-mono">_CONTACT</p>
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-[600] tracking-[-0.03em] text-white mb-4 font-display">
                Let&apos;s build something<span className="text-[#00FF88]">.</span>
              </h2>
              <p className="text-sm sm:text-base text-white/30 max-w-md mx-auto mb-8 leading-relaxed">
                Have a project in mind? Reach out. We&apos;ll respond within 24 hours.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <a href="mailto:hello@rockspace.in" className="px-6 sm:px-8 py-3 sm:py-3.5 bg-[#00FF88] text-[#0a0a0a] text-sm font-semibold rounded-full hover:bg-[#00FF88]/90 hover:shadow-[0_0_30px_rgba(0,255,136,0.25)] transition-all tracking-wider">
                  hello@rockspace.in
                </a>
                <a href="https://x.com/rockspace" target="_blank" rel="noopener noreferrer" className="px-6 sm:px-8 py-3 sm:py-3.5 border border-white/15 text-white/60 text-sm rounded-full hover:border-white/30 hover:text-white transition-all tracking-wider">
                  X / Twitter
                </a>
                <a href="https://github.com/rockspace" target="_blank" rel="noopener noreferrer" className="px-6 sm:px-8 py-3 sm:py-3.5 border border-white/15 text-white/60 text-sm rounded-full hover:border-white/30 hover:text-white transition-all tracking-wider">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#00FF88]/5 px-4 sm:px-6 py-8 sm:py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] sm:text-xs text-white/15 tracking-widest uppercase font-mono">
            {'>'} ROCKSPACE _IST · Bengaluru, IN
          </p>
          <p className="text-[10px] sm:text-xs text-white/[0.07] font-mono tracking-wider">
            {'>'} Engineered with React · Three.js · GSAP · Lenis · TypeScript
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
