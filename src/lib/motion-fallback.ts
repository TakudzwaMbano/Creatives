export function initMotionFallback() {
  if (typeof window === 'undefined') return;
  try {
    const selectors = [
      '.about-entrance',
      '.gallery-entrance',
      '.observe-fade',
      '.observe-fade-left',
      '.observe-fade-right',
      '.masonry-item',
      '.gallery-card',
      '.hero-3d',
      '.lg\\:col-span-2 > .card-hover'
    ];

    // After load, ensure any element still invisible becomes visible
    window.setTimeout(() => {
      selectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          const node = el as HTMLElement;
          const style = window.getComputedStyle(node);
          if (style.opacity === '0' || style.visibility === 'hidden' || style.display === 'none') {
            node.classList.add('force-visible');
          }
        });
      });
    }, 900);

    // Also a gentle scan while the user scrolls, in case Lenis blocks some events
    let last = 0;
    function tick() {
      const now = Date.now();
      if (now - last < 700) {
        requestAnimationFrame(tick);
        return;
      }
      last = now;
      selectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          const node = el as HTMLElement;
          const style = window.getComputedStyle(node);
          if (style.opacity === '0' && node.getBoundingClientRect().height > 0) {
            node.classList.add('force-visible');
          }
        });
      });
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  } catch (e) {
    // ignore
  }
}
