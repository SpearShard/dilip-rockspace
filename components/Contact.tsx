'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { SceneGate } from '@/lib/useInView';
import DottedBoundary from '@/components/patterns/DottedBoundary';

const ContactScene = dynamic(() => import('@/components/scene/ContactScene'), { ssr: false });

export default function Contact() {
  return (
    <section id="contact" className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 bg-bg overflow-hidden">
      <DottedBoundary />
      <SceneGate margin="150%">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <Suspense fallback={null}>
            <ContactScene />
          </Suspense>
        </div>
      </SceneGate>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-2xl mb-10 sm:mb-14">
          <p className="text-[10px] sm:text-xs text-accent tracking-[0.2em] uppercase mb-2 sm:mb-3 font-mono">Get in touch</p>
          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Let&rsquo;s talk<span className="text-accent">.</span></h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a href="mailto:hello@rockspace.io" className="inline-flex items-center px-5 sm:px-6 py-3 sm:py-3.5 bg-accent text-white text-sm sm:text-base font-medium rounded-full hover:bg-accent/90 transition-all shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5 active:translate-y-0">
            hello@rockspace.io
          </a>
          <span className="text-text-tertiary text-sm self-center hidden sm:inline">or</span>
          <a href="#" className="inline-flex items-center px-5 sm:px-6 py-3 sm:py-3.5 border border-border text-text text-sm sm:text-base font-medium rounded-full hover:border-accent/30 transition-all">
            Book a call
          </a>
        </div>
      </div>
    </section>
  );
}
