import React, { createContext, useContext, useEffect, useState } from 'react';
import cookieLib, { Consent } from '../lib/cookieConsent';

type CookieContextValue = {
  consent: Consent | null;
  setConsent: (c: Partial<Omit<Consent, 'consentVersion' | 'timestamp'>> & { necessary?: true }) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  preferencesOpen: boolean;
};

const CookieContext = createContext<CookieContextValue | undefined>(undefined);

export function useCookie() {
  const ctx = useContext(CookieContext);
  if (!ctx) throw new Error('useCookie must be used within CookieProvider');
  return ctx;
}

export function CookieProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsentState] = useState<Consent | null>(() => cookieLib.getStoredConsent());
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    // If consent exists and analytics accepted, load analytics lazily here (example)
    if (consent?.analytics) {
      // Example: cookieLib.loadGoogleAnalytics('G-XXXX');
    }
  }, [consent]);

  function setConsent(c: Partial<Omit<Consent, 'consentVersion' | 'timestamp'>>) {
    const toSave = {
      necessary: true,
      analytics: !!c.analytics,
      marketing: !!c.marketing,
      functional: !!c.functional,
    } as any;
    const saved = cookieLib.saveConsent(toSave);
    setConsentState(saved);
  }

  return (
    <CookieContext.Provider
      value={{ consent, setConsent, openPreferences: () => setPreferencesOpen(true), closePreferences: () => setPreferencesOpen(false), preferencesOpen }}>
      {children}
    </CookieContext.Provider>
  );
}

export default CookieContext;
