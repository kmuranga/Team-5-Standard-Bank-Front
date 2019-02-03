const cacheName = "v1.0";

// list of all the pages/assets you would like to cache
// ideally you would want to list them all.
/*const cacheAssets = [
  "/",
  "./public/index.html",
  "./src/_actions/alert.actions.js",
  "./src/_actions/index.js",
  "./src/_actions/user.actions.js",
  "./src/index.jsx",
  "./src/HomePage/HomePage.jsx",
  "./src/HomePage/index.js",
  "./src/StyleSheet/main.css",
  "./src/StyleSheet/main.css.map",
  "./src/StyleSheet/main.scss",
  "./src/App/App.jsx",
  "./src/App/index.js",
  "./src/_components/index.js",
  "./src/_components/PrivateRoute.jsx",
  "./src/_constants/index.js",
  "./src/_constants/alert.constants.js",
  "./src/_constants/user.constants.js",
  "./src/_helpers/auth-header.js",
  "./src/_helpers/fake-backend.js",
  "./src/_helpers/history.js",
  "./src/_helpers/index.js",
  "./src/_helpers/store.js",
  "./src/_reducers/index.js",
  "./src/_reducers/alert.reducer.js",
  "./src/_reducers/authentication.reducer.js",
  "./src/_reducers/registration.reducer.js",
  "./src/_reducers/users.reducer.js",
  "./src/_services/index.js",
  "./src/_services/user.service.js"
];
*/
console.log("cached pages ran.");
// Call Install Event
self.addEventListener("install", e => {
  console.log("Service Worker: Installed");

  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log("Service Worker: Caching Files");
        cache.addAll([
          "/",
          "./tired.jpg",
  "./public/index.html",
  "./src/_actions/alert.actions.js",
  "./src/_actions/index.js",
  "./src/_actions/user.actions.js",
  "./src/index.jsx",
  "./src/HomePage/HomePage.jsx",
  "./src/HomePage/index.js",
  "./src/StyleSheet/main.css",
  "./src/StyleSheet/main.css.map",
  "./src/StyleSheet/main.scss",
  "./src/App/App.jsx",
  "./src/App/index.js",
  "./src/_components/index.js",
  "./src/_components/PrivateRoute.jsx",
  "./src/_constants/index.js",
  "./src/_constants/alert.constants.js",
  "./src/_constants/user.constants.js",
  "./src/_helpers/auth-header.js",
  "./src/_helpers/fake-backend.js",
  "./src/_helpers/history.js",
  "./src/_helpers/index.js",
  "./src/_helpers/store.js",
  "./src/_reducers/index.js",
  "./src/_reducers/alert.reducer.js",
  "./src/_reducers/authentication.reducer.js",
  "./src/_reducers/registration.reducer.js",
  "./src/_reducers/users.reducer.js",
  "./src/_services/index.js",
  "./src/_services/user.service.js"
        ]);
      })
      .then(() => self.skipWaiting())
  );
});

// Call Activate Event
self.addEventListener("activate", e => {
  console.log("Service Worker: Activated");
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log("Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event
self.addEventListener("fetch", e => {
  console.log("Service Worker: Fetching");
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
