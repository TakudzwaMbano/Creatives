import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type ComingSoonProps = {
  targetTime: number;
  onComplete?: () => void;
};

function getTimeLeft(targetTime: number) {
  const remaining = targetTime - Date.now();

  if (remaining <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    total: remaining,
    days: Math.floor(remaining / (1000 * 60 * 60 * 24)),
    hours: Math.floor((remaining / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((remaining / (1000 * 60)) % 60),
    seconds: Math.floor((remaining / 1000) % 60),
  };
}

export default function ComingSoon({ targetTime, onComplete }: ComingSoonProps) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetTime));

  useEffect(() => {
    const tick = () => {
      const next = getTimeLeft(targetTime);
      setTimeLeft(next);

      if (next.total <= 0) {
        onComplete?.();
      }
    };

    tick();
    const interval = window.setInterval(tick, 1000);

    return () => window.clearInterval(interval);
  }, [targetTime, onComplete]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#060606] px-6 py-16 text-[#f4efe8] sm:px-8 lg:px-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,212,0,0.08),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(42,87,67,0.16),_transparent_40%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(255,255,255,0.04)_0%,_transparent_45%,_rgba(255,255,255,0.02)_100%)]" />

      <div className="relative z-10 w-full max-w-5xl text-center">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-md sm:h-28 sm:w-28"
        >
          <img
            src="/assets/images/logo.PNG"
            alt="Creatives Lunch logo"
            className="h-16 w-16 object-contain sm:h-20 sm:w-20"
          />
        </motion.div>

        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/60">
          Creatives Lunch
        </p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-5 text-5xl font-black uppercase tracking-[0.2em] text-white sm:text-7xl lg:text-8xl"
        >
          Coming Soon
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: 'easeOut' }}
          className="mx-auto mb-10 max-w-2xl text-sm leading-7 text-white/70 sm:text-base"
        >
          We&apos;re putting the finishing touches on our new website. We&apos;ll be live shortly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {units.map((unit) => (
            <div
              key={unit.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:p-6"
            >
              <div className="font-display text-3xl font-semibold text-white sm:text-5xl">
                {String(unit.value).padStart(2, '0')}
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-white/55">
                {unit.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.main>
  );
}
