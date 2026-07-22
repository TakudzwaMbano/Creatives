import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCookie } from './CookieContext';

export default function CookiePreferences() {
  const { consent, setConsent, preferencesOpen, closePreferences } = useCookie();
  const [local, setLocal] = useState({ analytics: false, marketing: false, functional: false });

  useEffect(() => {
    if (consent) setLocal({ analytics: consent.analytics, marketing: consent.marketing, functional: consent.functional });
  }, [consent]);

  function save() {
    setConsent({ analytics: local.analytics, marketing: local.marketing, functional: local.functional });
    closePreferences();
  }

  function acceptAll() {
    setConsent({ analytics: true, marketing: true, functional: true });
    closePreferences();
  }

  function rejectOptional() {
    setConsent({ analytics: false, marketing: false, functional: false });
    closePreferences();
  }

  return (
    <AnimatePresence>
      {preferencesOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-60 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={closePreferences} />
          <motion.div initial={{ y: -20 }} animate={{ y: 0 }} exit={{ y: -20 }} transition={{ duration: 0.24 }} className="z-10 w-full max-w-2xl bg-cream/6 border border-cream/10 rounded-2xl shadow-xl p-6">
            <h3 className="font-display font-bold text-cream text-xl mb-2">Cookie Preferences</h3>
            <p className="text-cream/60 text-sm mb-4">Adjust your cookie preferences. Necessary cookies are always active.</p>

            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-body font-bold text-cream">Necessary Cookies</p>
                  <p className="text-cream/60 text-xs">Required for site functionality.</p>
                </div>
                <div className="text-cream/60">Enabled</div>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <p className="font-body font-bold text-cream">Analytics Cookies</p>
                  <p className="text-cream/60 text-xs">Helps us improve the site.</p>
                </div>
                <label className="inline-flex items-center">
                  <input type="checkbox" checked={local.analytics} onChange={(e) => setLocal((s) => ({ ...s, analytics: e.target.checked }))} />
                </label>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <p className="font-body font-bold text-cream">Marketing Cookies</p>
                  <p className="text-cream/60 text-xs">Used for advertising and targeting.</p>
                </div>
                <label className="inline-flex items-center">
                  <input type="checkbox" checked={local.marketing} onChange={(e) => setLocal((s) => ({ ...s, marketing: e.target.checked }))} />
                </label>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <p className="font-body font-bold text-cream">Functional Cookies</p>
                  <p className="text-cream/60 text-xs">Enhance user experience.</p>
                </div>
                <label className="inline-flex items-center">
                  <input type="checkbox" checked={local.functional} onChange={(e) => setLocal((s) => ({ ...s, functional: e.target.checked }))} />
                </label>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={rejectOptional} className="px-4 py-2 rounded-full bg-transparent border border-cream/20 text-cream text-sm">Reject Optional</button>
              <button onClick={save} className="px-4 py-2 rounded-full bg-accent-yellow text-charcoal text-sm font-bold">Save Preferences</button>
              <button onClick={acceptAll} className="px-4 py-2 rounded-full bg-accent-yellow/90 text-charcoal text-sm">Accept All</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
