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
    // Initial entry animation
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.5, ease: 'power4.out', delay: 0.5 }
    );

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menu Animation Logic
  useEffect(() => {
    if (menuOpen) {
      const tl = gsap.timeline();
      tl.set(overlayRef.current, { display: 'block' })
        .to(overlayRef.current, { opacity: 1, duration: 0.4 })
        .to(menuRef.current, { x: 0, duration: 0.6, ease: 'power4.out' }, 0)
        .fromTo('.mobile-nav-link', { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, ease: 'power3.out' }, 0.2);
      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, onComplete: () => gsap.set(overlayRef.current, { display: 'none' })});
      gsap.to(menuRef.current, { x: '100%', duration: 0.5, ease: 'power4.in' });
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

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link 
              key={link.label} 
              href={link.href}
              className={`text-[14px] font-mono uppercase tracking-[0.2em] transition-colors ${
                pathname === link.href ? 'text-white' : 'text-white/50 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger - Optimized for touch target */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5"
          aria-label="Open menu"
        >
          <span className="block w-6 h-[1px] bg-white" />
          <span className="block w-6 h-[1px] bg-white" />
        </button>
      </div>

      {/* Mobile Overlay & Menu */}
      <div ref={overlayRef} onClick={() => setMenuOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 hidden opacity-0" />
      <div ref={menuRef} className="fixed top-0 right-0 h-full w-[85vw] sm:w-[400px] bg-[#050505] border-l border-white/10 z-50 flex flex-col justify-center px-10" style={{ transform: 'translateX(100%)' }}>
        <button onClick={() => setMenuOpen(false)} className="absolute top-8 right-6 text-white uppercase text-[10px] tracking-widest">Close</button>
        <nav className="flex flex-col gap-6">
          {links.map((link) => (
            <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)} className="mobile-nav-link font-display text-4xl font-bold text-white">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}