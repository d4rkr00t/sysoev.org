var CACHE_NAME = 'sysoev-org-{{VERSION}}';
var URLS_TO_CACHE = [{{URLS_TO_CACHE}}].map(function(url) { return url; });
var REL_URL_TO_ABS_MAP = URLS_TO_CACHE.map(function(url) { return new URL(url, self.location).toString(); });

function promiseAny(promises) {
    return new Promise(function(resolve, reject) {
            promises = promises.map(function(p) { return Promise.resolve(p); });
            promises.forEach(function(p) { return p.then(resolve); });
            promises
                .reduce(function (a, b) { return a.catch(function() { return b; }); }, Promise.reject())
                .catch(function() { return reject(Error('All failed')); });
    });
}

function goToNetwork(request) {
    return fetch(request);
}

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(URLS_TO_CACHE);
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames
                    .filter(function(cacheName) { return cacheName !== CACHE_NAME; })
                    .map(function(cacheName) {
                        console.log('Deleting '+ cacheName);
                        return caches.delete(cacheName);
                    })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    if (event.request.method === 'GET' && REL_URL_TO_ABS_MAP.indexOf(event.request.url) !== -1) {
        event.respondWith(
            promiseAny([
                caches.match(event.request),
                goToNetwork(event.request)
            ])
        );
    }
});
