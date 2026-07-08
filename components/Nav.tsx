'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { usePathname } from 'next/navigation';
import Magnetic from './micro/Magnetic';

const links = [
  { label: 'Work', href: '/work' },
  { label: 'Studio', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.5, ease: 'power4.out', delay: 0.5 }
    );

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const tl = gsap.timeline();
      tl.set(overlayRef.current, { display: 'block' })
        .to(overlayRef.current, { opacity: 1, duration: 0.4, ease: 'power3.out' })
        .to(menuRef.current, { x: 0, duration: 0.6, ease: 'power4.out' }, '-=0.1')
        .fromTo(gsap.utils.toArray('.mobile-nav-link'),
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
          '-=0.3'
        );
      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power3.out', onComplete: () => {
        gsap.set(overlayRef.current, { display: 'none' });
      }});
      gsap.to(menuRef.current, { x: '100%', duration: 0.5, ease: 'power4.in' });
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header 
      ref={navRef} 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/50 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="section-shell flex items-center justify-between">
        <Magnetic>
          <Link href="/" className="z-10 flex items-center">
            <span className="font-display text-lg font-bold tracking-tighter text-white">
              ROCKSPACE<span className="text-white/40">.</span>
            </span>
          </Link>
        </Magnetic>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link 
              key={link.label} 
              href={link.href}
              className={`text-[11px] font-mono uppercase tracking-[0.2em] transition-colors duration-300 ${
                pathname === link.href ? 'text-white' : 'text-white/50 hover:text-white'
              }`}
              onMouseEnter={() => document.body.classList.add('cursor-hover')}
              onMouseLeave={() => document.body.classList.remove('cursor-hover')}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden relative z-50 flex flex-col gap-1.5 p-2"
          aria-label="Open menu"
        >
          <span className="block w-6 h-[1.5px] bg-white/80 transition-all duration-300" />
          <span className="block w-6 h-[1.5px] bg-white/80 transition-all duration-300" />
          <span className="block w-6 h-[1.5px] bg-white/80 transition-all duration-300" />
        </button>
      </div>

      <div
        ref={overlayRef}
        onClick={() => setMenuOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 hidden opacity-0"
      />

      <div
        ref={menuRef}
        className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col justify-center px-12"
        style={{ transform: 'translateX(100%)' }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          aria-label="Close menu"
        >
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <nav className="flex flex-col gap-8">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`mobile-nav-link text-3xl font-display font-bold tracking-tight transition-colors duration-300 ${
                pathname === link.href ? 'text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 mb-4">
            Get in touch
          </p>
          <a href="mailto:hello@rockspace.io" className="text-sm text-white/60 hover:text-white transition-colors font-mono">
            hello@rockspace.io
          </a>
        </div>
      </div>
    </header>
  );
}
