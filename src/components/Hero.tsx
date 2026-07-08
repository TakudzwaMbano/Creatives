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
          initial={shouldReduceMotion ? undefined : { scale: 1.0, transformOrigin: 'center center' }}
          animate={shouldReduceMotion ? undefined : { scale: [1.0, 1.06, 1.08, 1.06, 1.0] }}
          transition={shouldReduceMotion ? undefined : { duration: 22, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
        />
        <motion.video
          className="absolute inset-0 h-full w-full object-cover hidden lg:block"
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
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-20 h-full w-full">
        <div className="site-container flex h-full w-full items-center py-6 sm:py-8 md:py-10">
          <motion.div
            className="w-full max-w-none md:max-w-[620px]"
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
            animate={mounted && !shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            style={{ y: heroContentY }}
          >
            <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/75 sm:text-xs">Creatives Lunch</div>
            <h1 className="mb-6 max-w-[92vw] font-display font-semibold leading-[0.88] text-white sm:mb-8 sm:max-w-[560px]" style={{ fontSize: 'clamp(52px, 8vw, 110px)' }}>
              Create.
              <br />
              Connect.
              <br />
              Grow.
            </h1>
            <p className="mb-8 max-w-[92vw] text-[15px] leading-7 text-white/85 sm:mb-10 sm:max-w-[520px] sm:text-[17px] sm:leading-8">
              A creative community where designers, photographers, artists, musicians, developers and makers connect through inspiring events, networking, collaboration and wellness experiences.
            </p>
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <a
                href="#membership"
                className="premium-cta inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/90 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-white hover:text-black sm:w-auto sm:px-7"
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
