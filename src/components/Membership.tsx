import { ArrowRight, Check } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const tiers = [
  {
    name: 'Community Member',
    price: 'Free',
    period: '',
    accent: 'bg-accent-lime',
    textAccent: 'text-charcoal',
    glowColor: 'glow-lime',
    description: 'Get started and explore the community.',
    perks: [
      'Access to public events',
      'Community forum',
      'Monthly newsletter',
      'Digital member card',
    ],
    cta: 'Join Free',
    featured: false,
    floatDelay: 0,
  },
  {
    name: 'Active Member',
    price: '$15',
    period: '/mo',
    accent: 'bg-accent-yellow',
    textAccent: 'text-charcoal',
    glowColor: 'glow-yellow',
    description: 'Full access for serious creatives.',
    perks: [
      'Everything in Community',
      'Priority event booking',
      'Members-only workshops',
      'Creative directory listing',
      'Collaboration board access',
    ],
    cta: 'Become a Member',
    featured: true,
    floatDelay: 0.2,
  },
  {
    name: 'Student Member',
    price: '$5',
    period: '/mo',
    accent: 'bg-accent-cyan',
    textAccent: 'text-charcoal',
    glowColor: 'glow-cyan',
    description: 'Affordable access for students.',
    perks: [
      'Everything in Active',
      'Discounted event tickets',
      'Student mentorship program',
      'Portfolio review sessions',
    ],
    cta: 'Student Access',
    featured: false,
    floatDelay: 0.1,
  },
  {
    name: 'Partner Member',
    price: 'Custom',
    period: '',
    accent: 'bg-accent-lavender',
    textAccent: 'text-charcoal',
    glowColor: 'glow-lavender',
    description: 'For studios, agencies, and brands.',
    perks: [
      'Everything in Active',
      'Brand spotlight features',
      'Co-host events',
      'Talent network access',
      'Dedicated account manager',
    ],
    cta: 'Talk to Us',
    featured: false,
    floatDelay: 0.15,
  },
];


export default function Membership() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="membership" className="py-16 lg:py-32 overflow-hidden" style={{ backgroundColor: '#111111' }}>
      <div className="site-container">

        {/* Header */}
        <motion.div
          className="max-w-2xl mb-16 lg:mb-20"
          initial={shouldReduce ? undefined : { opacity: 0, y: 20 }}
          whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="section-label text-cream/40 mb-4 block">
            <span className="w-6 h-px bg-cream/30 inline-block mr-2 align-middle" />
            Membership
          </span>
          <h2 className="font-display font-bold text-cream text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05]">
            Pick your seat at<br />the
            <span className="bg-accent-yellow text-charcoal px-3 ml-2 -skew-x-2 inline-block">table.</span>
          </h2>
          <p className="font-body text-cream/50 text-base leading-relaxed mt-6">
            Whether you're just getting started or ready to go deep — there's a membership for you. No lock-ins. Cancel anytime.
          </p>
        </motion.div>

        {/* Cards with floating animations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              className={`relative rounded-3xl overflow-hidden flex flex-col backdrop-blur-sm transition-all duration-300 group ${
                tier.featured
                  ? 'lg:scale-105 z-10'
                  : ''
              }`}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
              initial={shouldReduce ? undefined : { opacity: 0, y: 40 }}
              whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              animate={shouldReduce ? undefined : {
                y: tier.featured ? [-8, 8] : [-6, 6],
              }}
              transition={{
                opacity: { duration: 0.6, delay: tier.floatDelay, ease: 'easeOut' },
                y: {
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: tier.featured ? 5 : 6,
                },
              }}
              whileHover={shouldReduce ? undefined : { y: -12 }}
            >
              {/* Accent glow background */}
              <div
                className={`absolute -inset-1 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 ${tier.accent}`}
                style={{ pointerEvents: 'none' }}
              />

              {/* Accent header */}
              <div className={`${tier.accent} ${tier.glowColor} px-6 pt-6 pb-5 relative z-10`}>
                {tier.featured && (
                  <span className="inline-block bg-charcoal text-cream font-display font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider mb-3">
                    Most Popular
                  </span>
                )}
                <p className={`font-display font-bold text-xl ${tier.textAccent}`}>{tier.name}</p>
                <div className="flex items-end gap-1 mt-2">
                  <span className={`font-display font-bold text-3xl ${tier.textAccent}`}>{tier.price}</span>
                  {tier.period && (
                    <span className={`font-body text-sm ${tier.textAccent} opacity-60 mb-0.5`}>{tier.period}</span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-6 relative z-10">
                <p className="font-body text-sm text-cream/60 leading-relaxed mb-6">{tier.description}</p>

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2.5">
                      <span className={`w-4 h-4 ${tier.accent} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Check size={9} className="text-charcoal" strokeWidth={3} />
                      </span>
                      <span className="font-body text-sm text-cream/70">{perk}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className={`premium-cta w-full text-center font-display font-bold text-sm py-3.5 rounded-full flex items-center justify-center gap-2 transition-all duration-200 ${
                    tier.featured
                      ? `${tier.accent} ${tier.textAccent} hover:shadow-2xl`
                      : `border border-cream/30 text-cream hover:bg-cream/10`
                  }`}
                >
                  {tier.cta}
                  <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center font-body text-xs text-cream/30 mt-12"
          initial={shouldReduce ? undefined : { opacity: 0 }}
          whileInView={shouldReduce ? undefined : { opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          All memberships include access to the Creatives Lunch app. Cancel anytime — no questions asked.
        </motion.p>
      </div>
    </section>
  );
}

