const CACHE_NAME = 'disclosure-db-v1';
const urlsToCache = [
  '/disclosureparty/',
  '/disclosureparty/viewer.html',
  '/disclosureparty/timeline.html',
  '/disclosureparty/chronology-viewer.html',
  '/disclosureparty/contact-viewer.html',
  '/disclosureparty/index.html',
  '/disclosureparty/dist/chronology.md',
  'https://d3js.org/d3.v7.min.js',
  'https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
