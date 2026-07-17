import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const images = [
  { src: '/assets/images/302424.jpg', alt: 'Community workshop' },
  { src: '/assets/images/302425.jpg', alt: 'Studio session' },
  { src: '/assets/images/302427.jpg', alt: 'Event moment' },
  { src: '/assets/images/302428.jpg', alt: 'Creative collaboration' },
  { src: '/assets/images/302429.jpg', alt: 'Member meetup' },
  { src: '/assets/images/302430.jpg', alt: 'Lifestyle gathering' },
  { src: '/assets/images/302431.jpg', alt: 'Inspiring scene' },
  { src: '/assets/images/new hero image 1.jpeg', alt: 'Creative community' },
  { src: '/assets/images/new hero image 2.jpeg', alt: 'Creative gathering' },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt((entry.target as HTMLElement).dataset.index || '0');
            setVisibleImages((prev) => new Set(prev).add(index));
          }
        });
      },
      { rootMargin: '200px', threshold: 0.01 }
    );

    imageRefs.current.forEach((img) => {
      if (img) observer.observe(img);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.section ref={sectionRef} id="gallery" className="bg-cream py-12 lg:py-20"
      initial={shouldReduce ? undefined : { opacity: 0, y: 24 }}
      whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="site-container">
        <div className="mb-10">
          <span className="section-label text-ink/40 block mb-4">
            <span className="mr-2 inline-block h-px w-6 align-middle bg-ink/30" />
            Gallery
          </span>
          <h3 className="font-display font-bold text-ink text-3xl lg:text-4xl">Life at Creatives Lunch</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-2xl bg-gray-200 shadow-lg"
              initial={shouldReduce ? undefined : { opacity: 0, scale: 0.95 }}
              whileInView={shouldReduce ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
              whileHover={shouldReduce ? undefined : { scale: 1.02, y: -4 }}
              style={{ aspectRatio: '4/3' }}
            >
              {visibleImages.has(index) ? (
                <img
                  ref={(el) => (imageRefs.current[index] = el)}
                  data-index={index}
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="h-full w-full bg-gray-200 animate-pulse" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
