'use client';
// =============================================================
// src/pages/NewsPage.jsx
// =============================================================
import { useState, useEffect, useRef } from "react";
import { DARK, GREEN, RED, GOLD, CARD, NEWS_CATS } from "../lib/constants.js";
import { apiFetch } from "../lib/api.js";
import { PageFooter } from "./SharedComponents.jsx";

// =============================================================
// PAGE: NEWS
// =============================================================
export default function NewsPage({ lang, t, setPage }) {
  const [articles,setArticles]=useState([]),[loading,setLoading]=useState(false),[openId,setOpenId]=useState(null),[lastFetch,setLastFetch]=useState(null),[error,setError]=useState(null);
  const [selectedCat, setSelectedCat]=useState("tax"); // selected category to fetch
  const CACHE_HRS=0; // Always fetch fresh news
  const STORAGE_KEY=`bizanalyzer_news_${selectedCat}_${lang}`;
  const L={ar:{title:"آخر الأخبار الاقتصادية",sub:"هولندا · ضرائب · قوانين · أعمال",refreshBtn:"🔄 تحديث الأخبار",loadingText:"جاري توليد الأخبار...",readMore:"اقرأ المزيد ▼",readLess:"إخفاء ▲",sourceLabel:"المصدر",updated:"آخر تحديث",noNews:"لا توجد أخبار. اضغط تحديث.",errorMsg:"تعذّر تحميل الأخبار.",allCats:"الكل"},nl:{title:"Laatste economisch nieuws",sub:"Nederland · Belasting · Wetgeving · Ondernemen",refreshBtn:"🔄 Nieuws vernieuwen",loadingText:"Artikelen genereren...",readMore:"Lees meer ▼",readLess:"Verbergen ▲",sourceLabel:"Bron",updated:"Laatste update",noNews:"Geen nieuws. Klik vernieuwen.",errorMsg:"Nieuws laden mislukt.",allCats:"Alle"},en:{title:"Latest Economic News",sub:"Netherlands · Taxes · Law · Business",refreshBtn:"🔄 Refresh news",loadingText:"Generating articles...",readMore:"Read more ▼",readLess:"Hide ▲",sourceLabel:"Source",updated:"Last updated",noNews:"No news yet. Click refresh.",errorMsg:"Failed to load news.",allCats:"All"}}[lang]||{};

  useEffect(()=>{
    const load=async()=>{
      try{
        const stored=await window.storage.get(STORAGE_KEY);
        if(stored?.value){
          const data=JSON.parse(stored.value);
          const ageOk=(Date.now()-data.timestamp)/3600000<CACHE_HRS;
          if(data.articles?.length&&ageOk){setArticles(data.articles);setLastFetch(data.timestamp);return;}
        }
      }catch(_){}
      fetchNews();
    };
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedCat, lang]);

  const prevLang=useRef(lang);
  useEffect(()=>{
    if(prevLang.current!==lang){
      prevLang.current=lang;
      // Always refetch on language change — don't use old cache
      setArticles([]);
      fetchNews();
    }
  });

  const fetchNews=async()=>{
    if(loading)return;
    setLoading(true);setError(null);
    const today=new Date().toLocaleDateString("nl-NL",{day:"numeric",month:"long",year:"numeric"});
    const currentYear=new Date().getFullYear();
    const catName = lang==="ar" ? NEWS_CATS[selectedCat]?.ar : lang==="nl" ? NEWS_CATS[selectedCat]?.nl : NEWS_CATS[selectedCat]?.en;
    const prompts={
      ar:`اكتب 10 أخبار هولندية حديثة عن: "${catName}" لتاريخ ${today} سنة ${currentYear}. يجب أن تكون الأخبار محدثة. للحقل sourceUrl استخدم روابط بحث حقيقية مثل: https://nos.nl/zoeken?q=${encodeURIComponent(catName)} أو https://www.rijksoverheid.nl/zoeken?zoekwoorden=${encodeURIComponent(catName)} أو https://www.belastingdienst.nl/zoeken?q=${encodeURIComponent(catName)} رد بـ JSON array فقط:
[{"id":1,"title":"عنوان قصير","summary":"جملة واحدة مفيدة","body":"فقرة تفصيلية من 3-4 جمل عن الخبر","category":"${selectedCat}","source":"Belastingdienst أو KVK أو NOS","sourceUrl":"https://nos.nl أو https://belastingdienst.nl","date":"${today}","impact":"positive أو negative أو neutral","impactLabel":"إيجابي أو سلبي أو محايد"}]`,
      nl:`Schrijf 4 nieuwsberichten over "${catName}" in Nederland voor ${today}. ALLEEN JSON array:
[{"id":1,"title":"Korte titel","summary":"Één zin","body":"Gedetailleerde alinea van 3-4 zinnen over het nieuws","category":"${selectedCat}","source":"Belastingdienst of KVK of NOS","sourceUrl":"https://nos.nl of https://belastingdienst.nl","date":"${today}","impact":"positive of negative of neutral","impactLabel":"Positief of Negatief of Neutraal"}]`,
      en:`Write 10 current news items about "${catName}" in the Netherlands for ${today} ${currentYear}. For sourceUrl use real search links like: https://nos.nl/zoeken?q=${encodeURIComponent(catName)} or https://www.rijksoverheid.nl/zoeken?zoekwoorden=${encodeURIComponent(catName)} ONLY JSON array:
[{"id":1,"title":"Short title","summary":"One sentence","body":"Detailed paragraph of 3-4 sentences about the news","category":"${selectedCat}","source":"Belastingdienst or KVK or NOS","sourceUrl":"https://nos.nl or https://belastingdienst.nl","date":"${today}","impact":"positive or negative or neutral","impactLabel":"Positive or Negative or Neutral"}]`,
    };
    try{
      const raw=await apiFetch({max_tokens:4096,messages:[{role:"user",content:prompts[lang]||prompts.en}]});
      // Extract JSON array - find first [ and last ]
      const s=raw.indexOf("["), e=raw.lastIndexOf("]");
      let parsed=null;
      if(s!==-1&&e>s){
        const slice=raw.slice(s,e+1);
        try{parsed=JSON.parse(slice);}catch(_){
          try{parsed=JSON.parse(slice.replace(/,(\s*[}\]])/g,"$1"));}catch(_){}
        }
      }
      if(Array.isArray(parsed)&&parsed.length>0){
        setArticles(parsed);setLastFetch(Date.now());
        try{await window.storage.set(STORAGE_KEY,JSON.stringify({articles:parsed,timestamp:Date.now(),lang}));}catch(_){}
      }else{setError(L.errorMsg);}
    }catch(err){setError(L.errorMsg);}
    setLoading(false);
  };

  const filtered=articles;
  const impactColor=impact=>{const i=(impact||"").toLowerCase();return i.includes("positief")||i.includes("positive")||i.includes("إيجابي")?GREEN:i.includes("negatief")||i.includes("negative")||i.includes("سلبي")?RED:GOLD;};

  return (
    <div style={{animation:"fadeUp 0.4s ease both",fontFamily:t.font,direction:t.dir}}>
      <div style={{borderRadius:20,overflow:"hidden",marginBottom:20,background:`linear-gradient(135deg,${DARK} 0%,#1a2a0a 100%)`,padding:"32px 24px",position:"relative",textAlign:"center"}}>
        <div style={{position:"absolute",top:-40,right:-40,width:180,height:180,borderRadius:"50%",background:`${GOLD}15`,pointerEvents:"none"}}/>
        <div style={{width:56,height:56,borderRadius:16,background:`linear-gradient(145deg,${GOLD},#b45309)`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",fontSize:26,boxShadow:`0 6px 20px ${GOLD}55`}}>📰</div>
        <h2 style={{fontSize:22,fontWeight:900,color:"white",margin:"0 0 6px",fontFamily:t.font}}>{L.title}</h2>
        <p style={{color:"#ffffff88",fontSize:12,margin:"0 0 16px"}}>{L.sub}</p>
        <button onClick={fetchNews} disabled={loading}
          style={{padding:"9px 22px",background:loading?`${GOLD}55`:GOLD,color:"white",border:"none",borderRadius:30,fontSize:13,fontWeight:700,fontFamily:t.font,cursor:loading?"not-allowed":"pointer"}}>
          {loading?<span style={{display:"flex",alignItems:"center",gap:6}}><span style={{display:"flex",gap:3}}>{[0,1,2].map(i=><span key={i} style={{width:5,height:5,borderRadius:"50%",background:"white",display:"inline-block",animation:`bounce 1.2s ease-in-out ${i*0.2}s infinite`}}/>)}</span>{L.loadingText}</span>:L.refreshBtn}
        </button>
        {lastFetch&&<div style={{marginTop:10,fontSize:10,color:"#ffffff44",fontFamily:"monospace"}}>{L.updated}: {new Date(lastFetch).toLocaleTimeString(lang==="ar"?"ar-NL":"nl-NL",{hour:"2-digit",minute:"2-digit"})}</div>}
      </div>

      {/* Category picker — choose what to fetch */}
      <div style={{background:CARD,borderRadius:16,padding:16,marginBottom:16,boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
        <div style={{fontWeight:700,fontSize:12,color:DARK,fontFamily:t.font,marginBottom:10,direction:t.dir}}>
          {lang==="ar"?"اختر تصنيف الأخبار:":lang==="nl"?"Kies nieuwscategorie:":"Choose news category:"}
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {Object.entries(NEWS_CATS).map(([key,cat])=>{
            const isActive=selectedCat===key;
            return (
              <button key={key} onClick={()=>{ setSelectedCat(key); setArticles([]); }}
                style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",borderRadius:30,border:`2px solid ${isActive?cat.color:"#e0e0e0"}`,background:isActive?cat.color:"white",color:isActive?"white":"#555",fontSize:12.5,fontWeight:isActive?700:500,cursor:"pointer",fontFamily:t.font,transition:"all 0.2s",boxShadow:isActive?`0 4px 12px ${cat.color}40`:"none"}}>
                <span style={{fontSize:15}}>{cat.icon}</span>
                <span>{lang==="ar"?cat.ar:lang==="nl"?cat.nl:cat.en}</span>
              </button>
            );
          })}
        </div>
      </div>

      {error&&<div style={{padding:"12px 16px",background:"#fff5f5",border:"1px solid #fecaca",borderRadius:12,fontSize:13,color:RED,fontFamily:t.font,marginBottom:16}}>{error}</div>}
      {!loading&&!error&&articles.length===0&&<div style={{textAlign:"center",padding:"40px 20px",color:"#666",fontFamily:t.font,fontSize:13}}>{L.noNews}</div>}
      {loading&&articles.length===0&&(
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {[1,2,3,4].map(i=>(
            <div key={i} style={{background:CARD,borderRadius:14,padding:"18px 20px",boxShadow:"0 2px 10px rgba(0,0,0,0.05)"}}>
              <div style={{height:14,background:"#f0f0f0",borderRadius:8,marginBottom:10,width:`${60+i*8}%`,animation:"pulse 1.5s ease-in-out infinite"}}/>
              <div style={{height:10,background:"#f5f5f5",borderRadius:8,marginBottom:6,width:"90%",animation:"pulse 1.5s ease-in-out infinite"}}/>
              <div style={{height:10,background:"#f5f5f5",borderRadius:8,width:"70%",animation:"pulse 1.5s ease-in-out infinite"}}/>
            </div>
          ))}
        </div>
      )}

      {filtered.length>0&&(
        <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:16}}>
          {filtered.map((article,i)=>{
            const cat=NEWS_CATS[article.category]||NEWS_CATS.economy;
            const isOpen=openId===article.id;
            const iColor=impactColor(article.impact);
            return (
              <div key={article.id} style={{background:CARD,borderRadius:16,overflow:"hidden",boxShadow:"0 2px 12px rgba(0,0,0,0.06)",border:`1px solid ${isOpen?cat.color:"#eee"}`,transition:"all 0.3s",animation:`fadeUp 0.4s ease ${i*0.05}s both`}}>
                <div style={{height:3,background:`linear-gradient(90deg,${cat.color},${cat.color}55)`}}/>
                <div style={{padding:"16px 18px"}}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:10}}>
                    <div style={{width:38,height:38,borderRadius:10,background:`${cat.color}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{cat.icon}</div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:5,flexWrap:"wrap"}}>
                        <span style={{padding:"2px 9px",borderRadius:20,background:`${cat.color}12`,color:cat.color,fontSize:10,fontWeight:700,fontFamily:t.font}}>{lang==="ar"?cat.ar:lang==="nl"?cat.nl:cat.en}</span>
                        <span style={{padding:"2px 9px",borderRadius:20,background:`${iColor}12`,color:iColor,fontSize:10,fontWeight:700,fontFamily:t.font}}>{article.impactLabel}</span>
                        <span style={{fontSize:10,color:"#666",fontFamily:"monospace",marginInlineStart:"auto"}}>{article.date}</span>
                      </div>
                      <div style={{fontWeight:800,fontSize:14.5,color:DARK,fontFamily:t.font,lineHeight:1.4}}>{article.title}</div>
                    </div>
                  </div>
                  <div style={{fontSize:13,color:"#555",lineHeight:1.8,fontFamily:t.font,marginBottom:10}}>{article.summary}</div>
                  <button onClick={()=>setOpenId(isOpen?null:article.id)} style={{background:"transparent",border:"none",color:cat.color,fontSize:12,fontWeight:700,fontFamily:t.font,cursor:"pointer",padding:0}}>{isOpen?L.readLess:L.readMore}</button>
                  {isOpen&&(
                    <div style={{marginTop:12,animation:"fadeUp 0.3s ease both"}}>
                      {article.body && <div style={{padding:"13px 15px",background:"#f8f9fa",borderRadius:12,fontSize:13,color:"#333",lineHeight:1.85,fontFamily:t.font,marginBottom:10}}>{article.body}</div>}
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
                        <div style={{fontSize:11,color:"#666",fontFamily:"monospace"}}>📌 {article.source}</div>

                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <PageFooter t={t} setPage={setPage}/>
    </div>
  );
}

