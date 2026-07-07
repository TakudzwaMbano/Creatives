import Lenis from '@studio-freight/lenis';

export function initLenis() {
  if (typeof window === 'undefined') return null;
  try {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return null;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      direction: 'vertical',
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return lenis;
  } catch (e) {
    // Fail silently if Lenis isn't available
    // console.warn('Lenis init failed', e);
    return null;
  }
}
