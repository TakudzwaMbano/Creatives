import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Set launch date to 7 days from first implementation
const LAUNCH_DATE = new Date('2026-07-26T00:00:00').getTime();

export default function Countdown() {
  const shouldReduce = useReducedMotion();
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

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
    { value: days, label: 'D' },
    { value: hours, label: 'H' },
    { value: minutes, label: 'M' },
    { value: seconds, label: 'S' },
  ];

  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: -20 }}
      animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-[76px] left-1/2 -translate-x-1/2 z-50 bg-brand-green/95 backdrop-blur-md shadow-lg border border-white/20"
      style={{
        borderRadius: isExpanded ? '16px' : '9999px',
        padding: isExpanded ? '12px 16px' : '6px 14px',
      }}
    >
      <div className="flex items-center gap-2 sm:gap-4">
        <span className="text-white text-[10px] sm:text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
          {isExpanded ? 'Launching In:' : '🚀'}
        </span>
        <div className="flex items-center gap-1 sm:gap-3">
          {timeUnits.map((unit) => (
            <div key={unit.label} className="flex flex-col items-center">
              <span className="text-white font-display font-bold text-sm sm:text-lg leading-none min-w-[1.2rem] sm:min-w-[2rem] text-center">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="text-white/70 text-[8px] sm:text-[10px] uppercase tracking-wider">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-white/70 hover:text-white text-[10px] sm:text-xs font-medium transition-colors ml-1"
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>
    </motion.div>
  );
}
