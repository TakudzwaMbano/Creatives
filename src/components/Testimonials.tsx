import { motion, useReducedMotion } from 'framer-motion';

const testimonials = [
  {
    quote: "Creatives Lunch gave me my first real community in the industry. I met my current creative partner at a photo walk brunch three years ago.",
    name: 'Amara Osei',
    role: 'Photographer & Visual Artist',
    avatar: '/assets/images/302423.jpg',
    accent: 'bg-brand-green',
  },
  {
    quote: "There's nowhere else I've found this mix of talent, openness, and genuine support. It's not a competition — it's a collaboration.",
    name: 'Kwame Mensah',
    role: 'Graphic Designer',
    avatar: '/assets/images/302424.jpg',
    accent: 'bg-brand-green',
  },
  {
    quote: "I came to one event and was a member by the next week. The community is warm, talented, and genuinely invested in each other's work.",
    name: 'Zola Dlamini',
    role: 'Film Director & Videographer',
    avatar: '/assets/images/302425.jpg',
    accent: 'bg-brand-orange',
  },
];

export default function Testimonials() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.section
      className="overflow-hidden py-16 lg:py-24"
      style={{ backgroundColor: '#F8F8F5' }}
      initial={shouldReduce ? undefined : { opacity: 0 }}
      whileInView={shouldReduce ? undefined : { opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="site-container">
        <motion.div
          className="mb-14 lg:mb-16"
          initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
          whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="section-label mb-4 block text-ink/40">
            <span className="mr-2 inline-block h-px w-6 align-middle bg-ink/30" />
            Member Stories
          </span>
          <h2 className="font-display text-[clamp(2.1rem,4.3vw,3.3rem)] font-bold leading-[0.95] tracking-[-0.03em] text-ink">
            Heard from the<br />
            <span className="accent-yellow" style={{ color: '#0BDA51' }}>community.</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="testimonial-card-reveal magazine-hover relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-ink/8 p-8"
              style={{ backgroundColor: '#FFFFFF' }}
              initial={shouldReduce ? undefined : { opacity: 0, x: -20 }}
              whileInView={shouldReduce ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
            >
              <div className={`absolute left-0 right-0 top-0 h-1 ${t.accent}`} />

              <div className="overflow-hidden rounded-2xl border border-ink/8 bg-ink/5">
                <img src={t.avatar} alt={t.name} className="h-44 w-full object-cover" loading="lazy" />
              </div>

              <div className={`text-6xl font-display font-bold ${t.accent} opacity-20`}>"</div>

              <blockquote className="flex-1 text-base leading-relaxed font-body text-ink/80">
                "{t.quote}"
              </blockquote>

              <div className="flex items-center gap-3 border-t border-ink/10 pt-4">
                <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full object-cover" loading="lazy" />
                <div>
                  <p className="text-sm font-display font-bold text-ink">{t.name}</p>
                  <p className="text-xs font-body text-ink/50">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
