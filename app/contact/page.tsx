'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/rockspace.in/',
    icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/rkspace/posts/?feedView=all',
    icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'Mail',
    href: 'mailto:dilipseervi2308@gmail.com',
    icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 7L2 7" />
      </svg>
    ),
  },
];

const contactMethods = [
  {
    label: 'Email us',
    value: 'hello@rockspace.io',
    href: 'mailto:hello@rockspace.io',
    desc: 'We respond within 24 hours',
  },
  {
    label: 'Book a call',
    value: 'Schedule a chat',
    href: '#',
    desc: '30 min, no commitment',
  },
];

export default function Contact() {
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = headerRef.current;
    if (!el) return;
    const items = el.querySelectorAll('.gsap-reveal');
    gsap.fromTo(
      items,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.1 }
    );

    const cards = document.querySelectorAll('.contact-card');
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.4 + i * 0.1,
        }
      );
    });
  }, []);

  return (
    <>
      <Nav />
      <main className="min-h-dvh bg-bg selection:bg-accent/20">
        <section className="relative pt-28 sm:pt-36 pb-24 sm:pb-32 bg-bg overflow-hidden">
          {/* Decorative gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none -z-10 opacity-25">
            <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent rounded-full blur-3xl" />
          </div>
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none -z-10 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-tl from-accent-warm/5 via-transparent to-transparent rounded-full blur-3xl" />
          </div>

          {/* Back home */}
          <Link
            href="/"
            className="absolute top-6 sm:top-8 left-6 sm:left-10 z-10 w-10 h-8 sm:w-12 sm:h-[38px] cursor-pointer group"
            aria-label="Go home"
          >
            <Image
              src="/Vector 2173.png"
              alt=""
              fill
              className="object-contain object-left-top brightness-0 opacity-40 group-hover:opacity-70 transition-opacity duration-300"
              sizes="48px"
            />
          </Link>

          <div ref={headerRef} className="max-w-[90rem] mx-auto px-6 sm:px-10">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="mb-14 sm:mb-18">
                <p className="gsap-reveal font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-text-muted/50 mb-3 sm:mb-4">
                  Get in touch
                </p>
                <h1 className="gsap-reveal font-display font-[700] text-[clamp(2.5rem,7vw,5.5rem)] tracking-[-0.04em] text-text leading-[0.95]">
                  Let&rsquo;s build<span className="text-accent">.</span>
                </h1>
                <p className="gsap-reveal mt-5 sm:mt-6 text-base sm:text-lg text-text-muted max-w-lg leading-relaxed">
                  Got a project, a pitch, or just a wild idea? We&rsquo;re always up for a conversation.
                </p>
              </div>

              {/* Contact cards */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-12 sm:mb-14">
                {contactMethods.map((m) => (
                  <a
                    key={m.label}
                    href={m.href}
                    target={m.href.startsWith('http') ? '_blank' : undefined}
                    rel={m.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="contact-card group relative bg-white border border-border/20 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-0.5 block"
                    style={{ opacity: 0 }}
                  >
                    <p className="font-mono text-[10px] sm:text-xs tracking-[0.15em] uppercase text-text-tertiary/60 mb-2 sm:mb-3">
                      {m.label}
                    </p>
                    <p className="font-display text-lg sm:text-xl md:text-2xl font-[700] text-text tracking-[-0.02em] group-hover:text-accent transition-colors duration-300">
                      {m.value}
                    </p>
                    <p className="text-sm sm:text-base text-text-muted mt-1.5 sm:mt-2">
                      {m.desc}
                    </p>
                    <div className="absolute top-6 sm:top-8 right-6 sm:right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                    <div className="absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none"
                      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'inset 0 0 0 1px #D96C4A25'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'inset 0 0 0 1px transparent'; }}
                    />
                  </a>
                ))}
              </div>

              {/* Social links */}
              <div className="max-w-md">
                <p className="font-mono text-[10px] sm:text-xs tracking-[0.15em] uppercase text-text-tertiary/60 mb-4 sm:mb-5">
                  Find us on
                </p>
                <div className="flex items-center gap-3 sm:gap-4">
                  {socials.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl border border-border/30 text-text-muted hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
                        aria-label={s.label}
                      >
                        <Icon className="w-5 h-5 sm:w-[22px] sm:h-[22px] transition-transform duration-300 group-hover:scale-110" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
