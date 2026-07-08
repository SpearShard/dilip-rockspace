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
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.5, ease: 'power4.out', delay: 0.5 }
    );

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      </div>
    </header>
  );
}