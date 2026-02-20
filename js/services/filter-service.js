export class FilterService{
  constructor(){
    this.allEntries=[];
    this.filteredEntries=[];
    this.active={search:'',periods:[],categories:[],geo:[]};
    this.listeners=[];
  }

  subscribe(cb){this.listeners.push(cb);}

  notify(){
    const payload={
      filtered:this.filteredEntries,
      active:this.getActiveFilters(),
      total:this.allEntries.length
    };
    this.listeners.forEach(cb=>cb(payload));
  }

  setAllEntries(entries){
    this.allEntries=Array.isArray(entries)?entries:[];
    this.apply();
  }

  setSearch(term){this.active.search=String(term??'').trim();this.apply();}
  setPeriods(periods){this.active.periods=this.#normList(periods);this.apply();}
  setCategories(categories){this.active.categories=this.#normList(categories);this.apply();}
  setGeo(geo){this.active.geo=this.#normList(geo);this.apply();}

  getFilteredEntries(){return this.filteredEntries;}

  getActiveFilters(){
    return {
      search:this.active.search,
      periods:[...this.active.periods],
      categories:[...this.active.categories],
      geo:[...this.active.geo]
    };
  }

  calculateCounts(){
    const counts={periods:{},categories:{},geo:{},tags:{},total:this.allEntries.length};
    for(const e of this.allEntries){
      const y=Number(e.year)||0;
      if(y){
        counts.periods[String(y)]=(counts.periods[String(y)]||0)+1;
        counts.periods[String(Math.floor(y/10))]=(counts.periods[String(Math.floor(y/10))]||0)+1;
        counts.periods[String(Math.floor(y/100))]=(counts.periods[String(Math.floor(y/100))]||0)+1;
        if(y<1800) counts.periods.ancient=(counts.periods.ancient||0)+1;
      }
      for(const tag of this.#entryTags(e)){
        counts.categories[tag]=(counts.categories[tag]||0)+1;
        counts.geo[tag]=(counts.geo[tag]||0)+1;
        counts.tags[tag]=(counts.tags[tag]||0)+1;
      }
    }
    return counts;
  }

  apply(){
    const s=this.active.search.toLowerCase();
    const periods=this.active.periods;
    const categories=this.active.categories;
    const geo=this.active.geo;

    const matchPeriod=(e)=>{
      if(!periods.length) return true;
      const y=Number(e.year)||0;
      for(const p of periods){
        if(p==='ancient'){
          if(y>0&&y<1800) return true;
          continue;
        }
        if(p.length===4){
          if(String(y)===p) return true;
        }else if(p.length===3){
          if(String(y).startsWith(p)) return true;
        }else if(p.length===2){
          if(String(y).startsWith(p)) return true;
        }
      }
      return false;
    };

    const matchTags=(e,selected)=>{
      if(!selected.length) return true;
      const tags=new Set(this.#entryTags(e).map(t=>t.toLowerCase()));
      return selected.some(t=>tags.has(t.toLowerCase()));
    };

    const matchSearch=(e)=>{
      if(!s) return true;
      const hay=[e.date,e.title,e.content,(e.tags||[]).join(' ')].join(' ').toLowerCase();
      return hay.includes(s);
    };

    this.filteredEntries=this.allEntries.filter(e=>
      matchSearch(e)&&matchPeriod(e)&&matchTags(e,categories)&&matchTags(e,geo)
    );

    this.notify();
  }

  #normList(v){
    if(!Array.isArray(v)) return [];
    return v.map(x=>String(x??'').trim()).filter(Boolean);
  }

  #entryTags(entry){
    const raw=Array.isArray(entry?.tags)?entry.tags:[];
    const out=[];
    for(const t of raw){
      const s=String(t||'').trim();
      if(!s) continue;
      out.push(s.startsWith('#')?s.slice(1):s);
    }
    return out;
  }
}

export const filterService=new FilterService();
