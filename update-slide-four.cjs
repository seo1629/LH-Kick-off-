const fs=require('node:fs');
const path=require('node:path');
const title='거주 경험에서 출발하는 4가지 개발 관점';
const items=[
 ['01','넉넉한 물 쓰는 공간','욕실·주방·세탁이 비좁다','가장 자주 쓰는 공간부터 여유 있게','욕실·주방·세탁실을 하나의 습식 존으로 묶어 치수를 먼저 확보하고, 공장에서 완성도 높게 만들어 현장 작업을 줄입니다.'],
 ['02','생활에 맞춘 면적 배분','같은 면적, 다른 체감','넓혀야 할 곳과 줄여도 될 곳을 구분','거실·작은방·가사 공간은 넉넉하게, 쓰임이 적은 공간은 효율적으로 조정해 같은 면적에서 더 넓게 사는 평면을 만듭니다.'],
 ['03','모듈이 보이지 않는 실내','살다 보면 느껴지는 이질감','일반 아파트와 다르지 않은 실내','기둥·보와 모듈 경계를 벽체와 수납 속에 감추고, 방 크기와 동선이 모듈 경계에서 끊어지지 않도록 나눕니다.'],
 ['04','조용하고 따뜻한 접합부','결로·단열·소음','접합부를 약점이 아닌 기본 성능으로','기밀·단열·차음을 접합 상세의 기준으로 삼고, 기본 성능을 고려한 개구부 상세를 마련합니다.']
];
const section=`<section class="slide lh-slide review-view" id="slide-4"><header><span>LH · MODULAR HOUSING</span><span>DEVELOPMENT PERSPECTIVES</span></header><h2>${title}</h2><div class="slide-body lh-body"><p class="lead review-lead">‘모듈러라서 아쉬운 집’이 아니라 ‘모듈러라서 더 잘 만든 집’을 목표로 합니다.</p><div class="review-grid">${items.map(([n,t,e,q,d])=>`<article><p class="review-number">${n}</p><div><h3>${t}</h3><p class="review-evidence"><span>거주 불편</span>${e}</p><p class="review-question">${q}</p><p class="review-detail">${d}</p></div></article>`).join('')}</div></div><footer><span>중대형평면 개발 · KICK-OFF / 개발 관점 제안</span><span>04 / 9</span></footer></section>`;
const css=`
#slide-4.review-view{background:#F5F7FA;color:#283442}
#slide-4.review-view>h2{color:#17324D}
#slide-4.review-view .lh-body{gap:16px}
#slide-4.review-view .review-lead{font-size:26px;line-height:1.45;color:#283442;margin:0}
.review-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px 24px}
.review-grid article{display:flex;gap:18px;padding:18px 22px;background:#FFFFFF;border:1px solid #D4DFE8;border-top:3px solid #007F78;min-width:0}
.review-number{flex:0 0 40px;margin:0;color:#007F78;font-size:31px;line-height:1.3;font-weight:400}
.review-grid h3{font-size:26px;color:#17324D;font-weight:650;margin:0 0 8px;line-height:1.3}
.review-evidence{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:0 0 10px;font-size:15px;color:#61758A;line-height:1.4}
.review-evidence span{padding:2px 8px;background:#17324D;color:#FFFFFF;font-size:13px;font-weight:600;letter-spacing:.02em}
.review-question{font-size:21px;color:#283442;line-height:1.45;margin:0;font-weight:600;word-break:keep-all}
.review-detail{font-size:17px;color:#61758A;line-height:1.5;margin:8px 0 0;word-break:keep-all}
.review-summary{padding:13px 22px;background:#E5F2EF;border-left:4px solid #007F78}
.review-summary p{font-size:22px;line-height:1.5;color:#17324D;margin:0}
.review-summary b{color:#007F78}
.review-sources{font-size:13px;line-height:1.5;color:#61758A;margin:0}
@media(max-width:700px){.review-grid{grid-template-columns:1fr}.review-grid article{padding:20px;gap:12px}.review-question{font-size:19px}.review-detail{font-size:16px}.review-summary p{font-size:18px}}
`;
function update(html){
 if(!/<section class="[^"]*slide[^\"]*" id="slide-4">/.test(html))throw Error('Slide 4 missing');
 html=html.replace(/<section class="[^"]*slide[^\"]*" id="slide-4">[\s\S]*?<\/section>/,section);
 html=html.replace(/<style id="lh-review-four">[\s\S]*?<\/style>/g,'');
 return html.replace('</head>',`<style id="lh-review-four">${css}</style></head>`);
}
module.exports={update,section,css};
if(require.main===module){
 for(const file of ['LH_모듈러_Kickoff.html','LH_색상표적용.html','LH_색상적용_시안.html','lh-kickoff-public/index.html']){
  const full=path.join(__dirname,file);if(!fs.existsSync(full))continue;
  const html=update(fs.readFileSync(full,'utf8'));
  for(const [,code]of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g))new Function(code);
  fs.writeFileSync(full,html);console.log(file+': slide 4 updated');
 }
}
