'use client';

import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-dvh flex items-center justify-center px-0 bg-bg overflow-hidden">
      <div className="relative w-full max-w-7xl mx-auto min-h-screen rounded-none md:rounded-3xl overflow-hidden flex items-center justify-center bg-white border-0 md:border border-border/60 shadow-sm md:mx-4">
        <div className="relative w-full h-[85vh] sm:h-[88vh] md:h-[85vh] flex items-center justify-center p-0 sm:p-4 md:p-10">
          <Image
            src="/fulllogo.png"
            alt="RockSpace"
            fill
            className="object-contain scale-110 sm:scale-100"
            priority
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
}
