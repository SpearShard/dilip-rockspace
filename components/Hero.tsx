'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import DottedBoundary from '@/components/patterns/DottedBoundary';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.hero-vector',
      { opacity: 0, y: -12 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    )
    .fromTo('.hero-logo',
      { opacity: 0, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 1.4 }
    )
    .fromTo('.hero-tagline',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.5'
    )
    .fromTo('.hero-cta',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.3'
    );
  }, { scope: sectionRef });

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center bg-bg overflow-hidden paper-texture"
    >
      {/* Dotted boundary */}
      <div className="hidden md:block absolute inset-y-0 left-1/2 pointer-events-none z-0" style={{ width: '64rem', marginLeft: '-32rem' }}>
        <div className="relative h-full">
          <DottedBoundary dash="8,8" />
        </div>
      </div>

      {/* Vector top-left — home link */}
      <Link
        href="/"
        className="hero-vector absolute top-3 sm:top-4 left-4 sm:left-6 z-10 w-10 h-8 sm:w-12 sm:h-[38px] cursor-pointer"
        aria-label="Go home"
      >
        <Image
          src="/Vector 2173.png"
          alt=""
          fill
          className="object-contain object-left-top brightness-0 opacity-30 hover:opacity-50 transition-opacity duration-200"
          sizes="48px"
          priority
        />
      </Link>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center w-full px-4">
        <div className="hero-logo w-full max-w-[68rem] mx-auto px-2 sm:px-4">
          <div className="rounded-3xl bg-surface/50 border border-border/10 overflow-hidden p-2 sm:p-4 md:p-6">
            <Image
              src="/fulllogo.png"
              alt="RockSpace"
              width={1400}
              height={467}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

        <p className="hero-tagline mt-10 sm:mt-12 text-2xl sm:text-3xl md:text-4xl text-text-muted font-display font-[700] tracking-[-0.02em] leading-tight">
          Three paths. One collision<span className="text-accent">.</span>
        </p>

        <div className="hero-cta mt-10 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-5">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2.5 px-8 sm:px-10 py-4 bg-accent text-white text-sm sm:text-base font-bold rounded-full hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 hover:shadow-accent/35 hover:-translate-y-0.5 active:translate-y-0"
          >
            View our work
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 8h8M8 4l4 4-4 4" />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 sm:px-10 py-4 border-2 border-border text-text text-sm sm:text-base font-bold rounded-full hover:border-accent/40 hover:bg-accent-light/20 transition-all active:translate-y-0"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
