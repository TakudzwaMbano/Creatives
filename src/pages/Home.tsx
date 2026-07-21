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

const LAUNCH_TIME = '2026-07-21T10:30:00+02:00';

export default function Home() {
  const [now, setNow] = useState(() => Date.now());
  const launchTime = useMemo(() => new Date(LAUNCH_TIME).getTime(), []);
  const shouldShowComingSoon = now < launchTime;

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);

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

  if (shouldShowComingSoon) {
    return <ComingSoon targetTime={launchTime} />;
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
