import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const people = [
  {
    name: 'Debasis',
    role: 'Founder · Design',
    desc: 'Brand identity, visual systems, motion direction. He shapes brands that feel inevitable.',
    initials: 'DM',
  },
  {
    name: 'Jayaditya',
    role: 'Co-founder · Code',
    desc: 'React, WebGL, TypeScript. He turns design into living interfaces. Buttery smooth.',
    initials: 'GJ',
  },
  {
    name: 'Dilip',
    role: 'Polymath · Systems',
    desc: 'AI agents, automated workflows, data pipelines. Efficiency that feels like magic.',
    initials: 'DP',
  },
];

export default function About() {
  return (
    <>
      <Nav />
      <main className="min-h-dvh bg-bg relative">
        <Link
          href="/"
          className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10 w-10 h-8 sm:w-12 sm:h-[38px] cursor-pointer"
          aria-label="Go home"
        >
          <Image
            src="/Vector 2173.png"
            alt=""
            fill
            className="object-contain object-left-top brightness-0 opacity-30 hover:opacity-50 transition-opacity duration-200"
            sizes="48px"
          />
        </Link>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20">
          <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
            <p className="font-hand text-lg sm:text-xl text-accent/70 mb-2 tracking-wide">
              Who we are
            </p>
            <h1 className="font-display font-[700] text-[clamp(2.8rem,7vw,5rem)] tracking-[-0.03em] text-text leading-[1.05] mb-5">
              Three paths<span className="text-accent">.</span> One collision
            </h1>
            <p className="text-base sm:text-lg text-text-muted leading-relaxed max-w-xl mx-auto">
              Design, code and systems from Bengaluru. We&rsquo;re a tight team that moves fast, thinks deep, and ships work that holds up.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto">
            {people.map((person) => (
              <div
                key={person.name}
                className="rounded-2xl bg-surface border border-border/20 p-6 sm:p-7 text-center card-hover"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-accent font-mono text-sm font-[700]">{person.initials}</span>
                </div>
                <h3 className="font-display text-lg font-[700] tracking-[-0.02em] text-text mb-0.5">
                  {person.name}
                </h3>
                <p className="text-xs font-mono tracking-[0.1em] uppercase text-text-tertiary mb-3">
                  {person.role}
                </p>
                <p className="text-sm text-text-muted leading-relaxed">
                  {person.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
