import { ArrowRight, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { sectionVariant, staggerChildren } from '../motion/variants';

const footerNav = {
  Community: ['About Us', 'Events', 'Gallery'],
  Membership: ['Community Member', 'Active Member', 'Student Member', 'Partner Member'],
  Connect: ['Contact'],
};

export default function Footer() {
  const shouldReduce = useReducedMotion();

  // Animated stars
  const stars = [
    { id: 1, top: '15%', left: '10%', delay: 0 },
    { id: 2, top: '25%', left: '85%', delay: 0.3 },
    { id: 3, top: '70%', left: '15%', delay: 0.6 },
    { id: 4, top: '60%', left: '80%', delay: 0.9 },
    { id: 5, top: '40%', left: '5%', delay: 1.2 },
    { id: 6, top: '80%', left: '90%', delay: 1.5 },
  ];

  return (
    <motion.footer
      id="contact"
      className="relative pt-20 pb-10 overflow-hidden"
      style={{ backgroundColor: '#111111' }}
      initial={shouldReduce ? undefined : 'hidden'}
      whileInView={shouldReduce ? undefined : 'show'}
      viewport={{ once: true, amount: 0.15 }}
      variants={sectionVariant}
    >
      {/* Animated star background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {!shouldReduce && stars.map((star) => (
          <motion.div
            key={star.id}
            className="star-dot absolute w-1 h-1 bg-brand-green rounded-full"
            style={{ top: star.top, left: star.left }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 3,
              delay: star.delay,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      <div className="site-container relative z-10">

        {/* Top */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20 pb-16 border-b border-cream/10">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 bg-brand-green rounded-full flex items-center justify-center">
                <div className="w-3.5 h-3.5 bg-charcoal rounded-full" />
              </div>
              <span className="font-display font-bold text-cream text-xl tracking-tight">Creatives Lunch</span>
            </div>

            <h2 className="font-display font-bold text-[clamp(2rem,4.2vw,3.1rem)] leading-[0.95] tracking-[-0.03em] text-cream mb-6">
              Pull up a chair.<br />
              <span className="accent-yellow">You belong here.</span>
            </h2>

            <p className="font-body text-cream/50 text-sm leading-relaxed max-w-sm">
              Creatives Lunch is a community for every creative mind — designers, photographers, musicians, developers, writers, performers, and more.
            </p>

            <div className="flex items-center gap-4 mt-8">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Youtube, label: 'YouTube' },
                { icon: Linkedin, label: 'LinkedIn' },
              ].map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 border border-cream/20 rounded-full flex items-center justify-center text-cream hover:text-charcoal transition-all duration-200"
                  whileHover={shouldReduce ? undefined : { scale: 1.1, backgroundColor: 'rgba(255, 212, 0, 0.9)' }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col justify-center">
            <p className="font-body text-xs uppercase tracking-widest text-cream/30 mb-3">Newsletter</p>
            <h3 className="font-display font-bold text-cream text-2xl mb-2">Stay in the loop.</h3>
            <p className="font-body text-cream/50 text-sm mb-6 leading-relaxed">
              Events, creative spotlights, member news — delivered every two weeks. No spam, ever.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-cream/5 border border-cream/20 rounded-full px-5 py-3.5 font-body text-sm text-cream placeholder-cream/30 focus:outline-none focus:border-accent-yellow transition-colors duration-200"
              />
              <motion.button
                className="bg-accent-yellow text-charcoal font-display font-bold text-sm px-6 py-3.5 rounded-full flex items-center justify-center gap-2 whitespace-nowrap glow-yellow"
                whileHover={shouldReduce ? undefined : { scale: 1.05 }}
              >
                Subscribe
                <ArrowRight size={14} />
              </motion.button>
            </div>
            <p className="font-body text-cream/30 text-xs mt-3">
              Subscriptions send to illustratedesignszw@gmail.com
            </p>
          </div>
        </div>

        {/* Nav columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {Object.entries(footerNav).map(([category, links]) => (
            <div key={category}>
              <p className="font-body text-xs font-bold uppercase tracking-widest text-cream/30 mb-5">
                {category}
              </p>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="font-body text-sm text-cream/55 hover:text-cream transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="font-body text-xs font-bold uppercase tracking-widest text-cream/30 mb-5">
              Get in Touch
            </p>
            <ul className="flex flex-col gap-3">
              <li className="font-body text-sm text-cream/55">illustratedesignszw@gmail.com</li>
              <li className="font-body text-sm text-cream/55">
                <a
                  href="https://wa.me/263716556815"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cream/55 hover:text-cream transition-colors duration-200"
                >
                  WhatsApp: +263 71 655 6815
                </a>
              </li>
              <li className="font-body text-sm text-cream/55">Bulawayo, Zimbabwe</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="flex flex-col items-center justify-between gap-4 pt-8 border-t border-cream/10 text-center sm:flex-row sm:text-left"
          variants={staggerChildren(0.06)}
        >
          <motion.p
            className="font-body text-xs text-cream/30"
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
          >
            © {new Date().getFullYear()} Creatives Lunch. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
