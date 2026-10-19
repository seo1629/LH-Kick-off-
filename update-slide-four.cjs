const fs=require('node:fs');
const path=require('node:path');
const title='표준평면 개발의 주요 검토 관점';
const items=[
 ['01','공간 구성','확장 희망과 축소 허용을 고려한 실별 면적 배분','작은방·거실의 확장 요구와 안방의 축소 허용을 참고해 공간 배분 대안을 검토합니다.'],
 ['02','생활 동선','세탁실·다용도실 확보를 통한 효율적인 가사 공간 연결','확장 희망 1순위인 세탁실·다용도실을 고려해 주방과 세탁·건조·정리 동선을 연계합니다.'],
 ['03','수납·가구 배치','현관·주방·침실 수납을 보완하고 가구 사용 공간 확보','신발장·주방 수납·붙박이장 불만을 참고해 수납량과 배치, 사용 여유를 검토합니다.'],
 ['04','모듈 조건 대응','거주 편의 개선 방향을 4모듈 평면 안에서 구현','모듈 경계에서 실 크기·동선·수납이 불리해지지 않도록 검토합니다. ※ 과업 조건에 따른 설계 적용']
];
const section=`<section class="slide lh-slide review-view" id="slide-4"><header><span>LH · MODULAR HOUSING</span><span>PLAN REVIEW CRITERIA</span></header><h2>${title}</h2><div class="slide-body lh-body"><p class="lead review-lead">2024 POE의 공간 조정 요구를 참고해, 실사용 중심의 평면을 검토합니다.</p><div class="review-grid">${items.map(([n,t,q,d])=>`<article><p class="review-number">${n}</p><div><h3>${t}</h3><p class="review-question">${q}</p><p class="review-detail">${d}</p></div></article>`).join('')}</div><div class="review-summary"><p>위 검토 관점을 바탕으로 65㎡·75㎡ 평면 대안을 비교하고,<br>LH 협의를 통해 발전시킵니다.</p></div><p class="review-sources">공간·동선 근거: 사용자 제공 2024 POE 표 7-6·7-7, 공급면적 60㎡ 이상 응답 30세대. 공급면적과 본 과업의 전용면적은 다른 기준입니다.<br>수납 근거: <a href="https://v.daum.net/v/20260615050650499" target="_blank" rel="noopener">뉴스1, 2026.06.15(2024 POE 심층조사 인용)</a>. 동선 연계·가구 배치·모듈 적용은 조사 결과를 참고한 설계 제안입니다.</p></div><footer><span>중형 표준평면 개발 · KICK-OFF / 검토 기준 제안</span><span>04 / 13</span></footer></section>`;
const css=`
#slide-4.review-view{background:#F5F7FA;color:#283442}
#slide-4.review-view>h2{color:#17324D}
#slide-4.review-view .lh-body{gap:16px}
#slide-4.review-view .review-lead{font-size:28px;line-height:1.45;color:#283442}
.review-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px 24px}
.review-grid article{display:flex;gap:20px;padding:18px 22px;background:#FFFFFF;border:1px solid #D4DFE8;border-top:3px solid #007F78;min-width:0}
.review-number{flex:0 0 43px;margin:0;color:#007F78;font-size:31px;line-height:1.3;font-weight:400}
.review-grid h3{font-size:27px;color:#17324D;font-weight:650;margin:0 0 9px;line-height:1.3}
.review-question{font-size:22px;color:#283442;line-height:1.5;margin:0;word-break:keep-all}
.review-detail{font-size:17px;color:#61758A;line-height:1.5;margin:10px 0 0;word-break:keep-all}
.review-summary{padding:13px 22px;background:#E5F2EF;border-left:4px solid #007F78}
.review-summary p{font-size:23px;line-height:1.5;color:#17324D;margin:0}
.review-sources{font-size:13px;line-height:1.5;color:#61758A;margin:0}.review-sources a{color:#61758A;text-decoration:underline}
@media(max-width:700px){.review-grid{grid-template-columns:1fr}.review-grid article{padding:20px;gap:12px}.review-question{font-size:20px}.review-detail{font-size:17px}.review-summary p{font-size:19px}.review-summary br{display:none}}
`;
function update(html){
 if(!/<section class="[^"]*slide[^\"]*" id="slide-4">/.test(html))throw Error('Slide 4 missing');
 html=html.replace(/<section class="[^"]*slide[^\"]*" id="slide-4">[\s\S]*?<\/section>/,section);
 html=html.replace(/<style id="lh-review-four">[\s\S]*?<\/style>/g,'');
 return html.replace('</head>',`<style id="lh-review-four">${css}</style></head>`);
}
module.exports={update};
if(require.main===module){
 for(const file of ['LH_모듈러_Kickoff.html','LH_색상표적용.html','LH_색상적용_시안.html','lh-kickoff-public/index.html']){
  const full=path.join(__dirname,file);if(!fs.existsSync(full))continue;
  const html=update(fs.readFileSync(full,'utf8'));
  for(const [,code]of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g))new Function(code);
  fs.writeFileSync(full,html);console.log(file+': slide 4 updated');
 }
}
