'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const originals = [
  {
    id: 'dm',
    name: 'Debasis',
    quote: 'Got tired of handing off Figma files. So I learned to build them myself.',
    role: 'Design → Code',
  },
  {
    id: 'gj',
    name: 'Jayaditya',
    quote: 'Components before code. Systems before screens. I draw the grid before anyone sees the page.',
    role: 'Architecture → Interface',
  },
  {
    id: 'dp',
    name: 'Dilip',
    quote: 'Built a bot to do my job. Then another. Turns out the real job was building the bots.',
    role: 'Automation → Abstraction',
  },
];

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPinRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Pin the left heading while cards scroll on the right
    if (window.innerWidth > 1024) {
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: 'bottom bottom',
        pin: leftPinRef.current,
      });
    }

    // Fade and slide origin cards
    const cards = gsap.utils.toArray<HTMLElement>('.origin-card');
    cards.forEach((card) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 50 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      );
    });

    // Cinematic scrub reveal for the pull quote
    const quoteWords = gsap.utils.toArray<HTMLElement>('.quote-word');
    gsap.fromTo(quoteWords,
      { opacity: 0.1 },
      {
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.pull-quote',
          start: 'top 80%',
          end: 'center center',
          scrub: true,
        }
      }
    );
  }, { scope: sectionRef });

  // Split quote for individual word animation
  const quoteText = "RockSpace isn't a studio. It's what happens when three people stop asking for permission.";
  const splitQuote = quoteText.split(' ');

  return (
    <section id="story" ref={sectionRef} className="relative w-full bg-black border-t border-white/10">
      <div className="section-shell py-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
          
          {/* Pinned Left Side */}
          <div className="lg:w-5/12 relative">
            <div ref={leftPinRef} className="lg:h-screen flex flex-col justify-center pt-20 lg:pt-0">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-8">
                04 // The Origin
              </p>
              <h2 className="font-display text-5xl lg:text-7xl font-bold leading-[1.05] tracking-[-0.03em] text-white">
                Three paths <br/> collided<span className="text-white/30">.</span>
              </h2>
            </div>
          </div>

          {/* Scrolling Right Side */}
          <div className="lg:w-7/12 lg:pt-[30vh] lg:pb-[20vh]">
            <div className="flex flex-col gap-10">
              {originals.map((o) => (
                <div
                  key={o.id}
                  className="origin-card relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 sm:p-12 hover:bg-white/10 transition-colors duration-500 cursor-none"
                  onMouseEnter={() => document.body.classList.add('cursor-hover')}
                  onMouseLeave={() => document.body.classList.remove('cursor-hover')}
                >
                  <div className="mb-8">
                    <h3 className="font-display text-3xl font-bold text-white mb-2">
                      {o.name}
                    </h3>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
                      {o.role}
                    </p>
                  </div>
                  <blockquote className="text-lg sm:text-xl leading-relaxed text-white/70 font-light">
                    &ldquo;{o.quote}&rdquo;
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dramatic Pull Quote */}
        <div className="pull-quote mt-32 sm:mt-48 mb-20 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <p className="font-display text-3xl sm:text-5xl md:text-6xl text-white leading-tight font-bold tracking-[-0.02em] flex flex-wrap justify-center gap-[0.3em]">
              {splitQuote.map((word, i) => (
                <span key={i} className="quote-word inline-block opacity-10">
                  {word}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}