import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Team from '@/components/Team';
import Story from '@/components/Story';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import DottedDivider from '@/components/patterns/DottedDivider';

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <DottedDivider />
      <Team />
      <DottedDivider />
      <Story />
      <DottedDivider />
      <Services />
      <DottedDivider />
      <Process />
      <DottedDivider />
      <Contact />
      <Footer />
    </>
  );
}
