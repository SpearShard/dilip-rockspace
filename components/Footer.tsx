'use client';

import { Globe, MessageCircle, AtSign } from 'lucide-react';
import { motion } from 'framer-motion';

function LogoIcon() {
  return (
    <div className="w-8 h-8 bg-accent rounded-[8px] flex items-center justify-center">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 20C4 20 4 14 10 10C16 6 20 4 20 4C20 4 18 8 14 14C10 20 4 20 4 20Z" fill="white" />
        <path d="M4 20L10 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

const socials = [
  { icon: Globe, label: 'Globe' },
  { icon: MessageCircle, label: 'Message' },
  { icon: AtSign, label: 'Email' },
];

const columns = [
  {
    header: 'Product',
    links: ['Features', 'Solutions', 'Pricing', 'Updates'],
  },
  {
    header: 'Science',
    links: ['Approach', 'Identity', 'Research', 'Metrics'],
  },
  {
    header: 'Company',
    links: ['About Us', 'Partners', 'Careers'],
  },
];

function FooterCard() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-0">
      <div className="bg-[#E9EBEE] rounded-2xl sm:rounded-[32px] md:rounded-[48px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-white rounded-xl sm:rounded-[24px] md:rounded-[40px] m-1.5 sm:m-2 shadow-sm">
          <div className="p-6 sm:p-8 md:p-10 lg:p-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12">
            <div className="sm:col-span-2 space-y-6 sm:space-y-8">
              <div className="flex items-center gap-2.5">
                <LogoIcon />
                <span className="text-[22px] sm:text-[26px] font-bold tracking-tight text-[#0F172A]">RockSpace</span>
              </div>
              <p className="text-[#64748B] leading-relaxed text-[14px] sm:text-[16px] font-normal max-w-[320px]">
                Premium strategic solutions designed to elevate your brand presence through advanced marketing.
              </p>
              <div className="flex items-center gap-3">
                {socials.map((s) => (
                  <button
                    key={s.label}
                    className="w-[40px] sm:w-[44px] h-[40px] sm:h-[44px] flex items-center justify-center rounded-xl border border-slate-100 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-slate-50 transition-all active:scale-95 group"
                    aria-label={s.label}
                  >
                    <s.icon className="w-[18px] sm:w-5 h-[18px] sm:h-5 text-slate-800" />
                  </button>
                ))}
              </div>
            </div>

            {columns.map((col) => (
              <div key={col.header} className="space-y-4 sm:space-y-6">
                <h4 className="text-[13px] sm:text-[14px] font-medium text-[#94A3B8]">{col.header}</h4>
                <ul className="space-y-3 sm:space-y-4">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-[14px] sm:text-[15px] font-medium text-[#1E293B] hover:text-accent transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-4 sm:py-5 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 text-[13px] sm:text-[15px]">
          <p className="text-[#64748B] font-medium text-center sm:text-left">© 2025 RockSpace. All rights reserved.</p>
          <div className="flex gap-6 sm:gap-8 text-[#64748B] font-medium items-center">
            <a href="#" className="hover:text-[#1E293B] transition-colors">Legal Center</a>
            <div className="w-[1px] h-3 sm:h-4 bg-slate-300" />
            <a href="#" className="hover:text-[#1E293B] transition-colors">User Agreement</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function GlassText() {
  return (
    <div className="relative w-full flex items-center justify-center select-none pt-0">
      <svg className="absolute w-0 h-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.25" result="outer-shadow"/>
            <feComponentTransfer in="SourceAlpha" result="alpha"><feFuncA type="linear" slope="1" /></feComponentTransfer>
            <feOffset in="alpha" dx="0" dy="4" result="offset-white" />
            <feGaussianBlur in="offset-white" stdDeviation="4" result="blur-white" />
            <feComposite in="alpha" in2="blur-white" operator="out" result="inner-white-mask" />
            <feFlood floodColor="#ffffff" floodOpacity="0.25" result="white-fill" />
            <feComposite in="white-fill" in2="inner-white-mask" operator="in" result="inner-white-final" />
            <feGaussianBlur in="alpha" stdDeviation="6" result="blur-black" />
            <feComposite in="alpha" in2="blur-black" operator="out" result="inner-black-mask" />
            <feFlood floodColor="#000000" floodOpacity="0.25" result="black-fill" />
            <feComposite in="black-fill" in2="inner-black-mask" operator="in" result="inner-black-final" />
            <feMerge>
              <feMergeNode in="outer-shadow" />
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="inner-white-final" />
              <feMergeNode in="inner-black-final" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <h1
          className="text-[min(20vw,280px)] sm:text-[min(25vw,400px)] font-bold tracking-normal leading-none select-none text-white px-4"
          style={{ filter: 'url(#glass-effect)' }}
        >
          ROCKSPACE
        </h1>
      </motion.div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center gap-0 mt-12 md:mt-16">
      <FooterCard />
      <GlassText />
    </footer>
  );
}
