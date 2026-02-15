const CACHE_NAME = 'first-sounds-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/data/words.json',
  '/images/mascot.png',
  '/images/placeholder.png'
];

// Install: cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first for assets, network-first for pages
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Cache-first for images, audio, and static assets
  if (url.pathname.match(/\.(png|webp|mp3|jpg|jpeg|svg|css|js|json)$/)) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        });
      })
    );
  } else {
    // Network-first for HTML
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  }
});
