self.addEventListener('install', (event) => {
  console.log('Установлен');
});

self.addEventListener('activate', (event) => {
  console.log('Активирован');
});

self.addEventListener('fetch', (event) => {
  console.log('Происходит запрос на сервер');
});

const CACHE = 'cache-and-update-v1';

// При установке воркера мы должны закешировать часть данных (статику).
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      cache.addAll([
        '/',
        '/assets',
        'http://api.deworkacy.ru',
        'http://code.jquery.com',
        'https://cdnjs.cloudflare.com',
      ]))
  );
});

// при событии fetch, мы используем кэш, и только потом обновляем его данным с сервера
self.addEventListener('fetch', function (event) {
  // Мы используем `respondWith()`, чтобы мгновенно ответить без ожидания ответа с сервера.
  event.respondWith(fromCache(event.request));
  // `waitUntil()` нужен, чтобы предотвратить прекращение работы worker'a до того как кэш обновиться.
  event.waitUntil(update(event.request));
});

function fromCache(request) {
  return caches.open(CACHE).then((cache) =>
    cache.match(request).then((matching) =>
      matching || Promise.reject('no-match')
    ));
}

function update(request) {
  return caches.open(CACHE).then((cache) =>
    fetch(request).then((response) =>
      cache.put(request, response)
    )
  );
}
