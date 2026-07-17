import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export default function FeaturedEvent() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="events" className="overflow-hidden py-16 lg:py-24" style={{ backgroundColor: '#FAF9F7' }}>
      <div className="site-container">
        <motion.div
          className="mb-12 flex items-center justify-between"
          initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
          whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="section-label text-ink/40">
            <span className="mr-2 inline-block h-px w-6 align-middle bg-ink/30" />
            Featured Event
          </span>
          <a href="#" className="flex items-center gap-1 font-body text-sm font-semibold text-ink/50 transition-colors duration-200 hover:text-ink">
            All events <ArrowRight size={14} />
          </a>
        </motion.div>

        <motion.div
          className="event-card-entrance relative min-h-[500px] overflow-hidden rounded-[2rem] bg-ink lg:min-h-[600px]"
          initial={shouldReduce ? undefined : { opacity: 0, y: 30 }}
          whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          whileHover={shouldReduce ? undefined : { y: -12 }}
        >
          <img
            src="/assets/images/image1.jpeg"
            alt="Creatives on the Move"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-transparent" />

          <div className="relative z-10 flex h-full min-h-[500px] flex-col justify-end p-10 lg:min-h-[600px] lg:p-16">
            <div className="mb-6 flex items-center gap-3">
              <span className="glow-yellow rounded-full bg-brand-green px-3 py-1 text-xs font-display font-bold uppercase tracking-wide text-white">
                Upcoming
              </span>
              <span className="rounded-full border border-cream/40 bg-cream/20 px-3 py-1 text-xs font-body text-cream">
                Annual Retreat
              </span>
            </div>

            <h2 className="mb-6 max-w-2xl font-display text-[clamp(2.3rem,5.2vw,4.1rem)] font-bold leading-[0.92] tracking-[-0.03em] text-cream">
              Creatives<br />on the Move
            </h2>

            <div className="mb-8 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-cream/80">
                <Calendar size={15} />
                <span className="font-body text-sm">22 August 2026</span>
              </div>
              <div className="flex items-center gap-2 text-cream/80">
                <MapPin size={15} />
                <span className="font-body text-sm">Bulawayo, Zimbabwe</span>
              </div>
            </div>

            <p className="mb-10 max-w-lg text-base leading-relaxed font-body text-cream/70">
              A day of creative talks, wellness activities and shared meals. A retreat for creatives who want to step away from screens and make something real together.
            </p>

            <a
              href="https://wa.me/263716556815?text=I%20want%20to%20join%20the%20next%20event"
              target="_blank"
              rel="noreferrer noopener"
              className="glow-button glow-button--primary inline-flex w-fit items-center gap-3 rounded-full bg-brand-green px-6 py-3 text-sm font-display font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl glow-yellow"
            >
              Reserve Your Spot
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="absolute right-8 top-8 h-20 w-20 rounded-full border-2 border-brand-green/30" />
          <div className="absolute right-10 top-10 h-16 w-16 rounded-full border border-brand-green/20" />
        </motion.div>
      </div>
    </section>
  );
}
