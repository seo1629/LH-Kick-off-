const fs=require('node:fs');
const path=require('node:path');
const base=fs.readFileSync(path.join(__dirname,'LH_모듈러_Kickoff.html'),'utf8');
const section=`<section class="slide lh-slide color-purpose" id="slide-2">
<header><span>LH 모듈러주택 중대형평면 개발 연구용역</span><span>과업의 개요</span></header>
<h2>과업의 목적</h2>
<div class="slide-body lh-body"><div class="purpose-cards">
<article><p class="purpose-label">BACKGROUND</p><h3>기존 공급의 한계</h3><ul><li>공공임대의 주거품질을 민간 아파트 수준으로 개선<span class="purpose-detail">(1~2Bay → 3~4Bay)</span></li><li>전용 60㎡ 이상 평면에서 3~4인 가구의 중대형 표준평면 부재</li></ul></article>
<article><p class="purpose-label">APPROACH</p><h3>3~4모듈 조합 기반 평면 개발</h3><ul><li>전용 65㎡~75㎡에 맞는 공간 구성과 배치에 맞는 모듈 배치</li><li>퀵커넥터/내화보드 등 모듈러 특화 기술 적용과 제작에 맞는 DfMA 설계 적용</li></ul></article>
<article class="purpose-goal"><p class="purpose-label">GOAL</p><h3>양산성과 경제성을 고려한 표준평면</h3><p class="purpose-copy">전용 60㎡ 이하 소형 중심의 모듈러 주택에서 3~4인 가구를 수용하는 중형 표준평면 부재</p></article>
</div></div><footer><span>과업의 목적</span><span>02 / 13</span></footer></section>`;
const style=`
#slide-2.color-purpose{background:#F5F7FA;color:#283442}
#slide-2.color-purpose header{height:58px;border-bottom:2px solid #17324D;color:#17324D;align-items:flex-start;font-size:27px;letter-spacing:-.035em}
#slide-2.color-purpose header span:last-child{font-size:20px;color:#61758A;padding-top:3px}
#slide-2.color-purpose>h2{color:#17324D;font-size:31px;font-weight:600;margin-top:29px;letter-spacing:-.035em}
#slide-2.color-purpose .slide-body{inset:230px 64px 105px;overflow:visible}
.purpose-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px;align-items:stretch}
.purpose-cards article{background:#FFFFFF;border:1px solid #D4DFE8;border-top:5px solid #007F78;padding:27px 25px 29px;min-height:330px;box-sizing:border-box}
.purpose-cards .purpose-label{color:#007F78;font-size:18px;font-weight:650;letter-spacing:.07em;margin:0 0 15px;line-height:1.25}
.purpose-cards h3{color:#17324D;font-size:25px;font-weight:700;letter-spacing:-.045em;line-height:1.4;margin:0 0 21px;word-break:keep-all}
.purpose-cards ul{margin:0;padding-left:20px;font-size:22px;line-height:1.6;letter-spacing:-.035em;word-break:keep-all}
.purpose-cards li+li{margin-top:20px}.purpose-cards li::marker{color:#007F78}
.purpose-detail{display:block;color:#61758A;font-size:19px;margin-top:3px}
.purpose-cards article.purpose-goal{background:#E5F2EF;border-color:#B7D8D1;border-top-color:#007F78}
.purpose-copy{font-size:22px;line-height:1.65;letter-spacing:-.035em;margin:0;word-break:keep-all}
#slide-2.color-purpose footer{color:#61758A}
@media(max-width:700px){#slide-2.color-purpose header{height:auto;font-size:17px;gap:15px;padding-bottom:15px}#slide-2.color-purpose header span:last-child{font-size:13px;white-space:nowrap}#slide-2.color-purpose .slide-body{position:static}.purpose-cards{grid-template-columns:1fr;gap:20px}.purpose-cards article{min-height:0}.purpose-cards h3{font-size:24px}}
`;
let html=base.replace(/<section class="slide lh-slide" id="slide-2">[\s\S]*?<\/section>/,section);
html=html.replace('</style></head>',style+'</style></head>').replace(/<title>[\s\S]*?<\/title>/,'<title>과업의 목적 · 색상 적용 시안</title>');
for(const [,s]of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g))new Function(s);
const output=path.join(__dirname,'LH_색상적용_시안.html');fs.writeFileSync(output,html);
console.log('Color preview created: '+output);
