import { ArrowUpRight } from 'lucide-react';

const features = [
  {
    icon: '◎',
    title: 'Connect',
    desc: 'Meet fellow creatives across disciplines. Build real relationships that spark collaboration.',
    color: 'bg-sky',
  },
  {
    icon: '✦',
    title: 'Create',
    desc: 'Work on shared projects, join creative challenges, and push your craft further.',
    color: 'bg-yellow',
  },
  {
    icon: '↗',
    title: 'Grow',
    desc: "Learn from peers, get feedback, attend workshops, and level up your career.",
    color: 'bg-lime',
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-36 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
          <div className="max-w-xl observe-fade">
            <span className="section-label text-ink/40 mb-4 block">
              <span className="w-6 h-px bg-ink/30 inline-block mr-2 align-middle" />
              Our Story
            </span>
            <h2 className="font-display font-bold text-ink text-[clamp(2.5rem,5vw,4rem)] leading-[1.05]">
              A table where<br />
              <em className="not-italic text-violet">every creative</em><br />
              has a seat.
            </h2>
          </div>
          <div className="max-w-sm lg:mb-2 observe-fade delay-200">
            <p className="font-body text-ink/60 text-base leading-relaxed">
              Creatives Lunch started as a small gathering of curious people who wanted more than networking — they wanted genuine community. From that first lunch, we've grown into a home for over 1,200 creatives across 12 cities.
            </p>
            <a
              href="#membership"
              className="inline-flex items-center gap-2 mt-6 font-display font-semibold text-sm text-ink border-b border-ink pb-0.5 hover:gap-4 transition-all duration-200"
            >
              Our full story <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Split layout */}
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 mb-24">
          {/* Image collage */}
          <div className="lg:col-span-3 relative h-[420px] lg:h-[560px] observe-fade-left">
            <div className="absolute left-0 top-0 w-[65%] h-[75%] rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/7149165/pexels-photo-7149165.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Creatives collaborating"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute right-0 bottom-0 w-[50%] h-[60%] rounded-3xl overflow-hidden shadow-xl border-4 border-cream">
              <img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=700"
                alt="Creative workshop"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute left-[30%] bottom-[18%] w-16 h-16 bg-yellow rounded-full z-10 animate-float shadow-lg" />
            <div className="absolute top-4 right-[32%] bg-ink text-cream rounded-xl px-3 py-2 z-10 text-xs font-display font-semibold">
              Since 2019
            </div>
          </div>

          {/* Feature cards */}
          <div className="lg:col-span-2 flex flex-col gap-4 justify-center">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="observe-fade card-hover bg-cream border border-ink/10 rounded-2xl p-6 flex items-start gap-4 cursor-default"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className={`w-12 h-12 ${f.color} rounded-xl flex items-center justify-center flex-shrink-0 text-xl font-bold`}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-display font-bold text-ink text-xl mb-1">{f.title}</h3>
                  <p className="font-body text-ink/55 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
