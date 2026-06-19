'use client';
// =============================================================
// src/pages/JobSearchPage.jsx
// =============================================================
import { useState } from "react";
import { ORANGE, DARK, GREEN, BLUE, PURPLE, RED, CARD, JOB_SITES } from "../lib/constants.js";
import { apiFetch } from "../lib/api.js";
import { PageFooter } from "./SharedComponents.jsx";

// =============================================================
// PAGE: JOB SEARCH
// =============================================================
export default function JobSearchPage({ lang, t, setPage }) {
  const [query,setQuery]=useState(""),[location,setLocation]=useState(""),[isZZP,setIsZZP]=useState(true),[isFulltime,setIsFulltime]=useState(false),[isParttime,setIsParttime]=useState(false),[isIntern,setIsIntern]=useState(false);
  const [searched,setSearched]=useState(false),[jobs,setJobs]=useState([]),[loading,setLoading]=useState(false),[jobError,setJobError]=useState(null);
  const L={ar:{title:"البحث عن فرص عمل في هولندا",sub:"LinkedIn · Indeed · Werk.nl وأكثر",zzp:"ZZP / مستقل",fulltime:"دوام كامل",parttime:"دوام جزئي",intern:"تدريب / Stage",jobPh:"المسمى الوظيفي...",locPh:"مدينة (مثال: Amsterdam)",searchBtn:"بحث",sitesLabel:"ابحث مباشرة على:",viewJob:"عرض الوظيفة ↗",noJobs:"لم يتم العثور على وظائف.",loadingText:"جاري البحث..."},nl:{title:"Zoek vacatures in Nederland",sub:"LinkedIn · Indeed · Werk.nl en meer",zzp:"ZZP / Freelance",fulltime:"Fulltime",parttime:"Deeltijds",intern:"Internship / Stage",jobPh:"Functietitel of trefwoord...",locPh:"Stad (bijv. Amsterdam)",searchBtn:"Zoeken",sitesLabel:"Zoek direct op:",viewJob:"Bekijk vacature ↗",noJobs:"Geen vacatures gevonden.",loadingText:"Vacatures laden..."},en:{title:"Find Jobs in the Netherlands",sub:"LinkedIn · Indeed · Werk.nl and more",zzp:"ZZP / Freelance",fulltime:"Full-time",parttime:"Part-time",intern:"Internship / Stage",jobPh:"Job title or keyword...",locPh:"City (e.g. Amsterdam)",searchBtn:"Search",sitesLabel:"Search directly on:",viewJob:"View job ↗",noJobs:"No jobs found.",loadingText:"Loading jobs..."}}[lang]||{};

  const buildQ=()=>[query,isZZP?"ZZP freelance":"",isFulltime?"fulltime":"",isParttime?"deeltijd parttime":"",isIntern?"stage internship":""].filter(Boolean).join(" ");

  const doSearch=async()=>{
    if(!query.trim()&&!isZZP&&!isFulltime&&!isParttime&&!isIntern)return;
    setSearched(true);setJobs([]);setJobError(null);setLoading(true);
    const sq=buildQ(),loc=location.trim()||"Nederland";
    const contract=[isZZP?"ZZP":"",isFulltime?"fulltime":"",isParttime?"parttime":"",isIntern?"stage":""].filter(Boolean).join(" or ")||"any";
    const langNote=lang==="ar"?"Schrijf title en description in het Arabisch.":lang==="nl"?"Schrijf alles in het Nederlands.":"Write everything in English.";
    const prompt=`${langNote} Maak 4 vacatures voor "${sq}" in ${loc}. ALLEEN JSON array zonder extra tekst. Gebruik echte job sites voor de URLs:
[{"title":"Functietitel","company":"Bedrijfsnaam","location":"${loc}","type":"${contract}","salary":"€3.000/maand","posted":"1 dag geleden","remote":"Hybride","description":"Korte taakbeschrijving van 2 zinnen.","url":"https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(sq)}&location=${encodeURIComponent(loc)}","source":"LinkedIn"},{"title":"Functietitel 2","company":"Bedrijf 2","location":"${loc}","type":"${contract}","salary":"€3.500/maand","posted":"2 dagen geleden","remote":"Op kantoor","description":"Andere taakbeschrijving.","url":"https://nl.indeed.com/jobs?q=${encodeURIComponent(sq)}&l=${encodeURIComponent(loc)}","source":"Indeed"},{"title":"Functietitel 3","company":"Bedrijf 3","location":"${loc}","type":"${contract}","salary":"€2.800/maand","posted":"3 dagen geleden","remote":"Thuis","description":"Derde taakbeschrijving.","url":"https://www.werk.nl/werk-vinden/vacatures/?q=${encodeURIComponent(sq)}","source":"Werk.nl"},{"title":"Functietitel 4","company":"Bedrijf 4","location":"${loc}","type":"${contract}","salary":"€4.000/maand","posted":"1 week geleden","remote":"Hybride","description":"Vierde taakbeschrijving.","url":"https://www.monsterboard.nl/vacatures?q=${encodeURIComponent(sq)}","source":"Monsterboard"}]`;
    try{
      const raw=await apiFetch({max_tokens:4096,messages:[{role:"user",content:prompt}]});
      let parsed=null;
      try{parsed=JSON.parse(raw);}catch(_){}
      if(!parsed){try{parsed=JSON.parse(raw.replace(/,(\s*[}\]])/g,"$1"));}catch(_){}}
      if(!parsed){const s=raw.indexOf("["),e=raw.lastIndexOf("]");if(s!==-1&&e>s){try{parsed=JSON.parse(raw.slice(s,e+1));}catch(_){}}}
      if(Array.isArray(parsed)&&parsed.length>0){setJobs(parsed);}else{setJobError(L.noJobs);}
    }catch(_){setJobError("Search unavailable. Please try again.");}
    finally{setLoading(false);}
  };

  const sq=buildQ();
  const cbStyle=(active,color)=>({display:"flex",alignItems:"center",gap:6,fontSize:13,fontFamily:t.font,cursor:"pointer",padding:"6px 14px",borderRadius:30,border:active?`2px solid ${color}`:"2px solid #eee",background:active?`${color}10`:"white",color:active?color:DARK,fontWeight:active?700:400,transition:"all 0.2s"});

  return (
    <div style={{animation:"fadeUp 0.4s ease both",fontFamily:t.font,direction:t.dir}}>
      <div style={{borderRadius:20,overflow:"hidden",marginBottom:20,background:`linear-gradient(135deg,${DARK} 0%,#0a2a1e 100%)`,padding:"32px 24px",position:"relative",textAlign:"center"}}>
        <div style={{position:"absolute",top:-40,right:-40,width:160,height:160,borderRadius:"50%",background:`${GREEN}12`,pointerEvents:"none"}}/>
        <div style={{width:56,height:56,borderRadius:16,background:`linear-gradient(145deg,${GREEN},#047857)`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",fontSize:26,boxShadow:`0 6px 20px ${GREEN}44`}}>🔍</div>
        <h2 style={{fontSize:22,fontWeight:900,color:"white",margin:"0 0 6px",fontFamily:t.font}}>{L.title}</h2>
        <p style={{color:"#ffffff88",fontSize:12,margin:0}}>{L.sub}</p>
      </div>
      <div style={{background:CARD,borderRadius:20,padding:22,marginBottom:16,boxShadow:"0 4px 20px rgba(0,0,0,0.07)"}}>
        <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
          <label style={cbStyle(isZZP,GREEN)}>     <input type="checkbox" checked={isZZP}      onChange={e=>setIsZZP(e.target.checked)}      style={{width:15,height:15,accentColor:GREEN}}/>{L.zzp}</label>
          <label style={cbStyle(isFulltime,BLUE)}>  <input type="checkbox" checked={isFulltime} onChange={e=>setIsFulltime(e.target.checked)} style={{width:15,height:15,accentColor:BLUE}}/>{L.fulltime}</label>
          <label style={cbStyle(isParttime,PURPLE)}><input type="checkbox" checked={isParttime} onChange={e=>setIsParttime(e.target.checked)} style={{width:15,height:15,accentColor:PURPLE}}/>{L.parttime}</label>
          <label style={cbStyle(isIntern,ORANGE)}>  <input type="checkbox" checked={isIntern}   onChange={e=>setIsIntern(e.target.checked)}   style={{width:15,height:15,accentColor:ORANGE}}/>{L.intern}</label>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <input value={query}    onChange={e=>setQuery(e.target.value.slice(0,200))}    onKeyDown={e=>e.key==="Enter"&&doSearch()} placeholder={L.jobPh}  style={{flex:2,minWidth:180,border:"2px solid #eee",borderRadius:12,padding:"11px 14px",fontSize:14,fontFamily:t.font,direction:t.dir,outline:"none"}}/>
          <input value={location} onChange={e=>setLocation(e.target.value.slice(0,100))} onKeyDown={e=>e.key==="Enter"&&doSearch()} placeholder={L.locPh} style={{flex:1,minWidth:150,border:"2px solid #eee",borderRadius:12,padding:"11px 14px",fontSize:14,fontFamily:t.font,outline:"none"}}/>
          <button onClick={doSearch} style={{padding:"11px 24px",background:GREEN,color:"white",border:"none",borderRadius:12,fontSize:14,fontWeight:700,fontFamily:t.font,cursor:"pointer",flexShrink:0}}>{L.searchBtn}</button>
        </div>
      </div>
      {searched&&(
        <div style={{animation:"fadeUp 0.3s ease both"}}>
          <div style={{background:`linear-gradient(135deg,${DARK} 0%,#1a3a5c 100%)`,borderRadius:18,padding:20,marginBottom:14}}>
            <div style={{color:"white",fontWeight:700,fontSize:13,fontFamily:t.font,marginBottom:12}}>🚀 {L.sitesLabel}</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{JOB_SITES.map(site=><a key={site.name} href={site.url(sq,location)} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 14px",borderRadius:10,background:site.color,color:"white",textDecoration:"none",fontSize:12.5,fontWeight:600,fontFamily:t.font,flexShrink:0}}>{site.name} ↗</a>)}</div>
          </div>
          {loading&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12,padding:"30px 0"}}><div style={{display:"flex",gap:6}}>{[0,1,2].map(i=><div key={i} style={{width:10,height:10,borderRadius:"50%",background:GREEN,animation:`bounce 1.2s ease-in-out ${i*0.2}s infinite`}}/>)}</div><div style={{fontSize:13,color:"#666",fontFamily:t.font}}>{L.loadingText}</div></div>}
          {jobError&&<div style={{padding:"12px 16px",background:"#fff5f5",border:"1px solid #fecaca",borderRadius:12,fontSize:13,color:RED,fontFamily:t.font}}>{jobError}</div>}
          {!loading&&jobs.length>0&&(
            <div>
              <div style={{fontWeight:700,fontSize:14,color:DARK,fontFamily:t.font,marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
                <span style={{width:8,height:8,borderRadius:"50%",background:GREEN,display:"inline-block"}}/>
                {jobs.length} {lang==="ar"?"وظيفة متاحة":lang==="nl"?"vacatures gevonden":"jobs found"}
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {jobs.map((job,i)=>{
                  const tc=job.type?.includes("ZZP")||job.type?.includes("Freelance")?GREEN:job.type?.includes("Stage")||job.type?.includes("Intern")?ORANGE:BLUE;
                  return (
                    <a key={i} href={(() => {
                        // Validate URL - use search fallback if URL looks fake
                        const u = job.url || "";
                        const isReal = u.startsWith("http") && (
                          u.includes("linkedin.com") || u.includes("indeed.com") ||
                          u.includes("werk.nl") || u.includes("monsterboard") ||
                          u.includes("randstad") || u.includes("intermediair") ||
                          u.includes("nationalevacaturebank") || u.includes("tempo-team")
                        );
                        return isReal ? u : `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(job.title||sq)}&location=${encodeURIComponent(job.location||location||"Nederland")}`;
                      })()} target="_blank" rel="noopener noreferrer"
                      style={{background:CARD,borderRadius:14,padding:"16px 18px",border:"2px solid #eee",textDecoration:"none",display:"block",cursor:"pointer",position:"relative"}}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor=tc;e.currentTarget.style.boxShadow=`0 4px 16px ${tc}20`;}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor="#eee";e.currentTarget.style.boxShadow="none";}}>
                      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${tc},${tc}44)`,borderRadius:"14px 14px 0 0"}}/>
                      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,marginBottom:8}}>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontWeight:700,fontSize:14.5,color:DARK,fontFamily:t.font,marginBottom:3}}>{job.title}</div>
                          <div style={{fontSize:13,color:"#444",fontFamily:t.font}}>{job.company} · {job.location}</div>
                        </div>
                        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:5,flexShrink:0}}>
                          <span style={{padding:"3px 10px",borderRadius:20,background:`${tc}15`,color:tc,fontSize:11,fontWeight:700,fontFamily:t.font}}>{job.type}</span>
                          <span style={{padding:"2px 8px",borderRadius:20,background:"#f8f9fa",color:"#555",fontSize:10.5}}>{job.source}</span>
                        </div>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8,flexWrap:"wrap"}}>
                        {job.salary&&<span style={{fontSize:12.5,fontWeight:700,color:GREEN,fontFamily:t.font}}>💶 {job.salary}</span>}
                        {job.remote&&<span style={{fontSize:12,color:"#555",fontFamily:t.font}}>📍 {job.remote}</span>}
                        {job.posted&&<span style={{fontSize:11.5,color:"#666",fontFamily:t.font}}>🕐 {job.posted}</span>}
                      </div>
                      {job.description&&<div style={{fontSize:12.5,color:"#444",fontFamily:t.font,lineHeight:1.7,direction:lang==="ar"?"rtl":"ltr",marginBottom:8}}>{job.description}</div>}
                      <div style={{display:"flex",alignItems:"center",gap:5,color:tc,fontSize:12,fontWeight:600,fontFamily:t.font}}>{L.viewJob}</div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
      {!searched&&<div style={{textAlign:"center",padding:"30px 20px",color:"#666",fontFamily:t.font,fontSize:13}}>{lang==="ar"?"أدخل كلمة بحث للبدء":lang==="nl"?"Voer een zoekterm in om te beginnen":"Enter a search term to get started"}</div>}
      <div style={{marginTop:16}}><PageFooter t={t} setPage={setPage}/></div>
    </div>
  );
}

