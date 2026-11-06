const fs=require('node:fs');
const path=require('node:path');
// Slide 9: 적용 기준 (design conditions GS건설 applies) and 요청 사항 (what we ask LH to agree on).
const basis=[
 ['건축설계',['GS건설 특허기술 적용 범위 및 활용 조건','주택건설기준 등에 관한 규정, 건축법, 건축구조기준, 내화구조 기준','LH 모듈러주택 업무매뉴얼 및 LH 설계기준']],
 ['모듈 조건',['모듈 폭 3.3m 이하로 적용','모듈 길이는 12m 이하로 운송이 가능한 모듈 사이즈 적용']],
 ['성능 목표',['바닥충격음: 층간소음 사후확인제 기준 목표 등급(49dB)','단열: 에너지절약형 친환경 주택 기준(적용 지역 가정)']],
];
const asks=[
 ['정기회의',['착수/보고 외 필요 시 회의 진행']],
];
const ul=items=>`<ul>${items.map(i=>`<li>${i}</li>`).join('')}</ul>`;
const basisRows=basis.map(([k,items],i)=>`<tr>${i?'':`<td class="dec-group" rowspan="${basis.length}">설계 조건</td>`}<td class="dec-item">${k}</td><td>${ul(items)}</td></tr>`).join('');
const askRows=asks.map(([k,items])=>`<tr><td class="dec-item">${k}</td><td>${ul(items)}</td></tr>`).join('');
const section=`<section class="slide lh-slide dec-view" id="slide-9"><header><span>LH 모듈러주택 중대형평면 개발 연구용역</span><span>DECISIONS & NEXT STEPS</span></header><h2 class="dec-h">적용 기준</h2><div class="slide-body lh-body"><table class="lh-table dec-table dec-basis"><thead><tr><th>구분</th><th>구분</th><th>협의 내용</th></tr></thead><tbody>${basisRows}</tbody></table><h3 class="dec-h">요청 사항</h3><table class="lh-table dec-table dec-ask"><thead><tr><th>구분</th><th>협의 내용</th></tr></thead><tbody>${askRows}</tbody></table></div><footer><span>중대형평면 개발 · KICK-OFF / 협의용 초안</span><span>09 / 9</span></footer></section>`;
const css=`
#slide-9.dec-view>h2.dec-h{font-size:36px!important;margin:22px 0 0 -6px!important}
#slide-9 .dec-h{display:flex;align-items:center;gap:12px;color:#17324D;font-weight:700}
#slide-9 .dec-h:before{content:'';width:26px;height:26px;background:#17324D;flex:none}
#slide-9 .lh-body>h3.dec-h{margin:34px 0 0 -6px;font-size:36px;line-height:1.3}
#slide-9 .lh-body{justify-content:flex-start;gap:0}
#slide-9 .lh-table.dec-table{margin-top:14px;border-collapse:collapse;height:auto}
#slide-9 .lh-table.dec-basis{margin-top:-10px}
#slide-9 .lh-table.dec-table th{height:54px;padding:8px 18px;font-size:24px}
#slide-9 .lh-table.dec-table td{height:96px;padding:8px 22px;font-size:19px;line-height:1.3;vertical-align:middle;word-break:keep-all;background:#FFFFFF!important;border-bottom:1px solid #E8EEF4;font-weight:400;color:#283442}
#slide-9 .lh-table.dec-basis th:nth-child(1){width:15%}
#slide-9 .lh-table.dec-basis th:nth-child(2){width:18.3%}
#slide-9 .lh-table.dec-basis th:nth-child(3){width:66.7%}
#slide-9 .lh-table.dec-ask th:nth-child(1){width:15%}
#slide-9 .lh-table.dec-ask th:nth-child(2){width:85%}
#slide-9 .lh-table.dec-table td.dec-group{background:#E8EEF4!important;text-align:center;font-size:23px;font-weight:700;color:#17324D}
#slide-9 .lh-table.dec-table td.dec-item{text-align:center;font-size:23px;font-weight:700;color:#17324D}
#slide-9 .dec-table ul{margin:0;padding:0;list-style:none}
#slide-9 .dec-table li{position:relative;padding-left:36px}
#slide-9 .dec-table li:before{content:'';position:absolute;left:12px;top:.5em;width:6px;height:6px;background:#283442}
`;
function update(html){
 const re=/<section class="[^"]*slide[^"]*" id="slide-9">[\s\S]*?<\/section>/;
 if(!re.test(html))throw Error('Slide 9 missing');
 html=html.replace(re,()=>section).replace(/<style id="lh-dec-nine">[\s\S]*?<\/style>/g,'');
 return html.replace('</head>',()=>`<style id="lh-dec-nine">${css}</style></head>`);
}
module.exports={update};
if(require.main===module){
 const sleep=ms=>Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0,0,ms);
 for(const file of ['LH_모듈러_Kickoff.html','LH_색상표적용.html','LH_색상적용_시안.html','lh-kickoff-public/index.html']){
  const full=path.join(__dirname,file);if(!fs.existsSync(full))continue;
  const html=update(fs.readFileSync(full,'utf8'));
  for(const [,code]of html.matchAll(/<script\b(?![^>]*application\/json)[^>]*>([\s\S]*?)<\/script>/g))new Function(code);
  for(let i=0;;i++){try{fs.writeFileSync(full,html);break}catch(e){if(i>14)throw e;sleep(800)}}
  console.log(file+': slide 9 updated');
 }
}
