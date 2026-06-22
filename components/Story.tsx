'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import DottedBoundary from '@/components/patterns/DottedBoundary';

gsap.registerPlugin(ScrollTrigger);

const originals = [
  {
    id: 'dm',
    name: 'Debasis',
    quote: 'Got tired of handing off Figma files. So I learned to build them myself.',
    role: 'Design → Code',
    rotate: -2,
    pinColor: '#D96C4A',
  },
  {
    id: 'gj',
    name: 'Jayaditya',
    quote: 'Components before code. Systems before screens. I draw the grid before anyone sees the page.',
    role: 'Architecture → Interface',
    rotate: 1.5,
    pinColor: '#7C3AED',
  },
  {
    id: 'dp',
    name: 'Dilip',
    quote: 'Built a bot to do my job. Then another. Turns out the real job was building the bots.',
    role: 'Automation → Abstraction',
    rotate: -1,
    pinColor: '#E8B84B',
  },
];

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const threadRef = useRef<SVGPathElement>(null);
  const scribbleRef = useRef<SVGEllipseElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    const notes = el.querySelectorAll('.origin-note');
    const thread = threadRef.current;
    const scribble = scribbleRef.current;

    gsap.set(notes, { opacity: 0, y: 30, scale: 0.92, rotate: (i) => originals[i].rotate });

    notes.forEach((note, i) => {
      ScrollTrigger.create({
        trigger: note,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(note, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'back.out(1.4)',
            delay: i * 0.2,
          });
        },
      });
    });

    if (thread) {
      gsap.set(thread, { strokeDashoffset: 600 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 70%',
        end: 'bottom 40%',
        once: true,
        onEnter: () => {
          gsap.to(thread, {
            strokeDashoffset: 0,
            duration: 2.2,
            ease: 'power3.inOut',
          });
        },
      });
    }

    if (scribble) {
      gsap.set(scribble, { strokeDashoffset: 200 });
      ScrollTrigger.create({
        trigger: el!.querySelector('.pull-quote'),
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(scribble, {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: 'power2.inOut',
          });
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section id="story" ref={sectionRef} className="relative bg-[#F8F6F4] overflow-hidden paper-texture">
      <div className="hidden md:block absolute inset-y-0 left-1/2 pointer-events-none z-0" style={{ width: '64rem', marginLeft: '-32rem' }}>
        <div className="relative h-full">
          <DottedBoundary dash="8,8" />
        </div>
      </div>
      <div className="py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative max-w-5xl mx-auto">
            <div className="relative z-10 px-6 md:px-10 py-6">
            <div className="mb-14 sm:mb-18 md:mb-22 max-w-2xl">
              <p className="font-hand text-2xl sm:text-3xl text-accent mb-1" style={{ transform: 'rotate(-0.5deg)' }}>
                The origin
              </p>
              <h2 className="section-title wavy-underline">
                Three paths collided<span className="text-accent">.</span>
              </h2>
            </div>

            <div className="relative">
              <svg
                className="absolute left-[5%] md:left-[10%] top-[5%] w-[90%] md:w-[80%] h-[85%] pointer-events-none z-0"
                viewBox="0 0 800 600"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                <path
                  ref={threadRef}
                  d="M120,80 C250,20 300,150 400,120 C500,90 480,250 550,220 C620,190 600,350 680,320"
                  stroke="var(--color-border)"
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray="600"
                  strokeLinecap="round"
                  opacity="0.4"
                />
              </svg>

              <div className="relative z-10 flex flex-col md:flex-row items-start gap-8 md:gap-6 lg:gap-10">
                {originals.map((o) => (
                  <div
                    key={o.id}
                    className="origin-note sticky-note w-full md:w-1/3 rounded-xl p-6 sm:p-7"
                    style={{ transform: `rotate(${o.rotate}deg)`, opacity: 0 }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-3 h-3 rounded-full mt-1 shrink-0 shadow-sm"
                        style={{ background: o.pinColor }}
                      />
                      <h3 className="font-hand text-2xl sm:text-3xl text-text leading-none">
                        {o.name}
                      </h3>
                    </div>

                    <p className="font-hand text-xl sm:text-xl text-text-muted leading-relaxed mb-4">
                      &ldquo;{o.quote}&rdquo;
                    </p>

                    <div className="text-xs font-mono text-text-tertiary tracking-[0.1em] uppercase">
                      {o.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pull-quote relative mt-20 sm:mt-24 md:mt-28 text-center px-4">
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 400 120"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                <ellipse
                  ref={scribbleRef}
                  cx="200"
                  cy="60"
                  rx="190"
                  ry="50"
                  stroke="#D96C4A"
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray="200"
                  strokeLinecap="round"
                  opacity="0.2"
                />
              </svg>
              <div className="max-w-2xl mx-auto relative">
                <span className="font-hand text-[3rem] sm:text-[4rem] text-accent/10 leading-none block select-none" style={{ transform: 'rotate(-3deg)' }}>
                  &amp;
                </span>
                <p className="font-hand text-2xl sm:text-2xl md:text-3xl text-text-muted mt-[-0.5em] leading-relaxed" style={{ transform: 'rotate(0.3deg)' }}>
                  RockSpace isn&rsquo;t a studio. It&rsquo;s what happens when three people stop asking for permission.
                </p>
                <div className="flex justify-center gap-1 mt-4 opacity-30">
                  <span className="w-2 h-2 rounded-full bg-text-tertiary" />
                  <span className="w-2 h-2 rounded-full bg-text-tertiary" />
                  <span className="w-2 h-2 rounded-full bg-text-tertiary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

