import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Events', href: '/events' },
  { label: 'Membership', href: '/#membership' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Contact', href: '/#contact' },
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
        scrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
      style={{ height: '72px' }}
    >
      <div className="site-container h-full relative">
        <div className="flex h-full items-center justify-between px-0 sm:px-0">
          <div className="flex items-center min-w-0" style={{ gap: '14px' }}>
            <button
              className={`lg:hidden flex items-center justify-center p-0 ${scrolled ? 'text-ink' : 'text-white'}`}
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              style={{ width: '24px', height: '24px' }}
            >
              {open ? (
                <X size={24} strokeWidth={1.5} />
              ) : (
                <div className="flex flex-col gap-1" style={{ gap: '6px' }}>
                  <span className="block bg-current" style={{ width: '20px', height: '1.5px' }} />
                  <span className="block bg-current" style={{ width: '20px', height: '1.5px' }} />
                </div>
              )}
            </button>
            <a href="#" className="flex items-center group">
              <img
                src="/assets/images/logo.PNG"
                alt="Creatives Lunch logo"
                className="object-contain"
                style={{ width: '44px', height: '44px' }}
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
                href="https://wa.me/263716556815"
                target="_blank"
                rel="noreferrer noopener"
                className={`${scrolled ? 'bg-brand-green text-white' : 'bg-brand-green text-white'} premium-cta glow-button glow-button--primary font-display font-semibold text-sm h-12 px-6 rounded-full inline-flex items-center justify-center transition-all duration-200 hover:shadow-lg`}
              >
                Become a Member
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-x-0 top-[72px] z-40 px-4 pb-6 pt-2 transition-all duration-300 ease-out ${
          open ? 'translate-x-0 opacity-100 pointer-events-auto' : '-translate-x-3 opacity-0 pointer-events-none'
        }`}
      >
        <div className="rounded-[24px] border border-white/60 bg-white/70 px-4 py-4 shadow-[0_18px_60px_rgba(0,0,0,0.14)] backdrop-blur-xl">
          <div className="flex flex-col">
            {navLinks.map((link, index) => (
              <div key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-2 py-3 text-[15px] font-medium tracking-[0.01em] text-ink/90 transition-colors duration-200 hover:bg-white/70 hover:text-ink"
                >
                  <span>{link.label}</span>
                </a>
                {index < navLinks.length - 1 && <div className="h-px bg-ink/8" />}
              </div>
            ))}

            <div className="mt-4 border-t border-ink/10 pt-4">
              <a
                href="https://wa.me/263716556815"
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => setOpen(false)}
                className="glow-button glow-button--primary bg-brand-green inline-flex h-9 w-fit items-center justify-center rounded-full px-4 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Become a Member
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
