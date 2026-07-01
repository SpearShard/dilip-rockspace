'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.hero-label',
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5 }
    )
    .fromTo('.hero-heading',
      { opacity: 0, y: 40, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8 },
      '-=0.2'
    )
    .fromTo('.hero-desc',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.3'
    )
    .fromTo('.hero-cta',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.2'
    )
    .fromTo('.hero-visual',
      { opacity: 0, x: 40, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 1 },
      '-=0.4'
    );
  }, { scope: sectionRef });

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-dvh flex items-center bg-bg overflow-hidden"
    >
      {/* Animated gradient atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-15%] right-[-8%] w-[55%] h-[55%] bg-gradient-to-br from-accent/6 via-transparent to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-15%] left-[-8%] w-[45%] h-[45%] bg-gradient-to-tr from-accent-warm/5 via-transparent to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-gradient-to-r from-accent/3 to-accent-warm/3 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      {/* Vector top-left */}
      <Link
        href="/"
        className="hero-vector absolute top-6 sm:top-8 left-6 sm:left-10 z-10 w-10 h-8 sm:w-12 sm:h-[38px] cursor-pointer"
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

      <div className="relative z-10 w-full">
        {/* Text content */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-20 md:py-0">
          <div className="max-w-3xl">
            <p className="hero-label font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-text-muted/50 mb-6 sm:mb-8">
              RockSpace Studio
            </p>

            <h1 className="hero-heading font-display font-[700] text-[clamp(2.8rem,9vw,7rem)] tracking-[-0.04em] text-text leading-[0.92]">
              Three paths.
              <br />
              <span className="text-accent">One collision.</span>
            </h1>

            <p className="hero-desc text-base sm:text-lg md:text-xl text-text-muted max-w-lg mt-5 sm:mt-6 md:mt-8 leading-relaxed">
              Design, code, and systems — converging into work that feels inevitable.
            </p>

            <div className="hero-cta mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/work"
                className="group inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 bg-accent text-white text-sm sm:text-base font-bold rounded-full hover:bg-accent/90 transition-all shadow-xl shadow-accent/20 hover:shadow-accent/35 hover:-translate-y-0.5 active:translate-y-0"
              >
                View our work
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 8h8M8 4l4 4-4 4" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 sm:px-9 py-3.5 sm:py-4 border-2 border-border/60 text-text text-sm sm:text-base font-bold rounded-full hover:border-accent/40 hover:bg-accent-light/20 transition-all active:translate-y-0"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>

        {/* Video — positioned offset right */}
        <div className="hero-visual absolute right-0 top-1/2 -translate-y-1/2 w-[30%] xl:w-[35%] hidden lg:block pointer-events-none">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-l from-bg via-bg/50 to-transparent z-10 w-1/3 left-0" />
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-auto"
            >
              <source src="/logomotion.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Decorative dash on mobile */}
        <div className="lg:hidden mt-10 sm:mt-14 max-w-7xl mx-auto px-6 sm:px-10">
          <div className="w-full aspect-[3/1] rounded-2xl overflow-hidden border border-border/10 shadow-xl shadow-black/[0.02]">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            >
              <source src="/logomotion.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
