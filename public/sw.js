let coreAssets = [
  "/",
  "manifest.json",
  "index.html",
  "recorder.html",
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

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      return response;
    })()
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
          self.registration.showNotification("Obavijest o upotrebi poslana u pozadini");
        });
      } else {
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
