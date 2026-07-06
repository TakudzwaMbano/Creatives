const fields = [
  { label: 'Graphic Designers', color: 'bg-yellow', count: '180+', textColor: 'text-ink' },
  { label: 'Photographers', color: 'bg-sky', count: '210+', textColor: 'text-ink' },
  { label: 'Videographers', color: 'bg-ink', count: '95+', textColor: 'text-cream' },
  { label: 'Artists', color: 'bg-violet', count: '140+', textColor: 'text-cream' },
  { label: 'Musicians', color: 'bg-pink', count: '120+', textColor: 'text-cream' },
  { label: 'Web Developers', color: 'bg-lime', count: '165+', textColor: 'text-ink' },
  { label: 'Content Creators', color: 'bg-sky', count: '200+', textColor: 'text-ink' },
  { label: 'Animators', color: 'bg-yellow', count: '60+', textColor: 'text-ink' },
  { label: 'Writers', color: 'bg-ink', count: '110+', textColor: 'text-cream' },
  { label: 'Fashion Designers', color: 'bg-pink', count: '75+', textColor: 'text-cream' },
  { label: 'Creative Entrepreneurs', color: 'bg-lime', count: '90+', textColor: 'text-ink' },
  { label: 'Performers', color: 'bg-violet', count: '55+', textColor: 'text-cream' },
];

export default function CreativeFields() {
  return (
    <section id="community" className="py-24 lg:py-36 bg-ink overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="observe-fade">
            <span className="section-label text-cream/30 mb-4 block">
              <span className="w-6 h-px bg-cream/20 inline-block mr-2 align-middle" />
              Who's Here
            </span>
            <h2 className="font-display font-bold text-cream text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05]">
              Every creative<br />discipline,
              <span className="text-yellow"> welcome.</span>
            </h2>
          </div>
          <p className="max-w-xs font-body text-cream/50 text-sm leading-relaxed observe-fade delay-200">
            Our community spans every creative field. No matter your medium, you belong here.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {fields.map((field, i) => (
            <div
              key={field.label}
              className={`observe-fade card-hover ${field.color} rounded-2xl p-5 cursor-default`}
              style={{ transitionDelay: `${Math.min(i * 60, 400)}ms` }}
            >
              <p className={`font-body text-[10px] font-bold uppercase tracking-widest ${field.textColor} opacity-50 mb-3`}>
                Members
              </p>
              <p className={`font-display font-bold text-2xl ${field.textColor} leading-none mb-1`}>
                {field.count}
              </p>
              <p className={`font-display font-semibold text-sm ${field.textColor} leading-tight mt-2`}>
                {field.label}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center observe-fade">
          <a
            href="#membership"
            className="inline-flex items-center gap-2 bg-yellow text-ink font-display font-bold text-sm px-8 py-4 rounded-full hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            Find Your People
          </a>
        </div>
      </div>
    </section>
  );
}
