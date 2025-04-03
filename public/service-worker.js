// Service Worker para Orlando Flores Portfolio
const CACHE_NAME = 'portfolio-cache-v1';

// Recursos para cachear al instalar el Service Worker
const CACHE_ASSETS = [
  '/',
  '/index.html',
  '/profile.png',
  '/portfolio.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/apple-touch-icon.png',
  '/favicon-16x16.png',
  '/favicon-32x32.png'
];

// Instalar el Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching assets...');
        return cache.addAll(CACHE_ASSETS);
      })
  );
});

// Activar el Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// ¡Estrategia de caché! Como guardarse unas chelas pal 18 de septiembre 🍻
self.addEventListener('fetch', (event) => {
  // ¡Para la micro! No cacheamos API ni weas raras... son como el mote con huesillo, mejor fresquitos 🍑
  if (
    event.request.method !== 'GET' ||
    event.request.url.includes('/api/') ||
    event.request.url.includes('/dashboard/') ||
    event.request.mode === 'cors'
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Actualiza la caché mientras devuelves lo antiguo
      // (como cuando vai a buscar una nueva caja de pisco mientras seguí tomando) 🥃
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        // ¡La raja! Guardamos en caché solo si no es CORS 
        // (porque esos son más cuáticos que los tacos de la Alameda) 🚗
        if (
          networkResponse && 
          networkResponse.status === 200 && 
          networkResponse.type !== 'cors'
        ) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // ¡Quedó la cagá! La red falló... probamos con nuestra página de emergencia
        // (como cuando llevai paraguas porque sabí que en Santiago siempre llueve cuando andai sin techo) ☔
        return caches.match('/offline.html');
      });

      // Devolvemos lo que teníamos guardado mientras actualizamos por debajo
      // (como usar la polera de la U mientras comprai la nueva camiseta) 👕
      return cachedResponse || fetchPromise;
    })
  );
}); 