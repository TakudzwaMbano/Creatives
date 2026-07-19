import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Set launch date to 7 days from first implementation
const LAUNCH_DATE = new Date('2026-07-26T00:00:00').getTime();

export default function Countdown() {
  const shouldReduce = useReducedMotion();
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = LAUNCH_DATE - now;

      if (difference <= 0) {
        setIsVisible(false);
        return 0;
      }

      return difference;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      if (remaining <= 0) {
        setIsVisible(false);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const timeUnits = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hours' },
    { value: minutes, label: 'Minutes' },
    { value: seconds, label: 'Seconds' },
  ];

  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: -20 }}
      animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-brand-green/95 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl border border-white/20"
    >
      <div className="flex items-center gap-4">
        <span className="text-white text-xs font-semibold uppercase tracking-wider">
          Website Launching In:
        </span>
        <div className="flex items-center gap-3">
          {timeUnits.map((unit) => (
            <div key={unit.label} className="flex flex-col items-center">
              <span className="text-white font-display font-bold text-lg leading-none min-w-[2rem] text-center">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="text-white/70 text-[10px] uppercase tracking-wider">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
