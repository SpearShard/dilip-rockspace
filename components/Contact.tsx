'use client';

import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { SceneGate } from '@/lib/useInView';
import { siteConfig } from '@/lib/projectData';
import { IconMail } from '@/lib/icons';
import SectionLabel from '@/components/micro/SectionLabel';
import Magnetic from '@/components/micro/Magnetic';
import BookCallDialog from '@/components/BookCallDialog';

const ContactScene = dynamic(() => import('@/components/scene/ContactScene'), { ssr: false });

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* noop */ }
  };

  return (
    <section id="contact" className="relative bg-surface overflow-hidden border-t border-border/50">
      <SceneGate margin="150%">
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
          <Suspense fallback={null}><ContactScene /></Suspense>
        </div>
      </SceneGate>

      <div className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <SectionLabel className="mb-4">Get in touch</SectionLabel>
              <h2 className="section-heading mb-5">Let&rsquo;s build something undeniable.</h2>
              <p className="text-body-lg text-text-muted font-medium-ui leading-[1.55] max-w-md">
                Tell us what you&rsquo;re building. We respond within 24 hours with a plan, not a pitch deck.
              </p>
              <p className="mt-6 font-mono text-[11px] text-text-tertiary uppercase tracking-wider">
                {siteConfig.location}
              </p>
            </div>

            <div className="space-y-4">
              <Magnetic strength={0.18}>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="contact-method-card w-full text-left group"
                >
                  <p className="font-mono text-[11px] uppercase tracking-wider text-accent mb-2">Email</p>
                  <p className="text-heading-sm text-text flex items-center gap-2">
                    <IconMail className="size-4 text-accent shrink-0" />
                    {copied ? 'Copied!' : siteConfig.email}
                  </p>
                </button>
              </Magnetic>
              <Magnetic strength={0.15}>
                <button
                  type="button"
                  onClick={() => setShowBooking(true)}
                  className="contact-method-card w-full text-left group"
                >
                  <p className="font-mono text-[11px] uppercase tracking-wider text-accent mb-2">Book a call</p>
                  <p className="text-heading-sm text-text">30 min · Pick a time that works</p>
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>

      <BookCallDialog open={showBooking} onClose={() => setShowBooking(false)} />
    </section>
  );
}
