import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './i18n' // ¡Polyglot alert! Sí, hablamos varios idiomas, somos muy cultos 🧐

// ¡Atención! Declarando al temible gtag para que TypeScript no se vuelva loco
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    clarity: any;
  }
}

// ¡Arte ASCII attack! - Solo en modo developer (porque en producción somos serios... a veces)
if (import.meta.env.DEV) {
  console.log(`
  -------------------------------------------------------------------------
    ¿Quieres unir fuerzas conmigo? 👋 
  
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

// Espía de métricas - Porque Google quiere saberlo TODO de tu web (muajaja)
const sendToAnalytics = (metric: any) => {
  const { name, delta, id } = metric;
  // Suponiendo que Google Analytics ya está cargado (¿o está espiando desde el principio? 🕵️‍♂️)
  window.gtag?.('event', name, {
    event_category: 'Web Vitals',
    event_label: id,
    value: Math.round(name === 'CLS' ? delta * 1000 : delta),
    non_interaction: true, // "No, usuario, no hiciste nada, fuimos nosotros espiando... digo, midiendo"
  });
};

// ¡El Service Worker al rescate! Como un superhéroe digital pero sin capa
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

// Renderizamos la app como si fuera un cuadro de Picasso, pero de choro
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Reportando web vitals - Porque si no le contamos a Google, se pone triste
if (typeof window !== 'undefined') {
  // Solo cargamos web-vitals en el navegador (no somos tan locos como para hacerlo en la nevera)
  import('web-vitals').then((webVitals) => {
    // Usamos destructuring cuando el módulo está cargado (es como abrir un regalo pero con código)
    webVitals.onCLS(sendToAnalytics); // "¡Uy, se movió algo!"
    webVitals.onFID(sendToAnalytics); // "¿Me hiciste clic? Dame un segundo... o dos"
    webVitals.onFCP(sendToAnalytics); // "¡Mira mamá, pinté algo en la pantalla!"
    webVitals.onLCP(sendToAnalytics); // "La estrella del show finalmente llegó"
    webVitals.onTTFB(sendToAnalytics); // "¿Hola? ¿Servidor? ¿Me escuchas?"
  });
}
