let files = [];

self.addEventListener('message', function (event) {
  console.log("SW Received Message:");
  files = event.data.files;
});

self.addEventListener('install', (event) => {
  console.log('Установлен');
});

self.addEventListener('activate', (event) => {
  console.log('Активирован');
});

self.addEventListener('fetch', (event) => {
  console.log('Происходит запрос на сервер');
});

const CACHE = 'cache-update-and-refresh-v1';

// При установке воркера мы должны закешировать часть данных (статику).
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => {
        new Promise((resolve, reject) => {
          self.addEventListener('message', (event) => {
            event.data.files.forEach(f => cache.add(f));
          });
        })
        return cache.addAll([
          '/',
          '/assets/sw.js',
          '//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css',
          '//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css',
          '//code.jquery.com/jquery-3.3.1.min.js',
          '//cdnjs.cloudflare.com/ajax/libs/fullPage.js/2.9.7/jquery.fullpage.min.js',
        ])
      }))
});

// При запросе на сервер мы используем данные из кэша и только после идем на сервер.
self.addEventListener('fetch', (event) => {
  // Как и в предыдущем примере, сначала `respondWith()` потом `waitUntil()`
  event.respondWith(fromCache(event.request));
  event.waitUntil(
    update(event.request)
    // В конце, после получения "свежих" данных от сервера уведомляем всех клиентов.
      .then(refresh)
  );
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
      cache.put(request, response.clone()).then(() => response)
    )
  );
}

// Шлём сообщения об обновлении данных всем клиентам.
function refresh(response) {
  return self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      // Подробнее про ETag можно прочитать тут
      // https://en.wikipedia.org/wiki/HTTP_ETag
      const message = {
        type: 'refresh',
        url: response.url,
        eTag: response.headers.get('ETag')
      };
      // Уведомляем клиент об обновлении данных.
      client.postMessage(JSON.stringify(message));
    });
  });
}
