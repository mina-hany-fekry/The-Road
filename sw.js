// Service Worker for The Road PWA
// 100% Offline-First Engine with Smart Network-First Navigation & Instant Auto-Invalidation
const BUILD_TIME = '20261112210000';
const CACHE_NAME = `the-road-v${BUILD_TIME}`;

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
  './images/christ_stream.jpg',
  './images/icons/spiritual_section.jpg',
  './images/icons/spiritual_section_thumb.jpg',
  './images/icons/study_section.jpg',
  './images/icons/study_section_thumb.jpg',
  './images/icons/agpeya.jpg',
  './images/icons/agpeya_thumb.jpg',
  './images/icons/bible.jpg',
  './images/icons/bible_thumb.jpg',
  './images/icons/life_of_prayer.jpg',
  './images/icons/life_of_prayer_thumb.jpg',
  './images/icons/bustan_monks.jpg',
  './images/icons/bustan_monks_thumb.jpg',
  './images/icons/today_plan.jpg',
  './images/icons/today_plan_thumb.jpg',
  './images/icons/full_roadmap.jpg',
  './images/icons/full_roadmap_thumb.jpg',
  './images/icons/reschedule.jpg',
  './images/icons/reschedule_thumb.jpg',
  './images/icons/focus_timer.jpg',
  './images/icons/focus_timer_thumb.jpg'
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
    }).then(() => {
      return self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ type: 'SW_UPDATED', version: BUILD_TIME });
        });
      });
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Navigation requests: Network-First when online, fallback to Cache for 100% offline support
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match('./index.html').then((cached) => {
            return cached || caches.match('./');
          });
        })
    );
    return;
  }

  // Assets & scripts: Cache-First with background revalidation
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
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
