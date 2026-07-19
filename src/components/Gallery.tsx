import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const images = [
  { src: '/assets/images/gallery-new-1.jpeg', alt: 'Gallery photo 1' },
  { src: '/assets/images/gallery-new-2.jpeg', alt: 'Gallery photo 2' },
  { src: '/assets/images/gallery-new-3.jpeg', alt: 'Gallery photo 3' },
  { src: '/assets/images/event-2.jpeg', alt: 'Event creative session' },
  { src: '/assets/images/bush-3.jpeg', alt: 'Bush nature walk' },
  { src: '/assets/images/event-3.jpeg', alt: 'Event collaboration' },
  { src: '/assets/images/bush-4.jpeg', alt: 'Bush group activity' },
  { src: '/assets/images/event-4.jpeg', alt: 'Event networking' },
  { src: '/assets/images/bush-5.jpeg', alt: 'Bush wellness retreat' },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const shouldReduce = useReducedMotion();

  const displayImages = showAll ? images : images.slice(0, 4);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

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
          {displayImages.map((image, index) => (
            <motion.div
              key={image.src}
              className="relative overflow-hidden rounded-2xl bg-gray-200 shadow-lg"
              initial={shouldReduce ? undefined : { opacity: 0, scale: 0.95 }}
              whileInView={shouldReduce ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
              whileHover={shouldReduce ? undefined : { scale: 1.02, y: -4 }}
              style={{ aspectRatio: '4/3' }}
            >
              {!loadedImages.has(index) && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}
              <img
                src={image.src}
                alt={image.alt}
                className={`h-full w-full object-cover transition-transform duration-500 hover:scale-105 ${loadedImages.has(index) ? 'opacity-100' : 'opacity-0'}`}
                loading={index < 4 ? 'eager' : 'lazy'}
                decoding="async"
                onLoad={() => handleImageLoad(index)}
                onError={() => handleImageLoad(index)}
              />
            </motion.div>
          ))}
        </div>

        {images.length > 4 && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-6 py-3 text-sm font-semibold text-ink transition duration-300 ease-out hover:border-ink/20 hover:bg-ink/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ink/30"
            >
              <span>{showAll ? 'Show Less' : 'View All Gallery'}</span>
              <svg
                className="h-4 w-4 transition-transform duration-300"
                style={{ transform: showAll ? 'rotate(180deg)' : 'rotate(0deg)' }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </motion.section>
  );
}
