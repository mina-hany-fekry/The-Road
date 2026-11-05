// Service Worker for DataMaster & Spiritual Life PWA
// Automatic Cache-Buster & Offline Engine
const BUILD_TIME = '20261105214055';
const CACHE_NAME = `datamaster-spirit-${BUILD_TIME}`;

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
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
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  console.log('[SW] Installing new build:', BUILD_TIME);
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Pre-caching all assets for offline use');
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.warn('[SW] Pre-caching warning:', err);
      });
    })
  );
  // Force active immediately without waiting for old SW to finish
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activating new build:', BUILD_TIME);
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
  // Claim all clients immediately
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Navigation requests: Network-first with cache fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match('./index.html') || caches.match('./'))
    );
    return;
  }

  // Non-navigation: Cache-first with network background revalidation
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch fresh copy in background
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
