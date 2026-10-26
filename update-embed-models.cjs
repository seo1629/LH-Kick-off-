const fs=require('node:fs');
const path=require('node:path');
// Embeds GLB models into the deck so the viewer shows them without "GLB 불러오기".
// The deck reads models from <script id="deck-edit-state" type="application/json">{edits,models}</script>,
// keyed by slide index (slide 5 = 4). Kept edits from a saved 수정본 are preserved.
const models={4:['assets/models/type36.glb','36타입 공동주택_상품.glb']};
function update(html){
 const re=/<script id="deck-edit-state" type="application\/json">([\s\S]*?)<\/script>/;
 const m=html.match(re);
 const state=m?JSON.parse(m[1]):{edits:{}};
 state.edits=state.edits||{};state.models=state.models||{};
 for(const [i,[file,name]] of Object.entries(models)){
  const full=path.join(__dirname,file);
  if(!fs.existsSync(full))continue;
  state.models[i]={name,data:fs.readFileSync(full).toString('base64')};
 }
 const tag=`<script id="deck-edit-state" type="application/json">${JSON.stringify(state).replace(/</g,'\\u003c')}</script>`;
 if(m)return html.replace(re,()=>tag);
 if(!html.includes('<script id="deck-boot">'))throw Error('deck-boot script missing');
 return html.replace('<script id="deck-boot">',()=>`${tag}<script id="deck-boot">`);
}
module.exports={update};
if(require.main===module){
 // Only the editable deck and the public site carry the model; the colour previews stay light.
 for(const file of ['LH_모듈러_Kickoff.html','lh-kickoff-public/index.html']){
  const full=path.join(__dirname,file);if(!fs.existsSync(full))continue;
  const html=update(fs.readFileSync(full,'utf8'));
  for(const [,code]of html.matchAll(/<script\b(?![^>]*application\/json)[^>]*>([\s\S]*?)<\/script>/g))new Function(code);
  fs.writeFileSync(full,html);console.log(file+': models embedded ('+(Buffer.byteLength(html)/1048576).toFixed(1)+' MB)');
 }
}
