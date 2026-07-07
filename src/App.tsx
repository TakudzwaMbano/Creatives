import { useEffect } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import CreativeFields from './components/CreativeFields';
import FeaturedEvent from './components/FeaturedEvent';
import Membership from './components/Membership';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Partners from './components/Partners';
import Footer from './components/Footer';
import Cursor from './components/Cursor';

function App() {
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
    <div className="min-h-screen bg-cream">
      <Nav />
      <Hero />
      <About />
      <CreativeFields />
      <FeaturedEvent />
      <Membership />
      <Gallery />
      <Testimonials />
      <Partners />
      <Footer />
      <Cursor />
    </div>
  );
}

export default App;
