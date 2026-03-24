// Unified tracking: Meta Pixel + GA4 + Clarity

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    gtag: (...args: unknown[]) => void;
    clarity: (...args: unknown[]) => void;
  }
}

// ─── Meta Pixel ─────────────────────────────────────────────────────────────

export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
};

export const trackCustomEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, params);
  }
};

// ─── GA4 ────────────────────────────────────────────────────────────────────

export const trackGA4 = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

// ─── Clarity ────────────────────────────────────────────────────────────────

export const clarityTag = (tag: string) => {
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('set', 'funnel_step', tag);
  }
};

// ─── Unified tracking (fires all 3) ────────────────────────────────────────

export const trackFunnelStep = (
  step: string,
  params?: Record<string, unknown>
) => {
  // Meta Pixel custom event
  trackCustomEvent(step, params);
  // GA4 event
  trackGA4(step, params);
  // Clarity tag
  clarityTag(step);
};

// ─── Scroll tracking ───────────────────────────────────────────────────────

const scrollMilestonesFired = new Set<number>();

export const trackScrollDepth = (percentage: number) => {
  if (!scrollMilestonesFired.has(percentage)) {
    scrollMilestonesFired.add(percentage);
    trackFunnelStep('ScrollDepth', { percentage });
  }
};

export const resetScrollMilestones = () => {
  scrollMilestonesFired.clear();
};
