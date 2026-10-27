const fs=require('node:fs');
const path=require('node:path');
// GLB models live as files (assets/models/*.glb) and are fetched by the product slides at runtime
// via data-model-src, so the HTML stays small.
// update(): removes models that an earlier version embedded in #deck-edit-state (keeps any edits).
// publish(): for the public site, points data-model-src at models/ and copies the GLBs next to index.html.
function update(html){
 const re=/<script id="deck-edit-state" type="application\/json">([\s\S]*?)<\/script>/;
 const m=html.match(re);if(!m)return html;
 const state=JSON.parse(m[1]);
 if(!state.models||!Object.keys(state.models).length)return html;
 delete state.models;
 if(!state.edits||!Object.keys(state.edits).length)return html.replace(re,'');
 return html.replace(re,()=>`<script id="deck-edit-state" type="application/json">${JSON.stringify(state).replace(/</g,'\\u003c')}</script>`);
}
function publish(html,publicDir){
 const out=path.join(publicDir,'models');
 for(const [,file] of html.matchAll(/data-model-src="assets\/models\/([^"]+)"/g)){
  fs.mkdirSync(out,{recursive:true});
  fs.copyFileSync(path.join(__dirname,'assets','models',file),path.join(out,file));
 }
 return html.split('data-model-src="assets/models/').join('data-model-src="models/');
}
module.exports={update,publish};
if(require.main===module){
 for(const file of ['LH_모듈러_Kickoff.html','LH_색상표적용.html','LH_색상적용_시안.html','lh-kickoff-public/index.html']){
  const full=path.join(__dirname,file);if(!fs.existsSync(full))continue;
  let html=update(fs.readFileSync(full,'utf8'));
  if(file.startsWith('lh-kickoff-public/'))html=publish(html,path.join(__dirname,'lh-kickoff-public'));
  for(const [,code]of html.matchAll(/<script\b(?![^>]*application\/json)[^>]*>([\s\S]*?)<\/script>/g))new Function(code);
  fs.writeFileSync(full,html);console.log(file+': model files ('+(Buffer.byteLength(html)/1048576).toFixed(1)+' MB)');
 }
}
