'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo('.contact-reveal',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="contact" ref={sectionRef} className="relative w-full bg-black py-40 border-t border-white/10 flex flex-col items-center justify-center text-center">
      <div className="section-shell">
        <p className="contact-reveal font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-8">
          06 // Initiate
        </p>
        <h2 className="contact-reveal font-display text-[clamp(3rem,8vw,8rem)] font-bold tracking-tighter leading-none mb-12 text-white">
          LET'S BUILD <br/> <span className="text-white/30">THE FUTURE.</span>
        </h2>
        
        <div className="contact-reveal">
          <Link 
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-5 rounded-full border border-white/20 bg-transparent text-white font-mono text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 cursor-none"
            onMouseEnter={() => document.body.classList.add('cursor-hover')}
            onMouseLeave={() => document.body.classList.remove('cursor-hover')}
          >
            Book a Discovery Call
          </Link>
        </div>
      </div>
    </section>
  );
}