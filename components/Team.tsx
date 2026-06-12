'use client';

import { useRef, useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { teamMembers } from '@/lib/projectData';
import dynamic from 'next/dynamic';

gsap.registerPlugin(ScrollTrigger);

const TeamScene = dynamic(() => import('@/components/scene/TeamScene'), { ssr: false });

const tabs = [
  { name: 'Debasis Maharana', role: 'Founder & Creative Director', i: 0 },
  { name: 'G. Jayaditya', role: 'Technical Lead — Frontend', i: 1 },
  { name: 'Dilip', role: 'AI & Automation Polymath', i: 2 },
];

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [offscreen] = useState(() =>
    typeof window !== 'undefined' && ('ontouchstart' in window || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  );

  const handleMouse = (e: React.MouseEvent) => {
    if (offscreen) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: -y * 15, y: x * 15 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setRotate({ x: 0, y: 0 }); }}
      className={`transition-transform duration-200 ease-out ${className || ''}`}
      style={{ transform: hover ? `perspective(800px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` : 'none' }}
    >
      {children}
    </div>
  );
}

export default function Team() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const member = teamMembers[active];

  const bio = [
    `Creative force behind RockSpace. ${member.name} shapes brands that don't just look good — they feel inevitable. ${member.skills.slice(0, 3).join(', ')}.`,
    `Architect of the web layer. ${member.name} transforms design into living, breathing interfaces — pixel-perfect and buttery smooth. ${member.skills.slice(0, 3).join(', ')}.`,
    `Bridging creativity with systems. ${member.name} builds the engines that make RockSpace run — AI agents, workflows, data pipelines. ${member.skills.slice(0, 3).join(', ')}.`,
  ][active];

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;
    gsap.fromTo(el.querySelector('.team-content'), { opacity: 0, y: 40, scale: 0.97 }, {
      opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power4.out',
      scrollTrigger: { trigger: el, start: 'top 75%', once: true },
    });
  }, { scope: sectionRef });

  return (
    <section id="team" ref={sectionRef} className="relative py-28 md:py-36 px-6 bg-surface section-frame overflow-hidden">
      <span className="section-number hidden lg:block">05</span>

      <div className="absolute inset-0 pointer-events-none opacity-30">
        <Suspense fallback={null}>
          <TeamScene persona={active} />
        </Suspense>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 section-corner">
          <p className="text-sm text-accent-dark tracking-[0.2em] uppercase mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-accent-dark/40" />
            <span className="font-hand text-base lowercase tracking-normal">the</span>
            <span className="font-mono">team</span>
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] text-text">
            People<span className="text-accent">.</span>
          </h2>
        </div>

        <div className="team-content">
          <div className="flex gap-3 mb-10 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.i}
                onClick={() => setActive(tab.i)}
                className={`px-5 py-2.5 text-sm rounded-full border transition-all shrink-0 ${
                  active === tab.i
                    ? 'bg-accent-dark text-white border-accent-dark shadow-lg shadow-accent-dark/20'
                    : 'border-border text-text-muted hover:border-accent/50 hover:text-text'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="grid md:grid-cols-3 gap-10 md:gap-16"
            >
              <div className="md:col-span-1">
                <TiltCard className="w-32 h-32 rounded-2xl overflow-hidden mb-6 shadow-lg shadow-accent-dark/10">
                  <Image
                    src={['/debasispfp.png', '/jayadityapfp.png', '/dilippfp.png'][active]}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </TiltCard>
                <h3 className="text-2xl font-semibold text-text">{member.name}</h3>
                <p className="text-sm font-mono text-accent-dark mt-2 tracking-wide">{member.role}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-base md:text-lg text-text-muted leading-relaxed mb-6">{bio}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {member.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 text-xs font-mono bg-bg border border-border rounded-full text-text-muted">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex gap-6">
                  {member.social.map((s) => (
                    <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted hover:text-accent-dark transition-colors">
                      {s.platform} ↗
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
