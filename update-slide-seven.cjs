const fs=require('node:fs');
const path=require('node:path');
// Slide 7: project organisation. LH and the lead sit over the SC사업실 team panel;
// 건축주택사업본부 supports from the right through a two-way arrow.
// Order and team tags follow the rev03 PPTX: grouped by home team.
const teams=[['건축','이동건','SC수행팀'],['견적','허남수','SC수행팀'],['구조','김민경','SC기술팀'],['MEP','박지수','SC기술팀'],['제작','정재욱','시흥거모TF']];
const support=['건축 주택<br>디자인팀','신상품 전략팀'];
const arrow=`<svg viewBox="0 0 90 30" aria-hidden="true"><path d="M0 15 14 2v8h62V2l14 13-14 13v-8H14v8z" fill="#17324D"/></svg>`;
const section=`<section class="slide lh-slide og-view" id="slide-7"><header><span>LH 모듈러주택 중대형평면 개발 연구용역</span><span>PROJECT ORGANIZATION</span></header><h2>과업 수행 조직 및 역할</h2><div class="slide-body lh-body"><div class="og"><div class="og-main"><div class="og-top"><b>LH</b><b>담당부서/담당자</b></div><i class="og-stem"></i><div class="og-lead"><b>과업 총괄</b><span>서혜원</span></div><i class="og-stem"></i><div class="og-panel"><p class="og-name">SC사업실</p>${teams.map(([r,n,t])=>`<article><em class="og-tag">${t}</em><b>${r}</b><span>${n}</span></article>`).join('')}</div></div><div class="og-link"><span>지원</span>${arrow}</div><div class="og-side"><div class="og-panel og-sup"><p class="og-name">건축주택사업본부</p>${support.map(t=>`<article><b>${t}</b></article>`).join('')}</div></div></div></div><footer><span>중대형평면 개발 · KICK-OFF / 협의용 초안</span><span>07 / 9</span></footer></section>`;
const css=`
.og-view .lh-body{justify-content:center}
.og{display:grid;grid-template-columns:minmax(0,1030fr) 96px minmax(0,446fr);align-items:end;margin:0 0 40px}
.og-main{display:flex;flex-direction:column;align-items:center}
.og-top,.og-lead{display:flex;flex-direction:column;align-items:center;justify-content:center;width:238px;height:86px;text-align:center;font-size:27px;line-height:1.25}
.og-top{background:#007F78;color:#FFFFFF}
.og-top b{font-weight:700}
.og-lead{background:#A9D3D2;color:#17324D;font-size:25px}
.og-lead b{font-weight:700}
.og-lead span{font-weight:400}
.og-stem{display:block;width:2px;height:80px;background:#61758A}
.og-panel{position:relative;display:grid;grid-auto-flow:column;grid-auto-columns:minmax(0,1fr);gap:16px;width:100%;padding:14px;background:#E3E8EE}
.og-name{position:absolute;left:16px;bottom:100%;margin:0 0 14px;font-size:24px;font-weight:700;color:#17324D;white-space:nowrap}
.og-panel article{display:flex;flex-direction:column;align-items:center;justify-content:center;height:104px;background:#9FC7C9;color:#17324D;font-size:25px;line-height:1.3;text-align:center}
.og-panel article b{font-weight:700}
.og-panel article span{font-weight:400}
.og-panel article{position:relative}
.og-tag{position:absolute;left:4px;top:8px;padding:1px 8px;border-radius:10px;background:#BFBFBF;color:#283442;font-size:13px;font-style:normal;font-weight:400;line-height:1.4}
.og-sup article{background:#EEF1F5;font-size:23px}
.og-link{display:flex;flex-direction:column;align-items:center;justify-content:center;height:132px;gap:4px;font-size:19px;font-weight:700;color:#17324D}
.og-link svg{width:86px;height:30px}
@media(max-width:700px){.og{grid-template-columns:1fr;margin:0}.og-link{height:auto;transform:rotate(90deg)}.og-panel{grid-auto-flow:row}.og-side{margin-top:48px}}
`;
function update(html){
 const re=/<section class="[^"]*slide[^"]*" id="slide-7">[\s\S]*?<\/section>/;
 if(!re.test(html))throw Error('Slide 7 missing');
 html=html.replace(re,()=>section).replace(/<style id="lh-org-seven">[\s\S]*?<\/style>/g,'');
 return html.replace('</head>',()=>`<style id="lh-org-seven">${css}</style></head>`);
}
module.exports={update};
if(require.main===module){
 const sleep=ms=>Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0,0,ms);
 for(const file of ['LH_모듈러_Kickoff.html','LH_색상표적용.html','LH_색상적용_시안.html','lh-kickoff-public/index.html']){
  const full=path.join(__dirname,file);if(!fs.existsSync(full))continue;
  const html=update(fs.readFileSync(full,'utf8'));
  for(const [,code]of html.matchAll(/<script\b(?![^>]*application\/json)[^>]*>([\s\S]*?)<\/script>/g))new Function(code);
  for(let i=0;;i++){try{fs.writeFileSync(full,html);break}catch(e){if(i>14)throw e;sleep(800)}}
  console.log(file+': slide 7 updated');
 }
}
