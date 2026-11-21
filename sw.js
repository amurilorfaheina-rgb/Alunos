var C="alunos-v1",A=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(A)}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!=="GET")return;
e.respondWith(caches.open(C).then(function(c){return c.match(r,{ignoreSearch:true}).then(function(hit){
var net=fetch(r).then(function(res){if(res&&(res.ok||res.type==="opaque"))c.put(r,res.clone());return res}).catch(function(){return hit||(r.mode==="navigate"?c.match("./index.html"):undefined)});
return hit||net})}))});
