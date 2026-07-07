import { ArrowRight, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { sectionVariant, staggerChildren } from '../motion/variants';

const footerNav = {
  Community: ['About Us', 'Events', 'Gallery', 'Blog', 'Podcast'],
  Membership: ['Community Member', 'Active Member', 'Student Member', 'Partner Member'],
  Connect: ['Contact', 'Press', 'Partnerships', 'Careers'],
};

export default function Footer() {
  const shouldReduce = useReducedMotion();
  return (
    <motion.footer className="bg-ink text-cream pt-20 pb-10 overflow-hidden"
      initial={shouldReduce ? undefined : 'hidden'}
      whileInView={shouldReduce ? undefined : 'show'}
      viewport={{ once: true, amount: 0.15 }}
      variants={sectionVariant}
    >
      <div className="site-container">

        {/* Top */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20 pb-16 border-b border-cream/10">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 bg-cream rounded-full flex items-center justify-center">
                <div className="w-3.5 h-3.5 bg-yellow rounded-full" />
              </div>
              <span className="font-display font-bold text-cream text-xl tracking-tight">Creatives Lunch</span>
            </div>

            <h2 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] text-cream mb-6">
              Pull up a chair.<br />
              <span className="text-yellow">You belong here.</span>
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
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 border border-cream/20 rounded-full flex items-center justify-center hover:bg-cream hover:text-ink transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
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
                className="flex-1 bg-cream/5 border border-cream/20 rounded-full px-5 py-3.5 font-body text-sm text-cream placeholder-cream/30 focus:outline-none focus:border-yellow transition-colors duration-200"
              />
              <button className="bg-yellow text-ink font-display font-bold text-sm px-6 py-3.5 rounded-full flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg transition-all duration-200 whitespace-nowrap">
                Subscribe
                <ArrowRight size={14} />
              </button>
            </div>
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
              <li className="font-body text-sm text-cream/55">hello@creativeslunch.com</li>
              <li className="font-body text-sm text-cream/55">+27 21 000 0000</li>
              <li className="font-body text-sm text-cream/55">Cape Town, SA</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-cream/10" variants={staggerChildren(0.06)}>
          <motion.p className="font-body text-xs text-cream/30" variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
            © {new Date().getFullYear()} Creatives Lunch. All rights reserved.
          </motion.p>
          <motion.div className="flex items-center gap-6" variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } } }}>
            <motion.a href="#" className="font-body text-xs text-cream/30 hover:text-cream/60 transition-colors duration-200" variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>Privacy</motion.a>
            <motion.a href="#" className="font-body text-xs text-cream/30 hover:text-cream/60 transition-colors duration-200" variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>Terms</motion.a>
            <motion.a href="#" className="font-body text-xs text-cream/30 hover:text-cream/60 transition-colors duration-200" variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>Cookies</motion.a>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
