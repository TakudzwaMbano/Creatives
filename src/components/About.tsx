import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { sectionVariant, staggerChildren } from '../motion/variants';

const features = [
  {
    icon: '◎',
    title: 'Connect',
    desc: 'Meet fellow creatives across disciplines. Build real relationships that spark collaboration.',
    accentColor: 'bg-accent-cyan',
  },
  {
    icon: '✦',
    title: 'Create',
    desc: 'Work on shared projects, join creative challenges, and push your craft further.',
    accentColor: 'bg-accent-yellow',
  },
  {
    icon: '↗',
    title: 'Grow',
    desc: "Learn from peers, get feedback, attend workshops, and level up your career.",
    accentColor: 'bg-accent-lime',
  },
];

export default function About() {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const shouldReduce = useReducedMotion();
  const headingRef = React.useRef<HTMLHeadingElement | null>(null);
  const typeRef = React.useRef<HTMLSpanElement | null>(null);
  const cursorRef = React.useRef<HTMLSpanElement | null>(null);
  const typedStarted = React.useRef(false);
  const typedDone = React.useRef(false);
  const paraRef = React.useRef<HTMLParagraphElement | null>(null);
  const imageRefs = React.useRef<Array<HTMLImageElement | null>>([]);
  const cardRefs = React.useRef<Array<HTMLDivElement | null>>([]);

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // keep previous IntersectionObserver fallbacks for safety, but framer-motion will handle in-view
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let fallback: number | null = null;

    const onIntersect: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          observer.disconnect();
          if (fallback) {
            window.clearTimeout(fallback);
            fallback = null;
          }
          section.classList.add('in-view');
        }
      });
    };

    const io = new IntersectionObserver(onIntersect, { threshold: [0, 0.25, 0.5] });
    io.observe(section);

    if (prefersReduced || shouldReduce) {
      section.classList.add('in-view');
    } else {
      fallback = window.setTimeout(() => {
        section.classList.add('in-view');
        fallback = null;
        io.disconnect();
      }, 600);
    }

    return () => {
      io.disconnect();
      if (fallback) window.clearTimeout(fallback);
    };
  }, [shouldReduce]);

  React.useEffect(() => {
    // Typewriter: begin when section is ~20% visible
    const section = sectionRef.current;
    if (!section || !headingRef.current) return;

    const prefersReduced = shouldReduce || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lines = ['A table where', 'every creative', 'has a seat.'];

    let timers: number[] = [];

    const startTyping = () => {
      if (typedStarted.current || prefersReduced) return;
      typedStarted.current = true;

      const typeChar = (lineIndex: number, charIndex: number) => {
        if (!typeRef.current) return;
        if (lineIndex >= lines.length) {
          typedDone.current = true;
          // remove cursor after short delay
          if (cursorRef.current) {
            const t = window.setTimeout(() => {
              if (cursorRef.current) cursorRef.current.style.opacity = '0.25';
            }, 900);
            timers.push(t);
          }
          return;
        }

        const current = lines.slice(0, lineIndex).map((l) => escapeHtml(l)).join('<br/>');
        const partial = escapeHtml(lines[lineIndex].slice(0, charIndex + 1));
        const html = current ? `${current}<br/>${partial}` : partial;
        typeRef.current.innerHTML = html;

        if (charIndex + 1 < lines[lineIndex].length) {
          const delay = 40 + Math.round(Math.random() * 20); // 40-60ms
          const t = window.setTimeout(() => typeChar(lineIndex, charIndex + 1), delay);
          timers.push(t);
        } else {
          // end of line: pause then next line
          // If this is the second line, replace it with an emphasized violet version to preserve original styling
          if (typeRef.current) {
            if (lineIndex === 1) {
              const prev = lines.slice(0, lineIndex).map(escapeHtml).join('<br/>');
              typeRef.current.innerHTML = prev ? `${prev}<br/><em class=\"not-italic text-violet\">${escapeHtml(lines[lineIndex])}</em>` : `<em class=\"not-italic text-violet\">${escapeHtml(lines[lineIndex])}</em>`;
            }
          }
          const pause = 160;
          const t = window.setTimeout(() => typeChar(lineIndex + 1, 0), pause);
          timers.push(t);
        }
      };

      typeChar(0, 0);
    };

    const onIntersect: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
          // trigger once
          observer.disconnect();
          if (prefersReduced) {
            // render full text immediately
            if (typeRef.current) typeRef.current.innerHTML = lines.map(escapeHtml).join('<br/>');
            if (cursorRef.current) cursorRef.current.style.display = 'none';
            typedDone.current = true;
          } else {
            startTyping();
          }
        }
      });
    };

    const io = new IntersectionObserver(onIntersect, { threshold: [0, 0.2, 0.5] });
    io.observe(section);

    return () => {
      io.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [shouldReduce]);

  function escapeHtml(str: string) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      className="relative z-10 py-16 lg:py-24 paper-texture"
      style={{ backgroundColor: '#F8F8F5' }}
      initial={shouldReduce ? undefined : { opacity: 0, y: 24 }}
      whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="site-container relative">

        {/* Section header */}
        <div className="mb-14 flex flex-col gap-8 pt-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between lg:pt-12">
          <motion.div className="relative max-w-xl" initial={shouldReduce ? undefined : { opacity: 0, y: 10 }} whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
            <span className="section-label mb-4 block text-ink/40">
              <span className="mr-2 inline-block h-px w-6 align-middle bg-ink/30" />
              Our Story
            </span>
            <div className="relative">
              {/* static placeholder keeps layout to avoid CLS */}
              <h2 ref={headingRef} className="font-display font-bold text-ink text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] heading-static">
                A table where
                <br />
                <em className="not-italic accent-yellow">every creative</em>
                <br />
                has a seat.
              </h2>

              {/* overlay where typing happens; absolute to preserve layout */}
              <h2 className="font-display font-bold text-ink text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] typewriter-overlay" aria-hidden>
                <span ref={typeRef} className="typewriter-text" />
                <span ref={cursorRef} className="typewriter-cursor">|</span>
              </h2>
              {/* We'll use JS to populate .typewriter-text to avoid reflow */}
            </div>
          </motion.div>
          <motion.div className="max-w-sm lg:mb-2" initial={shouldReduce ? undefined : { opacity: 0, y: 18 }} whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}>
            <p ref={paraRef} className="font-body text-base leading-relaxed text-ink/60">
              Creatives Lunch started as a small gathering of curious people who wanted more than networking — they wanted genuine community. From that first lunch, we've grown into a home for over 1,200 creatives across 12 cities.
            </p>
            <a
              href="#membership"
              className="mt-6 inline-flex items-center gap-2 border-b border-ink pb-0.5 font-display text-sm font-semibold text-ink transition-all duration-200 hover:gap-4"
            >
              Our full story <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>

        {/* Split layout */}
        <div className="mb-16 grid gap-6 lg:mb-20 lg:grid-cols-5 lg:gap-8">
          {/* Image collage */}
          <motion.div className="relative h-[420px] lg:col-span-3 lg:h-[560px]" variants={staggerChildren(0.12)}>
            <motion.div className="absolute left-0 top-0 h-[75%] w-[65%] overflow-hidden rounded-[28px] border border-ink/10 bg-[#F8F8F5] shadow-[0_24px_60px_rgba(17,17,17,0.12)]" variants={{ hidden: { opacity: 0, scale: 0.98 }, show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 160, damping: 20 } } }}>
              <img
                ref={(el) => (imageRefs.current[0] = el)}
                src="https://images.pexels.com/photos/7149165/pexels-photo-7149165.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Creatives collaborating"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
            <motion.div className="absolute bottom-0 right-0 h-[60%] w-[50%] overflow-hidden rounded-[28px] border-4 border-[#FAF9F7] shadow-[0_24px_60px_rgba(17,17,17,0.12)]" variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}>
              <img
                ref={(el) => (imageRefs.current[1] = el)}
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=700"
                alt="Creative workshop"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
            <div className="absolute bottom-[18%] left-[30%] z-10 h-16 w-16 rounded-full bg-accent-cyan opacity-30" />
            <div className="absolute top-4 right-[32%] z-10 rounded-full bg-accent-lavender px-3 py-2 text-xs font-display font-semibold text-ink/80">
              Since 2019
            </div>
          </motion.div>

          {/* Feature cards */}
          <motion.div className="lg:col-span-2 flex flex-col gap-4 justify-center" variants={staggerChildren(0.08)}>
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                ref={(el) => (cardRefs.current[i] = el)}
                className="card-hover relative bg-white border border-ink/8 rounded-2xl p-6 flex items-start gap-4 cursor-default overflow-hidden"
                style={{ transformOrigin: 'center', transition: 'transform 300ms cubic-bezier(.2,.9,.2,1), box-shadow 300ms ease' }}
                variants={{ hidden: { opacity: 0, y: 18, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 220, damping: 20 } } }}
                whileHover={shouldReduce ? undefined : { y: -6, scale: 1.01 }}
              >
                {/* Thin accent line */}
                <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${f.accentColor}`} />
                
                <div className={`w-12 h-12 ${f.accentColor} rounded-xl flex items-center justify-center flex-shrink-0 text-xl font-bold text-ink`}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-display font-bold text-ink text-xl mb-1">{f.title}</h3>
                  <p className="font-body text-ink/55 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
