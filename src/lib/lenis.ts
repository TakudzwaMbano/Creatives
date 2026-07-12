import Lenis from '@studio-freight/lenis';

let lenisInstance: Lenis | null = null;
let rafId = 0;

export function initLenis() {
  if (typeof window === 'undefined' || lenisInstance) return lenisInstance;

  try {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return null;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      direction: 'vertical',
      gestureOrientation: 'vertical',
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      normalizeWheel: true,
    });

    lenisInstance = lenis;

    function raf(time: number) {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    }

    rafId = window.requestAnimationFrame(raf);

    const handleResize = () => lenis.resize();
    window.addEventListener('resize', handleResize, { passive: true });

    lenis.on('destroy', () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      lenisInstance = null;
    });

    return lenis;
  } catch {
    return null;
  }
}

export function destroyLenis() {
  if (!lenisInstance) return;
  lenisInstance.destroy();
  lenisInstance = null;
}
