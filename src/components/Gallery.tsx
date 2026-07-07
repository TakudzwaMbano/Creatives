import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useReducedMotion, PanInfo, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { sectionVariant } from '../motion/variants';

const images = [
  { src: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Networking' },
  { src: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Workshops' },
  { src: 'https://images.pexels.com/photos/159862/art-school-painting-tree-159862.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Group discussions' },
  { src: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Wellness activities' },
  { src: 'https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Photography sessions' },
  { src: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Music performances' },
  { src: 'https://images.pexels.com/photos/716276/pexels-photo-716276.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Creative collaborations' },
  { src: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Outdoor events' },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [gap, setGap] = useState(24);
  const shouldReduce = useReducedMotion();

  const count = images.length;

  // true scroll-linked animation: map gallery scroll progress directly to scale
  // Use offsets so tracking begins as soon as the section enters the viewport.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  // Start immediately on entry: map full progress [0,1] -> [1.02, 0.93]
  const trackScale = useTransform(scrollYProgress, [0, 1], [1.02, 0.93]);
  const shadowOpacity = useTransform(trackScale, [0.93, 1.02], [0.08, 0.14]);
  const inactiveOpacity = useTransform(trackScale, [0.93, 1.02], [0.4, 0.6]);

  // Combined MotionValue: prefer `trackScale` (useScroll), but provide a RAF fallback
  const combinedScale = useMotionValue(1);
  const combinedShadow = useMotionValue(0.14);
  const combinedInactiveOpacity = useMotionValue(0.6);

  useEffect(() => {
    const unsubTrack = trackScale.onChange((v) => { combinedScale.set(v); });
    const unsubShadow = shadowOpacity.onChange((v) => { combinedShadow.set(v); });
    const unsubInactive = inactiveOpacity.onChange((v) => { combinedInactiveOpacity.set(v); });
    return () => { unsubTrack(); unsubShadow(); unsubInactive(); };
  }, [trackScale, shadowOpacity, inactiveOpacity, combinedScale, combinedShadow, combinedInactiveOpacity]);

  // RAF fallback to compute progress manually (helps with smooth scrollers like Lenis)
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
      // progress from when section top enters the viewport (progress=0)
      // to when section bottom leaves the viewport (progress=1)
      const progress = Math.min(Math.max((vh - rect.top) / (rect.height + vh), 0), 1);
      // linear map across full progress: [0,1] -> [1.02, 0.93]
      const scaleVal = 1.02 + (0.93 - 1.02) * progress;
      combinedScale.set(scaleVal);
      // shadow and inactive opacity mapped from scale
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

  // measure sizes
  const measure = useCallback(() => {
    const c = cardRef.current;
    const track = trackRef.current;
    if (!c || !track) return;
    const w = c.getBoundingClientRect().width;
    const style = getComputedStyle(track);
    const g = parseFloat(style.gap || '24') || 24;
    setCardWidth(w);
    setGap(g);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  // Center calculation: padding on track ensures center alignment
  const x = -(index * (cardWidth + gap));

  // Navigation
  const prev = useCallback(() => setIndex((s) => (s - 1 + count) % count), [count]);
  const next = useCallback(() => setIndex((s) => (s + 1) % count), [count]);

  // Drag handling
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

  // keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  // NOTE: no IntersectionObserver / viewport-entry logic here — animation is continuously drive
  // by the `scrollYProgress` MotionValue above so it updates every frame while scrolling.

  return (
    <motion.section ref={sectionRef} id="gallery" className="py-12 lg:py-20 bg-cream overflow-visible gallery-entrance"
      initial={shouldReduce ? undefined : { opacity: 0, scale: 0.95, y: 24 }}
      animate={shouldReduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 160, damping: 24 }}
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="section-label text-ink/40 block">Gallery</span>
            <h3 className="font-display font-bold text-ink text-3xl lg:text-4xl">Life at Creatives Lunch</h3>
          </div>
          <div className="text-sm text-ink/60 font-display">{String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</div>
        </div>

        {/* Carousel viewport */}
        <div className="relative overflow-visible">
          {/* Track padding to center cards */}
          <motion.div
            ref={trackRef}
            className="carousel-track flex items-center gap-6 px-[var(--track-pad)]"
            // x controls horizontal scroll position; `combinedScale` updates every frame
            style={{ x, scale: combinedScale, ['--gallery-shadow' as any]: combinedShadow }}
            drag={shouldReduce ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={onDragEnd}
            transition={{ type: 'spring', stiffness: 170, damping: 26, duration: 0.7 }}
            animate={{ x }}
          >
            {images.map((img, i) => {
              const isActive = i === index;
              const cardLocalScale = isActive ? 1 : 0.92;
              return (
                <motion.div
                  key={i}
                  ref={i === 0 ? cardRef : null}
                  className="carousel-card rounded-[32px] overflow-hidden shadow-xl bg-black/5 flex-shrink-0"
                  style={{ width: 'clamp(280px, 52vw, 720px)', aspectRatio: '3/4', transformOrigin: 'center', opacity: isActive ? 1 : combinedInactiveOpacity }}
                  animate={{ scale: cardLocalScale }}
                  transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                >
                  <motion.div style={{ width: '100%', height: '100%', scale: combinedScale }}>
                    <div className="relative w-full h-full">
                      <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute left-6 bottom-6 text-cream">
                        <blockquote className="font-display font-bold text-lg lg:text-2xl leading-snug max-w-[70%]">"The best place to meet creatives."</blockquote>
                        <div className="mt-3 text-sm opacity-90">— Creatives Lunch Member</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Navigation buttons */}
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
        .carousel-track { padding-left: calc((100vw - clamp(280px,52vw,720px)) / 2); padding-right: calc((100vw - clamp(280px,52vw,720px)) / 2); }
        @media (max-width: 768px) { .carousel-track { gap: 16px; } button[aria-label="Previous"], button[aria-label="Next"] { width: 52px; height: 52px; } }
      `}</style>
    </motion.section>
  );
}
