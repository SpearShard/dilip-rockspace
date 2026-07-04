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
    title: 'Design as strategy',
    desc: 'We don’t decorate for decoration’s sake. Every detail carries a decision, a message, or a commercial purpose.',
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
  },
  {
    title: 'Systems that scale',
    desc: 'We shape interfaces as durable systems — consistent, fast, and easy to expand without losing clarity.',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  },
  {
    title: 'Automation by instinct',
    desc: 'If a task repeats, we automate it. The result is a calmer team, faster delivery, and better leverage.',
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
  {
    title: 'Motion with purpose',
    desc: 'Animation helps guide attention, shape emotion, and make the experience feel refined instead of static.',
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
    desc: 'React, WebGL, TypeScript. He turns design into living interfaces with calm precision.',
    initials: 'GJ',
    img: '/jayadityapfp.png',
  },
  {
    name: 'Dilip',
    role: 'Polymath · Systems',
    desc: 'AI agents, automated workflows, and growth tools that remove friction behind the scenes.',
    initials: 'DP',
    img: '/dilippfp.png',
  },
];

const stats = [
  { label: 'Projects launched', value: '20+' },
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
    gsap.fromTo(items, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.1 });
  }, []);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    el.querySelectorAll('.pillar-card').forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: i * 0.08, scrollTrigger: { trigger: card, start: 'top 88%', once: true } });
    });

    el.querySelectorAll('.person-card').forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: i * 0.08, scrollTrigger: { trigger: card, start: 'top 88%', once: true } });
    });

    el.querySelectorAll('.stat-card').forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: i * 0.05, scrollTrigger: { trigger: card, start: 'top 90%', once: true } });
    });

    const manifesto = el.querySelector('.manifesto');
    if (manifesto) {
      gsap.fromTo(manifesto, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: manifesto, start: 'top 88%', once: true } });
    }
  }, { scope: sectionRef });

  return (
    <>
      <Nav />
      <main className="min-h-dvh bg-bg selection:bg-accent/20">
        <section ref={sectionRef} className="relative overflow-hidden bg-bg pb-24 pt-28 sm:pb-32 sm:pt-36">
          <div className="absolute right-0 top-0 h-[500px] w-[500px] -z-10 opacity-30">
            <div className="absolute inset-0 rounded-full bg-gradient-to-bl from-accent/5 via-transparent to-transparent blur-3xl" />
          </div>
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] -z-10 opacity-20">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-warm/5 via-transparent to-transparent blur-3xl" />
          </div>

          <Link href="/" className="absolute left-6 top-6 z-10 h-8 w-10 cursor-pointer group sm:left-10 sm:top-8 sm:h-[38px] sm:w-12" aria-label="Go home">
            <Image src="/Vector 2173.png" alt="" fill className="object-contain object-left-top opacity-40 brightness-0 transition-opacity duration-300 group-hover:opacity-70" sizes="48px" />
          </Link>

          <div ref={headerRef} className="mx-auto mb-16 max-w-[90rem] px-6 sm:mb-20 sm:px-10">
            <div className="max-w-3xl">
              <p className="gsap-reveal mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-stone-500 sm:text-sm">Who we are</p>
              <h1 className="gsap-reveal font-display text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-stone-900">
                Three minds. <span className="text-accent">One sharp point of view.</span>
              </h1>
              <p className="gsap-reveal mt-5 max-w-xl text-base leading-8 text-stone-600 sm:mt-6 sm:text-lg">
                We’re a compact studio building premium digital experiences for companies that want their brand and product to feel unmistakably modern.
              </p>
            </div>
          </div>

          <div className="mx-auto mb-20 max-w-[90rem] px-6 sm:mb-24 sm:px-10">
            <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
              {stats.map((s) => (
                <div key={s.label} className="stat-card rounded-[1.4rem] border border-black/5 bg-white/70 p-5 text-center shadow-[0_10px_40px_rgba(23,18,15,0.04)] sm:p-6" style={{ opacity: 0 }}>
                  <span className="block font-display text-2xl font-semibold tracking-[-0.02em] text-stone-900 sm:text-3xl">{s.value}</span>
                  <span className="mt-1 block text-xs font-medium uppercase tracking-[0.2em] text-stone-500 sm:text-sm">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto mb-20 max-w-[90rem] px-6 sm:mb-24 sm:px-10">
            <div className="mx-auto max-w-4xl">
              <div className="mb-10 sm:mb-12">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-stone-500 sm:text-sm">Our edge</p>
                <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-stone-900">
                  Why we’re different<span className="text-accent">.</span>
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                {pillars.map((p) => (
                  <div key={p.title} className="pillar-card group relative rounded-[1.6rem] border border-black/5 bg-white/70 p-6 shadow-[0_10px_40px_rgba(23,18,15,0.04)] transition duration-500 hover:-translate-y-1 sm:p-7 md:p-8" style={{ opacity: 0 }}>
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/10 transition duration-500 group-hover:scale-110 group-hover:bg-accent/15 sm:h-11 sm:w-11">
                      <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <path d={p.icon} />
                      </svg>
                    </div>
                    <h3 className="mb-2 font-display text-lg font-semibold tracking-[-0.02em] text-stone-900 sm:text-xl">{p.title}</h3>
                    <p className="text-sm leading-7 text-stone-600 sm:text-base">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto mb-20 max-w-[90rem] px-6 sm:mb-24 sm:px-10">
            <div className="mx-auto max-w-4xl">
              <div className="manifesto rounded-[2rem] border border-black/5 bg-white/70 p-8 text-center shadow-[0_20px_80px_rgba(23,18,15,0.06)] sm:p-10 md:p-14" style={{ opacity: 0 }}>
                <span className="block font-display text-[5rem] leading-none tracking-[-0.06em] text-accent/10 sm:text-[7rem]">“</span>
                <div className="mx-auto mt-[-1.5em] max-w-2xl">
                  <p className="font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-stone-900 sm:text-2xl md:text-3xl">
                    We don’t chase noise. We build things people remember because they feel right.
                  </p>
                  <p className="mx-auto mt-4 max-w-lg text-base leading-8 text-stone-600 sm:mt-5 sm:text-lg">
                    The work is meticulous because the stakes are real. Whether it’s a launch page or a full product surface, the standard is the same.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-[90rem] px-6 sm:px-10">
            <div className="mx-auto max-w-4xl">
              <div className="mb-10 sm:mb-12">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-stone-500 sm:text-sm">The team</p>
                <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-stone-900">
                  Handpicked for depth<span className="text-accent">.</span>
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {people.map((person) => (
                  <div key={person.name} className="person-card rounded-[1.6rem] border border-black/5 bg-white/70 p-6 shadow-[0_10px_40px_rgba(23,18,15,0.04)] transition hover:-translate-y-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-900 text-sm font-semibold text-white">{person.initials}</div>
                    <h3 className="mt-5 font-display text-xl font-semibold text-stone-900">{person.name}</h3>
                    <p className="mt-1 text-sm font-medium text-stone-500">{person.role}</p>
                    <p className="mt-3 text-sm leading-7 text-stone-600">{person.desc}</p>
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
