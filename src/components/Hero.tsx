import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const HERO_IMAGE_1 = '/assets/images/new hero image 1.jpeg';
const HERO_IMAGE_2 = '/assets/images/new hero image 2.jpeg';
const HERO_IMAGES = [HERO_IMAGE_1, HERO_IMAGE_2];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.96]);
  const heroContentY = useTransform(scrollYProgress, [0, 0.3], [0, 8]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const parallaxEnabled = !shouldReduceMotion && isDesktop;

  useEffect(() => {
    setMounted(true);
    const updateViewport = () => setIsDesktop(window.innerWidth >= 768);
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  useEffect(() => {
    let loaded = 0;
    const total = HERO_IMAGES.length;
    
    HERO_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        if (loaded === total) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loaded++;
        if (loaded === total) {
          setImagesLoaded(true);
        }
      };
    });
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const interval = window.setInterval(() => {
      setCurrentSlide((current) => (current + 1) % HERO_IMAGES.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [shouldReduceMotion]);

  return (
    <motion.section ref={heroRef} className="relative h-screen min-h-screen w-full overflow-hidden overflow-x-hidden bg-black" style={{ opacity: heroOpacity }}>
      {!imagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
          <div className="w-8 h-8 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <div className="hero-background-shell absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-[-6%] will-change-transform"
          style={{
            y: parallaxEnabled ? backgroundY : 0,
            scale: parallaxEnabled ? backgroundScale : 1,
            transform: 'translate3d(0,0,0)',
          }}
          initial={shouldReduceMotion || !isDesktop ? undefined : { scale: 1.0 }}
          animate={shouldReduceMotion || !isDesktop ? undefined : { scale: [1.0, 1.04, 1.08, 1.04, 1.0] }}
          transition={shouldReduceMotion || !isDesktop ? undefined : { duration: 22, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
        >
          <AnimatePresence mode="wait">
            {imagesLoaded && (
              <motion.img
                key={currentSlide}
                src={HERO_IMAGES[currentSlide]}
                alt="Creative community background"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: 'center 35%' }}
                loading="eager"
                decoding="async"
                importance="high"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        <div className="hero-base-overlay absolute inset-0" />
        <div className="hero-noise-layer absolute inset-0" />
        <div className="hero-grid-layer absolute inset-0" />
        <div className="hero-glow hero-glow-green absolute left-[-10%] top-[8%] h-[26rem] w-[26rem] rounded-full" />
        <div className="hero-glow hero-glow-orange absolute bottom-[-12%] right-[-8%] h-[32rem] w-[32rem] rounded-full" />
      </div>

      <div className="relative z-20 h-full w-full">
        <div className="flex h-full w-full items-center" style={{ paddingTop: '72px' }}>
          <motion.div
            className="w-full px-6"
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
            animate={mounted && !shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            style={{ y: heroContentY, maxWidth: 'none', paddingBottom: '120px' }}
          >
            <div className="mb-3 text-[12px] font-medium uppercase tracking-[0.12em] text-white/75">
              Creatives Lunch
            </div>
            <h1
              className="font-display font-black text-white mb-6"
              style={{
                fontSize: 'clamp(38px, 7vw, 72px)',
                lineHeight: 0.9,
                letterSpacing: '-0.035em',
                maxWidth: '95vw',
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.35)',
              }}
            >
              Create.
              <br />
              Connect.
              <br />
              Grow.
            </h1>
            <p
              className="text-[16px] leading-[1.65] text-white/80 mb-10"
              style={{
                maxWidth: 'min(85vw, 480px)',
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.35)',
              }}
            >
              A creative community where designers, photographers, artists, musicians, developers and makers connect through inspiring events, networking, collaboration and wellness experiences.
            </p>
            <div className="flex flex-col items-start gap-4">
              <a
                href="https://wa.me/263716556815"
                target="_blank"
                rel="noreferrer noopener"
                className="glow-button glow-button--primary bg-brand-green inline-flex h-10 items-center justify-center gap-2 rounded-full px-4 py-0 text-xs font-semibold text-white transition-all duration-300"
                style={{ width: '116px' }}
              >
                Become a Member
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
