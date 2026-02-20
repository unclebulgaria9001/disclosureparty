export class SearchService{
  constructor(){this.term='';}

  setSearchTerm(term){this.term=String(term??'').trim();}
  getSearchTerm(){return this.term;}
  clear(){this.term='';}

  highlightSearchTerm(text){
    const s=String(text??'');
    if(!this.term) return s;
    const escaped=this.term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    const re=new RegExp(`(${escaped})`,'ig');
    return s.replace(re,'<mark>$1</mark>');
  }

  sortByRelevance(entries){
    if(!this.term) return;
    const t=this.term.toLowerCase();
    const score=(e)=>{
      let s=0;
      const hay=[e.title,e.date,e.content,(e.tags||[]).join(' ')].join(' ').toLowerCase();
      let idx=0;
      while(true){
        idx=hay.indexOf(t,idx);
        if(idx===-1) break;
        s+=1;
        idx+=t.length;
      }
      return s;
    };
    entries.sort((a,b)=>score(b)-score(a));
  }
}

export const searchService=new SearchService();
