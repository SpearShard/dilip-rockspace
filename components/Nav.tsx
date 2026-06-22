'use client';

import { useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';


const links = [
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Contact', href: '/contact' },
];

const starColors = ['#D96C4A', '#E8B84B', '#7C3AED', '#8A8074', '#1C1816', '#D96C4A', '#E8B84B', '#8A8074'];
const STAR_COUNT = 32;

interface StarData {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  size: number;
}

function detRand(i: number): number {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function generateStars(): StarData[] {
  const stars: StarData[] = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    const angle = (i / STAR_COUNT) * Math.PI * 2 + (detRand(i * 3 + 1) - 0.5) * 0.6;
    const distance = 180 + detRand(i * 3 + 2) * 420;
    stars.push({
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      rotation: detRand(i * 3 + 3) * 720 - 360,
      scale: 0.3 + detRand(i * 3 + 4) * 0.7,
      size: Math.round((6 + detRand(i * 3 + 5) * 10) * 100) / 100,
    });
  }
  return stars;
}

export default function Nav() {
  const headerRef = useRef<HTMLElement>(null);
  const floatRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lastScroll = useRef(0);
  const initialAnimDone = useRef(false);
  const starData = useMemo(() => generateStars(), []);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  const openMenu = () => {
    setMenuOpen(true);
    const menu = menuRef.current;
    const overlay = overlayRef.current;
    if (!menu || !overlay) return;

    overlay.classList.remove('hidden', 'pointer-events-none');
    menu.classList.remove('hidden', 'pointer-events-none');

    const stars = starsRef.current.filter(Boolean) as HTMLDivElement[];
    const menuItems = menu.querySelectorAll('.menu-item');
    const backBtn = menu.querySelector('.menu-back');

    gsap.set(overlay, { opacity: 0 });
    gsap.set(stars, { x: 0, y: 0, scale: 0, opacity: 0, rotation: 0 });
    gsap.set(menuItems, { opacity: 0, y: 24, scale: 0.95 });
    gsap.set(backBtn, { opacity: 0, scale: 0.8 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(overlay, { opacity: 1, duration: 0.3 }, 0)
      .to(stars, {
        x: (i) => starData[i].x,
        y: (i) => starData[i].y,
        scale: (i) => starData[i].scale,
        opacity: 0.6,
        rotation: (i) => starData[i].rotation,
        duration: 0.9,
        ease: 'power4.out',
        stagger: { each: 0.015, from: 'center' },
      }, 0.05)
      .to(backBtn, { opacity: 1, scale: 1, duration: 0.4 }, '-=0.4')
      .to(menuItems, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.07 }, '-=0.2');
  };

  const closeMenu = () => {
    const menu = menuRef.current;
    const overlay = overlayRef.current;
    if (!menu || !overlay) return;

    const stars = starsRef.current.filter(Boolean) as HTMLDivElement[];
    const menuItems = menu.querySelectorAll('.menu-item');
    const backBtn = menu.querySelector('.menu-back');

    const tl = gsap.timeline({
      defaults: { ease: 'power2.in' },
      onComplete: () => {
        setMenuOpen(false);
        menu.classList.add('hidden', 'pointer-events-none');
        overlay.classList.add('hidden', 'pointer-events-none');
      },
    });

    tl.to(menuItems, { opacity: 0, y: 12, scale: 0.97, duration: 0.12, stagger: 0.02 }, 0)
      .to(backBtn, { opacity: 0, scale: 0.8, duration: 0.1 }, 0)
      .to(stars, {
        x: 0,
        y: 0,
        scale: 0,
        opacity: 0,
        rotation: 0,
        duration: 0.4,
        ease: 'power3.in',
        stagger: { each: 0.008, from: 'random' },
      }, '-=0.05')
      .to(overlay, { opacity: 0, duration: 0.2 }, '-=0.15');
  };

  useGSAP(() => {
    const header = headerRef.current;
    const floatBtn = floatRef.current;
    if (!header || !floatBtn) return;

    if (!initialAnimDone.current) {
      initialAnimDone.current = true;
      gsap.set(header, { y: -80, opacity: 0 });
      gsap.to(header, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.1 });
      gsap.set(floatBtn, { scale: 0, opacity: 0 });
    }

    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastScroll.current;
      const pastHero = y > window.innerHeight * 0.85;

      if (pastHero && goingDown && !header.hasAttribute('data-hidden') && !menuOpen) {
        header.setAttribute('data-hidden', 'true');
        gsap.to(header, { y: -80, opacity: 0, duration: 0.3, ease: 'power2.inOut' });
        gsap.to(floatBtn, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' });
      } else if ((!goingDown || !pastHero) && header.hasAttribute('data-hidden')) {
        header.removeAttribute('data-hidden');
        gsap.to(header, { y: 0, opacity: 1, duration: 0.35, ease: 'power2.inOut' });
        gsap.to(floatBtn, { scale: 0, opacity: 0, duration: 0.2, ease: 'power2.in' });
      }
      lastScroll.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const navInner = header.querySelector('div');
    const blob = blobRef.current;
    if (navInner && blob) {
      const xTo = gsap.quickTo(blob, 'x', { duration: 0.6, ease: 'power2.out' });
      const yTo = gsap.quickTo(blob, 'y', { duration: 0.6, ease: 'power2.out' });

      const handleNavMove = (e: MouseEvent) => {
        const rect = navInner.getBoundingClientRect();
        xTo(e.clientX - rect.left - 60);
        yTo(e.clientY - rect.top - 60);
      };

      const handleNavLeave = () => {
        xTo(-120);
        yTo(-120);
      };

      navInner.addEventListener('mousemove', handleNavMove);
      navInner.addEventListener('mouseleave', handleNavLeave);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="relative flex items-center justify-between gap-2 sm:gap-4 px-2 sm:px-4 py-1.5 sm:py-2 bg-white/75 backdrop-blur-xl border border-accent/20 rounded-full shadow-lg shadow-accent/5 overflow-hidden">

          <div
            ref={blobRef}
            className="absolute pointer-events-none w-[120px] h-[120px] rounded-full bg-accent/8 blur-xl"
            style={{ left: -120, top: -120 }}
          />

          <nav className="relative z-10 flex items-center gap-0.5 sm:gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 sm:px-4 py-1.5 text-[13px] sm:text-[14px] font-[700] tracking-wide rounded-full transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-text bg-black/[0.04]'
                    : 'text-text-muted/70 hover:text-text hover:bg-black/[0.03]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <button
        ref={floatRef}
        onClick={openMenu}
        className="fixed top-4 sm:top-5 right-4 sm:right-5 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-xl border border-border/40 shadow-lg shadow-black/[0.04] transition-colors duration-300 hover:bg-white"
        aria-label="Open menu"
      >
        <div className="relative w-5 h-5 sm:w-[22px] sm:h-[22px]">
          <Image
            src="/Vector 2173.png"
            alt=""
            fill
            className="object-contain brightness-0"
            sizes="22px"
          />
        </div>
      </button>

      {/* Full-screen overlay */}
      <div
        ref={overlayRef}
        className="hidden pointer-events-none fixed inset-0 z-[60] bg-gradient-to-br from-[#F8F7F4] via-white to-[#F5F0EC]"
        onClick={closeMenu}
      />

      {/* Star particles container — always in DOM for GSAP */}
      <div className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center opacity-0" aria-hidden="true">
        {starData.map((s, i) => (
          <div
            key={i}
            ref={(el) => { starsRef.current[i] = el; }}
            className="absolute"
            style={{
              width: s.size,
              height: s.size,
              background: starColors[i % starColors.length],
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              borderRadius: 1,
            }}
          />
        ))}
      </div>

      {/* Menu content */}
      <div
        ref={menuRef}
        className="hidden pointer-events-none fixed inset-0 z-[60] flex flex-col items-center justify-center px-6"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <button
          onClick={closeMenu}
          className="menu-back absolute top-6 sm:top-8 right-6 sm:right-8 flex items-center gap-2 text-sm font-[600] text-text/50 hover:text-text transition-colors duration-300 group"
        >
          <span className="text-[13px]">Back</span>
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 4l4 4-4 4" />
          </svg>
        </button>

        <nav className="flex flex-col items-center gap-6 sm:gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={`menu-item text-[clamp(2.2rem,6vw,4rem)] font-display font-[600] tracking-[-0.03em] transition-all duration-300 ${
                isActive(link.href) ? 'text-text' : 'text-text/40 hover:text-text'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-8 sm:bottom-10 flex items-center gap-4 text-[11px] font-mono tracking-[0.15em] uppercase text-text/20">
          <span className="w-6 h-px bg-border/40" />
          <span>ROCKSPACE</span>
          <span className="w-6 h-px bg-border/40" />
        </div>
      </div>
    </>
  );
}
