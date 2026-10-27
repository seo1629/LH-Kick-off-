const fs=require('node:fs');
const path=require('node:path');
// Public site only: discourages saving images. Blocks the right-click menu, dragging and the iOS/Android
// long-press menu on images, the 3D viewer and the lightbox, plus Ctrl/Cmd+S. This is a deterrent, not
// protection: anything shown in a browser can still be captured or pulled from the page source.
const css=`
#stage img,#lightbox img,.template-scene{-webkit-user-drag:none;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}
`;
const js=`
(()=>{const guarded=t=>t&&t.closest&&t.closest('img,figure,.template-scene,#lightbox');
addEventListener('contextmenu',e=>{if(guarded(e.target))e.preventDefault()},true);
addEventListener('dragstart',e=>{if(guarded(e.target))e.preventDefault()},true);
addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&(e.key==='s'||e.key==='S'))e.preventDefault()},true);
document.querySelectorAll('#stage img,#lightbox img').forEach(i=>i.setAttribute('draggable','false'));})();
`;
function update(html){
 html=html.replace(/<style id="lh-public-protect">[\s\S]*?<\/style>/g,'').replace(/<script id="lh-public-protect">[\s\S]*?<\/script>/g,'');
 html=html.replace('</head>',()=>`<style id="lh-public-protect">${css}</style></head>`);
 return html.replace(/<\/body>(?![\s\S]*<\/body>)/,()=>`<script id="lh-public-protect">${js}</script></body>`);
}
module.exports={update};
if(require.main===module){
 const full=path.join(__dirname,'lh-kickoff-public','index.html');
 const html=update(fs.readFileSync(full,'utf8'));
 for(const [,code]of html.matchAll(/<script\b(?![^>]*application\/json)[^>]*>([\s\S]*?)<\/script>/g))new Function(code);
 fs.writeFileSync(full,html);console.log('lh-kickoff-public/index.html: image protection applied');
}
