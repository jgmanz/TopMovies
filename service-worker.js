
const PRECACHE = 'precache-v2';
const RUNTIME = 'runtime';
const resources = [
    './index.html',
    './js/app.js',
    './js/materialize.min.js',
    './css/style.css',
    './css/materialize.min.css'
]


self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(PRECACHE)
            .then(cache => cache.addAll(resources))
            .then(self.skipWaiting())
    );
});


self.addEventListener('activate', event => {
    const currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
        })
            .then(cachesToDelete => {
                return Promise.all(
                    cachesToDelete.map(cacheToDelete => {
                        return caches.delete(cacheToDelete);
                    }));
            })
            .then(() => self.clients.claim())
    );
});
self.addEventListener('fetch', event => {
    console.log('fetch service worker starts');
    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(

            caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    console.log('response with cache ', {cachedResponse});
                    return cachedResponse;
                }
                return caches.open(RUNTIME).then(cache => {
                    console.log('Fetch api request ', {r : event.request, cache});
                    return fetch(event.request).then(response => {
                        console.log('put Fetch api request to cache ', {cache});
                        return cache.put(event.request, response.clone()).then(() => {
                            return response;
                        });
                    });
                });
            })
        );
    }
});