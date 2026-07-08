import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Story from '@/components/Story';
import Team from '@/components/Team';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Grain from '@/components/micro/Grain';

export default function Home() {
  return (
    <main className="relative w-full bg-[#030303] text-white selection:bg-white selection:text-black">
      <Grain />
      <Nav />
      
      {/* 01: Hero Intro */}
      <Hero />
      
      {/* 02: Services / The Pitch */}
      <Services />

      {/* 03: Process / Methodology */}
      <Process />
      
      {/* 04: Story / Origin */}
      <Story />
      
      {/* 05: Team / Behind the Studio */}
      <Team />
      
      {/* 06: Contact / CTA */}
      <Contact />
      
      <Footer />
    </main>
  );
}