// Service Worker for DataMaster & Spiritual Life PWA (3D Glass & Tabbed Edition v13)
const CACHE_NAME = 'datamaster-spirit-v15-clean-texts';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './translations.js?v=15',
  './agpeya_full.js?v=15',
  './book_prayer_full.js?v=15',
  './bustan_full.js?v=15',
  './bible_books.js?v=15',
  './bible_full.js?v=15',
  './bible_nt.js?v=15',
  './bible_ot.js?v=15',
  './curriculum.js?v=15',
  './app.js?v=15',
  './favicon.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  console.log('[SW] Installing v15-clean-texts...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Pre-caching complete offline library');
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.warn('[SW] Caching warning:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activating v15-clean-texts, wiping all old caches...');
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', k);
            return caches.delete(k);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Network-First for JS/JSON (always load fresh data if connected, fallback to cache offline)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  const url = event.request.url;
  const isScriptOrData = url.includes('.js') || url.includes('.json') || url.includes('.html');

  if (isScriptOrData) {
    event.respondWith(
      fetch(event.request)
        .then((netResponse) => {
          if (netResponse && netResponse.status === 200) {
            const clone = netResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return netResponse;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    // Cache-First for static images/icons
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return cached || fetch(event.request).then((netResponse) => {
          if (netResponse && netResponse.status === 200) {
            const clone = netResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return netResponse;
        });
      })
    );
  }
});

self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
  if (event.data === 'clearCache') {
    caches.delete(CACHE_NAME).then(() => {
      console.log('[SW] Cache explicitly wiped by user request');
    });
  }
});
