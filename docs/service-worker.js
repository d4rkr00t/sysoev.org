function promiseAny(e){return new Promise(function(t,n){(e=e.map(function(e){return Promise.resolve(e)})).forEach(function(e){return e.then(t)}),e.reduce(function(e,t){return e.catch(function(){return t})},Promise.reject()).catch(function(){return n(Error("All failed"))})})}function goToNetwork(e){return fetch(e)}var CACHE_NAME="sysoev-org-1503830425087",URLS_TO_CACHE=["/100-days-workout/assets/pull_ups.svg","/100-days-workout/assets/push_ups.svg","/100-days-workout/assets/squats.svg","/100-days-workout/bundle.js","/favicon.ico","/index.5b448b4a.js","/index.bf2c9360.css","/manifest.json","/talks/aik/assets/aik.svg","/talks/aik/assets/globe.svg","/talks/aik/bundle.js","/tree-builder/index.3c1f77c7.js","/tree-builder/index.e244e73b.css","/","/talks/aik/"].map(function(e){return e}),REL_URL_TO_ABS_MAP=URLS_TO_CACHE.map(function(e){return new URL(e,self.location).toString()});self.addEventListener("install",function(e){e.waitUntil(caches.open(CACHE_NAME).then(function(e){return e.addAll(URLS_TO_CACHE)}))}),self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(e){return Promise.all(e.filter(function(e){return e!==CACHE_NAME}).map(function(e){return console.log("Deleting "+e),caches.delete(e)}))}))}),self.addEventListener("fetch",function(e){"GET"===e.request.method&&-1!==REL_URL_TO_ABS_MAP.indexOf(e.request.url)&&e.respondWith(promiseAny([caches.match(e.request),goToNetwork(e.request)]))});