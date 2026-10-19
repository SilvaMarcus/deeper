const CACHE = 'deeper-v74';
const OFFLINE_PAGE = './index.html?v=74';
const ASSETS = [OFFLINE_PAGE,'./styles.css?v=74','./assets/auth.js?v=72','./app.js?v=72','./data/bible-stories.json?v=1','./data/chronological-plan.json?v=1','./data/bibles/catalog.json?v=2','./manifest.webmanifest?v=2','./assets/logo-mark.svg','./assets/logo-mark-icon.svg','./assets/logo-mark-180.png?v=1','./assets/logo-mark-192.png','./assets/logo-mark-512.png','./assets/deeper-favicon.svg?v=1','./assets/articles/angeologia.png','./assets/articles/cosmovisao-crista.png','./assets/articles/defender-a-fe.png','./assets/articles/fio-vermelho.png','./assets/articles/imagem-de-deus.png','./assets/articles/reino-ja-ainda-nao.png'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/bible/')) {
    event.respondWith(fetch(event.request, {cache:'no-store'}));
    return;
  }
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => caches.match(OFFLINE_PAGE)));
    return;
  }
  event.respondWith(caches.match(event.request).then(hit => hit || fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match('./index.html'))));
});
