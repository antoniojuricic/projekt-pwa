let coreAssets = [
  "/",
  "manifest.json",
  "index.html",
  "recorder.html",
  "404.html",
  "offline.html",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css",
];

const cacheName = "cache-1";

self.addEventListener("install", (event) => {
  event.waitUntil(
      caches.open(cacheName).then((cache) => {
          return cache.addAll(coreAssets);
      })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
      caches
          .match(event.request)
          .then((response) => {
              return fetch(event.request).then((response) => {
                  if (response.status === 404) {
                      return caches.match("404.html");
                  }
                  return caches.open(staticCacheName).then((cache) => {
                      cache.put(event.request.url, response.clone());
                      return response;
                  });
              });
          })
          .catch((error) => {
              return caches.match("offline.html");
          })
  );
});