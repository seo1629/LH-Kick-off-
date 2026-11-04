const fs=require('node:fs');
const path=require('node:path');
const title='상품성을 높이는 4가지 개발 관점';
const items=[
 ['01','평면 상품성','세탁·욕실·주방 불만','3~4Bay 평면, 세탁·욕실·주방 공간 우선 확보','욕실·주방·세탁실을 하나의 습식 존으로 묶어 공간을 먼저 확보하고, 공장에서 완성도 높게 만들어 현장 작업을 줄입니다.'],
 ['02','모듈 배열','모듈 크기·배열의 한계','가로+세로 복합 배열 검토','제한적인 건축계획을 개선해 상품성을 높이되, 접합부 증가는 3·4모듈 비교에서 함께 검토합니다.'],
 ['03','접합·구조','결로·단열','퀵커넥터 등 접합 공법, 내화·구조 계획, 설비 모듈화','기밀·단열·차음을 접합 상세의 기준으로 삼고, 설비 배관·전기·통신 배선의 모듈화를 함께 계획합니다.'],
 ['04','마감','실내 이질감','공장 제작률 70% 이상을 고려한 바닥·벽체 마감재 제안','기둥·보와 모듈 경계가 드러나지 않도록 벽체와 수납으로 정리하고, 공장 완성 범위를 높입니다.']
];
const section=`<section class="slide lh-slide review-view" id="slide-4"><header><span>LH · MODULAR HOUSING</span><span>DEVELOPMENT PERSPECTIVES</span></header><h2>${title}</h2><div class="slide-body lh-body"><p class="lead review-lead">소형 중심의 모듈러를 넘어, 3~4인 가구가 선택하는 중대형 상품으로</p><div class="review-grid">${items.map(([n,t,e,q,d])=>`<article><p class="review-number">${n}</p><div><h3>${t}</h3><p class="review-evidence"><span>현재 한계</span>${e}</p><p class="review-question">${q}</p><p class="review-detail">${d}</p></div></article>`).join('')}</div></div><footer><span>중대형평면 개발 · KICK-OFF / 개발 관점 제안</span><span>04 / 9</span></footer></section>`;
const css=`
#slide-4.review-view{background:#F5F7FA;color:#283442}
#slide-4.review-view>h2{color:#17324D}
#slide-4.review-view .lh-body{gap:16px}
#slide-4.review-view .review-lead{font-size:26px;line-height:1.45;color:#283442;margin:0}
.review-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-rows:1fr;gap:22px 26px;flex:1 1 auto;min-height:0;margin-top:6px}
.review-grid article{display:grid;grid-template-columns:48px minmax(0,1fr);align-content:center;align-items:start;gap:20px;padding:26px 30px;background:#FFFFFF;border:1px solid #D4DFE8;border-top:3px solid #007F78;min-width:0}
.review-number{flex:0 0 48px;margin:0;color:#007F78;font-size:36px;line-height:1.3;font-weight:400}
.review-grid h3{font-size:30px;color:#17324D;font-weight:650;margin:0 0 12px;line-height:1.3}
.review-evidence{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:0 0 16px;font-size:18px;color:#61758A;line-height:1.4}
.review-evidence span{padding:3px 10px;background:#17324D;color:#FFFFFF;font-size:15px;font-weight:600;letter-spacing:.02em}
.review-question{font-size:24px;color:#283442;line-height:1.45;margin:0;font-weight:600;word-break:keep-all}
.review-detail{font-size:19px;color:#61758A;line-height:1.55;margin:12px 0 0;word-break:keep-all}
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
  for(const [,code]of html.matchAll(/<script\b(?![^>]*application\/json)[^>]*>([\s\S]*?)<\/script>/g))new Function(code);
  fs.writeFileSync(full,html);console.log(file+': slide 4 updated');
 }
}
