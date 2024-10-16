const CACHE_NAME = "my-cache";
self.addEventListener("install", (e) => {
    console.log("installing service worker!!");
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache
            .addAll([
              "./",
              "./index.html",
              "./index.css",
              "./script.js",
              "./static/js/bundle.js"
          ])
          
                .then(() => self.skipWaiting());
        })
    );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME]; // Only keep the current cache
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Delete old caches
          }
        })
      )
    )
  );
  return self.clients.claim();
});


self.addEventListener("fetch", function (event) {
    // console.log(`fetching ${event.request.url}`);
    if (navigator.onLine) {
        var fetchRequest = event.request.clone();
        return fetch(fetchRequest).then(function (response) {
            // if(!response.ok) {
            if (
                !response ||
                response.status !== 200 ||
                response.type !== "basic"
            ) {
                console.log("response is not ok");
                return response;
            }
            var responseToCache = response.clone();
            caches.open(CACHE_NAME).then(function (cache) {
                cache.put(event.request, responseToCache);
            });
            return response;
        });
    } else {
      event.respondWith(
        caches.match(event.request).then(function (response) {
          return response || fetch(event.request).catch(() => {
            return caches.match("/offline.html"); // Fallback if offline
          });
        })
      );
      
    }
});
