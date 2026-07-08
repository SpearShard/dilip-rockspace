'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/rockspace.in/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/rkspace/' },
  { label: 'Email', href: 'mailto:hello@rockspace.io' },
];

const slots = [
  { label: 'Fastest slot', time: 'Today · 4:00 PM IST', href: '#' },
  { label: 'Best for strategy', time: 'Tomorrow · 11:30 AM IST', href: '#' },
  { label: 'For founders', time: 'Thu · 2:00 PM IST', href: '#' },
];

export default function Contact() {
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = headerRef.current;
    if (!el) return;
    
    // Smooth reveal for high-end feel
    gsap.fromTo(el.querySelectorAll('.gsap-reveal'), 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    );

    // Staggered entrance for interaction cards
    gsap.fromTo('.contact-card', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.4 }
    );
  }, []);

  return (
    <main className="min-h-screen bg-[#030303] text-white selection:bg-white selection:text-black">
      <Nav />
      
      <section className="relative pt-40 pb-32" ref={headerRef}>
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none -z-10 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05),transparent_60%)] blur-[100px]" />
        </div>

        <div className="section-shell max-w-5xl">
          <div className="mb-16">
            <p className="gsap-reveal font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-8">Start here</p>
            <h1 className="gsap-reveal font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-white">
              Let’s make your next <br/><span className="text-white/30">launch inevitable.</span>
            </h1>
            <p className="gsap-reveal mt-8 max-w-2xl text-lg leading-relaxed text-white/60">
              If you need sharper positioning, a premium product experience, or a site that converts instead of just existing, book a discovery call.
            </p>
          </div>

          {/* Discovery Card */}
          <div className="contact-card rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-10 mb-8">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">Book a discovery call</p>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight">
                  Pick a time and we’ll send the Google Meet link.
                </h2>
                <p className="mt-6 text-white/60 leading-relaxed">
                  We keep it simple: one focused conversation, clear next steps, and a plan that moves the business forward.
                </p>
              </div>

              <div className="space-y-4">
                {slots.map((slot) => (
                  <a key={slot.time} href={slot.href} target="_blank" rel="noopener noreferrer" 
                     className="flex items-center justify-between p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 cursor-none"
                     onMouseEnter={() => document.body.classList.add('cursor-hover')}
                     onMouseLeave={() => document.body.classList.remove('cursor-hover')}
                  >
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">{slot.label}</p>
                      <p className="mt-1 text-sm font-semibold text-white">{slot.time}</p>
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-white/40">Select ↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Socials & Email Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            <a href="mailto:hello@rockspace.io" className="contact-card block rounded-3xl border border-white/10 bg-[#0a0a0a] p-10 hover:border-white/20 transition-all cursor-none"
               onMouseEnter={() => document.body.classList.add('cursor-hover')}
               onMouseLeave={() => document.body.classList.remove('cursor-hover')}
            >
              <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">Email</p>
              <p className="font-display text-2xl font-bold tracking-tight">hello@rockspace.io</p>
              <p className="mt-4 text-sm text-white/50">Fast replies, usually within a day.</p>
            </a>
            
            <div className="contact-card rounded-3xl border border-white/10 bg-[#0a0a0a] p-10">
              <p className="mb-6 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">Follow along</p>
              <div className="flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" 
                     className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-xs font-mono uppercase tracking-widest text-white/60 hover:bg-white hover:text-black transition-all cursor-none"
                     onMouseEnter={() => document.body.classList.add('cursor-hover')}
                     onMouseLeave={() => document.body.classList.remove('cursor-hover')}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}