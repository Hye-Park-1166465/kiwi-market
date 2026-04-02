const CACHE_NAME = 'kiwi-market-v1';
const ASSETS = [
  './', './index.html', './manifest.json', './icon-192.png', './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.9/babel.min.js'
];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))))); self.clients.claim(); });
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(c => c || fetch(e.request).then(r => { if (r.ok && e.request.method === 'GET') { const cl = r.clone(); caches.open(CACHE_NAME).then(ca => ca.put(e.request, cl)); } return r; })).catch(() => caches.match('./index.html'))); });
