const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    'styles.css',
    'smashScript.js'

];

// Call Install event
self.addEventListener('install', e => {

    console.log('Service worker installed');
    e.waitUntil(
        caches.open(cacheName).then(cache => {
         cache.addAll(cacheAssets);
              
        })
        .then(() => self.skipWaiting())
      );
});


// Call Activate Event
self.addEventListener('activate', e => {

    console.log('Service worker Activated');

    e.waitUntil(caches.keys().then(cacheNames => {
        return Promise.all(
            cacheNames.map(cache => {
                if (cache !== cacheName){
                    console.log('service worker clearing old cache');
                    return caches.delete(cache);
                }
            })
        )
       
    }));
});

// Call fetch event
self.addEventListener('fetch', e => {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
      
    });