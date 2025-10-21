// A simple service worker for caching the app shell for offline use.

const CACHE_NAME = 'epcr-narrative-cache-v1';
// This list should include all the essential files for your app to work offline.
const urlsToCache = [
  '/',
  'index.html'
];

// Install event: Fires when the service worker is first installed.
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Add all the essential files to the cache.
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: Fires every time the app requests a resource (like a page, script, or image).
self.addEventListener('fetch', event => {
  event.respondWith(
    // Check if the request is in the cache.
    caches.match(event.request)
      .then(response => {
        // If the request is in the cache, return the cached response.
        if (response) {
          return response;
        }
        // If the request is not in the cache, fetch it from the network.
        return fetch(event.request);
      }
    )
  );
});

