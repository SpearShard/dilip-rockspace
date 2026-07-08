'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  { title: 'Design as strategy', desc: 'We don’t decorate for decoration’s sake. Every detail carries a decision, a message, or a commercial purpose.', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
  { title: 'Systems that scale', desc: 'We shape interfaces as durable systems — consistent, fast, and easy to expand without losing clarity.', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
  { title: 'Automation by instinct', desc: 'If a task repeats, we automate it. The result is a calmer team, faster delivery, and better leverage.', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { title: 'Motion with purpose', desc: 'Animation helps guide attention, shape emotion, and make the experience feel refined instead of static.', icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z' },
];

const people = [
  { name: 'Debasis', role: 'Founder · Design', desc: 'Brand identity, visual systems, motion direction. He shapes brands that feel inevitable.', initials: 'DM' },
  { name: 'Jayaditya', role: 'Co-founder · Code', desc: 'React, WebGL, TypeScript. He turns design into living interfaces with calm precision.', initials: 'GJ' },
  { name: 'Dilip', role: 'Polymath · Systems', desc: 'AI agents, automated workflows, and growth tools that remove friction.', initials: 'DP' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Reveal Logic
    gsap.fromTo('.gsap-reveal', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' });

    // Staggered card reveals
    el.querySelectorAll('.pillar-card, .person-card').forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0, y: 40 }, { 
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 85%', once: true } 
      });
    });
  }, { scope: sectionRef });

  return (
    <main className="min-h-screen bg-[#030303] text-white">
      <Nav />
      <section ref={sectionRef} className="pt-40 pb-32">
        <div className="section-shell">
          {/* Header */}
          <div className="mb-32">
            <p className="gsap-reveal font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-8">04 // The Studio</p>
            <h1 className="gsap-reveal font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold tracking-[-0.04em] leading-[0.95] mb-10">
              Three minds. <br/> <span className="text-white/30">One sharp point of view.</span>
            </h1>
            <p className="gsap-reveal text-lg text-white/60 leading-relaxed max-w-2xl">
              We’re a compact studio building premium digital experiences for companies that want their brand and product to feel unmistakably modern.
            </p>
          </div>

          {/* Pillars */}
          <div className="mb-32 grid gap-6 sm:grid-cols-2">
            {pillars.map((p) => (
              <div key={p.title} className="pillar-card border border-white/10 bg-[#0a0a0a] p-10 rounded-3xl">
                <div className="mb-6 w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={p.icon} /></svg>
                </div>
                <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                <p className="text-white/60 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Team */}
          <div className="grid gap-8 sm:grid-cols-3">
            {people.map((person) => (
              <div key={person.name} className="person-card rounded-3xl border border-white/10 bg-[#0a0a0a] p-8">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-black font-bold mb-6">{person.initials}</div>
                <h3 className="text-xl font-bold mb-1">{person.name}</h3>
                <p className="text-xs font-mono uppercase tracking-widest text-white/40 mb-6">{person.role}</p>
                <p className="text-sm text-white/60 leading-relaxed">{person.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}