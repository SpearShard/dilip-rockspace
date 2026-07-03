'use client';

import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import BackHome from '@/components/layout/BackHome';
import PageHeader from '@/components/layout/PageHeader';
import SectionLabel from '@/components/micro/SectionLabel';
import BookCallDialog from '@/components/BookCallDialog';
import { siteConfig, socialLinks, workStats } from '@/lib/projectData';
import { IconArrow, IconMail, IconInstagram, IconLinkedIn } from '@/lib/icons';

gsap.registerPlugin(ScrollTrigger);

const socialIcons = { Instagram: IconInstagram, LinkedIn: IconLinkedIn } as const;

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.querySelectorAll('.reveal').forEach((item, i) => {
      gsap.fromTo(item, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: i * 0.05,
        scrollTrigger: { trigger: item, start: 'top 92%', once: true },
      });
    });
  }, { scope: sectionRef });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* noop */ }
  };

  return (
    <>
      <Nav />
      <main className="min-h-dvh bg-bg selection:bg-accent/25">
        <section ref={sectionRef} className="page-section relative overflow-hidden">
          <BackHome />

          <div className="max-w-7xl mx-auto px-6 sm:px-10">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <div className="lg:col-span-5 lg:sticky lg:top-32">
                <PageHeader
                  eyebrow="Get in touch"
                  title={<>Let&rsquo;s build something <span className="text-accent">undeniable</span>.</>}
                  description="Got a product, a rebrand, or a pitch that needs to land? We reply within 24 hours with a plan, not fluff."
                />

                <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border/60 pt-8">
                  {workStats.map((s) => (
                    <div key={s.label}>
                      <p className="stat-value text-text text-xl sm:text-2xl">{s.value}</p>
                      <p className="font-mono text-[10px] text-text-tertiary mt-1 uppercase tracking-wider">{s.label}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-8 font-mono text-[11px] text-text-tertiary uppercase tracking-wider">
                  {siteConfig.location} · GMT+5:30
                </p>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="reveal contact-method-card w-full text-left group"
                  style={{ opacity: 0 }}
                >
                  <p className="font-mono text-[11px] uppercase tracking-wider text-accent mb-3">Email</p>
                  <p className="text-heading-sm text-text group-hover:text-accent transition-colors">
                    {copied ? 'Copied to clipboard!' : siteConfig.email}
                  </p>
                  <p className="text-sm text-text-muted mt-2">Tap to copy · We respond within 24 hours</p>
                  <span className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold-ui text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    <IconMail className="size-3.5" /> Copy address
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowBooking(true)}
                  className="reveal contact-method-card w-full text-left group"
                  style={{ opacity: 0 }}
                >
                  <p className="font-mono text-[11px] uppercase tracking-wider text-accent mb-3">Book a call</p>
                  <p className="text-heading-sm text-text">30 minutes. Pick a time.</p>
                  <p className="text-sm text-text-muted mt-2">Walk us through the problem and we&apos;ll tell you if we&apos;re the right fit.</p>
                  <span className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold-ui text-accent">
                    Schedule <IconArrow className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>

                <div className="reveal bento-card p-6 sm:p-8" style={{ opacity: 0 }}>
                  <SectionLabel className="mb-4">Find us</SectionLabel>
                  <div className="flex flex-wrap gap-2.5">
                    {socialLinks.map((s) => {
                      const Icon = socialIcons[s.label as keyof typeof socialIcons];
                      return (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold-ui text-text-muted border border-border rounded-full hover:border-accent/30 hover:text-text transition-all duration-300"
                        >
                          {Icon && <Icon className="size-3.5" />}
                          {s.label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      <BookCallDialog open={showBooking} onClose={() => setShowBooking(false)} />
    </>
  );
}
