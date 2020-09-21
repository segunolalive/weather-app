workbox.routing.registerRoute(
  ({ request }) => request.destination === 'image',
  new workbox.strategies.CacheFirst()
)

workbox.routing.registerRoute(
  ({ request }) => request.url.match('api.'),
  new workbox.strategies.NetworkFirst()
)