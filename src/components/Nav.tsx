import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Membership', href: '#membership' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-sm py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-ink rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-yellow rounded-full" />
          </div>
          <span className={`font-display font-bold ${scrolled ? 'text-ink' : 'text-white'} text-lg tracking-tight`}>
            Creatives Lunch
          </span>
        </a>

        {/* Desktop nav centered */}
        <nav className="hidden md:flex items-center gap-8 mx-auto">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`${scrolled ? 'text-ink/80 hover:text-ink' : 'text-white/90 hover:text-white'} font-body text-sm font-medium transition-colors duration-200`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA on right */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#membership"
            className={`${scrolled ? 'bg-ink text-cream' : 'bg-white text-black'} font-display font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 hover:shadow-md`}
          >
            Become a Member
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden p-2 ${scrolled ? 'text-ink' : 'text-white'}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-cream border-t border-ink/10 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-body font-medium text-ink text-base"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#membership"
            onClick={() => setOpen(false)}
            className="bg-ink text-cream font-display font-semibold text-sm px-5 py-3 rounded-full text-center mt-2"
          >
            Join the Club
          </a>
        </div>
      )}
    </header>
  );
}
