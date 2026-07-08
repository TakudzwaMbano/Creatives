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
        scrolled ? 'bg-white shadow-sm py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="site-container relative">
        <div className="flex h-14 items-center justify-between gap-3 px-0 sm:px-0">
          <div className="flex items-center gap-3 min-w-0">
            <button
              className={`lg:hidden flex h-10 w-10 items-center justify-center px-0 ${scrolled ? 'text-ink' : 'text-white'}`}
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={18} strokeWidth={1.8} /> : <div className="flex flex-col gap-1.5">
                <span className="block h-[1px] w-4 bg-current" />
                <span className="block h-[1px] w-4 bg-current" />
              </div>}
            </button>
            <a href="#" className="flex items-center group">
              <img
                src="/assets/images/logo.PNG"
                alt="Creatives Lunch logo"
                className="h-10 w-10 object-contain"
              />
            </a>
          </div>

          {/* Centered desktop nav */}
          <nav className="hidden lg:flex flex-1 justify-center pointer-events-auto">
            <div className="flex items-center gap-6 whitespace-nowrap">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`${scrolled ? 'text-ink/80 hover:text-ink' : 'text-white/90 hover:text-white'} font-body text-sm font-medium transition-colors duration-200 leading-none`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Right: CTA on desktop only */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center">
              <a
                href="#membership"
                className={`${scrolled ? 'bg-ink text-cream' : 'bg-white text-black'} premium-cta font-display font-semibold text-sm h-12 px-6 rounded-full inline-flex items-center justify-center transition-all duration-200 hover:shadow-md`}
              >
                Become a Member
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-cream border-t border-ink/10 px-6 py-4 flex flex-col gap-4">
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
