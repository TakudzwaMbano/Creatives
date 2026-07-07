import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { sectionVariant, staggerChildren } from '../motion/variants';

const images = [
  { src: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Creative workshop', tall: false },
  { src: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Design session', tall: true },
  { src: 'https://images.pexels.com/photos/159862/art-school-painting-tree-159862.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Art session', tall: false },
  { src: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Music session', tall: true },
  { src: 'https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Team collaboration', tall: false },
  { src: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Photography event', tall: false },
  { src: 'https://images.pexels.com/photos/716276/pexels-photo-716276.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Creative gathering', tall: true },
  { src: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Performance event', tall: false },
  { src: 'https://images.pexels.com/photos/3782235/pexels-photo-3782235.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Writing workshop', tall: false },
];

export default function Gallery() {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const cardRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const shouldReduce = useReducedMotion();

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let fallback: number | null = null;
    const prefersReduced = shouldReduce;

    const onIntersect: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          observer.disconnect();
          if (fallback) {
            window.clearTimeout(fallback);
            fallback = null;
          }
          section.classList.add('in-view');
        }
      });
    };

    const io = new IntersectionObserver(onIntersect, { threshold: [0, 0.25, 0.5] });
    io.observe(section);

    if (prefersReduced) {
      section.classList.add('in-view');
    } else {
      fallback = window.setTimeout(() => {
        section.classList.add('in-view');
        fallback = null;
        io.disconnect();
      }, 600);
    }

    return () => {
      io.disconnect();
      if (fallback) window.clearTimeout(fallback);
    };
  }, [shouldReduce]);

  return (
    <motion.section ref={sectionRef} id="gallery" className="py-24 lg:py-36 bg-cream overflow-hidden gallery-entrance"
      initial={shouldReduce ? undefined : 'hidden'}
      whileInView={shouldReduce ? undefined : 'show'}
      viewport={{ once: true, amount: 0.15 }}
      variants={sectionVariant}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="observe-fade">
            <span className="section-label text-ink/40 mb-4 block">
              <span className="w-6 h-px bg-ink/30 inline-block mr-2 align-middle" />
              Gallery
            </span>
            <h2 className="font-display font-bold text-ink text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05]">
              Life at<br />Creatives Lunch
            </h2>
          </div>
          <p className="max-w-xs font-body text-ink/55 text-sm leading-relaxed observe-fade delay-200">
            Moments from our events, workshops, retreats, and the everyday connections between members.
          </p>
        </div>

        {/* Masonry grid */}
        <div className="masonry">
          {images.map((img, i) => (
            <motion.div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className="masonry-item rounded-2xl overflow-hidden card-hover cursor-pointer gallery-card"
              variants={{ hidden: { opacity: 0, y: 24, scale: 0.99 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 220, damping: 18 } } }}
              whileHover={shouldReduce ? undefined : { scale: 1.04 }}
              style={{ originY: 0.5 }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full block object-cover"
                style={{ aspectRatio: img.tall ? '3/4' : '4/3' }}
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
