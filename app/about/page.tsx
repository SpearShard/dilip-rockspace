'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import BackHome from '@/components/layout/BackHome';
import PageHeader from '@/components/layout/PageHeader';
import SectionLabel from '@/components/micro/SectionLabel';
import TiltCard from '@/components/micro/TiltCard';
import { aboutStats, aboutPillars, teamMembers, teamPhotos } from '@/lib/projectData';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    el.querySelectorAll('.reveal').forEach((item, i) => {
      gsap.fromTo(item, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', delay: (i % 4) * 0.06,
        scrollTrigger: { trigger: item, start: 'top 90%', once: true },
      });
    });
  }, { scope: sectionRef });

  return (
    <>
      <Nav />
      <main className="min-h-dvh bg-bg selection:bg-accent/25">
        <section ref={sectionRef} className="page-section relative overflow-hidden">
          <BackHome />

          <div className="max-w-7xl mx-auto px-6 sm:px-10">
            <PageHeader
              eyebrow="Who we are"
              title={<>Three paths.<br /><span className="text-accent">One collision.</span></>}
              description="A tight studio from Bengaluru with design, code, and systems under one roof. We move fast, think deep, and ship work that holds up in the boardroom."
            />

            <div className="mt-14 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {aboutStats.map((s) => (
                <div key={s.label} className="reveal bento-card card-hover p-6 sm:p-7 text-center" style={{ opacity: 0 }}>
                  <p className="stat-value text-text">{s.value}</p>
                  <p className="font-mono text-[11px] font-medium text-text-tertiary mt-2 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-band py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-10">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-5">
                <SectionLabel className="mb-4">Our story</SectionLabel>
                <h2 className="section-heading">Design is strategy. Code is craft. Systems are leverage.</h2>
              </div>
              <div className="lg:col-span-7 space-y-5 text-body-lg text-text-muted leading-[1.65]">
                <p>
                  We started RockSpace because we were tired of the handoff theatre. Agencies that overpromise
                  and underdeliver. Freelancers who disappear. Designers who don&apos;t understand technical
                  constraints, and developers who don&apos;t care about how something feels.
                </p>
                <p>
                  So we built a different kind of studio. Three people. Three disciplines. One shared standard.
                  Every project runs through design, code, and systems simultaneously, not in sequence.
                  What takes most agencies three handoffs and four weeks, we resolve in one conversation.
                </p>
                <p>
                  We don&apos;t take every brief. We don&apos;t pitch what we can&apos;t ship. And we never
                  deliver something we wouldn&apos;t put in our own portfolio. We&apos;ve turned down
                  six-figure projects because the fit wasn&apos;t right, and we&apos;ve taken small ones
                  because the problem was interesting.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-10">
            <SectionLabel className="mb-4">What we believe</SectionLabel>
            <h2 className="section-heading mb-4">Four principles that guide everything we ship.</h2>
            <p className="text-body-lg text-text-muted max-w-xl mb-14">
              These aren&apos;t wall decals. They&apos;re the filters we run every decision through.
            </p>

            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-14">
              {aboutPillars.map((p, i) => (
                <div key={p.title} className="reveal" style={{ opacity: 0 }}>
                  <span className="font-mono text-xs text-text-tertiary/50">0{i + 1}</span>
                  <h3 className="text-heading-sm text-text mt-3 mb-2">{p.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-3">{p.desc}</p>
                  <p className="text-sm text-text-tertiary leading-relaxed">{p.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-band py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-10">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-5">
                <SectionLabel className="mb-4">How we work</SectionLabel>
                <h2 className="section-heading">Parallel workflows. No handoffs.</h2>
              </div>
              <div className="lg:col-span-7 space-y-5 text-body-lg text-text-muted leading-[1.65]">
                <p>
                  Most studios work in sequence: strategy lands, then design starts, then development begins.
                  Each phase introduces friction, miscommunication, and compromises. We work in parallel.
                  Our designer understands code. Our developer thinks in systems. Our systems engineer
                  cares about visual outcome.
                </p>
                <p>
                  This means we can go from discovery to deployed prototype in days, not weeks.
                  It means fewer revision cycles because cross-disciplinary input happens during,
                  not after, the work. And it means the thing we show you on day five is closer to
                  the thing that ships than anything a traditional agency would produce in a month.
                </p>
                <div className="flex gap-6 pt-2">
                  <div>
                    <p className="stat-value text-text text-xl">4&times;</p>
                    <p className="font-mono text-[10px] text-text-tertiary mt-1 uppercase tracking-wider">Fewer revisions</p>
                  </div>
                  <div>
                    <p className="stat-value text-text text-xl">2&times;</p>
                    <p className="font-mono text-[10px] text-text-tertiary mt-1 uppercase tracking-wider">Faster to launch</p>
                  </div>
                  <div>
                    <p className="stat-value text-text text-xl">100%</p>
                    <p className="font-mono text-[10px] text-text-tertiary mt-1 uppercase tracking-wider">In-house team</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-10">
            <SectionLabel className="mb-4">The team</SectionLabel>
            <h2 className="section-heading mb-4">The people who ship.</h2>
            <p className="text-body-lg text-text-muted max-w-xl mb-14">
              No layers. No account managers. No freelance bench. The people you meet are
              the people who build your project.
            </p>

            <div className="grid md:grid-cols-3 gap-5">
              {teamMembers.map((m, i) => (
                <TiltCard key={m.name}>
                  <article className="reveal bento-card card-hover overflow-hidden h-full" style={{ opacity: 0 }}>
                    <div className="relative aspect-[5/4] bg-surface overflow-hidden">
                      <Image
                        src={teamPhotos[i]}
                        alt={m.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                    </div>
                    <div className="p-6 sm:p-7">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-accent mb-1">{m.role}</p>
                      <h3 className="text-heading-sm text-text">{m.name}</h3>
                      <p className="mt-3 text-sm text-text-muted leading-relaxed">{m.bio}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {m.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wide text-text-tertiary border border-border/60 rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#034f46]">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 py-20 md:py-28 text-center">
            <SectionLabel className="mb-4 justify-center">
              <span className="text-white/60">Get in touch</span>
            </SectionLabel>
            <h2 className="font-display font-bold-ui text-[clamp(2rem,4vw,3rem)] tracking-[-0.04em] text-white leading-[1.05] max-w-2xl mx-auto">
              Have a project that needs the right team?
            </h2>
            <p className="text-white/70 text-body-lg max-w-md mx-auto mt-5 leading-relaxed">
              Tell us what you&apos;re building. We respond within 24 hours with a plan, not a pitch.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#f0d7ff] text-[#1a1a1a] text-sm font-semibold-ui rounded-xl hover:brightness-95 transition-all"
              >
                Start a conversation
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white text-sm font-semibold-ui rounded-xl hover:bg-white/10 transition-all"
              >
                View our work
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
