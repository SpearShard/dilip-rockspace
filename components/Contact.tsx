'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { SceneGate } from '@/lib/useInView';

const ContactScene = dynamic(() => import('@/components/scene/ContactScene'), { ssr: false });

export default function Contact() {
  return (
    <section id="contact" className="relative bg-bg overflow-hidden">
      <SceneGate margin="150%">
        <div className="absolute inset-0 pointer-events-none opacity-[0.12]">
          <Suspense fallback={null}>
            <ContactScene />
          </Suspense>
        </div>
      </SceneGate>

      {/* Decorative gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none -z-10 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      <div className="py-24 sm:py-28 md:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-text-muted/50 mb-3 sm:mb-4">
              Get in touch
            </p>
            <h2 className="font-display font-[700] text-[clamp(2.2rem,6vw,4.5rem)] tracking-[-0.03em] text-text leading-[1.05] mb-8 sm:mb-10">
              Let&rsquo;s build something<span className="text-accent">.</span>
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
              <a
                href="mailto:hello@rockspace.io"
                className="group inline-flex items-center gap-2.5 px-8 sm:px-10 py-4 sm:py-4.5 bg-accent text-white text-base sm:text-lg font-bold rounded-full hover:bg-accent/90 transition-all shadow-xl shadow-accent/20 hover:shadow-accent/35 hover:-translate-y-0.5 active:translate-y-0"
              >
                hello@rockspace.io
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 8h8M8 4l4 4-4 4" />
                </svg>
              </a>
              <span className="text-text-tertiary text-sm hidden sm:inline">or</span>
              <a
                href="#"
                className="inline-flex items-center px-8 sm:px-10 py-4 sm:py-4.5 border-2 border-border/60 text-text text-base sm:text-lg font-semibold rounded-full hover:border-accent/30 hover:bg-accent-light/10 transition-all"
              >
                Book a call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
