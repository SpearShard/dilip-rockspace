'use client';

import { useRef, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

gsap.registerPlugin(ScrollTrigger);

// Local fallback if @/lib/projectData isn't available
const teamMembers = [
  { name: 'Debasis', role: 'Design Engineer' },
  { name: 'Jayaditya', role: 'System Architect' },
  { name: 'Dilip', role: 'Automation Lead' }
];

const notes = [
  'He thinks in visual systems. If it doesn\'t feel right, it doesn\'t ship.',
  'He architects before he codes. The grid is the first draft.',
  'He automated himself out of a job. Then built the replacement.',
];

const images = ['/debasispfp.png', '/jayadityapfp.png', '/dilippfp.png'];

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    const cards = el.querySelectorAll('.team-card');

    cards.forEach((card, i) => {
      // Image Parallax
      gsap.fromTo(card.querySelector('.team-img'),
        { yPercent: -15, scale: 1.1 },
        {
          yPercent: 15,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );

      // Card Staggered Reveal
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section id="team" ref={sectionRef} className="relative w-full bg-black py-32 overflow-hidden border-t border-white/10">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none z-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05),transparent_60%)] blur-[100px]" />
      </div>

      <div className="section-shell relative z-10">
        <div className="mb-20">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6">
            05 // The People
          </p>
          <h2 className="font-display text-5xl sm:text-7xl font-bold tracking-tighter text-white">
            BEHIND THE STUDIO<span className="text-white/30">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {teamMembers.map((m, i) => (
            <div
              key={m.name}
              className="team-card group relative flex flex-col gap-6 cursor-none"
              onMouseEnter={() => document.body.classList.add('cursor-hover')}
              onMouseLeave={() => document.body.classList.remove('cursor-hover')}
            >
              {/* Image Container with strict overflow for parallax */}
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm bg-[#0a0a0a]">
                <Image
                  src={images[i]}
                  alt={m.name}
                  fill
                  className="team-img object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              </div>

              {/* Content */}
              <div className="flex flex-col">
                <div className="flex items-baseline justify-between mb-4 border-b border-white/10 pb-4">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {m.name}
                  </h3>
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/50">
                    {m.role}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-white/60">
                  {notes[i]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}