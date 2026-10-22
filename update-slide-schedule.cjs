const fs=require('node:fs');
const path=require('node:path');
// Schedule slide: inserted before the last slide (decisions), then every slide id and page number is renumbered.
// Bars use half-month units: 0 = start of work, 10 = end of month 5. a = plan, b = MEP/finish, c = common.
const rows=[
 ['착수 및 기준 정리','c',0,2],
 ['65㎡ 평면 개발(3모듈)','a',2,4],
 ['65㎡ 평면 개발(4모듈)','a',3,6],
 ['75㎡ 평면 개발(4모듈)','a',4,7],
 ['구조, MEP 접합 검토','b',5,8],
 ['내부 마감 검토','b',6,8],
 ['종합 정리','c',6,10]
];
const milestones=[['착수보고',0],['완료보고',10]];
const section=`<section class="slide lh-slide sched-view" id="slide-0"><header><span>LH 모듈러주택 중대형평면 개발 연구용역</span><span>SCHEDULE</span></header><h2>추진일정 : 착수일로부터 5개월</h2><div class="slide-body lh-body"><div class="sch"><div class="sch-row sch-head"><p class="sch-task">구분</p><div class="sch-lane">${[1,2,3,4,5].map(m=>`<span>M${m}</span>`).join('')}</div></div>${rows.map(([t,c,s,e])=>`<div class="sch-row"><p class="sch-task">${t}</p><div class="sch-lane"><i class="sch-bar sch-${c}" style="--s:${s};--e:${e}"></i></div></div>`).join('')}<div class="sch-row sch-ms-row"><p class="sch-task">보고</p><div class="sch-lane">${milestones.map(([t,s])=>`<b class="sch-ms" style="--s:${s}"><em>${t}</em></b>`).join('')}</div></div></div><div class="sch-legend"><span class="sch-a">: 평면개발</span><span class="sch-b">: MEP 및 마감검토</span><span class="sch-c">: 공통</span></div></div><footer><span>중대형평면 개발 · KICK-OFF / 협의용 초안</span><span>00 / 0</span></footer></section>`;
const css=`
.sched-view>header span{font-size:24px;letter-spacing:0;text-transform:none;color:#17324D}
.sched-view>header span:first-child{font-weight:700}
.sched-view>h2{color:#17324D;font-weight:700}
.sched-view .lh-body{gap:16px}
.sch{display:flex;flex-direction:column;background:#FFFFFF;border-top:5px solid #007F78}
.sch-row{display:grid;grid-template-columns:360px minmax(0,1fr);align-items:stretch;min-height:64px;border-bottom:1px solid #E8EDF2}
.sch-row:last-child{border-bottom:0}
.sch-task{display:flex;align-items:center;margin:0;padding:0 24px 0 48px;font-size:23px;line-height:1.3;color:#283442;word-break:keep-all}
.sch-lane{position:relative;min-height:64px;background:repeating-linear-gradient(90deg,transparent 0 calc(20% - 1px),#E8EDF2 calc(20% - 1px) 20%)}
.sch-lane::before{content:'';position:absolute;left:0;top:0;bottom:0;width:1px;background:#E8EDF2}
.sch-head,.sch-head .sch-lane{min-height:44px}
.sch-head .sch-task{font-size:21px;color:#283442}
.sch-head .sch-lane{display:grid;grid-template-columns:repeat(5,1fr);align-items:center;text-align:center;font-size:21px;font-weight:700;color:#17324D}
.sch-bar{position:absolute;top:50%;height:22px;transform:translateY(-50%);left:calc(var(--s) * 10%);width:calc((var(--e) - var(--s)) * 10%);border-radius:11px}
.sch-a{background:#007F78}.sch-b{background:#283442}.sch-c{background:#5E7187}
.sch-ms{position:absolute;top:50%;left:calc(var(--s) * 10%);display:flex;align-items:center;gap:4px;transform:translateY(-50%)}
.sch-ms::before{content:'';flex:none;width:22px;height:22px;background:#B8610A;transform:translateX(-50%) rotate(45deg)}
.sch-ms em{font-style:normal;font-size:21px;color:#283442;white-space:nowrap;transform:translateY(-6px)}
.sch-ms[style*="--s:10"]{flex-direction:row-reverse;gap:16px;transform:translate(-100%,-50%)}
.sch-ms[style*="--s:10"]::before{transform:translateX(-6px) rotate(45deg)}
.sch-legend{display:flex;gap:28px;font-size:21px;color:#283442}
.sch-legend span{display:flex;align-items:center;gap:8px;background:none}
.sch-legend span::before{content:'';width:84px;height:14px;border-radius:7px}
.sch-legend .sch-a::before{background:#007F78}.sch-legend .sch-b::before{background:#283442}.sch-legend .sch-c::before{background:#5E7187}
@media(max-width:700px){.sch-row{grid-template-columns:150px minmax(0,1fr)}.sch-task{font-size:15px;padding-left:12px}.sch-legend span::before{width:40px}}
`;
function update(html){
 const any=/<section class="[^"]*slide[^"]*" id="slide-\d+">[\s\S]*?<\/section>/g;
 if(/<section class="[^"]*sched-view[^"]*"/.test(html)){
  html=html.replace(/<section class="[^"]*sched-view[^"]*" id="slide-\d+">[\s\S]*?<\/section>/,()=>section);
 }else{
  const all=[...html.matchAll(any)];const last=all[all.length-1];
  html=html.slice(0,last.index)+section+html.slice(last.index);
 }
 const count=[...html.matchAll(any)].length;let k=0;
 html=html.replace(any,sec=>{k++;return sec.replace(/id="slide-\d+"/,`id="slide-${k}"`).replace(/<span>\d+ \/ \d+<\/span><\/footer>/,`<span>${String(k).padStart(2,'0')} / ${count}</span></footer>`);});
 html=html.replace(/<style id="lh-schedule">[\s\S]*?<\/style>/g,'');
 return html.replace('</head>',()=>`<style id="lh-schedule">${css}</style></head>`);
}
module.exports={update};
if(require.main===module){
 for(const file of ['LH_모듈러_Kickoff.html','LH_색상표적용.html','LH_색상적용_시안.html','lh-kickoff-public/index.html']){
  const full=path.join(__dirname,file);if(!fs.existsSync(full))continue;
  const html=update(fs.readFileSync(full,'utf8'));
  for(const [,code]of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g))new Function(code);
  fs.writeFileSync(full,html);console.log(file+': schedule slide updated');
 }
}
