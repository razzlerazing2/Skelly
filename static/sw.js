importScripts("/assets/dyn/config.js?v=10-02-2024");
importScripts("/assets/dyn/worker.js?v=10-02-2024");
importScripts("/assets/ultra/bundle.js?v=10-02-2024");
importScripts("/assets/ultra/config.js?v=10-02-2024");
importScripts(__uv$config.sw || "/assets/ultra/sw.js?v=10-02-2024");

const uv = new UVServiceWorker();
const dynamic = new Dynamic();

const userKey = new URL(location).searchParams.get("userkey");
self.dynamic = dynamic;

// Handle fetch event
self.addEventListener("fetch", event => {
  event.respondWith(
    (async () => {
      if (await dynamic.route(event)) {
        return await dynamic.fetch(event);
      }
      if (event.request.url.startsWith(`${location.origin}/a/`)) {
        return await uv.fetch(event);
      }
      return await fetch(event.request);
    })(),
  );
});

// Capture the install event for PWA prompt
self.addEventListener("install", event => {
  console.log("Service Worker Installed!");
});
