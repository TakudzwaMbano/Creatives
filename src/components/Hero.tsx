import { ArrowRight, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-cream overflow-hidden pt-32 pb-20">
      {/* Decorative background blurs */}
      <div className="absolute top-24 right-[12%] w-72 h-72 rounded-full bg-yellow/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-32 left-[8%] w-48 h-48 rounded-full bg-sky/25 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-6 items-center">
          {/* Left: Text */}
          <div className="relative z-10">
            {/* Label */}
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-lime" />
              <span className="font-body text-xs font-bold tracking-widest uppercase text-ink/60">
                Creative Community
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-bold text-ink leading-[0.95] mb-8">
              <span className="block text-[clamp(3.5rem,8vw,7rem)]">Where</span>
              <span className="block text-[clamp(3.5rem,8vw,7rem)] ml-12 relative">
                Creatives
                <span className="absolute -top-3 -right-6 text-yellow">
                  <Star size={28} fill="#F4C21D" />
                </span>
              </span>
              <span className="block text-[clamp(3.5rem,8vw,7rem)]">Connect.</span>
            </h1>

            {/* Sub text */}
            <p className="font-body text-ink/60 text-lg leading-relaxed max-w-md mb-10">
              A gathering place for designers, photographers, musicians, artists, developers, writers, and every creative in between. Come as you are.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#membership"
                className="bg-ink text-cream font-display font-semibold text-sm px-8 py-4 rounded-full flex items-center gap-2 hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                Become a Member
                <ArrowRight size={16} />
              </a>
              <a
                href="#events"
                className="border-2 border-ink text-ink font-display font-semibold text-sm px-8 py-4 rounded-full flex items-center gap-2 hover:bg-ink hover:text-cream transition-all duration-300"
              >
                Explore Events
              </a>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-8 mt-14 pt-8 border-t border-ink/10">
              <div>
                <p className="font-display font-bold text-2xl text-ink">1,200+</p>
                <p className="font-body text-xs text-ink/50 uppercase tracking-wide mt-1">Members</p>
              </div>
              <div className="w-px h-10 bg-ink/10" />
              <div>
                <p className="font-display font-bold text-2xl text-ink">80+</p>
                <p className="font-body text-xs text-ink/50 uppercase tracking-wide mt-1">Events Held</p>
              </div>
              <div className="w-px h-10 bg-ink/10" />
              <div>
                <p className="font-display font-bold text-2xl text-ink">12</p>
                <p className="font-body text-xs text-ink/50 uppercase tracking-wide mt-1">Cities</p>
              </div>
            </div>
          </div>

          {/* Right: Image composition */}
          <div className="relative h-[560px] lg:h-[680px]">
            {/* Main hero image */}
            <div className="absolute inset-6 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Creatives gathering"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-ink/10" />
            </div>

            {/* Floating yellow blob */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow rounded-full animate-float z-10 shadow-lg" />

            {/* Floating sky rectangle */}
            <div className="absolute top-16 -right-4 w-16 h-24 bg-sky rounded-2xl animate-float-slow z-10 shadow-lg" />

            {/* Floating pink circle */}
            <div className="absolute -bottom-4 right-16 w-14 h-14 bg-pink rounded-full animate-float z-10 shadow-lg" style={{ animationDelay: '1s' }} />

            {/* Floating lime small square */}
            <div className="absolute bottom-24 -left-4 w-12 h-12 bg-lime rounded-xl rotate-12 animate-float-reverse z-10 shadow-lg" />

            {/* Small floating label card */}
            <div className="absolute bottom-10 left-6 bg-cream rounded-2xl px-4 py-3 shadow-xl z-20 flex items-center gap-3 border border-ink/5">
              <div className="w-9 h-9 bg-yellow rounded-full flex items-center justify-center">
                <Star size={14} fill="#111" />
              </div>
              <div>
                <p className="font-display font-bold text-xs text-ink">Next Event</p>
                <p className="font-body text-[10px] text-ink/50">Creatives on the Move</p>
              </div>
            </div>

            {/* Violet shape */}
            <div className="absolute top-1/2 -right-6 w-10 h-32 bg-violet/60 rounded-full animate-float-reverse z-10" style={{ animationDelay: '2s' }} />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-body text-[10px] uppercase tracking-widest text-ink">Scroll</span>
        <div className="w-px h-10 bg-ink/40 animate-pulse" />
      </div>
    </section>
  );
}
