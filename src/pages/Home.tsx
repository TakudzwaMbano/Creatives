import { useEffect } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import FeaturedEvent from '../components/FeaturedEvent';
import Membership from '../components/Membership';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import Partners from '../components/Partners';
import Footer from '../components/Footer';
import Cursor from '../components/Cursor';
import Countdown from '../components/Countdown';

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll(
      '.observe-fade, .observe-fade-left, .observe-fade-right'
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Countdown />
      <Hero />
      <About />
      <FeaturedEvent />
      <Membership />
      <Gallery />
      <Testimonials />
      <Partners />
      <Footer />
      <Cursor />
    </>
  );
}
