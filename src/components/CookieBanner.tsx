import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCookie } from './CookieContext';

export default function CookieBanner() {
  const { consent, setConsent, openPreferences } = useCookie();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!consent) setVisible(true);
  }, [consent]);

  function acceptAll() {
    setConsent({ analytics: true, marketing: true, functional: true });
    setVisible(false);
  }

  function rejectNonEssential() {
    setConsent({ analytics: false, marketing: false, functional: false });
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-label="Cookie consent"
          className="fixed left-0 right-0 bottom-6 z-50 flex items-center justify-center px-4"
        >
          <div className="max-w-3xl w-full bg-cream/6 backdrop-blur-md border border-cream/10 rounded-2xl shadow-xl p-4 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1">
              <h4 className="font-display font-bold text-cream">We use cookies</h4>
              <p className="text-cream/60 text-sm">We use necessary cookies and optional analytics and marketing cookies. You can accept all, reject optional cookies, or manage preferences.</p>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={rejectNonEssential} className="px-4 py-2 rounded-full bg-transparent border border-cream/20 text-cream text-sm">Reject Non-Essential</button>
              <button onClick={() => openPreferences()} className="px-4 py-2 rounded-full bg-cream/10 text-cream text-sm">Cookie Preferences</button>
              <button onClick={acceptAll} className="px-4 py-2 rounded-full bg-accent-yellow text-charcoal text-sm font-bold">Accept All</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
