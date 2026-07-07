import { Variants } from 'framer-motion';

export const sectionVariant: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] } },
};

export const heroNavVariant: Variants = {
  hidden: { opacity: 0, y: -18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export const heroCTA: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.995 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 220, damping: 18, mass: 0.35 } },
};

export const staggerChildren = (stagger = 0.08) => ({
  show: { transition: { staggerChildren: stagger } },
  hidden: {},
});

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 20, skewY: 2 },
  show: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } },
};
