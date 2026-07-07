const testimonials = [
  {
    quote: "Creatives Lunch gave me my first real community in the industry. I met my current creative partner at a photo walk brunch three years ago.",
    name: 'Amara Osei',
    role: 'Photographer & Visual Artist',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    accent: 'bg-yellow',
  },
  {
    quote: "There's nowhere else I've found this mix of talent, openness, and genuine support. It's not a competition — it's a collaboration.",
    name: 'Kwame Mensah',
    role: 'Graphic Designer',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
    accent: 'bg-sky',
  },
  {
    quote: "I came to one event and was a member by the next week. The community is warm, talented, and genuinely invested in each other's work.",
    name: 'Zola Dlamini',
    role: 'Film Director & Videographer',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=200',
    accent: 'bg-violet',
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 lg:py-24 bg-ink overflow-hidden">
      <div className="site-container">

        {/* Header */}
        <div className="mb-10 observe-fade">
          <span className="section-label text-cream/30 mb-4 block">
            <span className="w-6 h-px bg-cream/20 inline-block mr-2 align-middle" />
            Member Stories
          </span>
          <h2 className="font-display font-bold text-cream text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05]">
            Heard from the<br />
            <span className="text-yellow">community.</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="observe-fade card-hover rounded-2xl p-7 flex flex-col gap-6 border border-cream/10 bg-cream/5"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className={`w-8 h-1 ${t.accent} rounded-full`} />

              <blockquote className="font-body text-cream/80 text-base leading-relaxed flex-1">
                "{t.quote}"
              </blockquote>

              <div className="flex items-center gap-3 pt-4 border-t border-cream/10">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div>
                  <p className="font-display font-bold text-cream text-sm">{t.name}</p>
                  <p className="font-body text-cream/40 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
