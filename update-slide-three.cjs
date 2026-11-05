const fs=require('node:fs');
const path=require('node:path');
const section=`<section class="slide lh-slide osc-view" id="slide-3"><header><span>LH 모듈러주택 중대형평면 개발 연구용역</span><span>POE DIAGNOSIS</span></header><h2>60㎡ 이상 거주자의 공간불만은 세탁·욕실·주방에 집중</h2><div class="slide-body lh-body"><p class="lead osc-lead">2024년 POE에서 60㎡ 이상 주택 거주자의 만족도는 16.7%에 그쳤고 <b>세탁·욕실·주방 공간</b>에 대한 불만이 크게 나타났습니다.</p><div class="osc-board"><p class="osc-label"><b>공간불만</b> 공급면적 60㎡ 이상 거주자 응답(30세대)</p><article class="osc-key"><h3>60㎡ 이상 세대 만족도</h3><p class="osc-num">16.7%</p><p class="osc-sub">LH 아파트 평균 63%</p></article><article><h3>불만 공간 1위 · 세탁실/다용도실</h3><p class="osc-num">56.7%</p><p class="osc-desc">60㎡ 이상 거주자는 더 넓은 세탁실·다용도실을 원함</p></article><article><h3>불만 공간 2위 · 욕실</h3><p class="osc-num">46.7%</p><p class="osc-desc">불만사항은 좁은 면적, 환풍기 환기 미흡, 샤워부스 유리벽 미설치</p></article><article><h3>불만 공간 3위 · 주방/식당</h3><p class="osc-num">20.0%</p><p class="osc-desc">불만사항은 조리공간 협소, 좁은 면적, 싱크대 사이즈 협소</p></article></div><p class="osc-sources">출처: LH 토지주택연구원, 「거주 후 평가 2024 POE 결과를 반영한 LH 주택 계획방향」</p></div><footer><span>중대형평면 개발 · KICK-OFF / 협의용 초안</span><span>03 / 9</span></footer></section>`;
const css=`
#slide-3.osc-view{background:#F5F7FA;color:#283442}
#slide-3.osc-view>header span{font-size:24px;letter-spacing:0;text-transform:none;color:#17324D}
#slide-3.osc-view>header span:first-child{font-weight:700}
#slide-3.osc-view>h2{color:#17324D;font-weight:700}
#slide-3.osc-view .lh-body{gap:14px}
#slide-3.osc-view .osc-lead{font-size:26px;line-height:1.5;color:#283442;margin:0;word-break:keep-all}
.osc-lead b{color:#007F78;font-weight:700}
.osc-board{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-template-rows:auto 1fr;gap:14px 24px;margin-top:10px;flex:1 1 auto;min-height:0}
.osc-label{grid-column:1/-1;margin:0;font-size:22px;color:#283442;word-break:keep-all}
.osc-label b{font-size:31px;color:#17324D;font-weight:700;margin-right:10px}
.osc-board article{display:flex;flex-direction:column;justify-content:center;padding:28px 30px;background:#FFFFFF;border-top:6px solid #007F78;min-width:0}
.osc-board article.osc-key{background:#17324D;border-top-color:#007F78}
.osc-board h3{margin:0;font-size:26px;line-height:1.35;color:#17324D;font-weight:700;word-break:keep-all}
.osc-num{margin:18px 0 18px;font-size:78px;line-height:1.05;color:#17324D;font-weight:700}
.osc-desc{margin:0;font-size:21px;line-height:1.5;color:#283442;word-break:keep-all}
.osc-key h3,.osc-key .osc-num{color:#FFFFFF}
.osc-sub{margin:0;font-size:22px;color:#D4DFE8}
.osc-sources{font-size:15px;line-height:1.4;color:#283442;margin:0}
@media(max-width:700px){.osc-board{grid-template-columns:1fr 1fr}.osc-num{font-size:44px}}
`;
function update(html){
 if(!/<section class="[^"]*slide[^\"]*" id="slide-3">/.test(html))throw Error('Slide 3 missing');
 html=html.replace(/<section class="[^"]*slide[^\"]*" id="slide-3">[\s\S]*?<\/section>/,()=>section);
 html=html.replace(/<style id="lh-osc-three">[\s\S]*?<\/style>/g,'');
 return html.replace('</head>',()=>`<style id="lh-osc-three">${css}</style></head>`);
}
module.exports={update};
if(require.main===module){
 const sleep=ms=>Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0,0,ms);
 for(const file of ['LH_모듈러_Kickoff.html','LH_색상표적용.html','LH_색상적용_시안.html','lh-kickoff-public/index.html']){
  const full=path.join(__dirname,file);if(!fs.existsSync(full))continue;
  const html=update(fs.readFileSync(full,'utf8'));
  for(const [,code]of html.matchAll(/<script\b(?![^>]*application\/json)[^>]*>([\s\S]*?)<\/script>/g))new Function(code);
  for(let i=0;;i++){try{fs.writeFileSync(full,html);break}catch(e){if(i>14)throw e;sleep(800)}}
  console.log(file+': slide 3 updated');
 }
}
