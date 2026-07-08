import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export default function FeaturedEvent() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="events" className="py-16 lg:py-24 overflow-hidden" style={{ backgroundColor: '#FAF9F7' }}>
      <div className="site-container">

        {/* Label */}
        <motion.div
          className="flex items-center justify-between mb-12"
          initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
          whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="section-label text-ink/40">
            <span className="w-6 h-px bg-ink/30 inline-block mr-2 align-middle" />
            Featured Event
          </span>
          <a
            href="#"
            className="font-body text-sm font-semibold text-ink/50 hover:text-ink transition-colors duration-200 flex items-center gap-1"
          >
            All events <ArrowRight size={14} />
          </a>
        </motion.div>

        {/* Editorial event card */}
        <motion.div
          className="event-card-entrance relative rounded-[2rem] overflow-hidden bg-ink min-h-[500px] lg:min-h-[600px]"
          initial={shouldReduce ? undefined : { opacity: 0, y: 30 }}
          whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          whileHover={shouldReduce ? undefined : { y: -12 }}
        >
          {/* Background image */}
          <img
            src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1400"
            alt="Creatives on the Move"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-transparent" />

          {/* Content */}
          <div className="relative z-10 p-10 lg:p-16 flex flex-col justify-end h-full min-h-[500px] lg:min-h-[600px]">
            {/* Tags */}
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-accent-yellow text-charcoal font-display font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wide glow-yellow">
                Upcoming
              </span>
              <span className="bg-cream/20 text-cream font-body text-xs px-3 py-1 rounded-full border border-cream/40">
                Annual Retreat
              </span>
            </div>

            {/* Title */}
            <h2 className="font-display font-bold text-cream text-[clamp(2.5rem,6vw,5rem)] leading-[1.0] max-w-2xl mb-6">
              Creatives<br />on the Move
            </h2>

            {/* Event details */}
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-cream/80">
                <Calendar size={15} />
                <span className="font-body text-sm">August 23–25, 2025</span>
              </div>
              <div className="flex items-center gap-2 text-cream/80">
                <MapPin size={15} />
                <span className="font-body text-sm">Cape Town, South Africa</span>
              </div>
            </div>

            <p className="font-body text-cream/70 text-base leading-relaxed max-w-lg mb-10">
              Three days of workshops, talks, exhibitions, and shared meals. A retreat for creatives who want to step away from screens and make something real together.
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-3 bg-accent-yellow text-charcoal font-display font-bold text-sm px-6 py-3 rounded-full w-fit hover:shadow-2xl hover:scale-105 transition-all duration-300 glow-yellow"
            >
              Reserve Your Spot
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Decorative shapes */}
          <div className="absolute top-8 right-8 w-20 h-20 border-2 border-accent-yellow/30 rounded-full" />
          <div className="absolute top-10 right-10 w-16 h-16 border border-accent-yellow/20 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
