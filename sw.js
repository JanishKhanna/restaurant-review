let staticCache = 'cache-1';

self.addEventListener('install', function(event) {
    console.log('installing and caching');
    event.waitUntil(
        caches.open(staticCache).then(function(cache) {
            return cache.addAll(
                [
                    './',
                    './index.html',
                    './restaurant.html',
                    './css/styles.css',
                    './data/restaurants.json',
                    './img/1.jpg',
                    './img/2.jpg',
                    './img/3.jpg',
                    './img/4.jpg',
                    './img/5.jpg',
                    './img/6.jpg',
                    './img/7.jpg',
                    './img/8.jpg',
                    './img/9.jpg',
                    './img/10.jpg',
                    './js/main.js',
                    './js/dbhelper.js',
                    './js/restaurant_info.js',
                    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
                    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
                    'https://unpkg.com/leaflet@1.3.1/dist/images/marker-shadow.png',
                    'https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon.png',
                    'https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon-2x.png',
                    './restaurant.html?id=1',
                    './restaurant.html?id=2',
                    './restaurant.html?id=3',
                    './restaurant.html?id=4',
                    './restaurant.html?id=5',
                    './restaurant.html?id=6',
                    './restaurant.html?id=7',
                    './restaurant.html?id=8',
                    './restaurant.html?id=9',
                    './restaurant.html?id=10'   
                ]
            )
        })
    )
});

self.addEventListener('fetch', function(event) {
    console.log('Fetching');
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', function(event) {
    console.log('Activating my Service Worker');
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('cache') && cacheName !== staticCache;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            )
        })
    );
});