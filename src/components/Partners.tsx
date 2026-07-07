const partners = [
  'Adobe', 'Figma', 'Behance', 'Canva', 'Dribbble', 'Unsplash', 'VSCO', 'Notion',
];

export default function Partners() {
  return (
    <section className="py-12 border-y border-ink/8 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-body text-xs font-bold uppercase tracking-widest text-ink/30 text-center mb-10 observe-fade">
          Trusted by creative teams at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 observe-fade delay-200">
          {partners.map((p) => (
            <span
              key={p}
              className="font-display font-bold text-xl text-ink/25 hover:text-ink/60 transition-colors duration-200 cursor-default"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
