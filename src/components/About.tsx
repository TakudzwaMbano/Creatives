import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function About() {
  const shouldReduce = useReducedMotion();
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.section
      id="about"
      className="relative z-10 overflow-hidden py-14 sm:py-16 lg:py-20"
      style={{ backgroundColor: '#F8F8F5' }}
      initial={shouldReduce ? undefined : { opacity: 0, y: 24 }}
      whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="site-container relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-10 h-56 w-56 -translate-x-1/2 rounded-full bg-brand-green/15 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-44 w-44 rounded-full bg-brand-orange/10 blur-3xl" />
        </div>

        <div className="rounded-[32px] border border-ink/10 bg-white/75 p-6 shadow-[0_30px_80px_rgba(17,17,17,0.08)] backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[48%_52%] lg:gap-14">
            <motion.div
              initial={shouldReduce ? undefined : { opacity: 0, x: -24 }}
              whileInView={shouldReduce ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="overflow-hidden rounded-[24px] border border-white/70 bg-white shadow-[0_24px_70px_rgba(17,17,17,0.14)]">
                <motion.img
                  src="/assets/images/OUR%20STORY.jpg"
                  alt="Creatives Lunch community"
                  className="h-[320px] w-full object-cover sm:h-[420px]"
                  loading="lazy"
                  decoding="async"
                  initial={shouldReduce ? undefined : { scale: 1.02, opacity: 0.95 }}
                  whileInView={shouldReduce ? undefined : { scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  whileHover={shouldReduce ? undefined : { scale: 1.03 }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={shouldReduce ? undefined : { opacity: 0, x: 24 }}
              whileInView={shouldReduce ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}
              className="max-w-2xl lg:max-w-[34rem]"
            >
              <span className="section-label mb-4 block text-ink/40">
                <span className="mr-2 inline-block h-px w-6 align-middle bg-ink/30" />
                Our Story
              </span>
              <h2 className="font-display text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[0.95] tracking-[-0.03em] text-ink">
                A warm table, <span className="text-brand-green">built for bold ideas.</span>
              </h2>
              <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-ink/65 sm:text-[17px]">
                CREATIVES LUNCH is a community where creative people come together to meet, learn, share ideas, and support one another. It is open to graphic designers, photographers, videographers, artists, musicians, web developers, content creators, performers, and anyone who enjoys being creative.
              </p>
              <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-ink/65 sm:text-[17px]">
                We believe that great ideas grow when people spend time together. That is why we create fun and meaningful events where creatives can learn new skills, build friendships, work together, and help each other succeed.
              </p>

              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    initial={shouldReduce ? undefined : { opacity: 0, height: 0 }}
                    animate={shouldReduce ? undefined : { opacity: 1, height: 'auto' }}
                    exit={shouldReduce ? undefined : { opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-ink/65 sm:text-[17px]">
                      Our activities are not only about creativity. We also believe that a healthy mind needs a healthy body. Through different events, we encourage creatives to stay active, take care of themselves, and enjoy being part of a positive community.
                    </p>
                    <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-ink/65 sm:text-[17px]">
                      We are grateful for the support and encouragement of respectable and influential people who believe that creatives deserve opportunities to grow. When leaders and community members stand with us, they help build a stronger, healthier, and more connected creative community.
                    </p>
                    <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-ink/65 sm:text-[17px]">
                      Our first Creatives on the Move wellness event on 27 June 2026 was a great success and brought creatives together in a fun and healthy way. We are excited to continue this journey with more editions to come, and we look forward to welcoming even more creatives to join us.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-green/80 transition-colors duration-200"
              >
                {expanded ? 'View Less' : 'View More'}
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                />
              </button>

              <a
                href="#membership"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink/12 bg-white/85 px-4 py-2 font-display text-sm font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Discover the community <ArrowUpRight size={14} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
