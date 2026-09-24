import {readFile,readdir,stat} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import assert from 'node:assert/strict';
const base=resolve('dist');
const indexable=process.env.PUBLIC_INDEXABLE!=='false';
async function files(dir){const result=[];for(const entry of await readdir(dir,{withFileTypes:true})){const path=join(dir,entry.name);result.push(...entry.isDirectory()?await files(path):[path]);}return result;}
let count=0;
for(const file of (await files(base)).filter(p=>p.endsWith('.html'))){const html=await readFile(file,'utf8');assert.match(html,/<title>[^<]+<\/title>/);assert.match(html,/name="description"/);assert.equal((html.match(/<h1[\s>]/g)||[]).length,1,file);assert.match(html,/rel="canonical"/);assert.ok(html.includes(`name="robots" content="${indexable&&!file.endsWith('404.html')?'index,follow':'noindex,nofollow'}"`),`Unexpected indexing setting in ${file}`);assert.ok(!html.includes("contact-form")&&!html.includes("cf-turnstile")&&!html.includes("api/contact"));for(const match of html.matchAll(/(?:src|href)="(\/[^"#?]*)/g)){const path=match[1];const target=join(base,path);await stat(path.endsWith('/')?join(target,'index.html'):target).catch(()=>{throw new Error(`Missing ${path} in ${file}`);});}for(const script of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)){assert.ok(script[1].includes('src=')||script[1].includes('application/ld+json'),'Unexpected inline executable script blocked by CSP');}count++;}
const home=await readFile(join(base,'index.html'),'utf8');assert.match(home,/<video[^>]*autoplay[^>]*muted[^>]*loop[^>]*playsinline/);assert.match(home,/tel:\+48533222444/);
const gallery=await readFile(join(base,'galeria','index.html'),'utf8');assert.doesNotMatch(gallery,/<video|Film z drona|#film/);
const price=await readFile(join(base,'cennik','index.html'),'utf8');for(const amount of ['150','200','250','300','400'])assert.ok(price.includes(amount),`Missing price ${amount}`);assert.match(price,/powyżej 3 dób/);assert.match(price,/pricing-page/);assert.equal((price.match(/class="room-price-card/g)||[]).length,6);
const locationMap=await stat(join(base,'images','location-map.png'));assert.ok(locationMap.size>0);
assert.match(home,/ogrodzony i monitorowany parking/);assert.match(home,/centrum Płońska/);
assert.ok((await readFile(join(base,'sitemap.xml'),'utf8')).includes('<urlset'));
assert.equal((await readFile(join(base,'sitemap.xml'),'utf8')).includes('<url>'),indexable,'Sitemap must match indexing mode');
assert.ok((await readFile(join(base,'robots.txt'),'utf8')).includes(indexable?'Allow: /':'Disallow: /'));
assert.match(home,/<script[^>]*src="\/reveal-init.js"[^>]*>/);
assert.ok(home.indexOf('/reveal-init.js')<home.indexOf('</head>'),'Reveal initialization must run before the body is rendered');
console.log(`${count} HTML pages: metadata, h1, links/assets, removed form, homepage video, gallery without video and centered pricing passed.`);
