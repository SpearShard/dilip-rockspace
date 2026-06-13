'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const links = [
  { label: 'People', href: '#team',  },
  { label: 'Origin', href: '#story', },
  { label: 'Work', href: '/work',  },
  { label: 'Process', href: '#process',  },
  { label: 'Contact', href: '#contact', },
];

export default function Nav() {
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const lastScroll = useRef(0);
  const [activeSection, setActiveSection] = useState('');
  const initialAnimDone = useRef(false);
  const pathname = usePathname();
  const isWorkPage = pathname === '/work';
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(() => {
    const header = headerRef.current;
    if (!header) return;

    if (!initialAnimDone.current) {
      initialAnimDone.current = true;
      gsap.set(header, { y: -100 });
      gsap.to(header, { y: 0, duration: 0.6, ease: 'power3.out', delay: 0.1 });
    }

    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastScroll.current;
      header.classList.toggle('scrolled', y > 60);
      if (y > 200 && goingDown && !header.hasAttribute('data-hidden')) {
        header.setAttribute('data-hidden', 'true');
        gsap.to(header, { y: -100, duration: 0.35, ease: 'power2.inOut' });
      } else if ((!goingDown || y <= 200) && header.hasAttribute('data-hidden')) {
        header.removeAttribute('data-hidden');
        gsap.to(header, { y: 0, duration: 0.35, ease: 'power2.inOut' });
      }
      lastScroll.current = y;

      let current = '';
      links.forEach((l) => {
        if (!l.href.startsWith('#')) return;
        const id = l.href.slice(1);
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 300) current = id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openMenu = () => {
    setMenuOpen(true);
    const menu = menuRef.current;
    if (!menu) return;
    menu.classList.remove('hidden');
    gsap.fromTo(menu, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(menu.querySelectorAll('.menu-item'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.4, ease: 'power3.out' });
  };

  const closeMenu = () => {
    setMenuOpen(false);
    menuRef.current?.classList.add('hidden');
  };

  const isActive = (href: string) => {
    if (href === '/work') return isWorkPage;
    return activeSection === href.replace('#', '');
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-md border-b border-border/20 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6">
          <Link href="/" className="relative flex items-center gap-2 shrink-0 group">
            <div className="relative w-[18px] sm:w-[20px] h-[18px] sm:h-[20px] transition-transform duration-300 group-hover:scale-110">
              <Image src="/rockspace.png" alt="RockSpace" fill className="object-contain" />
            </div>
            <span className="hidden sm:inline text-[13px] font-display font-[500] tracking-tight text-text-tertiary group-hover:text-text transition-colors">
              RockSpace
            </span>
          </Link>

          <nav className="hidden sm:flex items-center gap-1">
            {links.map((link) => {
              const href = link.href.startsWith('#') && isWorkPage ? `/${link.href}` : link.href;
              return (
                <a
                  key={link.href}
                  href={href}
                  data-active={isActive(link.href)}
                  className="group relative px-3 lg:px-3.5 py-2 flex items-center gap-2 text-[12px] font-medium tracking-wide transition-colors duration-300"
                >
                  <span className={isActive(link.href) ? 'text-text' : 'text-text-tertiary group-hover:text-text/70 transition-colors'}>
                    {link.label}
                  </span>
                  {isActive(link.href) && (
                    <span className="absolute -bottom-px left-[20%] right-[20%] h-[2px] rounded-full"
                      style={{ background: 'var(--color-accent)' }}
                    />
                  )}
                </a>
              );
            })}
            <a
              href={isWorkPage ? '/#contact' : '#contact'}
              className="ml-3 lg:ml-4 px-4 lg:px-5 py-2 text-[12px] font-semibold text-white bg-accent rounded-full hover:bg-accent/90 transition-all tracking-wide shadow-lg shadow-accent/15 hover:shadow-accent/25 hover:-translate-y-0.5 active:translate-y-0"
            >
              Reach out
            </a>
          </nav>

          <button
            onClick={menuOpen ? closeMenu : openMenu}
            className="sm:hidden relative w-10 h-10 flex items-center justify-center"
            aria-label="Menu"
          >
            <div className="w-5 flex flex-col gap-1">
              <span className={`w-full h-[1.5px] bg-text/50 block rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`} />
              <span className={`w-full h-[1.5px] bg-text/50 block rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-[1.5px] bg-text/50 block rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`} />
            </div>
          </button>
        </div>
      </header>

      <div
        ref={menuRef}
        className="hidden fixed inset-0 z-40 bg-white flex flex-col items-center justify-center sm:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <nav className="flex flex-col items-center gap-10">
          {links.map((link) => {
            const href = link.href.startsWith('#') && isWorkPage ? `/${link.href}` : link.href;
            return (
              <a
                key={link.href}
                href={href}
                onClick={closeMenu}
                className="menu-item flex items-center gap-3 text-3xl text-text/40 hover:text-text transition-colors font-display font-[400] tracking-tight"
              >
                                {link.label}
              </a>
            );
          })}
          <a
            href={isWorkPage ? '/#contact' : '#contact'}
            className="menu-item mt-2 px-10 py-3.5 text-lg text-white bg-accent rounded-full shadow-lg shadow-accent/25"
            onClick={closeMenu}
          >
            Reach out
          </a>
        </nav>
      </div>
    </>
  );
}
