'use client';

import Link from 'next/link';

const points = ['Fast replies', 'Clear strategy', 'Launch-ready execution'];

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-28 lg:py-32">
      <div className="section-shell">
        <div className="rounded-[2.2rem] border border-black/5 bg-stone-900 p-8 text-white shadow-[0_24px_120px_rgba(23,18,15,0.18)] sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/60">Let’s build</p>
              <h2 className="mt-4 font-display text-3xl leading-tight tracking-[-0.03em] text-white sm:text-4xl">
                If the work matters, the experience should feel just as refined.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-white/70">
                Share the ambition and we’ll shape a thoughtful path forward — from positioning and story to the product surface people actually remember.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-6 backdrop-blur">
              <div className="flex flex-wrap gap-2">
                {points.map((point) => (
                  <span key={point} className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-white/75">{point}</span>
                ))}
              </div>
              <div className="mt-6 space-y-3">
                <a href="mailto:hello@rockspace.io" className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-white/15 hover:shadow-lg">
                  <span>hello@rockspace.io</span>
                  <svg className="w-4 h-4 text-white/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 7h10v10M7 17L17 7" />
                  </svg>
                </a>
                <Link href="/contact" className="group flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-stone-900 transition-all hover:-translate-y-0.5 hover:bg-stone-50 hover:shadow-lg">
                  <span>Book a strategy call</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
