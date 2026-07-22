export type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  consentVersion: number;
  timestamp: string;
};

const CONSENT_KEY = 'cookieConsent';
export const CONSENT_VERSION = 1;

function nowISO() {
  return new Date().toISOString();
}

export function getStoredConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    return parsed;
  } catch (e) {
    return null;
  }
}

export function saveConsent(consent: Omit<Consent, 'timestamp' | 'consentVersion'>) {
  const full: Consent = {
    ...consent,
    consentVersion: CONSENT_VERSION,
    timestamp: nowISO(),
    necessary: true,
  } as Consent;
  localStorage.setItem(CONSENT_KEY, JSON.stringify(full));
  return full;
}

export function clearConsent() {
  localStorage.removeItem(CONSENT_KEY);
}

// Simple utility to inject external scripts lazily and avoid duplicates
export function loadScriptOnce(src: string, id?: string, opts?: { async?: boolean; defer?: boolean }) {
  if (id && document.getElementById(id)) return;
  const existing = Array.from(document.getElementsByTagName('script')).find((s) => s.getAttribute('src') === src);
  if (existing) return;
  const script = document.createElement('script');
  if (id) script.id = id;
  script.src = src;
  script.async = !!opts?.async;
  if (opts?.defer) script.defer = true;
  document.head.appendChild(script);
}

// Example loaders for common analytics providers. They intentionally do not run
// unless called after user consent. Consumers should call these when consent
// has been granted.
export function loadGoogleAnalytics(measurementId: string) {
  if (!measurementId) return;
  // gtag loader
  if ((window as any).gtagLoaded) return;
  (window as any).gtagLoaded = true;
  const scriptUrl = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  loadScriptOnce(scriptUrl, 'gtag-js');
  const inline = document.createElement('script');
  inline.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${measurementId}');`;
  document.head.appendChild(inline);
}

export function loadGoogleTagManager(gtmId: string) {
  if (!gtmId) return;
  if ((window as any).gtmLoaded) return;
  (window as any).gtmLoaded = true;
  const inline = document.createElement('script');
  inline.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`;
  document.head.appendChild(inline);
}

export function loadFacebookPixel(pixelId: string) {
  if (!pixelId) return;
  if ((window as any).fbqLoaded) return;
  (window as any).fbqLoaded = true;
  const inline = document.createElement('script');
  inline.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js'); fbq('init', '${pixelId}'); fbq('track', 'PageView');`;
  document.head.appendChild(inline);
}

export function loadMicrosoftClarity(clarityId: string) {
  if (!clarityId) return;
  if ((window as any).clarityLoaded) return;
  (window as any).clarityLoaded = true;
  const inline = document.createElement('script');
  inline.innerHTML = ` (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, 'clarity', 'script', '${clarityId}');`;
  document.head.appendChild(inline);
}

export default {
  getStoredConsent,
  saveConsent,
  clearConsent,
  loadScriptOnce,
  loadGoogleAnalytics,
  loadGoogleTagManager,
  loadFacebookPixel,
  loadMicrosoftClarity,
};
