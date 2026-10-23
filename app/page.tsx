import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Work from '@/components/Work';
import About from '@/components/About';
import Kit from '@/components/Kit';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Work />
      <About />
      <Kit />
      <Services />
      <Contact />
      <Footer />
    </>
  );
}
