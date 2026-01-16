// Meta Pixel tracking utilities

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

/**
 * Track a standard Meta Pixel event
 * @param eventName - Standard event name (e.g., 'PageView', 'InitiateCheckout', 'Purchase')
 * @param params - Optional event parameters
 */
export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
};

/**
 * Track a custom Meta Pixel event
 * @param eventName - Custom event name
 * @param params - Optional event parameters
 */
export const trackCustomEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, params);
  }
};

// Scroll milestones already fired (prevents duplicates)
const scrollMilestonesFired = new Set<number>();

/**
 * Track scroll depth milestone
 * @param percentage - Scroll percentage milestone (25, 50, 75, 100)
 */
export const trackScrollDepth = (percentage: number) => {
  if (!scrollMilestonesFired.has(percentage)) {
    scrollMilestonesFired.add(percentage);
    trackCustomEvent('ScrollDepth', { percentage });
  }
};

/**
 * Reset scroll milestones (useful for SPA navigation)
 */
export const resetScrollMilestones = () => {
  scrollMilestonesFired.clear();
};
