import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const HERO_IMAGE = '/assets/images/hero%20image.jpeg';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={HERO_IMAGE}
          alt="Creative community background"
          className="absolute inset-0 w-full h-full object-cover block lg:hidden"
          initial={shouldReduceMotion ? undefined : { scale: 1.02 }}
          animate={shouldReduceMotion ? undefined : { scale: [1.02, 1.08] }}
          transition={shouldReduceMotion ? undefined : { duration: 32, ease: 'linear', repeat: Infinity, repeatType: 'mirror' }}
        />
        <motion.video
          className="absolute inset-0 w-full h-full object-cover hidden lg:block"
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_IMAGE}
          initial={shouldReduceMotion ? undefined : { scale: 1.02 }}
          animate={shouldReduceMotion ? undefined : { scale: [1.02, 1.08] }}
          transition={shouldReduceMotion ? undefined : { duration: 32, ease: 'linear', repeat: Infinity, repeatType: 'mirror' }}
        >
          <source src="/assets/video/hero.mp4" type="video/mp4" />
          <img src={HERO_IMAGE} alt="Creative community background" className="w-full h-full object-cover" />
        </motion.video>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-20 h-full w-full">
        <div className="site-container flex h-full w-full items-center py-6">
          <motion.div
            className="w-full max-w-[550px]"
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
            animate={mounted && !shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
          >
            <div className="text-sm uppercase tracking-[0.32em] text-white/80 mb-4">Creatives Lunch</div>
            <h1 className="font-display font-extrabold text-white mb-8" style={{ fontSize: 'clamp(40px, 5vw, 68px)', lineHeight: 1.05, maxWidth: '550px' }}>
              Create. Connect. Grow.
            </h1>
            <p className="text-white/85 font-body text-base lg:text-lg mb-10" style={{ maxWidth: '550px', lineHeight: 1.75 }}>
              A creative community where designers, photographers, artists, musicians, developers and makers connect through inspiring events, networking, collaboration and wellness experiences.
            </p>
            <div className="space-y-4 text-white/80 mb-10">
              <div className="text-xs uppercase tracking-[0.24em] font-display">Upcoming Event</div>
              <div className="font-display font-semibold text-lg">Creatives on the Move</div>
              <div className="text-sm">Bulawayo, Zimbabwe</div>
            </div>
            <a
              href="#membership"
              className="inline-flex items-center gap-2 h-12 rounded-full border border-white/90 bg-white/5 px-7 text-sm font-semibold text-white transition duration-200 hover:bg-white hover:text-black"
            >
              Become a Member
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
