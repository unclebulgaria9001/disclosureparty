export class URLParamsManager{
  static loadFromURL(){
    const params=new URLSearchParams(window.location.search);
    const search=params.get('search')||'';
    const periods=this.#readList(params,'periods');
    const categories=this.#readList(params,'categories');
    const geo=this.#readList(params,'geo');
    const out={};
    if(search) out.search=search;
    if(periods.length) out.periods=periods;
    if(categories.length) out.categories=categories;
    if(geo.length) out.geo=geo;
    return out;
  }

  static saveToURL(active){
    const params=new URLSearchParams();
    if(active?.search) params.set('search',active.search);
    if(Array.isArray(active?.periods)&&active.periods.length) params.set('periods',active.periods.join(','));
    if(Array.isArray(active?.categories)&&active.categories.length) params.set('categories',active.categories.join(','));
    if(Array.isArray(active?.geo)&&active.geo.length) params.set('geo',active.geo.join(','));
    const query=params.toString();
    const next=`${window.location.pathname}${query?`?${query}`:''}`;
    window.history.replaceState({},'',next);
  }

  static #readList(params,key){
    const v=params.get(key);
    if(!v) return [];
    return v.split(',').map(s=>s.trim()).filter(Boolean);
  }
}
