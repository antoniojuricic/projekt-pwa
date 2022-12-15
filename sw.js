let coreAssets = [
    '/recorder.js',
    'assets/img/logo-192.png',
    'assets/img/logo-512.png'
  ];
  
  self.addEventListener('install', function (event) {
  
    // Cache core assets
    event.waitUntil(caches.open('app').then(function (cache) {
      for (let asset of coreAssets) {
        cache.add(new Request(asset));
      }
      return cache;
    }));
  
  });

self.addEventListener('activate', event => {
    console.log('Activated, V1 now ready to handle fetches!');
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    if (url.origin == location.origin && url.pathname == '/dog.svg') {
        event.respondWith(caches.match('/cat.svg'));
    }
});