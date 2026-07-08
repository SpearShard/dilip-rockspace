'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { 
    label: 'Instagram', 
    href: 'https://www.instagram.com/rockspace.in/', 
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    )
  },
  { 
    label: 'LinkedIn', 
    href: 'https://www.linkedin.com/company/rkspace/', 
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
      </svg>
    )
  },
  { 
    label: 'Email', 
    href: 'mailto:hello@rockspace.io', 
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    )
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = footerRef.current;
    if (!el) return;

    gsap.fromTo('.footer-giant-text',
      { y: '100%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'bottom bottom',
          scrub: 1,
        }
      }
    );
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="relative w-full bg-[#050505] pt-32 overflow-hidden border-t border-white/10">
      <div className="section-shell relative z-10 flex flex-col min-h-[50vh] justify-between pb-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-32">
          <div className="max-w-md">
            <h3 className="font-display text-3xl font-bold text-white mb-6">
              Start Something.
            </h3>
            <p className="text-white/60 text-lg leading-relaxed">
              Quietly ambitious work for founders who want their brand and product to feel unmistakably premium.
            </p>
          </div>

          <div className="flex gap-16">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">Navigation</span>
              <Link href="/about" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Studio</Link>
              <Link href="/work" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Work</Link>
              <Link href="/contact" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Initiate</Link>
            </div>
            
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">Socials</span>
              {socials.map((item) => (
                <a 
                  key={item.label} 
                  href={item.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center gap-3 text-sm font-medium text-white/70 hover:text-white transition-colors cursor-none"
                  onMouseEnter={() => document.body.classList.add('cursor-hover')}
                  onMouseLeave={() => document.body.classList.remove('cursor-hover')}
                >
                  <span className="opacity-50 group-hover:opacity-100 transition-opacity">{item.icon}</span>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono tracking-wider uppercase text-white/30">
          <p>© {new Date().getFullYear()} ROCKSPACE</p>
          <p>CRAFTED WITH INTENTION</p>
        </div>
      </div>

      <div className="w-full overflow-hidden leading-none flex items-end pt-10 pointer-events-none select-none">
        <h1 className="footer-giant-text font-display text-[15vw] font-black text-white/5 tracking-tighter w-full text-center m-0 p-0 leading-[0.75]">
          ROCKSPACE
        </h1>
      </div>
    </footer>
  );
}