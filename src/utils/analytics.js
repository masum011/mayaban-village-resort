import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

/**
 * Loads Google Analytics 4 lazily after idle/interaction so it never blocks LCP/INP,
 * and forwards Core Web Vitals metrics to GA4 when VITE_GA_MEASUREMENT_ID is set.
 */
export function initAnalyticsAndVitals() {
  if (typeof window === 'undefined') return;

  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  const sendToAnalytics = (metric) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      });
    }
  };

  const loadGA4 = () => {
    if (!measurementId || window.__gaLoaded) return;
    window.__gaLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      anonymize_ip: true,
      send_page_view: true,
    });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  };

  const scheduleLoad = () => {
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onFCP(sendToAnalytics);
    onTTFB(sendToAnalytics);

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadGA4, { timeout: 3500 });
    } else {
      setTimeout(loadGA4, 2200);
    }
  };

  if (document.readyState === 'complete') {
    scheduleLoad();
  } else {
    window.addEventListener('load', scheduleLoad, { once: true });
  }
}
