import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { heroCTA, wordReveal, staggerChildren, heroNavVariant } from '../motion/variants';

// Use single local hero image from public/assets/images
const IMAGES = [
  '/assets/images/hero%20image.jpeg',
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [headingVisible, setHeadingVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const INTERVAL = 5000; // 5s per requirement

  useEffect(() => {
    // Fade-in content on mount and stagger reveals
    const t = setTimeout(() => setContentVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!contentVisible) return;
    const h = window.setTimeout(() => setHeadingVisible(true), 100);
    const s = window.setTimeout(() => setTextVisible(true), 300);
    const b = window.setTimeout(() => setButtonVisible(true), 500);
    return () => {
      clearTimeout(h);
      clearTimeout(s);
      clearTimeout(b);
    };
  }, [contentVisible]);

  // mouse parallax / light catch
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    let raf = 0;
    const handleMove = (e: MouseEvent) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0..1
      const y = (e.clientY - rect.top) / rect.height; // 0..1
      // map to -1..1
      const mx = (x - 0.5) * 2;
      const my = (y - 0.5) * 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--mx', String(mx.toFixed(3)));
        el.style.setProperty('--my', String(my.toFixed(3)));
        // light position (percentage)
        el.style.setProperty('--light-x', `${Math.round(x * 100)}%`);
        el.style.setProperty('--light-y', `${Math.round(y * 100)}%`);
      });
    };
    const handleLeave = () => {
      if (!el) return;
      el.style.setProperty('--mx', '0');
      el.style.setProperty('--my', '0');
    };
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
      cancelAnimationFrame(raf);
    };
  }, [heroRef.current]);

  useEffect(() => {
    // autoplay
    if (paused) return;
    timeoutRef.current = window.setTimeout(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, INTERVAL);
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [index, paused]);

  useEffect(() => {
    // simple parallax: translate slides slightly based on scroll
    const handle = () => {
      const el = sliderRef.current;
      if (!el) return;
      const scrolled = window.scrollY || window.pageYOffset;
      // small upward movement proportional to scroll
      el.style.transform = `translateY(${Math.round(scrolled * 0.08)}px)`;
    };
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  // navigation controls intentionally omitted for a cleaner editorial look

  return (
    <motion.section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      initial={shouldReduceMotion ? undefined : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'show'}
      viewport={{ once: true, amount: 0.15 }}
    >
      {/* Slides wrapper */}
      <div className="absolute inset-0 hero-slider" ref={sliderRef} aria-hidden>
        {IMAGES.map((src, i) => (
          <div
            key={src}
            className={`slide ${i === index ? 'active' : ''}`}
            style={{ zIndex: i === index ? 10 : 5 }}
          >
            <img
              src={`${src}`}
              alt={i === index ? 'Creatives community event' : ''}
              className="slide-img"
              loading="lazy"
            />
          </div>
        ))}
        {/* Solid black overlay for readability (45-55% opacity) */}
        <div className="absolute inset-0 bg-black opacity-50 pointer-events-none" />
      </div>

      {/* Left-aligned content occupying left half */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 h-full grid items-center grid-cols-1 lg:grid-cols-2">
        <div className="h-full flex items-center">
          <motion.div
            className="max-w-[560px] text-left"
            variants={staggerChildren(0.12)}
          >
            <motion.div className="text-cream/90 font-body text-xs uppercase tracking-widest mb-4" variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
              CREATIVES LUNCH
              <br />
              Creative Community
            </motion.div>

            <motion.h1 className="hero-3d relative block mb-6" style={{ maxWidth: '560px' }} aria-label="Made to connect">
              {['Made', 'to', 'connect.'].map((word, idx) => (
                <motion.span key={idx} className="block overflow-hidden" style={{ display: 'block' }} variants={wordReveal}>
                  <span style={{ display: 'inline-block' }}>{word}&nbsp;</span>
                </motion.span>
              ))}
            </motion.h1>

            <motion.p className="text-cream/90 font-body text-[20px] leading-relaxed mb-6" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}>
              Bringing together designers, photographers, musicians, artists, developers, creators and innovators through networking events, workshops, wellness activities and meaningful collaboration.
            </motion.p>

            <motion.div className="mb-6 text-cream/90" variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
              <div className="text-xs uppercase font-display tracking-wider">Upcoming Event</div>
              <div className="font-display font-bold text-lg">Creatives on the Move</div>
              <div className="text-sm">Bulawayo • Coming Soon</div>
            </motion.div>

            <motion.div variants={heroCTA}>
              <a
                href="#membership"
                className="inline-flex items-center gap-3 px-8 py-3 rounded-full text-sm font-semibold transition-transform duration-200"
                style={{ backgroundColor: '#ffffff', color: '#111' }}
              >
                Become a Club Member
                <ArrowRight size={16} />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Right column intentionally left empty to give left half dominance */}
        <div />
      </div>

      {/* Intentionally minimal: no arrows or dots for cleaner editorial look */}
    </motion.section>
  );
}
