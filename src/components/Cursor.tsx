import React from 'react';

export default function Cursor() {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.left = `${e.clientX}px`;
        el.style.top = `${e.clientY}px`;
      });
    };

    const onEnter = () => el.classList.add('is-hover');
    const onLeave = () => el.classList.remove('is-hover');

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button, .card-hover').forEach((node) => {
      node.addEventListener('mouseenter', onEnter);
      node.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.querySelectorAll('a, button, .card-hover').forEach((node) => {
        node.removeEventListener('mouseenter', onEnter);
        node.removeEventListener('mouseleave', onLeave);
      });
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor-circle" aria-hidden />;
}
