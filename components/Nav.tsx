'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  const starRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out' });
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    const isOpen = !menuOpen;
    setMenuOpen(isOpen);
    const tl = gsap.timeline();

    if (isOpen) {
      tl.to(starRef.current, { rotate: 180, duration: 0.6, ease: 'power3.inOut' })
        .to(menuRef.current, { height: 'auto', opacity: 1, duration: 0.5, ease: 'power4.out' }, 0)
        .fromTo('.nav-link-mobile', { y: 10, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, ease: 'power3.out' }, 0.2);
    } else {
      tl.to(starRef.current, { rotate: 0, duration: 0.6, ease: 'power3.inOut' })
        .to(menuRef.current, { height: 0, opacity: 0, duration: 0.4, ease: 'power3.inOut' });
    }
  };

  return (
    <header ref={navRef} className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="section-shell">
        <div className="flex items-center justify-between">
          <Magnetic>
            <Link href="/" className="z-50 font-display text-lg font-bold text-white">ROCKSPACE.</Link>
          </Magnetic>

          <nav className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <Link key={link.label} href={link.href} className={`text-[11px] font-mono uppercase tracking-[0.2em] ${pathname === link.href ? 'text-white' : 'text-white/50 hover:text-white'}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          <button onClick={toggleMenu} className="md:hidden relative z-50 w-12 h-12 flex items-center justify-center">
            <div ref={starRef} className="relative w-8 h-8">
              <Image src="/Vector 2173.png" alt="Menu" fill className="object-contain" />
            </div>
          </button>
        </div>

        {/* Below-the-star Dropdown */}
        <div 
          ref={menuRef}
          className="md:hidden overflow-hidden opacity-0 h-0"
        >
          <nav className="flex flex-col gap-6 pt-8 pb-4 text-right">
            {links.map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                onClick={toggleMenu}
                className="nav-link-mobile font-display text-3xl font-bold text-white block hover:text-white/40 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}