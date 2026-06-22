'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { SceneGate } from '@/lib/useInView';
import DottedBoundary from '@/components/patterns/DottedBoundary';

const ContactScene = dynamic(() => import('@/components/scene/ContactScene'), { ssr: false });

export default function Contact() {
  return (
    <section id="contact" className="relative bg-bg overflow-hidden">
      <div className="hidden md:block absolute inset-y-0 left-1/2 pointer-events-none z-0" style={{ width: '64rem', marginLeft: '-32rem' }}>
        <div className="relative h-full">
          <DottedBoundary dash="8,8" />
        </div>
      </div>
      <SceneGate margin="150%">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <Suspense fallback={null}>
            <ContactScene />
          </Suspense>
        </div>
      </SceneGate>

      <div className="py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative max-w-5xl mx-auto">
            <div className="relative z-10 px-6 md:px-10 py-6">
            <div className="max-w-2xl mb-10 sm:mb-14">
              <p className="text-xs sm:text-sm text-accent tracking-[0.2em] uppercase mb-2 sm:mb-3 font-mono">Get in touch</p>
              <h2 className="section-title">Let&rsquo;s build something<span className="text-accent">.</span></h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              <a href="mailto:hello@rockspace.io" className="inline-flex items-center px-6 sm:px-8 py-3.5 sm:py-4 bg-accent text-white text-base sm:text-lg font-bold rounded-full hover:bg-accent/90 transition-all shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5 active:translate-y-0">
                hello@rockspace.io
              </a>
              <span className="text-text-tertiary text-base self-center hidden sm:inline">or</span>
              <a href="#" className="inline-flex items-center px-6 sm:px-8 py-3.5 sm:py-4 border border-border text-text text-base sm:text-lg font-semibold rounded-full hover:border-accent/30 transition-all">
                Book a call
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
