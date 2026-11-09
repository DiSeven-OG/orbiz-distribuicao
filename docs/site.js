'use strict';
const $=id=>document.getElementById(id);
function fmt(size){return Number.isFinite(size)?(size/1024/1024).toFixed(1)+' MB':'';}
async function start(){
 try{
  const response=await fetch('./releases.json',{cache:'no-store'});
  if(!response.ok)throw new Error('Manifesto indisponível');
  const manifest=await response.json();
  let available=0;
  for(const kind of ['launcher','desktop']){
   const release=manifest[kind],link=$(kind+'-link'),info=$(kind+'-info');
   if(release && typeof release.url==='string' && release.url.startsWith('https://') && /^\d+\.\d+\.\d+/.test(release.version||'')){
    link.href=release.url;link.textContent='↓ Baixar para Windows';link.classList.remove('disabled');link.removeAttribute('aria-disabled');info.textContent=`Versão ${release.version} · ${fmt(release.size)}`;available++;
   }
  }
  $('notice').textContent=available?'Arquivos oficiais disponibilizados pelo administrador. Execute instaladores apenas de fontes que você reconhece.':'O site está pronto. Falta publicar os instaladores para liberar os botões de download.';
 }catch(e){$('notice').textContent='O site está pronto, mas o catálogo de versões ainda não pôde ser carregado.';}
}
start();
