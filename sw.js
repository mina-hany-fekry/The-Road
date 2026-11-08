// Service Worker for DataMaster & Spiritual Life PWA
// 100% Offline-First Engine & Automatic Cache Invalidation
const BUILD_TIME = '20261108104317';
const CACHE_NAME = `datamaster-spirit-${BUILD_TIME}`;

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './tailwind.min.js',
  './translations.js',
  './agpeya_full.js',
  './book_prayer_full.js',
  './bustan_full.js',
  './bible_books.js',
  './bible_full.js',
  './bible_nt.js',
  './bible_ot.js',
  './curriculum.js',
  './app.js',
  './favicon.png',
  './icons/emblem.png',
  './icons/logo_full.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './images/the_road_hero.jpg',
  './images/coptic_cross.jpg',
  './images/cross_watermark.png',
  './images/christ_touch.jpg',
  './images/christ_stream.jpg'
];

self.addEventListener('install', (event) => {
  console.log('[SW] Installing offline build:', BUILD_TIME);
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Pre-caching 100% of app assets for offline use');
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.warn('[SW] Pre-caching warning:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activating offline build:', BUILD_TIME);
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME) {
            console.log('[SW] Purging old cache version:', k);
            return caches.delete(k);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Navigation requests: Instant offline launch from cache with background revalidation
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html').then((cached) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
            }
            return networkResponse;
          })
          .catch(() => cached);

        return cached || fetchPromise;
      })
    );
    return;
  }

  // Assets & scripts: Cache-first with background refresh
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
      if (cachedResponse) {
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
            }
          })
          .catch(() => {});
        return cachedResponse;
      }
      return fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkResponse;
        });
    })
  );
});
