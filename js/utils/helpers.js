export function escapeHtml(input){
  const s=String(input??'');
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

export function showNotification(message,type='info',timeoutMs=2500){
  const el=document.createElement('div');
  el.className=`toast${type==='error'?' error':''}`;
  el.textContent=String(message??'');
  document.body.appendChild(el);
  window.setTimeout(()=>{el.remove();},timeoutMs);
}
