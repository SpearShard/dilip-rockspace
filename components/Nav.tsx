'use client';

import { useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { IconClose } from '@/lib/icons';

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
  const sparkleRef = useRef<SVGSVGElement>(null);
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
    const sparkle = sparkleRef.current;
    if (!menu || !sparkle) return;

    menu.classList.remove('hidden', 'pointer-events-none');

    const stars = starsRef.current.filter(Boolean) as HTMLDivElement[];
    const menuItems = menu.querySelectorAll('.menu-item');
    const backBtn = menu.querySelector('.menu-back');
    const label = menu.querySelector('.menu-label');

    gsap.set(sparkle, { scale: 0, opacity: 0, transformOrigin: '82% 20%' });
    gsap.set(stars, { x: 0, y: 0, scale: 0, opacity: 0, rotation: 0 });
    gsap.set(menuItems, { opacity: 0, x: 20 });
    gsap.set(backBtn, { opacity: 0, scale: 0.8 });
    gsap.set(label, { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(sparkle, {
      scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(1.4)', transformOrigin: '82% 20%',
    }, 0)
      .to(stars, {
        x: (i) => starData[i].x * 0.35,
        y: (i) => starData[i].y * 0.35,
        scale: (i) => starData[i].scale * 0.6,
        opacity: 0.5,
        rotation: (i) => starData[i].rotation,
        duration: 0.7,
        ease: 'power4.out',
        stagger: { each: 0.012, from: 'center' },
      }, 0.1)
      .to(label, { opacity: 1, duration: 0.3 }, 0.2)
      .to(backBtn, { opacity: 1, scale: 1, duration: 0.3 }, 0.25)
      .to(menuItems, {
        opacity: 1, x: 0, duration: 0.4, stagger: 0.07, ease: 'power2.out',
      }, 0.3);
  };

  const closeMenu = () => {
    const menu = menuRef.current;
    const sparkle = sparkleRef.current;
    if (!menu || !sparkle) return;

    const stars = starsRef.current.filter(Boolean) as HTMLDivElement[];
    const menuItems = menu.querySelectorAll('.menu-item');
    const backBtn = menu.querySelector('.menu-back');
    const label = menu.querySelector('.menu-label');

    const tl = gsap.timeline({
      defaults: { ease: 'power2.in' },
      onComplete: () => {
        setMenuOpen(false);
        menu.classList.add('hidden', 'pointer-events-none');
      },
    });

    tl.to(menuItems, { opacity: 0, x: 12, duration: 0.15, stagger: 0.03 }, 0)
      .to([backBtn, label], { opacity: 0, duration: 0.1 }, 0)
      .to(stars, {
        x: 0, y: 0, scale: 0, opacity: 0, rotation: 0,
        duration: 0.35, ease: 'power3.in',
        stagger: { each: 0.008, from: 'random' },
      }, 0.05)
      .to(sparkle, {
        scale: 0, opacity: 0, duration: 0.3, ease: 'power2.in', transformOrigin: '82% 20%',
      }, 0.1);
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
      const handleNavLeave = () => { xTo(-120); yTo(-120); };

      navInner.addEventListener('mousemove', handleNavMove);
      navInner.addEventListener('mouseleave', handleNavLeave);
    }

    return () => { window.removeEventListener('scroll', onScroll); };
  }, [menuOpen]);

  return (
    <>
      <header ref={headerRef} className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50">
        <div className="relative flex items-center justify-center gap-2 sm:gap-4 px-2 sm:px-4 py-1.5 sm:py-2 bg-white/90 backdrop-blur-xl border border-border/60 rounded-full shadow-[0_4px_24px_rgba(8,8,8,0.06)] overflow-hidden">
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
                className={`px-3 sm:px-4 py-1.5 text-[13px] sm:text-[14px] font-semibold-ui tracking-[-0.02em] rounded-full transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-text bg-black/[0.04] nav-link-active'
                    : 'text-text-muted/70 hover:text-text hover:bg-black/[0.03] hover:scale-[1.02]'
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
        className="fixed top-4 sm:top-5 right-4 sm:right-5 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-xl border border-border/40 shadow-lg shadow-black/[0.04] transition-all duration-300 hover:bg-white hover:scale-105 hover:shadow-xl"
        style={{ scale: 0, opacity: 0 }}
        aria-label="Open menu"
      >
        <div className="relative w-5 h-5 sm:w-[22px] sm:h-[22px]">
          <Image src="/Vector 2173.png" alt="" fill className="object-contain brightness-0" sizes="22px" />
        </div>
      </button>

      <div
        ref={menuRef}
        className="hidden pointer-events-none fixed z-[60]"
        style={{ top: 0, right: 0, width: 'min(600px, calc(100vw - 32px))', height: 'min(480px, calc((100vw - 32px) * 0.8))' }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="pointer-events-none absolute" style={{ left: '28%', top: '45%' }} aria-hidden="true">
          {starData.map((s, i) => (
            <div
              key={i}
              ref={(el) => { starsRef.current[i] = el; }}
              className="absolute"
              style={{
                width: s.size * 0.7,
                height: s.size * 0.7,
                background: starColors[i % starColors.length],
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                borderRadius: 1,
                marginLeft: -(s.size * 0.7) / 2,
                marginTop: -(s.size * 0.7) / 2,
              }}
            />
          ))}
        </div>

        <svg
          ref={sparkleRef}
          viewBox="0 0 100 80"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full drop-shadow-2xl"
          style={{ filter: 'drop-shadow(0 20px 60px rgba(28,24,22,0.18)) drop-shadow(0 4px 16px rgba(28,24,22,0.10))' }}
          aria-hidden="true"
        >
          <path
            d="M 27.96 0 Q 37 24.6 99.5 15.5 Q 36.5 40.75 29.72 79.75 Q 22 47.55 0 43 Q 16 26.4 27.96 0 Z"
            fill="#F8F7F4"
            stroke="#E8E4DF"
            strokeWidth="0.3"
          />
          <path
            d="M 27.96 0 Q 37 24.6 99.5 15.5 Q 36.5 40.75 29.72 79.75 Q 22 47.55 0 43 Q 16 26.4 27.96 0 Z"
            fill="url(#sparkle-gradient)"
          />
          <defs>
            <radialGradient id="sparkle-gradient" cx="30%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#F5F0EC" stopOpacity="0" />
              <stop offset="100%" stopColor="#EDE8E3" stopOpacity="0.6" />
            </radialGradient>
          </defs>
        </svg>

        <div className="absolute" style={{ left: '4%', top: '18%', width: '50%' }}>
          <p className="menu-label font-mono text-[9px] tracking-[0.25em] uppercase text-text/25 mb-6 ml-0.5">
            ROCKSPACE
          </p>
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`menu-item group flex items-center gap-3 py-1.5 transition-all duration-200 ${
                  isActive(link.href) ? 'text-text' : 'text-text/35 hover:text-text'
                }`}
              >
                <span
                  className={`w-1 h-1 rounded-full flex-shrink-0 transition-all duration-200 ${
                    isActive(link.href)
                      ? 'bg-accent scale-100'
                      : 'bg-text/20 scale-75 group-hover:bg-accent group-hover:scale-100'
                  }`}
                />
                <span className="font-bold-ui text-[clamp(1.75rem,4vw,2.5rem)] tracking-[-0.035em] leading-none">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        <button
          onClick={closeMenu}
          className="menu-back absolute flex items-center gap-1.5 text-[11px] font-mono tracking-[0.1em] uppercase text-text/30 hover:text-text/60 transition-colors duration-200 group"
          style={{ left: '4%', bottom: '22%' }}
        >
          <IconClose className="size-3 transition-transform duration-200 group-hover:rotate-90" />
          Close
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-[59] bg-text/[0.04] backdrop-blur-[2px]" onClick={closeMenu} />
      )}
    </>
  );
}
