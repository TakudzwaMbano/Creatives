import { motion, useReducedMotion } from 'framer-motion';

const testimonials = [
  {
    quote: "Creatives Lunch gave me my first real community in the industry. I met my current creative partner at a photo walk brunch three years ago.",
    name: 'Amara Osei',
    role: 'Photographer & Visual Artist',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    accent: 'bg-accent-yellow',
  },
  {
    quote: "There's nowhere else I've found this mix of talent, openness, and genuine support. It's not a competition — it's a collaboration.",
    name: 'Kwame Mensah',
    role: 'Graphic Designer',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
    accent: 'bg-accent-cyan',
  },
  {
    quote: "I came to one event and was a member by the next week. The community is warm, talented, and genuinely invested in each other's work.",
    name: 'Zola Dlamini',
    role: 'Film Director & Videographer',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=200',
    accent: 'bg-accent-lavender',
  },
];

export default function Testimonials() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.section
      className="py-16 lg:py-24 overflow-hidden"
      style={{ backgroundColor: '#F8F8F5' }}
      initial={shouldReduce ? undefined : { opacity: 0 }}
      whileInView={shouldReduce ? undefined : { opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="site-container">

        {/* Header */}
        <motion.div
          className="mb-14 lg:mb-16"
          initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
          whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="section-label text-ink/40 mb-4 block">
            <span className="w-6 h-px bg-ink/30 inline-block mr-2 align-middle" />
            Member Stories
          </span>
          <h2 className="font-display font-bold text-ink text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05]">
            Heard from the<br />
            <span className="accent-yellow">community.</span>
          </h2>
        </motion.div>

        {/* Cards with horizontal reveal */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="testimonial-card-reveal magazine-hover relative rounded-2xl p-8 flex flex-col gap-6 border border-ink/8 overflow-hidden"
              style={{ backgroundColor: '#FFFFFF' }}
              initial={shouldReduce ? undefined : { opacity: 0, x: -20 }}
              whileInView={shouldReduce ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
            >
              {/* Accent line at top */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${t.accent}`} />

              {/* Large quotation mark */}
              <div className={`text-6xl font-display font-bold ${t.accent} opacity-20`}>"</div>

              <blockquote className="font-body text-ink/80 text-base leading-relaxed flex-1">
                "{t.quote}"
              </blockquote>

              <div className="flex items-center gap-3 pt-4 border-t border-ink/10">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-display font-bold text-ink text-sm">{t.name}</p>
                  <p className="font-body text-ink/50 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
