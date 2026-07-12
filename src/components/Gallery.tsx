import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useReducedMotion, PanInfo, useScroll, useTransform, useMotionValue } from 'framer-motion';

const images = [
  { src: '/assets/images/302423.jpg', alt: 'Creative gathering' },
  { src: '/assets/images/302424.jpg', alt: 'Community workshop' },
  { src: '/assets/images/302425.jpg', alt: 'Studio session' },
  { src: '/assets/images/302427.jpg', alt: 'Event moment' },
  { src: '/assets/images/302428.jpg', alt: 'Creative collaboration' },
  { src: '/assets/images/302429.jpg', alt: 'Member meetup' },
  { src: '/assets/images/302430.jpg', alt: 'Lifestyle gathering' },
  { src: '/assets/images/302431.jpg', alt: 'Inspiring scene' },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [gap, setGap] = useState(24);
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduce = useReducedMotion();

  const count = images.length;

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const trackScale = useTransform(scrollYProgress, [0, 1], [1.02, 0.93]);
  const shadowOpacity = useTransform(trackScale, [0.93, 1.02], [0.08, 0.14]);
  const inactiveOpacity = useTransform(trackScale, [0.93, 1.02], [0.4, 0.6]);

  const combinedScale = useMotionValue(1);
  const combinedShadow = useMotionValue(0.14);
  const combinedInactiveOpacity = useMotionValue(0.6);

  useEffect(() => {
    const unsubTrack = trackScale.onChange((v) => { combinedScale.set(v); });
    const unsubShadow = shadowOpacity.onChange((v) => { combinedShadow.set(v); });
    const unsubInactive = inactiveOpacity.onChange((v) => { combinedInactiveOpacity.set(v); });
    return () => { unsubTrack(); unsubShadow(); unsubInactive(); };
  }, [trackScale, shadowOpacity, inactiveOpacity, combinedScale, combinedShadow, combinedInactiveOpacity]);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const el = sectionRef.current;
      if (!el) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const progress = Math.min(Math.max((vh - rect.top) / (rect.height + vh), 0), 1);
      const scaleVal = 1.02 + (0.93 - 1.02) * progress;
      combinedScale.set(scaleVal);
      const t = (scaleVal - 0.93) / (1.02 - 0.93);
      const shadowVal = 0.08 + t * (0.14 - 0.08);
      const inactiveVal = 0.4 + t * (0.6 - 0.4);
      combinedShadow.set(shadowVal);
      combinedInactiveOpacity.set(inactiveVal);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [combinedScale, combinedShadow, combinedInactiveOpacity]);

  const measure = useCallback(() => {
    const c = cardRef.current;
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!c || !wrapper || !track) return;
    const w = c.getBoundingClientRect().width;
    const style = getComputedStyle(track);
    const g = parseFloat(style.gap || '24') || 24;
    setCardWidth(w);
    setGap(g);
    setWrapperWidth(wrapper.getBoundingClientRect().width);
  }, []);

  useEffect(() => {
    const updateViewport = () => {
      setIsMobile(window.innerWidth < 768);
      measure();
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, [measure]);

  const x = wrapperWidth && !isMobile ? wrapperWidth / 2 - cardWidth / 2 - index * (cardWidth + gap) : 0;

  const prev = useCallback(() => setIndex((s) => (s - 1 + count) % count), [count]);
  const next = useCallback(() => setIndex((s) => (s + 1) % count), [count]);

  const onDragEnd = (_: any, info: PanInfo) => {
    if (shouldReduce) return;
    const velocity = info.velocity.x;
    const offset = info.offset.x;
    const threshold = Math.max(50, cardWidth * 0.12);
    if (offset > threshold || velocity > 500) {
      prev();
    } else if (offset < -threshold || velocity < -500) {
      next();
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  return (
    <motion.section ref={sectionRef} id="gallery" className="bg-cream py-12 lg:py-20 gallery-entrance"
      initial={shouldReduce ? undefined : { opacity: 0, scale: 0.95, y: 24 }}
      animate={shouldReduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 160, damping: 24 }}
    >
      <div className="site-container">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="section-label text-ink/40 block">Gallery</span>
            <h3 className="font-display font-bold text-ink text-3xl lg:text-4xl">Life at Creatives Lunch</h3>
          </div>
          <div className="text-sm text-ink/60 font-display">{String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</div>
        </div>

        <div ref={wrapperRef} className="relative overflow-hidden px-0 sm:px-0">
          <motion.div
            ref={trackRef}
            className={`carousel-track flex items-center ${isMobile ? 'justify-center' : 'justify-start'}`}
            style={{ x, scale: combinedScale, ['--gallery-shadow' as any]: combinedShadow }}
            drag={shouldReduce || isMobile ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={isMobile ? undefined : onDragEnd}
            transition={{ type: 'spring', stiffness: 170, damping: 26, duration: 0.7 }}
            animate={{ x }}
          >
            {images.map((img, i) => {
              const isActive = i === index;
              const cardLocalScale = isActive ? 1 : 0.92;
              const isHiddenOnMobile = isMobile && !isActive;
              return (
                <motion.div
                  key={i}
                  ref={i === 0 ? cardRef : null}
                  className="carousel-card rounded-[32px] overflow-hidden shadow-xl bg-black/5 flex-shrink-0"
                  style={{
                    width: isMobile ? 'min(88vw, 420px)' : 'clamp(280px, 52vw, 720px)',
                    aspectRatio: '3/4',
                    transformOrigin: 'center',
                    opacity: isHiddenOnMobile ? 0 : isActive ? 1 : combinedInactiveOpacity,
                    display: isHiddenOnMobile ? 'none' : 'block',
                  }}
                  animate={{ scale: cardLocalScale }}
                  transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                >
                  <motion.div style={{ width: '100%', height: '100%', scale: combinedScale }}>
                    <div className="relative h-full w-full">
                      <img src={img.src} alt={img.alt} className="h-full w-full object-cover" loading="lazy" />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent px-5 py-5 text-cream sm:px-6 sm:py-6">
                        <blockquote className="max-w-[70%] font-display text-lg font-bold leading-snug sm:text-xl lg:text-2xl">
                          “The best place to meet creatives.”
                        </blockquote>
                        <div className="mt-2 text-sm opacity-90">— Creatives Lunch Member</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          <button aria-label="Previous" onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center rounded-full bg-white shadow-lg hover:scale-105 transition-transform" style={{ width: 64, height: 64 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button aria-label="Next" onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center rounded-full bg-white shadow-lg hover:scale-105 transition-transform" style={{ width: 64, height: 64 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      </div>
      <style>{`
        .carousel-track { gap: 28px; }
        .carousel-card { box-shadow: 0 18px 40px rgba(2,6,23,var(--gallery-shadow,0.14)); }
        @media (max-width: 768px) {
          .carousel-track { gap: 0; padding: 0; margin: 0; }
          .carousel-card { margin: 0 auto; }
          button[aria-label="Previous"], button[aria-label="Next"] { width: 52px; height: 52px; }
        }
      `}</style>
    </motion.section>
  );
}
