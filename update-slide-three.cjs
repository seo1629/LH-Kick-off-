const fs=require('node:fs');
const path=require('node:path');
const section=`<section class="slide lh-slide osc-view" id="slide-3"><header><span>LH 모듈러주택 중대형평면 개발 연구용역</span><span>POE DIAGNOSIS</span></header><h2>기존 LH주택의 공간불만과 생활하자에서 출발하는 검토 과제</h2><div class="slide-body lh-body"><p class="lead osc-lead">OSC 주택 만족도는 2022년 41.9%에서 2026년 53.8%로 꾸준히 높아졌지만, 2024년 POE에서는 60㎡ 이상 주택의 <b>세탁·욕실·주방 공간</b> 불만과 함께, 개구부·외기에 면한 부위의 <b>결로·단열 불량</b>, 철골 기둥 노출에 따른 <b>실내 이질감</b> 등 모듈러 주택의 생활하자가 여전히 확인됩니다.</p><div class="osc-board"><p class="osc-label"><b>① 공간불만</b> 공급면적 60㎡ 이상 거주자 응답(30세대)</p><article class="osc-key"><h3>60㎡ 이상 세대 만족도</h3><p class="osc-num">16.7%</p><p class="osc-sub">LH 아파트 평균 63%</p></article><article><h3>불만 공간 1위 · 세탁실/다용도실</h3><p class="osc-num">56.7%</p><p class="osc-desc">60㎡ 이상 거주자는 더 넓은 세탁실·다용도실을 원함</p></article><article><h3>불만 공간 2위 · 욕실</h3><p class="osc-num">46.7%</p><p class="osc-desc">불만사항은 좁은 면적, 환풍기 환기 미흡, 샤워부스 유리벽 미설치</p></article><article><h3>불만 공간 3위 · 주방/식당</h3><p class="osc-num">20.0%</p><p class="osc-desc">불만사항은 조리공간 협소, 좁은 면적, 싱크대 사이즈 협소</p></article><p class="osc-label"><b>② 생활하자</b> 스틸모듈러 거주자 대상으로 조사(39세대)</p><article class="osc-key"><h3>모듈러 만족도</h3><p class="osc-num">48.7%</p><p class="osc-sub">RC 주택 63.4%</p><p class="osc-sub osc-gh">강화신문2단지 72.7%</p></article><article><h3>모듈러임을 인지</h3><p class="osc-num">82.1%</p><p class="osc-desc">실내에서 드러나는 철골 기둥 등 내부 공간에서 이질감을 느낌</p></article><article><h3>결로 발생</h3><p class="osc-num">15.4%</p><p class="osc-desc">벽·발코니·창문에서 발생, 접합부 기밀성 저하 우려</p></article><article><h3>단열 불량</h3><p class="osc-num">7.8%</p><p class="osc-desc">모듈러는 창문 등 개구부에 집중됨</p></article></div><p class="osc-sources">※ 연도별 LH POE OSC 주택 만족도: 2022년 41.9%(43명) → 2024년 46.4%(69명) → 2026년 53.8%<br>출처: LH 토지주택연구원, 「거주 후 평가 2024 POE 결과를 반영한 LH 주택 계획방향」<br>&nbsp; &nbsp; &nbsp; &nbsp; ※ 모듈러 POE 대상 단지: 천안두정 공공주택(준공 : 2019년), 옹진백령 공공주택(준공 : 2020년) 2개 단지 조사<br>출처: LH 토지주택연구원 모듈러 거주자 인식 조사 자료 : 강화신문2단지(33세대)</p></div><footer><span>중대형평면 개발 · KICK-OFF / 협의용 초안</span><span>03 / 9</span></footer></section>`;
const css=`
#slide-3.osc-view{background:#F5F7FA;color:#283442}
#slide-3.osc-view>header span{font-size:24px;letter-spacing:0;text-transform:none;color:#17324D}
#slide-3.osc-view>header span:first-child{font-weight:700}
#slide-3.osc-view>h2{color:#17324D;font-weight:700}
#slide-3.osc-view .lh-body{gap:8px}
#slide-3.osc-view .osc-lead{font-size:23px;line-height:1.45;color:#283442;margin:0;word-break:keep-all}
.osc-lead b{color:#007F78;font-weight:700}
.osc-board{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px 20px;margin-top:16px}
.osc-label{grid-column:2/span 3;margin:0;font-size:21px;color:#283442;word-break:keep-all}
.osc-label b{font-size:31px;color:#17324D;font-weight:700;margin-right:8px}
.osc-board article{display:flex;flex-direction:column;padding:12px 22px 10px;background:#FFFFFF;border-top:6px solid #007F78;min-width:0}
.osc-board article.osc-key{background:#17324D;border-top-color:#007F78}
.osc-board h3{margin:0;font-size:22px;line-height:1.3;color:#17324D;font-weight:700;word-break:keep-all}
.osc-num{margin:4px 0 6px;font-size:50px;line-height:1.1;color:#17324D;font-weight:700}
.osc-desc{margin:0;font-size:17px;line-height:1.45;color:#283442;word-break:keep-all}
.osc-key h3,.osc-key .osc-num{color:#FFFFFF}
.osc-key .osc-num{font-size:52px}
.osc-sub{margin:0;font-size:18px;color:#D4DFE8}
.osc-sub.osc-gh{margin-top:2px;color:#7FC4BC;font-weight:700}
.osc-sources{font-size:15px;line-height:1.35;color:#283442;margin:0}
@media(max-width:700px){.osc-board{grid-template-columns:1fr 1fr}.osc-label{grid-column:1/-1}.osc-num{font-size:40px}.osc-key .osc-num{font-size:44px}}
`;
function update(html){
 if(!/<section class="[^"]*slide[^\"]*" id="slide-3">/.test(html))throw Error('Slide 3 missing');
 html=html.replace(/<section class="[^"]*slide[^\"]*" id="slide-3">[\s\S]*?<\/section>/,section);
 html=html.replace(/<style id="lh-osc-three">[\s\S]*?<\/style>/g,'');
 return html.replace('</head>',`<style id="lh-osc-three">${css}</style></head>`);
}
module.exports={update};
if(require.main===module){
 for(const file of ['LH_모듈러_Kickoff.html','LH_색상표적용.html','LH_색상적용_시안.html','lh-kickoff-public/index.html']){
  const full=path.join(__dirname,file);if(!fs.existsSync(full))continue;
  const html=update(fs.readFileSync(full,'utf8'));
  for(const [,code]of html.matchAll(/<script\b(?![^>]*application\/json)[^>]*>([\s\S]*?)<\/script>/g))new Function(code);
  fs.writeFileSync(full,html);console.log(file+': slide 3 updated');
 }
}
