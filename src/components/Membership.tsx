import { ArrowRight, Check } from 'lucide-react';

const tiers = [
  {
    name: 'Community Member',
    price: 'Free',
    period: '',
    accent: 'bg-lime',
    textAccent: 'text-ink',
    description: 'Get started and explore the community.',
    perks: [
      'Access to public events',
      'Community forum',
      'Monthly newsletter',
      'Digital member card',
    ],
    cta: 'Join Free',
    featured: false,
  },
  {
    name: 'Active Member',
    price: '$15',
    period: '/mo',
    accent: 'bg-yellow',
    textAccent: 'text-ink',
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
  },
  {
    name: 'Student Member',
    price: '$5',
    period: '/mo',
    accent: 'bg-sky',
    textAccent: 'text-ink',
    description: 'Affordable access for students.',
    perks: [
      'Everything in Active',
      'Discounted event tickets',
      'Student mentorship program',
      'Portfolio review sessions',
    ],
    cta: 'Student Access',
    featured: false,
  },
  {
    name: 'Partner Member',
    price: 'Custom',
    period: '',
    accent: 'bg-ink',
    textAccent: 'text-cream',
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
  },
];

export default function Membership() {
  return (
    <section id="membership" className="py-16 lg:py-24 bg-cream overflow-hidden">
      <div className="site-container">

        {/* Header */}
        <div className="max-w-2xl mb-10 observe-fade">
          <span className="section-label text-ink/40 mb-4 block">
            <span className="w-6 h-px bg-ink/30 inline-block mr-2 align-middle" />
            Membership
          </span>
          <h2 className="font-display font-bold text-ink text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05]">
            Pick your seat at<br />the
            <span className="bg-yellow px-2 ml-2 -skew-x-2 inline-block">table.</span>
          </h2>
          <p className="font-body text-ink/55 text-base leading-relaxed mt-6">
            Whether you're just getting started or ready to go deep — there's a membership for you. No lock-ins. Cancel anytime.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              className={`observe-fade card-hover relative rounded-2xl overflow-hidden flex flex-col ${
                tier.featured
                  ? 'border-2 border-ink ring-4 ring-yellow/30 shadow-2xl'
                  : 'border border-ink/10'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Accent header */}
              <div className={`${tier.accent} px-6 pt-6 pb-5`}>
                {tier.featured && (
                  <span className="inline-block bg-ink text-cream font-display font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider mb-3">
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
              <div className="bg-cream flex flex-col flex-1 p-6">
                <p className="font-body text-sm text-ink/55 leading-relaxed mb-6">{tier.description}</p>

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2.5">
                      <span className="w-4 h-4 bg-ink rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={9} className="text-cream" strokeWidth={3} />
                      </span>
                      <span className="font-body text-sm text-ink/70">{perk}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className={`w-full text-center font-display font-bold text-sm py-3.5 rounded-full flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 ${
                    tier.featured
                      ? 'bg-ink text-cream hover:shadow-lg'
                      : 'border-2 border-ink text-ink hover:bg-ink hover:text-cream'
                  }`}
                >
                  {tier.cta}
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center font-body text-xs text-ink/40 mt-8 observe-fade">
          All memberships include access to the Creatives Lunch app. Cancel anytime — no questions asked.
        </p>
      </div>
    </section>
  );
}
