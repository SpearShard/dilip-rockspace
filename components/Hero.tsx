'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { IconArrow, IconPlay } from '@/lib/icons';
import { workStats } from '@/lib/projectData';
import Magnetic from '@/components/micro/Magnetic';
import HeroHeadline from '@/components/micro/HeroHeadline';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.hero-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo('.hero-cta', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, 0.4)
      .fromTo('.hero-stat', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 }, 0.5)
      .fromTo('.hero-visual', { opacity: 0, x: 48, scale: 0.94 }, { opacity: 1, x: 0, scale: 1, duration: 1.1 }, 0.2);
  }, { scope: sectionRef });

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-dvh flex items-center bg-bg overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-15%] right-[-8%] w-[55%] h-[55%] bg-gradient-to-br from-accent/5 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-[-15%] left-[-8%] w-[45%] h-[45%] bg-gradient-to-tr from-accent-warm/4 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      <Link
        href="/"
        className="absolute top-6 sm:top-8 left-6 sm:left-10 z-10 w-10 h-8 sm:w-12 sm:h-[38px] group"
        aria-label="Go home"
      >
        <Image
          src="/Vector 2173.png"
          alt=""
          fill
          className="object-contain object-left-top brightness-0 opacity-30 group-hover:opacity-55 transition-all duration-300 group-hover:scale-105"
          sizes="48px"
          priority
        />
      </Link>

      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-24 md:py-0">
          <div className="max-w-3xl">
            <h1 className="display-heading">
              <HeroHeadline>Three paths.</HeroHeadline>
              <br />
              <span className="text-accent">
                <HeroHeadline>One collision.</HeroHeadline>
              </span>
            </h1>

            <p className="hero-desc text-body-lg text-text-muted max-w-lg mt-6 md:mt-8 font-medium-ui leading-[1.55]" style={{ opacity: 0 }}>
              Design, code, and systems. One team that ships what others only pitch.
            </p>

            <div className="hero-cta mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4" style={{ opacity: 0 }}>
              <Magnetic strength={0.2}>
                <Link href="/work" className="btn-primary">
                  See the proof
                  <IconArrow />
                </Link>
              </Magnetic>
              <Magnetic strength={0.15}>
                <Link href="/contact" className="btn-outline">Start a project</Link>
              </Magnetic>
            </div>

            <div className="mt-12 sm:mt-14 flex gap-8 sm:gap-12 border-t border-border/60 pt-8">
              {workStats.map((s) => (
                <div key={s.label} className="hero-stat" style={{ opacity: 0 }}>
                  <p className="stat-value text-text">{s.value}</p>
                  <p className="font-mono text-[11px] font-medium tracking-[0.08em] text-text-tertiary mt-2 uppercase">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-visual absolute right-6 xl:right-10 top-1/2 -translate-y-1/2 w-[30%] xl:w-[34%] hidden lg:block" style={{ opacity: 0 }}>
          <div className="video-frame relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-black/[0.12] bg-black">
            <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-[11px] font-mono tracking-[-0.015em] text-white/70 uppercase">
              <IconPlay className="text-accent" />
              Live
            </div>
            <video autoPlay loop muted playsInline preload="auto" className="w-full h-auto block">
              <source src="/logomotion.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="lg:hidden mt-12 max-w-7xl mx-auto px-6 sm:px-10">
          <div className="video-frame rounded-2xl overflow-hidden border border-border/40 shadow-xl aspect-[2/1] bg-black">
            <video autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover">
              <source src="/logomotion.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
