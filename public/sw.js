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

self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    //console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) { return r; }
    const response = await fetch(e.request);
    //const cache = await caches.open(cacheName);
    //console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    //cache.put(e.request, response.clone());
    return response;
  })());
});

self.addEventListener('sync', function(event) {
	console.log("sync event", event);
    if (event.tag === 'sendNotif') {
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
                console.log("ok");
            });
        } else {
            console.log(res);
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}