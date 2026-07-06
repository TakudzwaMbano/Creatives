const images = [
  { src: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Creative workshop', tall: false },
  { src: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Design session', tall: true },
  { src: 'https://images.pexels.com/photos/159862/art-school-painting-tree-159862.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Art session', tall: false },
  { src: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Music session', tall: true },
  { src: 'https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Team collaboration', tall: false },
  { src: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Photography event', tall: false },
  { src: 'https://images.pexels.com/photos/716276/pexels-photo-716276.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Creative gathering', tall: true },
  { src: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Performance event', tall: false },
  { src: 'https://images.pexels.com/photos/3782235/pexels-photo-3782235.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Writing workshop', tall: false },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 lg:py-36 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="observe-fade">
            <span className="section-label text-ink/40 mb-4 block">
              <span className="w-6 h-px bg-ink/30 inline-block mr-2 align-middle" />
              Gallery
            </span>
            <h2 className="font-display font-bold text-ink text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05]">
              Life at<br />Creatives Lunch
            </h2>
          </div>
          <p className="max-w-xs font-body text-ink/55 text-sm leading-relaxed observe-fade delay-200">
            Moments from our events, workshops, retreats, and the everyday connections between members.
          </p>
        </div>

        {/* Masonry grid */}
        <div className="masonry observe-fade">
          {images.map((img, i) => (
            <div key={i} className="masonry-item rounded-2xl overflow-hidden card-hover cursor-pointer">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full block object-cover"
                style={{ aspectRatio: img.tall ? '3/4' : '4/3' }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
