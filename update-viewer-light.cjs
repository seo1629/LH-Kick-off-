const fs=require('node:fs');
const path=require('node:path');
// Brightens the template's Three.js GLB viewer (the VIEWER srcdoc string).
// SketchUp GLB exports set metallicFactor 0.5 on most materials, which renders dark without an
// environment map, so loaded models get metalness capped at 0.1 and the lights are raised.
const edits=[
 // hemisphere: lighter ground colour and higher intensity; key light softened; fill light added opposite
 ['Ms.add(new tr(16777215,7438456,2));var Lu=new Mi(16777215,3);Lu.position.set(5,10,8);Ms.add(Lu);',
  'Ms.add(new tr(16777215,10528940,2.4));var Lu=new Mi(16777215,2.4);Lu.position.set(5,10,8);Ms.add(Lu);var LuFill=new Mi(16777215,0.9);LuFill.position.set(-6,7,-5);Ms.add(LuFill);'],
 ['si=n.scene,Ms.add(si)',
  'si=n.scene,si.traverse(e=>{if(e.isMesh)for(let m of Array.isArray(e.material)?e.material:[e.material])m&&m.metalness!==void 0&&(m.metalness=Math.min(m.metalness,.1))}),Ms.add(si)']
];
function update(html){
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
  fs.writeFileSync(full,html);console.log(file+': viewer lighting updated');
 }
}
