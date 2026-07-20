import { useEffect, useMemo, useState } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import FeaturedEvent from '../components/FeaturedEvent';
import Membership from '../components/Membership';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import Partners from '../components/Partners';
import Footer from '../components/Footer';
import Cursor from '../components/Cursor';
import ComingSoon from '../components/ComingSoon';

export default function Home() {
  const [isComingSoonActive, setIsComingSoonActive] = useState(true);
  const comingSoonTarget = useMemo(() => Date.now() + 24 * 60 * 60 * 1000, []);

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

  if (isComingSoonActive) {
    return <ComingSoon targetTime={comingSoonTarget} onComplete={() => setIsComingSoonActive(false)} />;
  }

  return (
    <>
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
