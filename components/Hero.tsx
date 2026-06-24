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

    tl.fromTo('.hero-vector',
      { opacity: 0, y: -12 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
    .fromTo('.hero-visual',
      { opacity: 0, x: 30, scale: 0.97 },
      { opacity: 1, x: 0, scale: 1, duration: 1.2 },
      '-=0.2'
    )
    .fromTo('.hero-tagline',
      { opacity: 0, y: 24 },
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
      className="relative py-16 sm:py-20 md:py-24 flex items-center bg-bg overflow-hidden paper-texture"
    >
      {/* Vector top-left */}
      <Link
        href="/"
        className="hero-vector absolute top-4 sm:top-6 left-4 sm:left-6 z-10 w-10 h-8 sm:w-12 sm:h-[38px] cursor-pointer"
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

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14 xl:gap-18">
          {/* Video first in DOM so it's on top in mobile */}
          <div className="hero-visual order-1 lg:order-2 w-full lg:w-[30%] xl:w-[40%]">
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-surface/60 border border-border/10 shadow-xl shadow-black/[0.03]">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-auto block"
              >
                <source src="/logomotion.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Text second in DOM so it's below on mobile */}
          <div className="order-2 lg:order-1 w-full lg:w-[52%] xl:w-[50%] text-center lg:text-left">
            <p className="hero-tagline text-[clamp(1.5rem,3.5vw,2.5rem)] text-text-muted font-display font-[700] tracking-[-0.02em] leading-[1.15]">
              Three paths. One collision<span className="text-accent">.</span>
            </p>

            <div className="hero-cta mt-6 sm:mt-8 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href="/work"
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-accent text-white text-sm sm:text-base font-bold rounded-full hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 hover:shadow-accent/35 hover:-translate-y-0.5 active:translate-y-0"
              >
                View our work
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 8h8M8 4l4 4-4 4" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 border-2 border-border text-text text-sm sm:text-base font-bold rounded-full hover:border-accent/40 hover:bg-accent-light/20 transition-all active:translate-y-0"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
