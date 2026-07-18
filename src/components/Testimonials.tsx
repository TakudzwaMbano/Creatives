import { motion, useReducedMotion } from 'framer-motion';

const testimonials = [
  {
    quote: "I actually can't get over how much fun we had today, and those cards!!! Genius, it was so amazing to hear everyone's answers because they really do give you courage and inspiration, so they should 100% stay. Next time though, we all have so many questions for you! But really, I feel like I found my community, we all just clicked, only as we were leaving did anyone remember to ask names. I can see how this can grow into something very special, and I wanted to thank you — even my shy antisocial partner Dmitry is telling his mates about how cool it was.",
    name: 'Shawnee',
    role: 'Community Member',
    avatar: '/assets/images/shawnee-avatar.jpeg',
  },
  {
    quote: "Creatives Lunch hosted another Creatives on the Move outing at Hillside Dams, and it was such a great experience! We hiked 4.1 km with a bit of jogging along the way, and it was totally worth it. The good vibes, laughter, and connections made the day even more special. I love how this initiative brings creatives together to connect, grow, and have fun. If you've been thinking about joining, this is your sign. See you at the next outing!",
    name: 'Miss Maggie Bones',
    role: 'Event Attendee',
    avatar: '/assets/images/miss-maggie-avatar.jpeg',
  },
  {
    quote: "The Creatives community is full of fun people, and I love the vibe, the running, the food and also the relationships we are building. I am definitely going to be a member for a very long time.",
    name: 'Thabo Nyoni',
    role: 'EkasiKulture Brand Owner',
    avatar: '/assets/images/thabo-avatar.jpeg',
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

        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((t, i) => (
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

              <div className="mt-1 text-5xl font-display font-bold text-ink/10">"</div>

              <blockquote className="flex-1 text-base leading-relaxed font-body text-ink/80">
                "{t.quote}"
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
        </motion.div>
      </div>
    </motion.section>
  );
}
