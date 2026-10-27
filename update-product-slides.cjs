const fs=require('node:fs');
const path=require('node:path');
// Slides 5-6: company product examples - GLB viewer (deck's Three.js viewer), spec side panel, rolling renders.
const products=[[5,'36'],[6,'46']];
const total=9;
const render=k=>`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='400'%3E%3Crect width='100%25' height='100%25' fill='%23E5ECEA'/%3E%3Ctext x='50%25' y='50%25' fill='%2361758A' font-family='sans-serif' font-size='34' text-anchor='middle' dominant-baseline='middle'%3ERENDER ${k}%3C/text%3E%3C/svg%3E`;
// Rendering images per type, read from assets/renders/<type>/ and embedded as data URIs.
// Source: 스케치업_이미지_소스/<type>타입_렌더링N.png (webp copies).
const renders={'36':[['01.webp','주방·거실'],['02.webp','침실']],'46':[['01.webp','거실'],['02.webp','욕실']]};
const slots=4;
const figures=type=>{
 const list=(renders[type]||[]).map(([file,cap])=>[path.join(__dirname,'assets','renders',type,file),cap]).filter(([f])=>fs.existsSync(f));
 const real=list.map(([f,cap])=>`<figure><button type="button" data-image><img data-asset alt="${type}타입 ${cap} 렌더링" src="data:image/webp;base64,${fs.readFileSync(f).toString('base64')}"></button><figcaption>${cap}</figcaption></figure>`);
 const empty=Array.from({length:Math.max(0,slots-real.length)},(_,i)=>{const k=String(real.length+i+1).padStart(2,'0');return `<figure><button type="button" data-image><img data-asset alt="렌더링 이미지 ${k}" src="${render(k)}"></button><figcaption>렌더링 ${k}</figcaption></figure>`;});
 return real.concat(empty).join('');
};
// GLB per type, loaded from a file at runtime (assets/models locally, models/ on the public site).
const modelFiles={'36':'type36.glb','46':'type46.glb'};
const modelSrc=type=>modelFiles[type]&&fs.existsSync(path.join(__dirname,'assets','models',modelFiles[type]))?` data-model-src="assets/models/${modelFiles[type]}"`:'';
// The GLB loader and model name only show in 편집 mode; the presentation keeps view controls only.
const section=(n,type)=>`<section class="slide lh-slide pd-view" id="slide-${n}"><header><span>LH · MODULAR HOUSING</span><span>PRODUCT EXAMPLE / ${type} TYPE</span></header><h2>당사 개발 상품 예시: ${type}타입 모듈러 주택</h2><div class="slide-body lh-body"><div class="pd-top"><div class="pd-model"><div class="template-model"${modelSrc(type)}><div class="model-tools"><button data-model-view="plan">평면</button><button data-model-view="iso">아이소메트릭</button><button data-model-action="rotate" aria-pressed="false">자동 회전</button><button data-model-action="fit">화면 맞춤</button><label class="model-load">GLB 불러오기<input class="model-file" type="file" accept=".glb"></label><span class="model-name">모델 없음</span></div><div class="template-scene"></div></div></div><aside class="pd-side"><div class="pd-spec"><p class="pd-label">상품</p><h3 class="pd-big">${type}타입</h3><p class="pd-sub">상품명 입력</p></div><div class="pd-spec"><p class="pd-label">모듈 수</p><p class="pd-big">○ 모듈</p><p class="pd-sub">모듈 크기·조합 방식 입력</p></div><div class="pd-feat"><p class="pd-label">상품 특징</p><p class="pd-item">특징 1 입력</p><p class="pd-item">특징 2 입력</p><p class="pd-item">특징 3 입력</p><p class="pd-item">특징 4 입력</p></div></aside></div><div class="pd-roll" aria-label="렌더링 이미지"><div class="pd-track">${figures(type)}</div><button type="button" class="pd-nav pd-prev" aria-label="이전 이미지">‹</button><button type="button" class="pd-nav pd-next" aria-label="다음 이미지">›</button></div></div><footer><span>중대형평면 개발 · KICK-OFF / 협의용 초안</span><span>${String(n).padStart(2,'0')} / ${total}</span></footer></section>`;
const css=`
.pd-view .lh-body{gap:16px}
.pd-top{display:grid;grid-template-columns:minmax(0,1fr) 400px;gap:20px;height:470px}
.pd-model{display:flex;min-width:0;background:#FFFFFF;border-top:6px solid #007F78;padding:6px 16px 16px}
.pd-model .template-model{flex:1}
.pd-side{display:flex;flex-direction:column;gap:12px;min-width:0}
.pd-spec{background:#17324D;color:#FFFFFF;padding:14px 20px;border-top:6px solid #007F78}
.pd-label{margin:0;font-size:15px;font-weight:700;letter-spacing:.04em;color:#7FC4BC}
.pd-view .pd-big{margin:2px 0;font-size:40px;line-height:1.15;font-weight:700;color:#FFFFFF}
.pd-sub{margin:0;font-size:16px;color:#D4DFE8}
.pd-feat{flex:1;background:#FFFFFF;padding:14px 20px;border-top:6px solid #007F78;counter-reset:pd;min-height:0;overflow:hidden}
.pd-feat .pd-label{color:#007F78;margin-bottom:6px}
.pd-item{counter-increment:pd;margin:0;padding:6px 0 6px 38px;position:relative;font-size:18px;line-height:1.4;color:#283442;border-bottom:1px solid #E5ECEA;word-break:keep-all}
.pd-item:last-child{border-bottom:0}
.pd-item::before{content:counter(pd,decimal-leading-zero);position:absolute;left:0;top:6px;font-weight:700;color:#007F78}
.pd-roll{position:relative;overflow:hidden;height:190px}
.pd-track{display:flex;gap:16px;height:100%;transition:transform .7s ease}
.pd-track figure{position:relative;flex:0 0 calc((100% - 48px)/4);height:100%;margin:0}
.pd-roll.pd-static .pd-nav{display:none}
.pd-view .template-scene[data-loading]::after{content:'3D 모델을 불러오는 중…';position:absolute;inset:auto 0 12px 0;text-align:center;font-size:15px;color:#61758A;pointer-events:none}
.pd-view .template-scene[data-loading="error"]::after{content:'3D 모델을 불러오지 못했습니다 (로컬 서버 또는 배포 사이트에서 열어 주세요)'}
.pd-track.pd-flow{transition:none;will-change:transform}
.pd-view .model-tools .model-load,.pd-view .model-tools .model-name{display:none}
body.editing .pd-view .model-tools .model-load{display:inline-block}
body.editing .pd-view .model-tools .model-name{display:inline}
.pd-track figure>button{display:block;width:100%;height:100%;padding:0;border:0;background:#E5ECEA;cursor:zoom-in}
.pd-track img{display:block;width:100%;height:100%;object-fit:cover}
.pd-track figcaption{position:absolute;left:10px;bottom:8px;padding:2px 8px;font-size:13px;color:#FFFFFF;background:rgba(23,50,77,.75);pointer-events:none}
.pd-nav{position:absolute;top:50%;transform:translateY(-50%);width:40px;height:40px;border:0;border-radius:50%;background:rgba(23,50,77,.8);color:#FFFFFF;font-size:26px;line-height:1;cursor:pointer;z-index:2}
.pd-prev{left:8px}.pd-next{right:8px}
@media(max-width:700px){.pd-top{grid-template-columns:1fr;height:auto}.pd-model{height:320px}.pd-track figure{flex-basis:calc((100% - 16px)/2)}}
@media print{.pd-nav{display:none}.pd-track{transform:none!important}}
`;
const js=`
addEventListener('message',e=>{if(!e.data||e.data.type!=='viewer-ready')return;const f=[...document.querySelectorAll('.template-model[data-model-src] iframe')].find(x=>x.contentWindow===e.source);if(!f)return;const box=f.closest('.template-model'),i=[...document.querySelectorAll('.slide')].indexOf(box.closest('.slide'));if(window.templateModels&&templateModels[i])return;const note=f.closest('.template-scene');note.dataset.loading='1';fetch(box.dataset.modelSrc).then(r=>{if(!r.ok)throw Error(r.status);return r.blob()}).then(b=>new Promise((ok,no)=>{const fr=new FileReader();fr.onload=()=>ok(String(fr.result).split(',')[1]);fr.onerror=no;fr.readAsDataURL(b)})).then(data=>{f.contentWindow.postMessage({type:'model',data},'*')}).catch(()=>{note.dataset.loading='error'}).finally(()=>{if(note.dataset.loading==='1')delete note.dataset.loading});});
document.querySelectorAll('[data-model-view]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();const box=b.closest('.template-model'),f=box&&box.querySelector('.template-scene iframe');if(!f)return;f.contentWindow.postMessage({type:'view',value:b.dataset.modelView},'*');const r=box.querySelector('[data-model-action="rotate"]');if(r)r.setAttribute('aria-pressed','false');}));
(()=>{document.querySelectorAll('.pd-roll').forEach(roll=>{const track=roll.querySelector('.pd-track'),items=[...track.children];if(items.length<2)return;
// continuous loop: the strip is doubled and scrolled at 40px/s; pauses on hover, in 편집 mode and on other slides
roll.classList.add('pd-static');track.classList.add('pd-flow');items.forEach(n=>{const c=n.cloneNode(true);c.setAttribute('aria-hidden','true');track.append(c);});
let pos=0,last=0,hover=false;roll.addEventListener('mouseenter',()=>hover=true);roll.addEventListener('mouseleave',()=>hover=false);
const tick=()=>{const time=performance.now(),dt=last?Math.min(time-last,100):0;last=time;const span=track.children[items.length].offsetLeft-items[0].offsetLeft;
if(span>0&&!hover&&!document.body.classList.contains('editing')&&roll.closest('.slide')?.classList.contains('active')){pos=(pos+dt*.04)%span;track.style.transform='translateX('+(-pos)+'px)';}
};setInterval(tick,30);});})();
`;
function update(html){
 for(const [n,type] of products){
  const re=new RegExp(`<section class="[^"]*slide[^"]*" id="slide-${n}">[\\s\\S]*?</section>`);
  if(!re.test(html))throw Error(`Slide ${n} missing`);
  html=html.replace(re,()=>section(n,type));
 }
 html=html.replace(/<style id="lh-product-(five|slides)">[\s\S]*?<\/style>/g,'').replace(/<script id="lh-product-roll">[\s\S]*?<\/script>/g,'');
 html=html.replace('</head>',()=>`<style id="lh-product-slides">${css}</style></head>`);
 return html.replace(/<\/body>(?![\s\S]*<\/body>)/,()=>`<script id="lh-product-roll">${js}</script></body>`);
}
module.exports={update};
if(require.main===module){
 for(const file of ['LH_모듈러_Kickoff.html','LH_색상표적용.html','LH_색상적용_시안.html','lh-kickoff-public/index.html']){
  const full=path.join(__dirname,file);if(!fs.existsSync(full))continue;
  const html=update(fs.readFileSync(full,'utf8'));
  for(const [,code]of html.matchAll(/<script\b(?![^>]*application\/json)[^>]*>([\s\S]*?)<\/script>/g))new Function(code);
  fs.writeFileSync(full,html);console.log(file+': product slides updated');
 }
}
