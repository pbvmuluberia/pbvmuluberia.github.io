const CACHE_NAME = 'pbvm-ulb-v6';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    // CSS
    './src/components/css/style.css',
    './src/components/css/navbar.css',
    './src/components/css/noticeModal.css',
    './src/components/css/donationModal.css',
    './src/components/css/accordian.css',
    './src/components/css/ceremony.css',
    './src/components/css/events.css',
    './src/components/css/publication.css',
    './src/components/css/results.css',

    // JS
    './src/components/script/components.js',
    './src/components/script/install.js',
    './src/components/script/events.js',
    './src/components/script/publications.js',
    './src/components/script/data.js',
    './src/components/script/utils.js',
    './src/components/script/modal.js',
    './src/components/script/init.js',
    // External (Optional: You might want to download these for true offline capability)
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'
];

// Install Event: Cache files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Caching all: app shell and content');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Fetch Event: Serve from Cache, then Network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cache hit or fetch from network
                return response || fetch(event.request);
            })
    );
});

// Activate Event: Cleanup old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('[Service Worker] Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});