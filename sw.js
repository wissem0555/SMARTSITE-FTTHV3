/* SMART SITE · Audit FTTH — service worker (fonctionnement hors ligne)
   Pour publier une mise à jour : remplacez index.html puis augmentez VERSION ci-dessous. */
const VERSION='v3';
const CACHE='ssftth-'+VERSION;
const ASSETS=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('ssftth-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const req=e.request;if(req.method!=='GET')return;
  const url=new URL(req.url);if(url.origin!==self.location.origin)return; // fond de carte : toujours en direct (rien de stocké)
  if(req.mode==='navigate'){
    e.respondWith(caches.open(CACHE).then(async c=>{const cached=await c.match('./index.html');const net=fetch(req).then(r=>{if(r&&r.ok)c.put('./index.html',r.clone());return r}).catch(()=>null);return cached||(await net)||new Response('Hors ligne : ouvrez l’application une première fois avec Internet.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}})}));
    return;
  }
  e.respondWith(caches.open(CACHE).then(async c=>{const cached=await c.match(req);const net=fetch(req).then(r=>{if(r&&r.ok&&r.type==='basic')c.put(req,r.clone());return r}).catch(()=>null);return cached||(await net)||new Response('',{status:504})}));
});
