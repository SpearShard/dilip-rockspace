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

  // Pre-initialize GSAP timeline for instant menu response
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Initial entry
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.5, ease: 'power4.out', delay: 0.5 }
    );

    // Setup timeline once
    tl.current = gsap.timeline({ paused: true });
    tl.current
      .to(overlayRef.current, { autoAlpha: 1, duration: 0.3 })
      .to(menuRef.current, { x: 0, duration: 0.5, ease: 'power4.out' }, 0)
      .fromTo('.mobile-nav-link', { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05 }, 0.2);

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger timeline based on state
  useEffect(() => {
    if (menuOpen) {
      tl.current?.play();
      document.body.style.overflow = 'hidden';
    } else {
      tl.current?.reverse();
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  return (
    <header 
      ref={navRef} 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'
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
              className={`text-[11px] font-mono uppercase tracking-[0.2em] transition-colors ${
                pathname === link.href ? 'text-white' : 'text-white/50 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 z-[100]"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-[1px] bg-white transition-transform ${menuOpen ? 'rotate-45 translate-y-[2.5px]' : ''}`} />
          <span className={`block w-6 h-[1px] bg-white transition-transform ${menuOpen ? '-rotate-45 -translate-y-[2.5px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        ref={overlayRef} 
        onClick={() => setMenuOpen(false)} 
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[45] invisible opacity-0" 
      />

      {/* Sliding Menu */}
      <div 
        ref={menuRef} 
        className="fixed top-0 right-0 h-full w-[100vw] sm:w-[400px] bg-[#050505] border-l border-white/10 z-[46] flex flex-col justify-center px-10" 
        style={{ transform: 'translateX(100%)' }}
      >
        <nav className="flex flex-col gap-8">
          {links.map((link) => (
            <Link 
              key={link.label} 
              href={link.href} 
              onClick={() => setMenuOpen(false)} 
              className="mobile-nav-link font-display text-5xl font-bold text-white block"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}