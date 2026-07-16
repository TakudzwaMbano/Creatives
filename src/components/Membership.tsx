import { ArrowRight, Briefcase, Check, Sparkles, Users } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const tiers = [
  {
    name: 'Community Membership',
    price: '$10',
    period: '/month',
    accent: 'bg-brand-green',
    textAccent: 'text-white',
    glowColor: 'glow-yellow',
    description: 'A welcoming entry point into the creative community.',
    perks: [
      'General membership',
      'Access to community updates',
      'Access to selected events',
      'Access to the community of creatives',
      'Event discounts',
      'Discounted Membership NFC Card',
    ],
    cta: 'Join Community',
    featured: false,
    floatDelay: 0,
    icon: Users,
  },
  {
    name: 'Active Membership',
    price: '$15',
    period: '/month',
    accent: 'bg-brand-green',
    textAccent: 'text-white',
    glowColor: 'glow-yellow',
    description: 'The most complete membership for active creatives and collaborators.',
    perks: [
      'Everything included in Community Membership',
      'Access to the sponsors\' community',
      'Access to sponsor service discounts',
      'Free Membership NFC Card',
    ],
    cta: 'Become Active',
    featured: true,
    floatDelay: 0.2,
    icon: Sparkles,
  },
  {
    name: "Sponsor's Membership",
    price: 'Contact Us',
    period: '',
    accent: 'bg-brand-orange',
    textAccent: 'text-white',
    glowColor: 'glow-lavender',
    description: 'Custom access for brands and partners seeking deeper collaboration.',
    perks: [
      'Branding and advertising opportunities',
      'Event collaboration opportunities',
      'Access to the creative network',
      'Brand mentions across our social media platforms',
    ],
    cta: 'Contact Us',
    featured: false,
    floatDelay: 0.1,
    icon: Briefcase,
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
          <h2 className="font-display font-bold text-cream text-[clamp(2.1rem,4.3vw,3.3rem)] leading-[0.95] tracking-[-0.03em]">
            Pick your seat at<br />the
            <span className="bg-brand-green text-white px-3 ml-2 -skew-x-2 inline-block">table.</span>
          </h2>
          <p className="font-body text-cream/50 text-base leading-relaxed mt-6">
            Whether you're just getting started or ready to go deep — there's a membership for you. No lock-ins. Cancel anytime.
          </p>
        </motion.div>

        {/* Cards with floating animations */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.name}
                className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.05] p-0 shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-sm transition-all duration-300 ${
                  tier.featured ? 'z-10 scale-[1.01] lg:scale-105' : ''
                }`}
                initial={shouldReduce ? undefined : { opacity: 0, y: 30 }}
                whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                animate={shouldReduce ? undefined : {
                  y: tier.featured ? [-5, 5] : [-3, 3],
                }}
                transition={{
                  opacity: { duration: 0.6, delay: tier.floatDelay, ease: 'easeOut' },
                  y: {
                    repeat: Infinity,
                    repeatType: 'reverse',
                    duration: tier.featured ? 5.2 : 6.2,
                  },
                }}
                whileHover={shouldReduce ? undefined : { y: -8, scale: 1.01, boxShadow: '0 24px 70px rgba(0,0,0,0.32)' }}
              >
                <div className={`absolute -inset-1 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20 ${tier.accent}`} style={{ pointerEvents: 'none' }} />

                <div className={`${tier.accent} ${tier.glowColor} relative z-10 px-6 pb-6 pt-6`}>
                  {tier.featured && (
                    <span className="mb-3 inline-flex rounded-full border border-white/20 bg-charcoal/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cream">
                      Most Popular
                    </span>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-white shadow-lg shadow-black/10">
                      <Icon size={18} strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className={`font-display text-xl font-semibold ${tier.textAccent}`}>{tier.name}</p>
                      <div className="mt-1 flex items-end gap-1">
                        <span className={`font-display text-3xl font-bold ${tier.textAccent}`}>{tier.price}</span>
                        {tier.period && (
                          <span className={`mb-0.5 font-body text-sm ${tier.textAccent} opacity-70`}>{tier.period}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 flex flex-1 flex-col p-6">
                  <p className="mb-5 font-body text-sm leading-relaxed text-cream/65">{tier.description}</p>

                  <ul className="mb-8 flex flex-1 flex-col gap-3">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5">
                        <span className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${tier.accent}`}>
                          <Check size={10} className="text-charcoal" strokeWidth={3} />
                        </span>
                        <span className="font-body text-sm leading-6 text-cream/75">{perk}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="https://wa.me/263716556815"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={`premium-cta glow-button flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-center font-display text-sm font-semibold transition-all duration-200 ${
                      tier.featured
                        ? `${tier.accent} ${tier.textAccent} hover:shadow-2xl`
                        : 'border border-cream/25 bg-white/[0.03] text-cream hover:bg-white/[0.08]'
                    }`}
                  >
                    {tier.cta}
                    <ArrowRight size={14} />
                  </a>
                </div>
              </motion.div>
            );
          })}
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

