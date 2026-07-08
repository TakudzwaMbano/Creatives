import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const HERO_IMAGE = '/assets/images/hero%20image.jpeg';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.96]);
  const heroContentY = useTransform(scrollYProgress, [0, 0.3], [0, 8]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.section ref={heroRef} className="relative h-screen min-h-screen w-full overflow-hidden overflow-x-hidden bg-black" style={{ opacity: heroOpacity }}>
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={HERO_IMAGE}
          alt="Creative community background"
          className="absolute inset-0 h-full w-full object-cover block lg:hidden"
          style={{ objectPosition: 'center 35%' }}
          initial={shouldReduceMotion ? undefined : { scale: 1.0, transformOrigin: 'center center' }}
          animate={shouldReduceMotion ? undefined : { scale: [1.0, 1.06, 1.08, 1.06, 1.0] }}
          transition={shouldReduceMotion ? undefined : { duration: 22, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
        />
        <motion.video
          className="absolute inset-0 h-full w-full object-cover hidden lg:block"
          style={{ objectPosition: 'center 35%' }}
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_IMAGE}
          initial={shouldReduceMotion ? undefined : { scale: 1.0, transformOrigin: 'center center' }}
          animate={shouldReduceMotion ? undefined : { scale: [1.0, 1.06, 1.08, 1.06, 1.0] }}
          transition={shouldReduceMotion ? undefined : { duration: 22, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
        >
          <source src="/assets/video/hero.mp4" type="video/mp4" />
          <img src={HERO_IMAGE} alt="Creative community background" className="h-full w-full object-cover" />
        </motion.video>
        
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black" style={{ opacity: 0.58 }} />
        
        {/* Radial vignette - darker on left, fades to transparent */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 800px 600px at 20% 50%, rgba(17, 17, 17, 0.35) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      <div className="relative z-20 h-full w-full">
        <div className="flex h-full w-full items-center" style={{ paddingTop: '72px' }}>
          <motion.div
            className="w-full px-6"
            style={{ maxWidth: 'none', paddingBottom: '120px' }}
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
            animate={mounted && !shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            style={{ y: heroContentY }}
          >
            <div className="mb-3 text-[12px] font-medium uppercase tracking-[0.12em] text-white/75">
              Creatives Lunch
            </div>
            <h1
              className="font-display font-black leading-[0.9] text-white mb-6"
              style={{
                fontSize: 'clamp(56px, 13.2vw, 64px)',
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
                href="#membership"
                className="premium-cta inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 py-0 text-sm font-semibold text-white"
                style={{ width: '232px' }}
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
