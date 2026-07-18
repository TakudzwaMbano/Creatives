import { motion, useReducedMotion } from 'framer-motion';

const stats = [
  { number: '100+', label: 'Active Members', color: 'bg-brand-green', glowColor: 'glow-yellow' },
  { number: '1', label: 'City', color: 'bg-brand-green', glowColor: 'glow-cyan' },
  { number: '10+', label: 'Events Hosted', color: 'bg-brand-green', glowColor: 'glow-lime' },
  { number: '10+', label: 'Partnerships', color: 'bg-brand-orange', glowColor: 'glow-lavender' },
];

export default function Partners() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="py-12 lg:py-20 overflow-hidden" style={{ backgroundColor: '#FAF9F7' }}>
      <div className="site-container">
        <motion.p
          className="font-body text-xs font-bold uppercase tracking-widest text-ink/40 text-center mb-12 lg:mb-16"
          initial={shouldReduce ? undefined : { opacity: 0 }}
          whileInView={shouldReduce ? undefined : { opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          By the Numbers
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className={`stat-tile stat-tile-${i + 1} relative rounded-2xl overflow-hidden flex flex-col items-center justify-center p-6 lg:p-8 text-center group cursor-default`}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(17, 17, 17, 0.08)',
              }}
              initial={shouldReduce ? undefined : { opacity: 0, scale: 0.8 }}
              whileInView={shouldReduce ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
              whileHover={shouldReduce ? undefined : { y: -8, boxShadow: '0 24px 48px rgba(0, 0, 0, 0.12)' }}
            >
              {/* Colored accent dot */}
              <div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${stat.color}`} />

              {/* Number */}
              <div className={`font-display font-bold text-[clamp(1.8rem,5vw,2.8rem)] leading-none ${stat.color} mb-2`}>
                {stat.number}
              </div>

              {/* Label */}
              <p className="font-body text-xs lg:text-sm font-semibold text-ink/70 uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Partners section below */}
        <motion.div
          className="mt-16 lg:mt-24 pt-12 lg:pt-16 border-t border-ink/10"
          initial={shouldReduce ? undefined : { opacity: 0, y: 20 }}
          whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="font-body text-xs font-bold uppercase tracking-widest text-ink/30 text-center mb-8 lg:mb-12">
            Trusted by creative teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <img
              src="/assets/images/creatives-lunch-logo.jpeg"
              alt="Creatives Lunch"
              className="h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-200"
              loading="lazy"
            />
            {['Adobe', 'Figma', 'Behance', 'Canva', 'Dribbble', 'Unsplash', 'VSCO', 'Notion'].map((p) => (
              <span
                key={p}
                className="font-display font-bold text-xl text-ink/25 hover:text-ink/60 transition-colors duration-200 cursor-default"
              >
                {p}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
