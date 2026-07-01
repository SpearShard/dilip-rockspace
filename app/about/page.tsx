'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    title: 'Design is strategy',
    desc: 'We don\'t decorate. Every color, grid, and motion has a reason. If it doesn\'t serve the problem, it doesn\'t ship.',
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
  },
  {
    title: 'Code that scales',
    desc: 'We architect systems, not pages. Components before layouts. Performance is a feature, not an afterthought.',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  },
  {
    title: 'Automation as instinct',
    desc: 'If a task repeats, we automate it. AI agents, pipelines, smart workflows — we build the machines that build the work.',
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
  {
    title: 'Motion that matters',
    desc: 'Animation isn\'t flair — it\'s function. We use motion to guide, to respond, to make interfaces feel alive.',
    icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z',
  },
];

const people = [
  {
    name: 'Debasis',
    role: 'Founder · Design',
    desc: 'Brand identity, visual systems, motion direction. He shapes brands that feel inevitable.',
    initials: 'DM',
    img: '/debasispfp.png',
  },
  {
    name: 'Jayaditya',
    role: 'Co-founder · Code',
    desc: 'React, WebGL, TypeScript. He turns design into living interfaces. Buttery smooth.',
    initials: 'GJ',
    img: '/jayadityapfp.png',
  },
  {
    name: 'Dilip',
    role: 'Polymath · Systems',
    desc: 'AI agents, automated workflows, data pipelines. Efficiency that feels like magic.',
    initials: 'DP',
    img: '/dilippfp.png',
  },
];

