import { ArrowRight, Calendar, MapPin } from 'lucide-react';

export default function FeaturedEvent() {
  return (
    <section id="events" className="py-16 lg:py-24 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Label */}
        <div className="flex items-center justify-between mb-12">
          <span className="section-label text-ink/40">
            <span className="w-6 h-px bg-ink/30 inline-block mr-2 align-middle" />
            Featured Event
          </span>
          <a
            href="#"
            className="font-body text-sm font-semibold text-ink/50 hover:text-ink transition-colors duration-200 flex items-center gap-1"
          >
            All events <ArrowRight size={14} />
          </a>
        </div>

        {/* Editorial event card */}
        <div className="relative rounded-[2rem] overflow-hidden bg-ink min-h-[500px] lg:min-h-[600px] observe-fade">
          {/* Background image */}
          <img
            src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1400"
            alt="Creatives on the Move"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/50 to-transparent" />

          {/* Content */}
          <div className="relative z-10 p-10 lg:p-16 flex flex-col justify-end h-full min-h-[500px] lg:min-h-[600px]">
            {/* Tags */}
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-yellow text-ink font-display font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wide">
                Upcoming
              </span>
              <span className="bg-cream/10 text-cream font-body text-xs px-3 py-1 rounded-full border border-cream/20">
                Annual Retreat
              </span>
            </div>

            {/* Title */}
            <h2 className="font-display font-bold text-cream text-[clamp(2.5rem,6vw,5rem)] leading-[1.0] max-w-2xl mb-6">
              Creatives<br />on the Move
            </h2>

            {/* Event details */}
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-cream/70">
                <Calendar size={15} />
                <span className="font-body text-sm">August 23–25, 2025</span>
              </div>
              <div className="flex items-center gap-2 text-cream/70">
                <MapPin size={15} />
                <span className="font-body text-sm">Cape Town, South Africa</span>
              </div>
            </div>

            <p className="font-body text-cream/60 text-base leading-relaxed max-w-lg mb-10">
              Three days of workshops, talks, exhibitions, and shared meals. A retreat for creatives who want to step away from screens and make something real together.
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-3 bg-cream text-ink font-display font-bold text-sm px-6 py-3 rounded-full w-fit hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              Reserve Your Spot
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Decorative rings */}
          <div className="absolute top-8 right-8 w-20 h-20 border-2 border-yellow/40 rounded-full" />
          <div className="absolute top-10 right-10 w-16 h-16 border border-yellow/20 rounded-full" />
        </div>

        {/* Secondary events */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {[
            { title: 'Design Critique Night', date: 'July 12, 2025', city: 'Johannesburg', color: 'bg-sky' },
            { title: 'Photo Walk & Brunch', date: 'July 19, 2025', city: 'Nairobi', color: 'bg-lime' },
            { title: 'Creative Portfolio Review', date: 'July 26, 2025', city: 'Lagos', color: 'bg-violet' },
          ].map((event, i) => (
            <div
              key={event.title}
              className={`observe-fade card-hover ${event.color} rounded-2xl p-6 cursor-pointer`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p className="font-body text-ink text-[10px] uppercase tracking-widest opacity-50 mb-3">
                {event.date}
              </p>
              <h3 className="font-display font-bold text-ink text-lg leading-snug mb-2">
                {event.title}
              </h3>
              <div className="flex items-center gap-1.5 text-ink/60 mt-auto">
                <MapPin size={12} />
                <span className="font-body text-xs">{event.city}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
