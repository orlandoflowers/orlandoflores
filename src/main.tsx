import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './i18n'

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    clarity: any;
  }
}

if (import.meta.env.DEV) {
  console.log(`
  -------------------------------------------------------------------------
    ¿So you are a dev. Quieres unir fuerzas conmigo? 👋 
  
     ______     ______     __         ______     __   __     _____     ______    
    /\\  __ \\   /\\  == \\   /\\ \\       /\\  __ \\   /\\ "-.\\ \\   /\\  __-.  /\\  __ \\   
    \\ \\ \\/\\ \\  \\ \\  __<   \\ \\ \\____  \\ \\  __ \\  \\ \\ \\-.  \\  \\ \\ \\/\\ \\ \\ \\ \\/\\ \\  
     \\ \\_____\\  \\ \\_\\ \\_\\  \\ \\_____\\  \\ \\_\\ \\_\\  \\ \\_\\"\\_\\  \\ \\____-  \\ \\_____\\ 
      \\/_____/   \\/_/ /_/   \\/_____/   \\/_/\\/_/   \\/_/ \\/_/   \\/____/   \\/_____/ 
  
     Contáctame en: of@orlandoflores.com
     Puedo diseñar y programar, si lo necesitas.
  -------------------------------------------------------------------------
  `);
}

const sendToAnalytics = (metric: any) => {
  const { name, delta, id } = metric;
  window.gtag?.('event', name, {
    event_category: 'Web Vitals',
    event_label: id,
    value: Math.round(name === 'CLS' ? delta * 1000 : delta),
    non_interaction: true,
  });
};

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('¡Service Worker registrado y listo para servir! Ámbito:', registration.scope);
      })
      .catch(err => {
        console.error('El Service Worker se fue de vacaciones (falló el registro):', err);
      });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if (typeof window !== 'undefined') {
  
  import('web-vitals').then((webVitals) => {
    webVitals.onCLS(sendToAnalytics);
    webVitals.onFID(sendToAnalytics);
    webVitals.onFCP(sendToAnalytics);
    webVitals.onLCP(sendToAnalytics);
    webVitals.onTTFB(sendToAnalytics);
  });
}
