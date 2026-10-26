const fs=require('node:fs');
const path=require('node:path');
const root=__dirname;
const paletteFile='D:/03.상품개발/04.상품개발/LH 중대형 평면개발/KICK-off/색상표.md';
const md=fs.readFileSync(paletteFile,'utf8');
const required=['#17324D','#007F78','#F5F7FA','#283442','#B86A08','#61758A','#E5F2EF','#E8EEF4','#FFFFFF'];
for(const color of required)if(!md.toUpperCase().includes(color))throw Error('색상표 확인 필요: '+color);
let html=fs.readFileSync(path.join(root,'LH_색상적용_시안.html'),'utf8');
html=html.replace(/<style id="lh-palette">[\s\S]*?<\/style>/g,'');
const css=`
:root{--lh-base:#17324D;--lh-accent:#007F78;--lh-bg:#F5F7FA;--lh-text:#283442;--lh-warning:#B86A08;--lh-muted:#61758A;--lh-tint:#E5F2EF;--lh-row:#E8EEF4;--lh-card:#FFFFFF;--ink:#283442;--paper:#F5F7FA}
.lh-slide,#slide-2.color-purpose{background:var(--lh-bg);color:var(--lh-text)}
.lh-slide>h2,.lh-slide h3,#slide-2.color-purpose>h2,.purpose-cards h3{color:var(--lh-base)}
.lh-slide header,#slide-2.color-purpose header{color:var(--lh-base);border-bottom-color:var(--lh-base)}
.lh-slide header span:last-child,.lh-slide footer,#slide-2.color-purpose header span:last-child,#slide-2.color-purpose footer,.lh-note,.purpose-detail{color:var(--lh-muted)}
.lh-tag,.lh-eyebrow,.purpose-cards .purpose-label{color:var(--lh-accent)}
.lh-cards article,.purpose-cards article{background:var(--lh-card);border-color:#D4DFE8;border-top-color:var(--lh-accent)}
.lh-cards p,.purpose-cards ul,.purpose-copy{color:var(--lh-text)}
.purpose-cards article.purpose-goal{background:var(--lh-tint);border-color:#B7D8D1;border-top-color:var(--lh-accent)}
.purpose-cards li::marker{color:var(--lh-accent)}
.lh-table{color:var(--lh-text)}.lh-table th{background:var(--lh-base);color:var(--lh-card)}.lh-table td{border-bottom-color:#CCD7E1}.lh-table tbody tr{background:var(--lh-card)}.lh-table tbody tr:nth-child(even){background:var(--lh-row)}
.lh-hero{color:var(--lh-base)}.lh-hero span{color:var(--lh-text)}.lh-pills span{border-color:#B7D8D1;background:var(--lh-tint);color:var(--lh-accent)}
.lh-modules{background:var(--lh-row)}.lh-modules>div{background:var(--lh-tint);border-color:var(--lh-accent);color:var(--lh-base)}
.lh-placeholder{background:var(--lh-row);border-color:var(--lh-muted)}.lh-placeholder strong,.lh-target strong{color:var(--lh-accent)}.lh-placeholder small,.lh-target small{color:var(--lh-muted)}
.lh-model-layout aside{background:var(--lh-tint)}.lh-model-layout p{color:var(--lh-text)}.lh-model-layout p.lh-note{color:var(--lh-muted)}
.lh-org-top{background:var(--lh-base);color:var(--lh-card);border-color:var(--lh-base)}.lh-org-top h3,.lh-org-top p{color:var(--lh-card)}
.lh-org-lead{background:var(--lh-tint);border-color:var(--lh-accent)}.lh-org-lead p:last-child{color:var(--lh-muted)}
.lh-org-stem,.lh-org-teams:before,.lh-org-teams article:before{background:var(--lh-muted)}.lh-org-teams article{background:var(--lh-row);border-color:#CCD7E1}.lh-org-teams article p:last-child{color:var(--lh-text)}
.lh-pending{color:var(--lh-warning);font-weight:600}
.model-tools button,.model-tools label{border-color:var(--lh-accent);color:var(--lh-accent)}.model-tools label,.model-tools [aria-pressed=true]{background:var(--lh-accent);color:var(--lh-card)}.model-name{color:var(--lh-muted)}
.template-scene{background:var(--lh-row)}
[contenteditable=true]:focus{outline-color:var(--lh-accent);background:var(--lh-tint)}
.moving-elements #stage [data-edit-id]:hover,.moving-elements #stage .move-picked{outline-color:var(--lh-warning)}
#inline-toggle[aria-pressed=true]{background:var(--lh-accent);color:white}#move-toggle[aria-pressed=true]{background:var(--lh-warning);color:white}
#alignment-menu,#alignment-menu option,#alignment-menu optgroup{color:#17324D!important;background:#FFFFFF!important;-webkit-text-fill-color:#17324D}
@media print{.lh-slide,#slide-2.color-purpose{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
`;
html=html.replace('</head>',`<style id="lh-palette">${css}</style></head>`);
html=html.replace(/<title>[\s\S]*?<\/title>/,'<title>LH Kick-off · 색상표 적용본</title>');
// Status cells remain editable; only their presentation class changes.
html=html.replace(/<td>(협의 필요|자료 필요|우선 합의)<\/td>/g,'<td class="lh-pending">$1</td>');
for(const [,code]of html.matchAll(/<script\b(?![^>]*application\/json)[^>]*>([\s\S]*?)<\/script>/g))new Function(code);
fs.writeFileSync(path.join(root,'LH_색상표적용.html'),html);
fs.writeFileSync(path.join(root,'LH_색상적용_시안.html'),html);
fs.writeFileSync(path.join(root,'색상표_적용기준.md'),md);
console.log('색상표 적용 완료: '+path.join(root,'LH_색상표적용.html'));
console.log('장표 수: '+[...html.matchAll(/<section class="slide /g)].length);
