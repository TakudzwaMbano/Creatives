import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Footer from '../components/Footer';

const imageModules = import.meta.glob('../../public/assets/images/tinified/*.{jpeg,jpg,png,webp}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

const images = Object.entries(imageModules)
  .map(([path, src]) => ({ src, fileName: path.split('/').pop() ?? '' }))
  .sort((a, b) => a.fileName.localeCompare(b.fileName));

const aspectVariants = [
  'aspect-[4/5]',
  'aspect-[3/4]',
  'aspect-[5/6]',
  'aspect-[16/10]',
  'aspect-[7/8]',
  'aspect-[9/12]',
];

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  driftX: number;
  driftY: number;
  twinklePhase: number;
  twinkleSpeed: number;
}

export default function Events() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedIndex(null);
      } else if (event.key === 'ArrowLeft') {
        setSelectedIndex((current) => {
          if (current === null) return null;
          return (current - 1 + images.length) % images.length;
        });
      } else if (event.key === 'ArrowRight') {
        setSelectedIndex((current) => {
          if (current === null) return null;
          return (current + 1) % images.length;
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: Star[] = [];
    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const createStars = () => {
      stars = Array.from({ length: 160 }, () => {
        const radius = Math.random() * 1.4 + 0.5;
        const brightness = 0.25 + Math.random() * 0.75;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius,
          alpha: brightness,
          driftX: (Math.random() * 0.03 + 0.005) * (Math.random() < 0.5 ? -1 : 1),
          driftY: (Math.random() * 0.02 + 0.003) * (Math.random() < 0.5 ? -1 : 1),
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.015 + 0.003,
        };
      });
    };

    const resizeCanvas = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createStars();
    };

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, width, height);

      const baseBlur = 1.3;
      stars.forEach((star) => {
        star.x += star.driftX;
        star.y += star.driftY;
        star.twinklePhase += star.twinkleSpeed;

        if (star.x < -20) star.x = width + 20;
        if (star.x > width + 20) star.x = -20;
        if (star.y < -20) star.y = height + 20;
        if (star.y > height + 20) star.y = -20;

        const twinkle = 0.25 * Math.sin(star.twinklePhase) + 0.75;
        const alpha = star.alpha * twinkle;

        const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 8);
        glow.addColorStop(0, `rgba(255,255,255,${alpha})`);
        glow.addColorStop(0.55, `rgba(255,255,255,${alpha * 0.4})`);
        glow.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = alpha;
        ctx.filter = `blur(${baseBlur * (star.radius / 1.5)}px)`;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.filter = 'none';
        ctx.globalAlpha = 1;
      });

      const fade = ctx.createRadialGradient(width / 2, height / 2, width * 0.55, width / 2, height / 2, Math.max(width, height) * 0.8);
      fade.addColorStop(0, 'rgba(255,255,255,0)');
      fade.addColorStop(0.75, 'rgba(255,255,255,0.15)');
      fade.addColorStop(1, 'rgba(255,255,255,0.28)');
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const prevImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-[#141212]">
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen opacity-75"
        aria-hidden="true"
      />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.16),transparent_20%),radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_55%)]" />

      <button
        type="button"
        onClick={() => navigate('/')}
        className="fixed left-6 top-6 z-50 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/95 px-4 py-2 text-sm font-medium text-[#141212] shadow-[0_18px_48px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_80px_rgba(15,23,42,0.12)] backdrop-blur-sm"
      >
        ← Home
      </button>

      <div className="mx-auto max-w-[1700px] px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        <div className="columns-1 gap-8 sm:columns-2 xl:columns-3 2xl:columns-4">
          {images.map((image, index) => (
            <motion.button
              key={image.fileName}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className="group mb-8 inline-block w-full overflow-hidden rounded-[16px] border border-black/5 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_100px_rgba(15,23,42,0.12)]"
              whileHover={{ scale: 1.005 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div className={`relative overflow-hidden ${aspectVariants[index % aspectVariants.length]}`}>
                <img
                  src={image.src}
                  alt="Event image"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/95 px-4 py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedIndex(null);
              }}
              className="absolute right-6 top-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition hover:bg-black"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                prevImage();
              }}
              className="absolute left-6 top-1/2 z-50 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition hover:bg-black"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                nextImage();
              }}
              className="absolute right-6 top-1/2 z-50 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition hover:bg-black"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>

            <motion.div
              className="relative w-full max-w-[90vw] max-h-[90vh] overflow-hidden rounded-[24px] bg-black"
              initial={{ scale: 0.97 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.97 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={images[selectedIndex].src}
                alt="Event image"
                className="h-full w-full object-contain"
                loading="eager"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </main>
  );
}


