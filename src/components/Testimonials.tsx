import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

const testimonials = [
  {
    quote: "Creatives Lunch gave me my first real community in the industry. I met my current creative partner at a photo walk brunch three years ago.",
    name: 'Amara Osei',
    role: 'Photographer & Visual Artist',
    avatar: '/assets/images/image2.jpeg',
  },
  {
    quote: "There's nowhere else I've found this mix of talent, openness, and genuine support. It's not a competition — it's a collaboration.",
    name: 'Kwame Mensah',
    role: 'Graphic Designer',
    avatar: '/assets/images/302424.jpg',
  },
  {
    quote: "I came to one event and was a member by the next week. The community is warm, talented, and genuinely invested in each other's work.",
    name: 'Zola Dlamini',
    role: 'Film Director & Videographer',
    avatar: '/assets/images/302425.jpg',
  },
  {
    quote: "I actually can't get over how much fun we had today, and those cards!!! Genius, it was so amazing to hear everyone's answers because they really do give you courage and inspiration, so they should 100% stay. Next time though, we all have so many questions for you! But really, I feel like I found my community, we all just clicked, only as we were leaving did anyone remember to ask names. I can see how this can grow into something very special, and I wanted to thank you — even my shy antisocial partner Dmitry is telling his mates about how cool it was.",
    name: 'Shawne',
    role: 'Community Member',
    avatar: '/assets/images/302425.jpg',
  },
  {
    quote: "Creatives Lunch hosted another Creatives on the Move outing at Hillside Dams, and it was such a great experience! We hiked 4.1 km with a bit of jogging along the way, and it was totally worth it. The good vibes, laughter, and connections made the day even more special. I love how this initiative brings creatives together to connect, grow, and have fun. If you’ve been thinking about joining, this is your sign. See you at the next outing!",
    name: 'Miss Maggie Bones',
    role: 'Event Attendee',
    avatar: '/assets/images/302424.jpg',
  },
];

export default function Testimonials() {
  const shouldReduce = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const primaryTestimonials = testimonials.slice(0, 3);
  const extraTestimonials = testimonials.slice(3);

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

        <motion.div layout className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {primaryTestimonials.map((t, i) => (
            <motion.div
              key={t.name}
              layout
              className="testimonial-card-reveal magazine-hover relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/8 p-7"
              style={{ backgroundColor: '#FFFFFF' }}
              initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
              animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05, ease: 'easeOut' }}
            >
              <div className="overflow-hidden rounded-2xl border border-ink/8 bg-ink/5 h-64 sm:h-72">
                <img src={t.avatar} alt={t.name} className="h-full w-full object-cover object-center" loading="lazy" />
              </div>

              <div className="mt-1 text-5xl font-display font-bold text-ink/10">“</div>

              <blockquote className="flex-1 text-base leading-relaxed font-body text-ink/80">
                “{t.quote}”
              </blockquote>

              <div className="mt-auto flex items-center gap-3 border-t border-ink/10 pt-4">
                <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full object-cover" loading="lazy" />
                <div>
                  <p className="text-sm font-display font-bold text-ink">{t.name}</p>
                  <p className="text-xs font-body text-ink/50">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}

          <AnimatePresence initial={false}>
            {expanded && extraTestimonials.map((t, i) => (
              <motion.div
                key={t.name}
                layout
                initial={shouldReduce ? undefined : { opacity: 0, height: 0 }}
                animate={shouldReduce ? undefined : { opacity: 1, height: 'auto' }}
                exit={shouldReduce ? undefined : { opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="testimonial-card-reveal magazine-hover relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/8 p-7"
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <div className="overflow-hidden rounded-2xl border border-ink/8 bg-ink/5 h-64 sm:h-72">
                  <img src={t.avatar} alt={t.name} className="h-full w-full object-cover object-center" loading="lazy" />
                </div>

                <div className="mt-1 text-5xl font-display font-bold text-ink/10">“</div>

                <blockquote className="flex-1 text-base leading-relaxed font-body text-ink/80">
                  “{t.quote}”
                </blockquote>

                <div className="mt-auto flex items-center gap-3 border-t border-ink/10 pt-4">
                  <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full object-cover" loading="lazy" />
                  <div>
                    <p className="text-sm font-display font-bold text-ink">{t.name}</p>
                    <p className="text-xs font-body text-ink/50">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((value) => !value)}
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-6 py-3 text-sm font-semibold text-ink transition duration-300 ease-out hover:border-ink/20 hover:bg-ink/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ink/30"
          >
            <span>{expanded ? 'Show Less' : 'View All Testimonials'}</span>
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {expanded ? <path d="M18 15l-6-6-6 6" /> : <path d="M6 9l6 6 6-6" />}
            </svg>
          </button>
        </div>
      </div>
    </motion.section>
  );
}
