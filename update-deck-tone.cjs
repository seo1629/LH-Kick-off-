const fs=require('node:fs');
const path=require('node:path');
// Deck-wide tone & manner from "LH 중대형 표준평면 Kick-off보고서_rev01.pptx":
// Noto Sans KR, #F5F7FA background, project name header with a full-width rule, bold navy titles,
// white cards with a teal top rule, #283442 table headers with #E8EEF4 banding, teal org chart, no footer.
// Palette: 기본 #17324D, 강조 #007F78, 본문 #283442, 보조 #61758A / #B86A08, 보조 배경 #E8EEF4.
const project='LH 모듈러주택 중대형평면 개발 연구용역';
const cover=`<section class="slide lh-slide cover-view" id="slide-1"><div class="cv"><p class="cv-project">${project}</p><h2 class="cv-title">KICK-OFF</h2><p class="cv-sub">3·4 모듈 조합으로 만드는 중대형 주거</p><p class="cv-date">2026.11.XX</p></div></section>`;
const font='<link id="lh-tone-font" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap">';
const css=`
.lh-slide{background:#F5F7FA!important;color:#283442;font-family:'Noto Sans KR',Deck,'Apple SD Gothic Neo',sans-serif}
.lh-slide>footer{display:none!important}
.lh-slide>h2{color:#17324D!important;font-weight:700!important}
.lh-slide .lh-note{color:#61758A}
@media(min-width:701px){
.lh-slide{padding:22px 48px 40px}
.lh-slide>header{height:auto;margin:0 -48px;padding:0 50px 20px 42px;border-bottom:2px solid #1E2630}
.lh-slide>header span{font-size:27px!important;letter-spacing:0!important;text-transform:none!important;color:#1E2630!important;font-weight:400!important}
.lh-slide>header span:first-child{font-weight:700!important}
.lh-slide>h2{font-size:48px!important;line-height:1.3!important;margin:24px 0 0 -6px!important}
}
.cover-view .cv{position:absolute;inset:0;padding:110px 88px;color:#17324D}
.cv-project{margin:0;font-size:54px;line-height:1.3;font-weight:400}
.cover-view .cv-title{margin:28px 0 0;font-size:118px!important;line-height:1.05!important;font-weight:700!important;letter-spacing:.01em}
.cv-sub{margin:10px 0 0;font-size:34px;line-height:1.4}
.cv-date{position:absolute;left:0;right:0;bottom:165px;margin:0;text-align:center;font-size:34px}
.lh-slide .lh-cards article{background:#FFFFFF;border-top:4px solid #007F78;padding:24px 26px}
#slide-2 .lh-cards article:nth-child(3){background:#DCEBEE}
.lh-slide .lh-tag{font-size:17px;letter-spacing:.04em;color:#61758A}
.lh-slide .lh-cards h3{margin:8px 0 12px;font-size:27px;font-weight:700;color:#17324D}
.lh-slide .lh-cards p{font-size:21px;line-height:1.55;color:#283442}
.lh-slide .lh-table th{background:#283442;color:#FFFFFF;font-weight:700;text-align:center;font-size:24px}
.lh-slide .lh-table td{border-bottom:0;color:#283442;background:#FFFFFF}
.lh-slide .lh-table tr:nth-child(even) td{background:#E8EEF4}
.lh-slide .lh-table td:first-child{font-weight:700}
.lh-slide .lh-table td+td{border-left:1px solid #E8EEF4}
.lh-org-top,.lh-org-lead,.lh-org-teams article{border:0!important}
.lh-slide .lh-org-top{background:#007F78;color:#FFFFFF}
.lh-slide .lh-org-lead,.lh-slide .lh-org-teams article{background:#A9D3D2;color:#17324D}
.lh-slide .lh-org h3{font-weight:700;color:inherit}
.lh-slide .lh-org-stem{background:#17324D}
.ov-cards p+p{margin-top:12px}
.ov-cards small{font-size:.85em;color:#61758A}
#slide-2 .lh-table th:nth-child(1){width:20%}
#slide-2 .lh-table th:nth-child(2){width:46%}
#slide-2 .lh-body{gap:18px}
#slide-2 .lh-cards article{padding:18px 22px}
#slide-2 .lh-cards h3{font-size:24px;margin:4px 0 8px}
#slide-2 .lh-cards p{font-size:19px;line-height:1.45}
#slide-2 .lh-table th{padding:12px 20px}
#slide-2 .lh-table td{font-size:21px;line-height:1.45;padding:12px 20px}
#slide-9 .lh-table th:nth-child(1){width:22%}
#slide-9 .lh-table th:nth-child(2){width:45%}
#slide-9 .lh-table td{height:62px;padding:0 20px}
#slide-9 .lh-table th{padding:14px 20px}
.lh-slide .lh-org{justify-content:center}
.lh-slide .lh-org-top,.lh-slide .lh-org-lead{width:300px;padding:16px 20px}
.lh-slide .lh-org h3{font-size:30px;line-height:1.3}
.lh-slide .lh-org-stem{height:70px}
.lh-slide .lh-org-teams{grid-template-columns:repeat(4,minmax(0,1fr));gap:110px;padding-top:50px}
.lh-slide .lh-org-teams:before{left:calc((100% - 330px) / 8);right:calc((100% - 330px) / 8);top:0;background:#17324D}
.lh-slide .lh-org-teams article{min-height:0;padding:20px 16px}
.lh-slide .lh-org-teams article:before{height:50px;top:-50px;background:#17324D}
.review-view .review-number{font-weight:700}
.review-view .review-grid h3{font-weight:700}
.review-view .review-question{font-weight:400;color:#17324D}
.pd-view .pd-model{background:#DCEBEE;border-top:0}
.pd-view .pd-spec,.pd-view .pd-feat{background:#FFFFFF;border-top:5px solid #007F78}
.pd-view .pd-label{color:#007F78}
.pd-view .pd-big{color:#17324D}
.pd-view .pd-sub{color:#61758A}
.pd-view .pd-track figure>button{background:#DCEBEE}
`;
function update(html){
 html=html.split('<span>LH · MODULAR HOUSING</span>').join(`<span>${project}</span>`);
 const re=/<section class="[^"]*slide[^"]*" id="slide-1">[\s\S]*?<\/section>/;
 if(!re.test(html))throw Error('Slide 1 missing');
 html=html.replace(re,()=>cover);
 html=html.replace(/<link id="lh-tone-font"[^>]*>/g,'').replace(/<style id="lh-tone">[\s\S]*?<\/style>/g,'');
 return html.replace('</head>',()=>`${font}<style id="lh-tone">${css}</style></head>`);
}
module.exports={update};
if(require.main===module){
 for(const file of ['LH_모듈러_Kickoff.html','LH_색상표적용.html','LH_색상적용_시안.html','lh-kickoff-public/index.html']){
  const full=path.join(__dirname,file);if(!fs.existsSync(full))continue;
  const html=update(fs.readFileSync(full,'utf8'));
  for(const [,code]of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g))new Function(code);
  fs.writeFileSync(full,html);console.log(file+': tone applied');
 }
}
