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
        if (response) return response;
        return fetch(event.request).then((response) => {
          if (response.status === 404) {
            return caches.match("404.html");
          }
          return caches.open(cacheName).then((cache) => {
            cache.put(event.request.url, response.clone());
            return response;
          });
        });
      })
      .catch((e) => {
        return caches.match("offline.html");
      })
  );
});

self.addEventListener("sync", function (event) {
  if (event.tag === "sendNotif") {
    event.waitUntil(sendNotif());
  }
});

function sendNotif() {
  fetch("/sendNotif", {
    method: "GET",
  })
    .then(function (res) {
      if (res.ok) {
        res.json().then(function (data) {
          self.registration.showNotification(
            "Obavijest o upotrebi poslana u pozadini"
          );
        });
      } else {
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}