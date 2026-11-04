const fs=require('node:fs');
const path=require('node:path');
// Slide 9: kickoff agreement items, organised against the LH 모듈러주택 업무매뉴얼(2025.5).
const rows=[
 ['과업 범위·성과품',['65㎡(3·4모듈)·75㎡(4모듈) 평면/단면/접합상세도, 모듈 분할·배치도','모듈 간·모듈–코어·모듈–하부구조 접합부 구조 안정성 검토','MEP 모듈화(PD 포함), 기밀·방수·단열 상세, 공장 제작률 70% 검토'],'성과품 목록 확정<br>제작률 산정 방식 정의'],
 ['설계 기준',['GS건설 특허기술 적용 범위 및 활용 조건','주택건설기준 등에 관한 규정, 건축법, 건축구조기준, 내화구조 기준','LH 모듈러주택 업무매뉴얼 및 LH 설계기준'],'특허 적용 방침 확인<br>적용 기준 목록 확정'],
 ['모듈 조건',['운송: 모듈 폭 3.3m 이하, 차량 포함 높이 4.2~4.5m·중량 40t 이하','양중 장비·진입로 조건, 3·4모듈 간 단위모듈 규격 통일'],'운송 경로·양중 조건 확인'],
 ['성능 목표',['바닥충격음: 층간소음 사후확인제 기준 목표 등급(49dB)','단열: 에너지절약형 친환경 주택 기준(적용 지역 가정)'],'목표 등급·적용 지역 합의'],
 ['일정·보고',['5개월 과업 일정, 착수·완료보고 외 중간 검토 회의 주기, 의사결정 창구'],'정례 회의 일정 확정'],
];
const body=rows.map(([k,items,f])=>`<tr><td>${k}</td><td><ul>${items.map(i=>`<li>${i}</li>`).join('')}</ul></td><td>&nbsp;</td></tr>`).join('');
const section=`<section class="slide lh-slide" id="slide-9"><header><span>LH 모듈러주택 중대형평면 개발 연구용역</span><span>DECISIONS & NEXT STEPS</span></header><h2>KICK-OFF시 합의할 사항</h2><div class="slide-body lh-body"><table class="lh-table dec-table"><thead><tr><th>구분</th><th>협의 내용</th><th>Follow up</th></tr></thead><tbody>${body}</tbody></table></div><footer><span>중대형평면 개발 · KICK-OFF / 협의용 초안</span><span>09 / 9</span></footer></section>`;
const css=`
#slide-9 .dec-table th:nth-child(1){width:17%}
#slide-9 .dec-table th:nth-child(2){width:59%}
#slide-9 .dec-table th:nth-child(3){width:24%}
#slide-9 .lh-body{justify-content:flex-start}
#slide-9 .dec-table{margin-top:6px;height:calc(100% - 6px)}
#slide-9 .dec-table th{height:54px;padding:12px 20px;font-size:23px}
#slide-9 .dec-table td{height:auto;padding:14px 22px;font-size:20px;line-height:1.55;vertical-align:middle;word-break:keep-all}
#slide-9 .dec-table td:first-child{font-size:21px;color:#17324D;text-align:center}
#slide-9 .dec-table td:last-child{color:#007F78;font-weight:500}
#slide-9 .dec-table ul{margin:0;padding:0;list-style:none}
#slide-9 .dec-table li{position:relative;padding-left:14px}
#slide-9 .dec-table li:before{content:'';position:absolute;left:0;top:.62em;width:5px;height:5px;background:#007F78}
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
  for(let i=0;;i++){try{fs.writeFileSync(full,html);break}catch(e){if(i>9)throw e;sleep(700)}}
  console.log(file+': slide 9 updated');
 }
}
