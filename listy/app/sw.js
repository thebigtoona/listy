// name of static cache 
var cacheName = 'listy-v16';

// install sw and add initial items to cache 
self.addEventListener('install', function(e) {
    // initial cache items
    var urls = 
    [
        '/listy/listy/app/',
        '/listy/listy/app/resources/images/sunflower.jpg',
        '/listy/listy/app/resources/styles.css',
        '/listy/listy/app/resources/app.js'
    ];
    // pass in a promise 
    e.waitUntil(
       caches.open(cacheName).then(cache => {
           cache.addAll(urls);
       })
    );
});

// remove old caches 
self.addEventListener('activate', function(e) {
    e.waitUntil(
        caches.keys()
            .then(function(cacheNames) {
                Promise.all(
                cacheNames.filter(function(cName) {
                    return cName != cacheName;
                }).map(function(cName)
                {
                    return caches.delete(cName) && console.log(cName);
                })
                );
            })
            
    );
});

// fetching items from the cache here 
self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.open(cacheName).then(function (cache) {
            return cache.match(e.request).then(function (response) {

                return response || fetch(e.request).then(function (response) {
                    cache.put(e.request, response.clone());
                    return response;
                }).catch(err => console.log(err));

            });
        })
    );
});