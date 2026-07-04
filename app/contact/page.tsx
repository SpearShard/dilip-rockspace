'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/rockspace.in/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/rkspace/posts/?feedView=all' },
  { label: 'Email', href: 'mailto:hello@rockspace.io' },
];

const slots = [
  { label: 'Fastest slot', time: 'Today · 4:00 PM IST', href: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=RockSpace%20Discovery%20Call&details=Discovery%20call%20with%20RockSpace.%20We%20will%20confirm%20the%20time%20and%20send%20the%20Google%20Meet%20link%20back%20to%20you.&location=Google%20Meet%20(%20https://meet.google.com/new%20)&dates=20260704T110000Z%2F20260704T120000Z' },
  { label: 'Best for strategy', time: 'Tomorrow · 11:30 AM IST', href: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=RockSpace%20Discovery%20Call&details=Discovery%20call%20with%20RockSpace.%20We%20will%20confirm%20the%20time%20and%20send%20the%20Google%20Meet%20link%20back%20to%20you.&location=Google%20Meet%20(%20https://meet.google.com/new%20)&dates=20260705T060000Z%2F20260705T070000Z' },
  { label: 'For founders', time: 'Thu · 2:00 PM IST', href: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=RockSpace%20Discovery%20Call&details=Discovery%20call%20with%20RockSpace.%20We%20will%20confirm%20the%20time%20and%20send%20the%20Google%20Meet%20link%20back%20to%20you.&location=Google%20Meet%20(%20https://meet.google.com/new%20)&dates=20260707T090000Z%2F20260707T100000Z' },
];

export default function Contact() {
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = headerRef.current;
    if (!el) return;
    const items = el.querySelectorAll('.gsap-reveal');
    gsap.fromTo(items, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.1 });

    el.querySelectorAll('.contact-card').forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.4 + i * 0.1 });
    });
  }, []);

  return (
    <>
      <Nav />
      <main className="min-h-dvh bg-bg selection:bg-accent/20">
        <section className="relative overflow-hidden bg-bg pb-24 pt-28 sm:pb-32 sm:pt-36">
          <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -z-10 opacity-25">
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-accent/5 via-transparent to-transparent blur-3xl" />
          </div>
          <div className="absolute bottom-0 right-0 h-[400px] w-[400px] -z-10 opacity-20">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tl from-accent-warm/5 via-transparent to-transparent blur-3xl" />
          </div>



          <div ref={headerRef} className="mx-auto max-w-[90rem] px-6 sm:px-10">
            <div className="mx-auto max-w-5xl">
              <div className="mb-14 sm:mb-18">
                <p className="gsap-reveal mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-stone-500 sm:text-sm">Start here</p>
                <h1 className="gsap-reveal font-display text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-stone-900">
                  Let’s make your next launch feel inevitable<span className="text-accent">.</span>
                </h1>
                <p className="gsap-reveal mt-5 max-w-2xl text-base leading-8 text-stone-600 sm:mt-6 sm:text-lg">
                  If you need sharper positioning, a premium product experience, or a site that converts instead of just existing, book a discovery call and we’ll follow up with the next step.
                </p>
              </div>

              <div className="mb-10 rounded-[2rem] border border-black/5 bg-white/70 p-6 shadow-[0_20px_80px_rgba(23,18,15,0.06)] sm:p-8">
                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">Book a discovery call</p>
                    <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] text-stone-900 sm:text-3xl">
                      Pick a time and we’ll send the Google Meet link back to you.
                    </h2>
                    <p className="mt-3 text-base leading-8 text-stone-600">
                      We keep it simple: one focused conversation, clear next steps, and a plan that actually moves the business forward.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {slots.map((slot) => (
                      <a key={slot.time} href={slot.href} target="_blank" rel="noopener noreferrer" className="contact-card flex items-center justify-between rounded-[1.2rem] border border-black/5 bg-stone-50 px-4 py-3 transition hover:bg-white">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-400">{slot.label}</p>
                          <p className="mt-1 text-sm font-semibold text-stone-800">{slot.time}</p>
                        </div>
                        <span className="text-sm font-semibold text-stone-700">Open calendar ↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-12 grid gap-4 sm:mb-14 sm:grid-cols-2 sm:gap-5">
                <a href="mailto:hello@rockspace.io" className="contact-card group relative block rounded-[1.6rem] border border-black/5 bg-white/70 p-6 shadow-[0_10px_40px_rgba(23,18,15,0.04)] transition duration-500 hover:-translate-y-1 sm:p-8">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400 sm:text-xs">Email</p>
                  <p className="font-display text-lg font-semibold tracking-[-0.02em] text-stone-900 transition group-hover:text-accent sm:text-xl md:text-2xl">hello@rockspace.io</p>
                  <p className="mt-2 text-sm leading-7 text-stone-600 sm:text-base">Fast replies, usually within a day.</p>
                </a>
                <a href="mailto:hello@rockspace.io?subject=Discovery%20Call" className="contact-card group relative block rounded-[1.6rem] border border-black/5 bg-white/70 p-6 shadow-[0_10px_40px_rgba(23,18,15,0.04)] transition duration-500 hover:-translate-y-1 sm:p-8">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400 sm:text-xs">Custom timing</p>
                  <p className="font-display text-lg font-semibold tracking-[-0.02em] text-stone-900 transition group-hover:text-accent sm:text-xl md:text-2xl">Tell us your window</p>
                  <p className="mt-2 text-sm leading-7 text-stone-600 sm:text-base">We’ll match your availability and come back with the plan.</p>
                </a>
              </div>

              <div className="max-w-2xl rounded-[2rem] border border-black/5 bg-white/70 p-6 shadow-[0_20px_80px_rgba(23,18,15,0.06)] sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">Follow along</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-black/10 bg-white/80 px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-white">
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
    </>
  );
}
