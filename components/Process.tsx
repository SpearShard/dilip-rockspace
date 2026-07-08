'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  { step: '01', title: 'Intelligence', copy: 'Decoding the problem, the audience, and the market void before a single pixel is drawn.' },
  { step: '02', title: 'Synthesis', copy: 'Aligning the messaging, visual direction, and technical stack into one coherent system.' },
  { step: '03', title: 'Engineering', copy: 'Creating interfaces that feel as intelligent and sharp as the strategy behind them.' },
  { step: '04', title: 'Evolution', copy: 'Deploying fast, measuring what matters, and polishing the experience until ROI compounds.' },
];

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;

    // Pin the left heading while scrolling through the steps on the right
    if (window.innerWidth > 1024) {
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: 'bottom bottom',
        pin: leftRef.current,
      });
    }

    const stepCards = gsap.utils.toArray<HTMLElement>('.step-card');
    stepCards.forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0.1, x: 100 },
        { 
          opacity: 1, 
          x: 0,
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'center center',
            scrub: 1,
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section id="process" ref={containerRef} className="relative w-full bg-surface border-t border-border">
      <div className="section-shell">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
          
          {/* Pinned Left Side */}
          <div className="lg:w-1/2 relative">
            {/* Mobile heading (visible below lg) */}
            <div className="lg:hidden mb-16">
              <h2 className="font-display text-5xl sm:text-6xl font-bold leading-[1.05] tracking-[-0.03em] text-white">
                A deliberate <br/> system for <br/> <span className="text-text-tertiary">heavy impact.</span>
              </h2>
            </div>
            {/* Desktop pinned */}
            <div ref={leftRef} className="hidden lg:flex h-screen flex-col justify-center">
              <h2 className="font-display text-5xl lg:text-7xl font-bold leading-[1.05] tracking-[-0.03em] text-white">
                A deliberate <br/> system for <br/> <span className="text-text-tertiary">heavy impact.</span>
              </h2>
            </div>
          </div>

          {/* Scrolling Right Side */}
          <div className="lg:w-1/2 lg:pt-[50vh] lg:pb-[50vh] py-16 lg:py-32">
            <div className="flex flex-col gap-32">
              {stages.map((stage) => (
                <div key={stage.step} className="step-card group relative">
                  <span className="block font-mono text-[10px] tracking-[0.2em] text-white/50 mb-6">
                    Phase {stage.step}
                  </span>
                  <h3 className="font-display text-4xl sm:text-5xl font-bold tracking-[-0.02em] text-white mb-6">
                    {stage.title}
                  </h3>
                  <p className="text-base text-text-muted leading-relaxed max-w-sm">
                    {stage.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}