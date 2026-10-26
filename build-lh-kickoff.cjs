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
['KICK-OFF MEETING','LH 모듈러주택 중대형평면 개발',`<div class="lh-cover"><p class="lh-eyebrow">LH 모듈러주택 중대형평면 개발 연구용역 · 착수회의 자료 초안</p><p class="lh-hero">65㎡ · 75㎡<br><span>3·4모듈 조합으로 만드는 중대형 주거</span></p><div class="lh-pills"><span>65㎡ 3·4모듈 비교</span><span>구조·MEP 접합 검토</span><span>공장 제작률 70% 이상</span></div><p>개발 범위와 공통 기준, 검토 방법과 협업 절차를 합의합니다.</p></div>${note('2026.10.19 작성 · 과업기간: 착수일로부터 5개월 · 회의일·참여기관 미정')}`],
['PROJECT OVERVIEW','과업의 방향',`<div class="lh-cards ov-cards"><article><span class="lh-tag">BACKGROUND</span><h3>기존 공급의 한계</h3><p>• 공공임대의 주거품질을 민간 아파트 수준으로 개선 <small>(1~2Bay → 3~4Bay)</small></p><p>• 전용 60㎡ 이상 평면에서 3~4인 가구의 중대형 표준평면 부재</p></article><article><span class="lh-tag">APPROACH</span><h3>3~4모듈 조합 기반 평면 개발</h3><p>• 전용 65㎡~75㎡에 맞는 공간 구성과 배치에 맞는 모듈 배치</p><p>• 퀵커넥터/내화보드 등 모듈러 특화 기술 적용과 제작에 맞는 DfMA 설계 적용</p></article><article><span class="lh-tag">GOAL</span><h3>양산성과 경제성을 고려한 표준평면</h3><p>전용 60㎡ 이하 소형 중심의 모듈러 주택에서 3~4인 가구를 수용하는 중대형 표준평면</p></article></div>${table(['구분','과업 범위','착수 회의 확인 사항'],[['① 평면 개발','▪ 전용 65㎡ : 3모듈·4모듈 조합 평면과 비교 분석<br>▪ 전용 75㎡ : 4모듈 조합 평면','&nbsp;'],['② 구조·MEP 접합','▪ 모듈 간 수평·수직 접합부 구조 안전성 검토<br>▪ 단위세대 접합 디테일 검토<br>▪ 설비 배관·전기·통신 배선 모듈화','&nbsp;'],['③ 마감 검토','▪ 접합부 상세설계, 층간소음 저감기술, 방수/기밀 상세 검토 등','&nbsp;']])}`],
['SCOPE OF WORK','이번 과업에서 개발하고 검토할 것',table(['구분','확인된 과업','착수회의 확인 사항'],[['평면 개발','전용 65㎡·75㎡ 평면 개발<br>4모듈 조합','면적별 대안 수·실 구성·모듈 기준 치수'],['접합부 검토','모듈 간 접합부 구조 안전성 검토<br>접합 디테일 제안','구조·MEP 검토 범위와 분야별 책임'],['마감 검토','공장 제작률 70% 이상 확보를 위한<br>바닥·벽체 마감 방안 제시','제작률 산정 기준·공장/현장 작업 경계']])+note('이미지의 과업 구분: ① 평면개발 ② MEP 접합 및 마감 검토. 위 표는 발표를 위해 세부 업무를 나누어 표현했습니다.')],
['COMMON DESIGN RULES','4모듈 조합의 공통 기준 설정',`<p class="lead">먼저 공통 규칙을 정하고, 면적별 평면 대안을 전개합니다.</p><div class="lh-modules">${[1,2,3,4].map(n=>`<div><b>M0${n}</b><span>모듈 ${n}</span></div>`).join('')}</div>${table(['공통화 검토','유형별 조정 검토','미확정 조건'],[['구조·접합 인터페이스<br>설비 연결·마감 경계','공간 배분·조합 방식<br>65㎡와 75㎡의 공통 부품','폭·길이·높이·구조 방식<br>운송·양중·제작 제약']])}${note('도식은 4개 모듈이라는 조건만 표현한 개념도입니다. 실제 배치·치수·면적 비율을 의미하지 않습니다.')}`],
['STANDARD PLAN / 65㎡','전용 65㎡ 평면 개발: 3모듈과 4모듈 비교',`<div class="lh-two"><div class="lh-placeholder"><strong>65㎡</strong><span>당사 개발 상품 예시</span><small>3모듈·4모듈 평면 이미지 삽입 예정</small></div><div>${cards([['3 MODULES','접합부 최소화형','접합부를 줄여 층간소음·수밀 리스크를 낮춥니다. 침실 2~3개·욕실 1~2개, L-D-K 통합과 전면 개방감을 확보합니다.'],['4 MODULES','유연성·수납 강화형','평면 유연성과 세대 간 가변성을 확보하고 수납공간을 극대화합니다.'],['COMPARE','3·4모듈 비교 평가','제작비와 운송·양중·설치비를 공간 품질과 함께 같은 기준으로 비교합니다.']])}</div></div>${note('3·4모듈 조합과 비교 항목은 과업내용서 기준입니다. 구체 평면·허용 면적 범위·대안 수는 착수회의에서 협의합니다.')}`],
['STANDARD PLAN / 75㎡','전용 75㎡ 평면 개발: 4모듈 조합',`<div class="lh-two"><div class="lh-placeholder"><strong>75㎡</strong><span>당사 개발 상품 예시</span><small>4모듈 평면 이미지 삽입 예정</small></div><div>${cards([['FAMILY','3~4인 가구 특화 평면','4모듈 결합으로 가족 구성과 생활 방식에 맞춘 실 구성을 계획합니다.'],['INTERIOR','실내 돌출부 최소화','모듈 결합부로 생기는 기둥·보 돌출이 실내에 드러나지 않도록 구조를 최적화합니다.'],['DAYLIGHT','채광·환기 성능 확보','모듈 배치와 구조 계획을 함께 검토해 채광·환기에 유리한 평면을 만듭니다.']])}</div></div>${note('4모듈 조합과 개발 방향은 과업내용서 기준입니다. 세대 구성·구조 방식·제작 조건은 임의로 확정하지 않습니다.')}`],
['DECISIONS & NEXT STEPS','KICK-OFF시 합의할 사항',table(['구분','협의 내용','Follow up'],Array.from({length:8},()=>['&nbsp;','&nbsp;','&nbsp;']))]
];
pages.splice(6,0,['PROJECT ORGANIZATION','과업 수행 조직 및 역할',`<div class="lh-org"><div class="lh-org-top"><h3>LH</h3><h3>담당부서/담당자</h3></div><div class="lh-org-stem"></div><div class="lh-org-lead"><h3>과업 총괄</h3><h3>000</h3></div><div class="lh-org-stem"></div><div class="lh-org-teams">${['건축','구조','MEP','제작'].map(title=>`<article><h3>${title}</h3><h3>000</h3></article>`).join('')}</div></div>`]);
const sections=pages.map(([label,title,body],i)=>`<section class="slide lh-slide" id="slide-${i+1}"><header><span>LH · MODULAR HOUSING</span><span>${label}</span></header><h2>${title}</h2><div class="slide-body lh-body">${body}</div><footer><span>중대형평면 개발 · KICK-OFF / 협의용 초안</span><span>${String(i+1).padStart(2,'0')} / ${pages.length}</span></footer></section>`).join('');
html=html.replace(/<main id="stage">[\s\S]*?<\/main>/,`<main id="stage">${sections}</main>`);
html=html.replace(/<title>[\s\S]*?<\/title>/,'<title>LH 모듈러주택 중대형평면 · Kick-off</title>');
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
html=require('./update-slide-three.cjs').update(html);
html=require('./update-slide-four.cjs').update(html);
html=require('./update-product-slides.cjs').update(html);
html=require('./update-slide-schedule.cjs').update(html);
html=require('./update-deck-tone.cjs').update(html);
html=require('./update-viewer-light.cjs').update(html);
html=require('./update-viewer-views.cjs').update(html);
html=require('./update-embed-models.cjs').update(html);
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
const scripts=[...html.matchAll(/<script\b(?![^>]*application\/json)[^>]*>([\s\S]*?)<\/script>/g)];
for(const [,code]of scripts)new Function(code);
console.log(JSON.stringify({output:out,slides:sections.match(/<section /g).length,scripts: scripts.length,bytes:Buffer.byteLength(html)}));
