'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: 'Brand Systems', desc: 'Identity and visual language that command market authority.', img: 'https://picsum.photos/seed/brand/1400/900' },
  { title: 'Digital Products', desc: 'Interfaces shaped for absolute clarity and high-end conversion.', img: 'https://picsum.photos/seed/digital/1400/900' },
  { title: 'AI Integration', desc: 'Autonomous tools that remove operational friction.', img: 'https://picsum.photos/seed/ai/1400/900' },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeImg, setActiveImg] = useState(services[0].img);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo('.service-row', 
      { opacity: 0, y: 30 }, 
      { 
        opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-container',
          start: 'top 75%',
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-bg py-16 sm:py-32 overflow-hidden border-t border-border">
      
      <div className="absolute inset-0 z-0 opacity-[0.15] transition-all duration-1000 ease-in-out">
        <img src={activeImg} alt="Service Background" className="w-full h-full object-cover filter grayscale blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-transparent" />
      </div>

      <div className="section-shell relative z-10 services-container h-full flex flex-col justify-center">
        <div className="flex flex-col border-t border-border">
          {services.map((srv, idx) => (
            <div 
              key={idx}
              className="service-row group flex flex-col md:flex-row md:items-center justify-between py-12 sm:py-16 border-b border-border cursor-none"
              onMouseEnter={() => {
                setActiveImg(srv.img);
                document.body.classList.add('cursor-hover');
              }}
              onMouseLeave={() => document.body.classList.remove('cursor-hover')}
            >
              <h3 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.03em] text-text-tertiary group-hover:text-white transition-colors duration-500">
                {srv.title}
              </h3>
              <div className="mt-6 md:mt-0 md:w-1/3 overflow-hidden">
                <p className="text-transparent group-hover:text-text-muted transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 ease-out text-sm leading-relaxed max-w-sm">
                  {srv.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}