const stats = [
  { label: 'Projects shipped', value: '20+' },
  { label: 'Team size', value: '3' },
  { label: 'Years combined', value: '15+' },
  { label: 'Industries served', value: '6+' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

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

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    const pillars = el.querySelectorAll('.pillar-card');
    pillars.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        }
      );
    });

    const cards = el.querySelectorAll('.person-card');
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        }
      );
    });

    const statCards = el.querySelectorAll('.stat-card');
    statCards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: i * 0.08,
          scrollTrigger: { trigger: card, start: 'top 90%', once: true },
        }
      );
    });

    const manifesto = el.querySelector('.manifesto');
    if (manifesto) {
      gsap.fromTo(
        manifesto,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: manifesto, start: 'top 88%', once: true },
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <>
      <Nav />
      <main className="min-h-dvh bg-bg selection:bg-accent/20">
        <section ref={sectionRef} className="relative pt-28 sm:pt-36 pb-24 sm:pb-32 bg-bg overflow-hidden">
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none -z-10 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-bl from-accent/5 via-transparent to-transparent rounded-full blur-3xl" />
          </div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none -z-10 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-warm/5 via-transparent to-transparent rounded-full blur-3xl" />
          </div>

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

          {/* Header */}
          <div ref={headerRef} className="max-w-[90rem] mx-auto px-6 sm:px-10 mb-16 sm:mb-20">
            <div className="max-w-3xl">
              <p className="gsap-reveal font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-text-muted/50 mb-3 sm:mb-4">
                Who we are
              </p>
              <h1 className="gsap-reveal font-display font-[700] text-[clamp(2.5rem,7vw,5.5rem)] tracking-[-0.04em] text-text leading-[0.95]">
                Three paths<span className="text-accent">.</span><br />
                <span className="text-text-muted/40">One collision</span>
              </h1>
              <p className="gsap-reveal mt-5 sm:mt-6 text-base sm:text-lg text-text-muted max-w-xl leading-relaxed">
                Design, code and systems from Bengaluru. We&rsquo;re a tight team that moves fast, thinks deep, and ships work that holds up.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="max-w-[90rem] mx-auto px-6 sm:px-10 mb-20 sm:mb-24">
            <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((s) => (
                <div key={s.label} className="stat-card text-center p-5 sm:p-6 rounded-2xl bg-surface border border-border/20" style={{ opacity: 0 }}>
                  <span className="block font-display text-2xl sm:text-3xl font-[700] text-text tracking-[-0.02em]">
                    {s.value}
                  </span>
                  <span className="text-xs sm:text-sm text-text-muted mt-1 block font-mono tracking-wide">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Our edge — pillars */}
          <div className="max-w-[90rem] mx-auto px-6 sm:px-10 mb-20 sm:mb-24">
            <div className="max-w-4xl mx-auto">
              <div className="mb-10 sm:mb-12">
                <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-text-muted/50 mb-3">
                  Our edge
                </p>
                <h2 className="font-display font-[700] text-[clamp(1.8rem,4vw,3rem)] tracking-[-0.03em] text-text leading-[1.1]">
                  Why we&rsquo;re different<span className="text-accent">.</span>
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                {pillars.map((p) => (
                  <div
                    key={p.title}
                    className="pillar-card group relative bg-white border border-border/20 rounded-2xl p-6 sm:p-7 md:p-8 shadow-sm hover:shadow-lg transition-all duration-500"
                    style={{ opacity: 0 }}
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4 sm:mb-5 transition-all duration-500 group-hover:scale-110 group-hover:bg-accent/15">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <path d={p.icon} />
                      </svg>
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-[700] text-text tracking-[-0.02em] mb-2 sm:mb-3">
                      {p.title}
                    </h3>
                    <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                      {p.desc}
                    </p>
                    <div className="absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none"
                      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'inset 0 0 0 1px #D96C4A25'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'inset 0 0 0 1px transparent'; }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Manifesto */}
          <div className="max-w-[90rem] mx-auto px-6 sm:px-10 mb-20 sm:mb-24">
            <div className="max-w-4xl mx-auto">
              <div className="manifesto relative bg-surface border border-border/20 rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-14 text-center" style={{ opacity: 0 }}>
                <span className="block font-display text-[5rem] sm:text-[7rem] text-accent/5 leading-none select-none tracking-[-0.06em]">
                  &ldquo;
                </span>
                <div className="max-w-2xl mx-auto mt-[-1.5em]">
                  <p className="font-display text-xl sm:text-2xl md:text-3xl text-text leading-snug font-[600] tracking-[-0.02em]">
                    We don&rsquo;t take shortcuts. We take the right path.
                  </p>
                  <p className="text-base sm:text-lg text-text-muted leading-relaxed mt-4 sm:mt-5 max-w-lg mx-auto">
                    Every project gets the same intensity whether it&rsquo;s a landing page or a platform. Because good work isn&rsquo;t about scale. It&rsquo;s about care.
                  </p>
                </div>
                <div className="flex justify-center gap-1.5 mt-6 sm:mt-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/30" />
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-warm/30" />
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/30" />
                </div>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="max-w-[90rem] mx-auto px-6 sm:px-10">
            <div className="max-w-4xl mx-auto">
              <div className="mb-10 sm:mb-12">
                <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-text-muted/50 mb-3">
                  The team
                </p>
                <h2 className="font-display font-[700] text-[clamp(1.8rem,4vw,3rem)] tracking-[-0.03em] text-text leading-[1.1]">
                  The people behind it<span className="text-accent">.</span>
                </h2>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
                {people.map((person) => (
                  <div
                    key={person.name}
                    className="person-card group relative bg-white border border-border/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500"
                    style={{ opacity: 0 }}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                      <Image
                        src={person.img}
                        alt={person.name}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />
                    </div>
                    <div className="p-5 sm:p-6">
                      <div className="flex items-baseline gap-2 mb-1">
                        <h3 className="font-display text-lg sm:text-xl font-[700] text-text tracking-[-0.02em]">
                          {person.name}
                        </h3>
                      </div>
                      <p className="text-[10px] sm:text-xs font-mono tracking-[0.1em] uppercase text-text-tertiary mb-2 sm:mb-3">
                        {person.role}
                      </p>
                      <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                        {person.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
