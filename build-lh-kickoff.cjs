const fs = require('fs');
const path = require('path');
const source = path.join(__dirname, 'template', '건축제안서_빈템플릿.html');
let html = fs.readFileSync(source, 'utf8');
const originalSlides = [...html.matchAll(/<section class="slide"[\s\S]*?<\/section>/g)].map(m => m[0]);
const modelBlock = originalSlides[3].match(/<div class="slide-body">([\s\S]*)<\/div><footer>/)[1];
const cards = items => `<div class="lh-cards">${items.map(([tag,title,body])=>`<article><span class="lh-tag">${tag}</span><h3>${title}</h3><p>${body}</p></article>`).join('')}</div>`;
const table = (heads,rows) => `<table class="lh-table"><thead><tr>${heads.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
const note = text => `<p class="lh-note">${text}</p>`;
const pages = [
['KICK-OFF MEETING','모듈러 중형 표준평면 개발',`<div class="lh-cover"><p class="lh-eyebrow">LH 요청 과업 · 착수회의 자료 초안</p><p class="lh-hero">65㎡ · 75㎡<br><span>4모듈 조합으로 확장하는 주거</span></p><div class="lh-pills"><span>표준평면 개발</span><span>접합부 검토</span><span>공장 제작률 70% 이상 목표</span></div><p>개발 범위와 공통 기준, 검토 방법과 협업 절차를 합의합니다.</p></div>${note('2026.10.19 작성 · 회의일·참여기관 미정 / 공식 과업명은 과업지시서 확인 후 확정')}`],
['BACKGROUND & GOALS','소형 중심에서 3~4인 가구 대응으로',`<p class="lead">4모듈 조합을 바탕으로, 중형 표준평면의 개발 방향을 설정합니다.</p>${cards([['BACKGROUND','3~4인 가구를 위한 중형 평면 필요','기존 전용 60㎡ 이하 소형 중심에서 주거 선택 범위를 확대합니다.'],['APPROACH','4모듈 조합 기반의 평면 개발','전용 65㎡·75㎡의 공간 구성과 모듈 분할을 함께 검토합니다.'],['GOAL','양산성과 경제성을 고려한 표준평면','두 면적 유형의 공통화 요소를 도출하고 접합·마감 계획과 연계합니다.']])}${note('배경·면적·4모듈 조건: 제공된 과업범위 이미지. 개발 접근과 공통화 방향: 착수 협의를 위한 제안.')}`],
['SCOPE OF WORK','이번 과업에서 개발하고 검토할 것',table(['구분','확인된 과업','착수회의 확인 사항'],[['평면 개발','전용 65㎡·75㎡ 평면 개발<br>4모듈 조합','면적별 대안 수·실 구성·모듈 기준 치수'],['접합부 검토','모듈 간 접합부 구조 안전성 검토<br>접합 디테일 제안','구조·MEP 검토 범위와 분야별 책임'],['마감 검토','공장 제작률 70% 이상 확보를 위한<br>바닥·벽체 마감 방안 제시','제작률 산정 기준·공장/현장 작업 경계']])+note('이미지의 과업 구분: ① 평면개발 ② MEP 접합 및 마감 검토. 위 표는 발표를 위해 세부 업무를 나누어 표현했습니다.')],
['COMMON DESIGN RULES','4모듈 조합의 공통 기준 설정',`<p class="lead">먼저 공통 규칙을 정하고, 면적별 평면 대안을 전개합니다.</p><div class="lh-modules">${[1,2,3,4].map(n=>`<div><b>M0${n}</b><span>모듈 ${n}</span></div>`).join('')}</div>${table(['공통화 검토','유형별 조정 검토','미확정 조건'],[['구조·접합 인터페이스<br>설비 연결·마감 경계','공간 배분·조합 방식<br>65㎡와 75㎡의 공통 부품','폭·길이·높이·구조 방식<br>운송·양중·제작 제약']])}${note('도식은 4개 모듈이라는 조건만 표현한 개념도입니다. 실제 배치·치수·면적 비율을 의미하지 않습니다.')}`],
['STANDARD PLAN / 65㎡','전용 65㎡ 표준평면 개발 방향',`<div class="lh-two"><div class="lh-placeholder"><strong>65㎡</strong><span>기준 평면·대안 도면 삽입 예정</span><small>실 배치와 모듈 분할은 미확정</small></div><div>${cards([['01','공간 요구 정리','3~4인 가구 대응을 위한 실 구성과 생활 동선을 협의합니다.'],['02','4모듈 분할 대안','공간 구성과 모듈 경계, 습식 공간·설비 연결의 관계를 비교합니다.'],['03','평가 기준 합의','면적 기준, 공간 활용, 공통화와 현장 작업을 비교할 평가표를 정합니다.']])}</div></div>${note('전용 65㎡는 확인된 과업 조건입니다. 구체 평면·허용 면적 범위·대안 수는 별도 확인이 필요합니다.')}`],
['STANDARD PLAN / 75㎡','전용 75㎡ 표준평면 개발 방향',`<div class="lh-two"><div class="lh-placeholder"><strong>75㎡</strong><span>기준 평면·대안 도면 삽입 예정</span><small>확장 방식과 공통 부품 검토</small></div><div>${cards([['01','면적 확장 방향','실 구성과 공용·개인 공간의 배분을 요구조건에 맞춰 검토합니다.'],['02','65㎡와의 공통화','모듈·접합·설비 및 마감 구성에서 공통화 가능한 요소를 확인합니다.'],['03','대안별 차이 명확화','단순 면적 확대와 다른 조합 방식의 장단점을 동일 기준으로 비교합니다.']])}</div></div>${note('전용 75㎡는 확인된 과업 조건입니다. 세대 구성·구조 방식·제작 조건을 임의로 확정하지 않습니다.')}`],
['ASSEMBLY & STRUCTURAL JOINTS','모듈 조합과 접합부 구조 안전성',`<div class="lh-model-layout"><div>${modelBlock}</div><aside><span class="lh-tag">3D 검토 영역</span><h3>접합 위치와 검토 범위를 공유</h3><p>정리된 GLB를 불러와 모듈 조합의 입체 관계를 확인합니다.</p><p>• 주요 접합 위치와 하중 전달 관계<br>• 계산·해석·시험의 요구 수준<br>• 검토 책임과 결과 증빙</p><p class="lh-note">현재 모델 미제공.<br>3D 표시 자체는 구조 안전성 검증이 아닙니다.</p></aside></div>`],
['MEP INTERFACES','MEP 접합과 작업 경계를 명확하게',`<p class="lead">연결 위치뿐 아니라 시공 순서와 점검 접근을 함께 검토합니다.</p>${table(['검토 항목','협의 내용','협의 시 지정'],[['설비 연결','배관·배선 등의 접속 위치와 연결 방식','설비 분야 / 제작사'],['모듈 경계','구조 접합·설비 연결·마감의 간섭 여부','구조·설비·건축'],['작업과 점검','공장 선시공 범위와 현장 연결·검사 접근','제작·시공·설비'],['제출 자료','인터페이스 표·접합 상세·검토 기록','분야별 담당자']])}${note('MEP 세부 시스템과 제출 수준은 제안 검토 항목입니다. 과업지시서와 참여 분야 협의를 통해 확정합니다.')}`],
['OFF-SITE FABRICATION','공장 제작률 70% 이상 확보 전략',`<div class="lh-target"><strong>70<span>% 이상</span></strong><p>확보해야 할 목표<br><small>달성 결과가 아닌 과업 조건</small></p></div>${cards([['DEFINE','산정 기준부터 합의','공종·공수·비용·물량 중 어떤 기준을 적용할지 분모·분자와 집계 범위를 정합니다.'],['DIVIDE','공장 / 현장 작업 구분','선시공, 운송 보호, 현장 접합과 보수까지 작업 항목별 경계를 정리합니다.'],['VERIFY','증빙과 개선안 관리','제작사 자료와 공정표를 기반으로 산정하고, 미달 항목의 개선 대안을 비교합니다.']])}${note('70% 산정 방식은 현재 제공 자료에 명시되지 않았습니다. 착수회의의 우선 결정 안건입니다.')}`],
['FLOOR & WALL FINISHES','바닥·벽체 마감과 모듈 경계 처리',`<p class="lead">공장 완성 범위를 높이면서 현장 접합부의 품질을 확보합니다.</p>${table(['영역','제안 검토 항목','성과물 방향'],[['바닥 마감','모듈 경계의 단차·이음·현장 마감 범위<br>운송·양중 중 보호와 손상 보수','바닥 구성 및 경계 접합 개념 상세'],['벽체 마감','벽체 연결부 이음과 현장 마감 범위<br>설비 점검부와 접합 작업 접근','벽체 구성 및 접합 개념 상세'],['공통 검증','공장 제작률 기여도·현장 잔여 작업<br>품질·시공성·유지관리 조건','대안 비교표와 공장/현장 작업표']])}${note('재료·두께·성능 수치와 상세는 미확정입니다. 관계 분야 검토 및 적용 기준 확인 후 구체화합니다.')}`],
['DELIVERY & COORDINATION','양산성·경제성 검토와 추진 체계',table(['단계','주요 작업','성과물 제안'],[['01 기준 정리','요청사항·모듈 제약·평가 기준 합의','요구사항표·검토 기준표'],['02 평면 개발','65㎡·75㎡ 4모듈 조합 대안 비교','평면·분할도·대안 비교표'],['03 통합 검토','구조·MEP 접합 및 마감 검토','접합 상세·분야별 검토 기록'],['04 종합 정리','제작률·양산성·경제성 검토','산정 근거·최종안·잔여 과제']])+note('단계와 성과물은 제안입니다. 착수일·납기·협의 회차·검토 및 승인 주체, 원가 비교 대상은 회의에서 확정합니다.')],
['DECISIONS & NEXT STEPS','오늘 합의할 사항, 다음 회의까지 할 일',table(['결정·확인 안건','현재 상태','회의 기록'],[['면적별 대안 수·실 구성·면적 기준','협의 필요','담당 / 기한: 미정'],['모듈 치수·구조 방식·제작·운송 조건','자료 필요','담당 / 기한: 미정'],['공장 제작률 70%의 산정 방식','우선 합의','담당 / 기한: 미정'],['접합 검토·상세 제출 수준과 분야별 책임','협의 필요','담당 / 기한: 미정'],['일정·성과물 형식·다음 회의 의제','협의 필요','담당 / 기한: 미정']])+note('기초 자료 요청: 전체 과업지시서 · 기준 평면 · 제작사 조건 · 구조/설비 자료 · 정리된 GLB. 본 자료는 착수 협의를 위한 초안입니다.')]
];
pages.splice(11,0,['PROJECT ORGANIZATION','과업 수행 조직 및 역할',`<div class="lh-org"><div class="lh-org-top"><h3>LH · 발주 및 협의</h3><p>담당 부서 / 담당자 미정</p></div><div class="lh-org-stem"></div><div class="lh-org-lead"><h3>과업 총괄</h3><p>총괄 기관 / 책임자 미정</p><p>분야 조정 · 일정 및 성과물 관리</p></div><div class="lh-org-stem"></div><div class="lh-org-teams">${[['건축·평면','65㎡·75㎡ 표준평면 개발'],['구조','접합부 구조 안전성 검토'],['MEP','설비 접합·인터페이스 검토'],['모듈러 제작·DfMA','제작·조립성 및 공장 제작률 검토'],['마감·상세','바닥·벽체 마감 방안 제안']].map(([title,role])=>`<article><h3>${title}</h3><p>기관 / 담당자 미정</p><p>${role}</p></article>`).join('')}</div></div>${note('조직 구성 가안 · 기관명·담당자·역할과 협의 체계는 착수회의에서 확정합니다. 텍스트를 클릭해 수정할 수 있습니다.')}`]);
const sections=pages.map(([label,title,body],i)=>`<section class="slide lh-slide" id="slide-${i+1}"><header><span>LH · MODULAR HOUSING</span><span>${label}</span></header><h2>${title}</h2><div class="slide-body lh-body">${body}</div><footer><span>중형 표준평면 개발 · KICK-OFF / 협의용 초안</span><span>${String(i+1).padStart(2,'0')} / ${pages.length}</span></footer></section>`).join('');
html=html.replace(/<main id="stage">[\s\S]*?<\/main>/,`<main id="stage">${sections}</main>`);
html=html.replace(/<title>[\s\S]*?<\/title>/,'<title>LH 모듈러 중형 표준평면 · Kick-off</title>');
const css=`
.lh-slide{background:#f6f7f3}.lh-slide h2{font-size:48px;letter-spacing:-.045em}.lh-body{display:flex;flex-direction:column;gap:26px;overflow:hidden}.lh-body .lead{font-size:30px;margin:0;line-height:1.5}.lh-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}.lh-cards article{border-top:2px solid #315c4c;background:#eaf0e9;padding:27px 25px;min-width:0}.lh-cards h3{font-size:27px;font-weight:500;margin:17px 0}.lh-cards p{font-size:22px;line-height:1.65;margin:0}.lh-tag,.lh-eyebrow{font-size:15px;letter-spacing:.12em;color:#315c4c}.lh-table{width:100%;border-collapse:collapse;table-layout:fixed;font-size:22px;line-height:1.55}.lh-table th{background:#315c4c;color:white;padding:17px 23px;text-align:left;font-weight:500}.lh-table td{padding:20px 23px;border-bottom:1px solid #cbd5cc;vertical-align:top}.lh-table th:first-child{width:25%}.lh-table tr:nth-child(even){background:#edf1eb}.lh-note{font-size:16px!important;line-height:1.6!important;color:#66756c;margin:0!important;margin-top:auto!important}.lh-cover{padding-top:0}.lh-hero{font-size:94px;line-height:1.2;letter-spacing:-.04em;margin:20px 0 28px;color:#214c3c}.lh-hero span{font-size:49px}.lh-cover>p:last-child{font-size:27px}.lh-pills{display:flex;gap:13px;margin:25px 0}.lh-pills span{border:1px solid #9db2a4;border-radius:30px;padding:12px 24px;font-size:20px}.lh-modules{display:flex;gap:16px;padding:25px;background:#e9efea}.lh-modules>div{flex:1;border:2px solid #779682;background:#dae7db;padding:25px;display:flex;flex-direction:column;gap:12px}.lh-modules b{font-size:42px;font-weight:400}.lh-modules span{font-size:20px}.lh-two{display:grid;grid-template-columns:1fr 1fr;gap:30px;min-height:0;flex:1}.lh-two .lh-cards{display:flex;flex-direction:column;gap:14px}.lh-two .lh-cards article{padding:17px 22px}.lh-two .lh-cards h3{margin:8px 0;font-size:25px}.lh-two .lh-cards p{font-size:20px}.lh-placeholder{border:1px dashed #8da797;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:23px;background:#e8eee6}.lh-placeholder strong{font-size:95px;font-weight:300;color:#315c4c}.lh-placeholder span{font-size:24px}.lh-placeholder small{font-size:18px;color:#738176}.lh-target{display:flex;align-items:center;gap:55px}.lh-target strong{font-size:120px;font-weight:300;color:#315c4c;line-height:1.1}.lh-target strong span{font-size:48px}.lh-target p{font-size:28px;line-height:1.5}.lh-target small{font-size:18px;color:#6b7a70}.lh-model-layout{display:grid;grid-template-columns:2fr 1fr;gap:30px;flex:1;min-height:0}.lh-model-layout>div{min-height:0;display:flex;flex-direction:column}.lh-model-layout aside{padding:25px;background:#e9efea}.lh-model-layout h3{font-size:29px;line-height:1.4;font-weight:500}.lh-model-layout p{font-size:22px;line-height:1.8}.lh-model-layout .template-model{flex:1}.lh-slide footer{font-size:14px}
@media(max-width:700px){.lh-body{overflow:visible}.lh-cards,.lh-two,.lh-model-layout{display:flex;flex-direction:column}.lh-slide h2{font-size:32px}.lh-hero{font-size:62px}.lh-hero span{font-size:30px}.lh-pills{flex-wrap:wrap}.lh-table{font-size:14px}.lh-table td,.lh-table th{padding:10px}.lh-placeholder{min-height:300px}.lh-modules{gap:6px;padding:8px}.lh-modules>div{padding:9px}.lh-modules b{font-size:25px}.lh-modules span{font-size:14px}.lh-model-layout .template-scene{min-height:350px}.lh-target strong{font-size:80px}}
@media print{.lh-body{overflow:hidden}.lh-slide .lh-model-layout .template-scene:after{content:'모델 미제공 · GLB 추가 후 대표 시점 이미지를 별도로 준비하세요'}}`;
html=html.replace('</style></head>',css+`.lh-org{display:flex;flex-direction:column;align-items:center;flex:1;min-height:0}.lh-org h3{margin:0;font-size:24px;font-weight:500;line-height:1.35}.lh-org p{font-size:18px;line-height:1.5;margin:8px 0 0}.lh-org-top,.lh-org-lead{width:470px;text-align:center;border:1px solid #819e8b;padding:18px 24px;background:#e5eee4}.lh-org-top{background:#315c4c;color:#fff}.lh-org-top p{color:#e0ebe3}.lh-org-lead p:last-child{font-size:17px;color:#5a7162}.lh-org-stem{height:25px;width:2px;background:#819e8b;flex-shrink:0}.lh-org-teams{width:100%;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:16px;position:relative;padding-top:25px}.lh-org-teams:before{content:'';position:absolute;top:0;left:10%;right:10%;height:2px;background:#819e8b}.lh-org-teams article{position:relative;border:1px solid #a6b9aa;background:#edf2eb;padding:21px 17px;min-height:170px;text-align:center}.lh-org-teams article:before{content:'';position:absolute;width:2px;height:25px;top:-26px;left:50%;background:#819e8b}.lh-org-teams article h3{font-size:22px}.lh-org-teams article p:last-child{font-size:17px;color:#526b5c}@media(max-width:700px){.lh-org-top,.lh-org-lead{width:100%}.lh-org-teams{grid-template-columns:1fr;gap:12px}.lh-org-teams:before,.lh-org-teams article:before{display:none}.lh-org-teams article{min-height:0}.lh-org{min-height:900px}}</style></head>`);
// Inline text editing uses the template's edit patches and HTML exporter.
html=html.replace("e.target.closest('input,textarea,select')", "e.target.closest('input,textarea,select,[contenteditable=\"true\"]')");
html=html.replace(' applyAll();syncPresentation();refreshHistory();', `
 let inlineEnabled=true;
 const inlineToggle=document.createElement('button');
 inlineToggle.id='inline-toggle';inlineToggle.textContent='직접 수정 켜짐';inlineToggle.setAttribute('aria-pressed','true');
 inlineToggle.title='제목·본문을 클릭해 수정하고, 편집 → 수정본 HTML 저장으로 보관하세요.';
 document.querySelector('.toolbar').append(inlineToggle);
 function inlineMode(){nodes.forEach(el=>{if(el.dataset.editType==='text'){el.contentEditable=String(inlineEnabled);el.spellcheck=false;el.setAttribute('aria-label','직접 수정: '+el.innerText.slice(0,60));}});inlineToggle.textContent=inlineEnabled?'직접 수정 켜짐':'직접 수정 꺼짐';inlineToggle.setAttribute('aria-pressed',String(inlineEnabled));}
 inlineToggle.onclick=()=>{document.activeElement?.blur();inlineEnabled=!inlineEnabled;inlineMode();};
 nodes.forEach((el,id)=>{if(el.dataset.editType!=='text')return;
   let before='';
   el.addEventListener('focus',()=>{before=el.innerText;});
   el.addEventListener('input',()=>{dirty=true;q('#edit-status').textContent='변경사항 있음 · HTML로 저장해 보관하세요.';});
   el.addEventListener('blur',()=>{const text=el.innerText;if(text!==before){update(id,{text});before=text;}});
   el.addEventListener('paste',e=>{if(!inlineEnabled)return;e.preventDefault();const text=e.clipboardData.getData('text/plain');const selection=getSelection();if(!selection.rangeCount)return;const range=selection.getRangeAt(0);if(!el.contains(range.commonAncestorContainer))return;range.deleteContents();const node=document.createTextNode(text);range.insertNode(node);range.setStartAfter(node);range.collapse(true);selection.removeAllRanges();selection.addRange(range);el.dispatchEvent(new Event('input',{bubbles:true}));});
 });
 let moveEnabled=false,drag=null,lastMoved=null,suppressClick=false;
 const picked=new Set();
 const alignSelect=document.createElement('select');alignSelect.id='alignment-menu';alignSelect.setAttribute('aria-label','선택 요소 맞춤');alignSelect.style.cssText='padding:9px 30px 9px 12px;border:1px solid #a5b7aa;border-radius:12px;background:#fafbf8;color:#203d30;font-size:14px;font-weight:600;min-width:250px;max-width:100%;opacity:1;color-scheme:light;flex-shrink:0';
 alignSelect.innerHTML='<option value="">맞춤 · 순서 / Shift+클릭 다중 선택</option><optgroup label="선택 요소 맞춤"><option value="left">왼쪽 맞춤</option><option value="right">오른쪽 맞춤</option><option value="top">위쪽 맞춤</option><option value="bottom">아래쪽 맞춤</option><option value="center">가운데 맞춤 (가로)</option><option value="middle">중간 맞춤 (세로)</option></optgroup><optgroup label="간격 배분"><option value="hspace">가로 간격을 동일하게</option><option value="vspace">세로 간격을 동일하게</option></optgroup><optgroup label="배치 순서"><option value="front">맨 앞으로 가져오기</option><option value="back">맨 뒤로 보내기</option></optgroup><optgroup label="슬라이드 기준"><option value="slide-center">슬라이드 가로 중앙</option><option value="slide-middle">슬라이드 세로 중앙</option></optgroup>';
 const pickedLabel=document.createElement('span');pickedLabel.style.fontSize='12px';
 function showPicked(){nodes.forEach((el,id)=>el.classList.toggle('move-picked',picked.has(id)));pickedLabel.textContent=picked.size?'선택 '+picked.size+'개':'';}
 document.querySelector('.toolbar').append(alignSelect,pickedLabel);
 alignSelect.onchange=()=>{
   const action=alignSelect.value;alignSelect.value='';if(!action)return;
   const stage=document.querySelector('#stage').getBoundingClientRect(),scale=stage.width/1600;
   const items=[...picked].map(id=>({id,el:nodes.get(id)})).filter(x=>x.el?.closest('.slide.active')).map(x=>{const r=x.el.getBoundingClientRect();return {...x,l:(r.left-stage.left)/scale,t:(r.top-stage.top)/scale,w:r.width/scale,h:r.height/scale};});
   const slideAlign=action.startsWith('slide-'),stackAction=action==='front'||action==='back';if(items.length<((slideAlign||stackAction)?1:2)){toast((slideAlign||stackAction)?'요소를 선택하세요.':'위치 이동을 켜고 Shift+클릭으로 두 개 이상 선택하세요.');return;}
   if(stackAction){
     const page=items[0].el.closest('.slide');
     const pageNodes=[...nodes].filter(([,el])=>el.closest('.slide')===page);
     const ordered=pageNodes.map(([id,el],index)=>({id,el,index,z:Number(edits[id]?.zIndex)||0})).sort((a,b)=>a.z-b.z||a.index-b.index);
     const chosen=ordered.filter(x=>picked.has(x.id)),others=ordered.filter(x=>!picked.has(x.id));
     const next=action==='front'?[...others,...chosen]:[...chosen,...others];
     snapshot();next.forEach((x,i)=>{edits={...edits,[x.id]:{...edits[x.id],zIndex:String(i+1)}};apply(x.id);});changed();showPicked();return;
   }
   if((action==='hspace'||action==='vspace')&&items.length<3){toast('간격 배분은 세 개 이상 선택하세요.');return;}
   const left=Math.min(...items.map(x=>x.l)),right=Math.max(...items.map(x=>x.l+x.w)),top=Math.min(...items.map(x=>x.t)),bottom=Math.max(...items.map(x=>x.t+x.h));
   const offsets=new Map(items.map(x=>[x.id,{dx:0,dy:0}]));
   if(action==='hspace'||action==='vspace'){
     const horizontal=action==='hspace',start=horizontal?left:top,end=horizontal?right:bottom;
     const sorted=[...items].sort((a,b)=>horizontal?a.l-b.l:a.t-b.t),gap=(end-start-items.reduce((s,x)=>s+(horizontal?x.w:x.h),0))/(items.length-1);let cursor=start;
     sorted.forEach(x=>{offsets.get(x.id)[horizontal?'dx':'dy']=cursor-(horizontal?x.l:x.t);cursor+=(horizontal?x.w:x.h)+gap;});
   }else items.forEach(x=>{const d=offsets.get(x.id);if(action==='left')d.dx=left-x.l;if(action==='center')d.dx=(left+right-x.w)/2-x.l;if(action==='right')d.dx=right-x.w-x.l;if(action==='top')d.dy=top-x.t;if(action==='middle')d.dy=(top+bottom-x.h)/2-x.t;if(action==='bottom')d.dy=bottom-x.h-x.t;if(action==='slide-center')d.dx=(1600-left-right)/2;if(action==='slide-middle')d.dy=(900-top-bottom)/2;});
   snapshot();items.forEach(x=>{const d=offsets.get(x.id),mx=Math.round(((edits[x.id]?.moveX||0)+d.dx)*10)/10,my=Math.round(((edits[x.id]?.moveY||0)+d.dy)*10)/10;edits={...edits,[x.id]:{...edits[x.id],moveX:mx,moveY:my,transform:'translate('+mx+'px, '+my+'px)'}};apply(x.id);});changed();showPicked();
 };
 document.addEventListener('deck-page-change',()=>{picked.clear();showPicked();});
 const moveToggle=document.createElement('button');moveToggle.id='move-toggle';moveToggle.textContent='위치 이동 꺼짐';moveToggle.setAttribute('aria-pressed','false');
 const resetPosition=document.createElement('button');resetPosition.textContent='선택 위치 복원';resetPosition.disabled=true;
 document.querySelector('.toolbar').append(moveToggle,resetPosition);
 function moveMode(){document.body.classList.toggle('moving-elements',moveEnabled);moveToggle.textContent=moveEnabled?'위치 이동 켜짐':'위치 이동 꺼짐';moveToggle.setAttribute('aria-pressed',String(moveEnabled));nodes.forEach(el=>{if(el.dataset.editType==='text')el.contentEditable=String(inlineEnabled&&!moveEnabled);});}
 moveToggle.onclick=()=>{document.activeElement?.blur();moveEnabled=!moveEnabled;if(moveEnabled&&editing)setMode(false);moveMode();};
 const oldInlineClick=inlineToggle.onclick;inlineToggle.onclick=()=>{oldInlineClick();moveMode();};
 resetPosition.onclick=()=>{if(lastMoved){update(lastMoved,{transform:'translate(0px, 0px)',moveX:0,moveY:0});}};
 document.addEventListener('pointerdown',e=>{
   if(!moveEnabled||e.button!==0||!e.target.closest('#stage'))return;
   const el=e.target.closest('[data-edit-id]');if(!el||e.target.closest('.model-tools'))return;
   e.preventDefault();document.activeElement?.blur();
   const selectedId=el.dataset.editId;
   if(e.shiftKey){if(picked.has(selectedId))picked.delete(selectedId);else picked.add(selectedId);showPicked();return;}
   if(!picked.has(selectedId)){picked.clear();picked.add(selectedId);}showPicked();
   const id=el.dataset.editId,rect=document.querySelector('#stage').getBoundingClientRect();
   drag={id,el,startX:e.clientX,startY:e.clientY,x:edits[id]?.moveX||0,y:edits[id]?.moveY||0,scale:rect.width/1600,moved:false};
   lastMoved=id;resetPosition.disabled=false;showPicked();
 });
 document.addEventListener('pointermove',e=>{if(!drag)return;e.preventDefault();const dx=(e.clientX-drag.startX)/drag.scale,dy=(e.clientY-drag.startY)/drag.scale;drag.nextX=Math.round(drag.x+dx);drag.nextY=Math.round(drag.y+dy);if(Math.abs(dx)+Math.abs(dy)>2)drag.moved=true;drag.el.style.transform='translate('+drag.nextX+'px, '+drag.nextY+'px)';});
 function endDrag(cancel){if(!drag)return;const d=drag;drag=null;if(cancel){apply(d.id);return;}if(d.moved){update(d.id,{transform:'translate('+d.nextX+'px, '+d.nextY+'px)',moveX:d.nextX,moveY:d.nextY});suppressClick=true;setTimeout(()=>{suppressClick=false;},0);}}
 document.addEventListener('pointerup',()=>endDrag(false));document.addEventListener('pointercancel',()=>endDrag(true));window.addEventListener('blur',()=>endDrag(true));
 document.addEventListener('click',e=>{if(suppressClick&&e.target.closest('#stage')){e.preventDefault();e.stopImmediatePropagation();}},true);
 applyAll();syncPresentation();refreshHistory();inlineMode();moveMode();
`);
html=html.replace("'objectFit','objectPosition']", "'objectFit','objectPosition','transform','zIndex']");
html=html.replace('</style></head>',`.moving-elements #stage [data-edit-id]{cursor:grab;touch-action:none;user-select:none;position:relative}.moving-elements #stage [data-edit-id]:hover,.moving-elements #stage .move-picked{outline:2px dashed #b88338;outline-offset:5px}.moving-elements #stage [data-edit-id]:active{cursor:grabbing}#move-toggle[aria-pressed="true"]{background:#a56d24;color:white}[data-edit-id]{position:relative}@media print{.move-picked{outline:none!important}}</style></head>`);
html=html.replace('</style></head>',`.toolbar{max-width:calc(100vw - 24px);width:max-content;box-sizing:border-box;flex-wrap:wrap;justify-content:center;gap:7px;height:auto;padding:10px 14px}.toolbar>*{flex-shrink:0}#alignment-menu,#alignment-menu option,#alignment-menu optgroup{color:#203d30!important;background:#fafbf8!important;-webkit-text-fill-color:#203d30;opacity:1!important}#alignment-menu{display:inline-block!important;visibility:visible!important;line-height:1.4;min-height:40px;appearance:auto!important}.toolbar>span{color:#f0f4f0}@media(max-width:700px){.toolbar{padding:7px;gap:5px}.toolbar button{font-size:12px;padding:7px 9px}#alignment-menu{min-width:230px!important;font-size:13px!important}}@media print{.toolbar{display:none!important}}</style></head>`);
html=html.replace('</style></head>',`[contenteditable="true"]{cursor:text;border-radius:3px}[contenteditable="true"]:hover{outline:1px dashed #779682;outline-offset:5px}[contenteditable="true"]:focus{outline:2px solid #315c4c;outline-offset:5px;background:#e4eee4}#inline-toggle[aria-pressed="true"]{background:#315c4c;color:white}@media print{[contenteditable="true"]{outline:none!important;background:transparent!important}}</style></head>`);
const out=path.join(__dirname,'LH_모듈러_Kickoff.html');fs.writeFileSync(out,html);
// The deployable artifact contains presentation code only, without the editor.
let publicHtml=html.replace(/\/\/ In-browser slide editing[\s\S]*?<\/script>/,'</script>');
publicHtml=publicHtml.replace(' 텍스트를 클릭해 수정할 수 있습니다.','');
publicHtml=publicHtml.replace(/<label[^>]*>GLB 불러오기[\s\S]*?<\/label>/g,'');
publicHtml=publicHtml.replace('const DECK_SOURCE=document.documentElement.cloneNode(true);','');
const publicDir=path.join(__dirname,'lh-kickoff-public');fs.mkdirSync(publicDir,{recursive:true});
fs.writeFileSync(path.join(publicDir,'index.html'),publicHtml);
fs.copyFileSync(path.join(path.dirname(source),'LICENSES.txt'),path.join(publicDir,'LICENSES.txt'));
fs.writeFileSync(path.join(publicDir,'vercel.json'),JSON.stringify({cleanUrls:true,headers:[{source:'/(.*)',headers:[{key:'X-Content-Type-Options',value:'nosniff'},{key:'Referrer-Policy',value:'strict-origin-when-cross-origin'}]}]},null,2));
const scripts=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)];
for(const [,code]of scripts)new Function(code);
console.log(JSON.stringify({output:out,slides:sections.match(/<section /g).length,scripts: scripts.length,bytes:Buffer.byteLength(html)}));
