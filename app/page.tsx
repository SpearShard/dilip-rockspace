import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Team from '@/components/Team';
import Story from '@/components/Story';
import Services from '@/components/Services';
import StudioStats from '@/components/StudioStats';
import Process from '@/components/Process';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Team />
      <Story />
      <Services />
      <StudioStats />
      <Process />
      <Contact />
      <Footer />
    </>
  );
}
