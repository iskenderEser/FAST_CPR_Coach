// FAST CPR KOÇU - Service Worker
const CACHE_NAME = 'fast-cpr-v1';
const urlsToCache = [
  './FAST_CPR_KOCU_FINAL.html',
  './manifest.json'
];

// Install event - cache dosyaları
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('✅ Cache açıldı');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - cache'den serve et
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache'de varsa döndür, yoksa network'ten al
        return response || fetch(event.request);
      })
  );
});

// Activate event - eski cache'leri temizle
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Eski cache siliniyor:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
