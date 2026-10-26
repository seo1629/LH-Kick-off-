const fs=require('node:fs');
const path=require('node:path');
// Adds plan (top-down) and isometric camera presets to the template's Three.js GLB viewer.
// The parent page posts {type:'view',value:'plan'|'iso'}; the viewer frames the loaded model
// (Dt = Box3, P = Vector3, Gn = camera, Pi = orbit controls, si = model) and stops auto-rotate.
const viewFn="function Vw(v){if(!si)return;let b=new Dt().setFromObject(si),c=b.getCenter(new P),t=b.getSize(new P).length(),d=v==='plan'?new P(0,1,1e-4):new P(1,.8165,1);Pi.autoRotate=!1;Pi.target.copy(c);Gn.near=Math.max(t/1e4,.001);Gn.far=Math.max(t*100,100);Gn.position.copy(c).add(d.normalize().multiplyScalar(t*(v==='plan'?1.3:1.1)));Gn.updateProjectionMatrix();Pi.update()}";
const edits=[
 ['function z_(s){', `${viewFn}function z_(s){`],
 ['s.data.type===\\"fit\\"&&Pu()', 's.data.type===\\"fit\\"&&Pu(),s.data.type===\\"view\\"&&Vw(s.data.value)'],
 // open in a still isometric view; 자동 회전 turns slowly around the model when switched on
 ['Pi.autoRotate=!0;Pi.autoRotateSpeed=.5', 'Pi.autoRotate=!1;Pi.autoRotateSpeed=.3'],
 ['Ms.add(si),Pu(),', "Ms.add(si),Vw('iso'),"]
];
function update(html){
 // drop any earlier Vw so tuning values can change without inserting it twice
 html=html.replace(/function Vw\(v\)\{[^}]*\}(?=function Vw\(v\)\{|function z_\(s\)\{)/g,'');
 for(const [from,to] of edits){
  if(html.includes(to))continue;
  const n=html.split(from).length-1;
  if(n!==1)throw Error(`viewer pattern found ${n} times: ${from.slice(0,40)}`);
  html=html.replace(from,()=>to);
 }
 return html;
}
module.exports={update};
if(require.main===module){
 for(const file of ['LH_모듈러_Kickoff.html','LH_색상표적용.html','LH_색상적용_시안.html','lh-kickoff-public/index.html']){
  const full=path.join(__dirname,file);if(!fs.existsSync(full))continue;
  const html=update(fs.readFileSync(full,'utf8'));
  for(const [,code]of html.matchAll(/<script\b(?![^>]*application\/json)[^>]*>([\s\S]*?)<\/script>/g))new Function(code);
  fs.writeFileSync(full,html);console.log(file+': viewer views updated');
 }
}
