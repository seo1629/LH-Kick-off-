const fs=require('node:fs');
const path=require('node:path');
// Adds plan (top-down) and isometric camera presets to the template's Three.js GLB viewer.
// The parent page posts {type:'view',value:'plan'|'iso'}; 화면 맞춤 reframes along the current direction.
// (Dt = Box3, P = Vector3, Gn = camera, Pi = orbit controls, si = model)
// Framing projects the 8 box corners to the screen and shifts/scales the camera so the model's
// on-screen extent is centred and fills about 85% of the view (perspective otherwise pulls it off-centre).
const viewFn="function Vw(v){if(!si)return;let b=new Dt().setFromObject(si),c=b.getCenter(new P),t=b.getSize(new P).length(),"
 +"d=v==='plan'?new P(0,1,1e-4):v==='fit'?Gn.position.clone().sub(Pi.target):new P(1,.8165,1),dist=t*(v==='plan'?1.3:1.1);"
 +"d.normalize();if(v!=='fit')Pi.autoRotate=!1;Gn.near=Math.max(t/1e4,.001);Gn.far=Math.max(t*100,100);"
 +"Pi.target.copy(c);Gn.position.copy(c).addScaledVector(d,dist);Gn.lookAt(c);Gn.updateProjectionMatrix();"
 +"for(let k=0;k<4;k++){Gn.updateMatrixWorld();let a=1/0,z=-1/0,e=1/0,f=-1/0;"
 +"for(let i=0;i<8;i++){let q=new P(i&1?b.max.x:b.min.x,i&2?b.max.y:b.min.y,i&4?b.max.z:b.min.z).project(Gn);a=Math.min(a,q.x);z=Math.max(z,q.x);e=Math.min(e,q.y);f=Math.max(f,q.y)}"
 +"let h=Math.tan(Gn.fov*Math.PI/360)*dist,w=h*Gn.aspect,sh=new P().setFromMatrixColumn(Gn.matrixWorld,0).multiplyScalar((a+z)/2*w).add(new P().setFromMatrixColumn(Gn.matrixWorld,1).multiplyScalar((e+f)/2*h));"
 +"Pi.target.add(sh);dist*=Math.max((z-a)/2,(f-e)/2)/.85;Gn.position.copy(Pi.target).addScaledVector(d,dist);Gn.lookAt(Pi.target);Gn.updateProjectionMatrix()}"
 +"Pi.update()}";
const fitOld='s.data.type===\\"fit\\"&&Pu(),s.data.type===\\"view\\"&&Vw(s.data.value)';
const fitNew="s.data.type===\\\"fit\\\"&&Vw('fit'),s.data.type===\\\"view\\\"&&Vw(s.data.value)";
const edits=[
 ['function z_(s){', `${viewFn}function z_(s){`],
 ['s.data.type===\\"fit\\"&&Pu()', fitNew],
 // open in a still isometric view; 자동 회전 turns slowly around the model when switched on
 ['Pi.autoRotate=!0;Pi.autoRotateSpeed=.5', 'Pi.autoRotate=!1;Pi.autoRotateSpeed=.3'],
 ['Ms.add(si),Pu(),', "Ms.add(si),Vw('iso'),"]
];
function update(html){
 // drop any earlier Vw (always inserted right before z_) so it can be retuned without duplicates
 for(let i=html.indexOf('function Vw(v){');i>=0;i=html.indexOf('function Vw(v){')){
  const j=html.indexOf('function z_(s){',i);
  if(j<0)throw Error('z_ not found after Vw');
  html=html.slice(0,i)+html.slice(j);
 }
 if(html.includes(fitOld))html=html.replace(fitOld,()=>fitNew);
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
