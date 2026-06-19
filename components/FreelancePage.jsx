'use client';
// =============================================================
// src/pages/FreelancePage.jsx
// =============================================================
import { useState, useEffect, useRef } from "react";
import { ORANGE, DARK, GREEN, BLUE, PURPLE, RED, GOLD, CARD, FREELANCE_DATA } from "../lib/constants.js";
import { apiFetch } from "../lib/api.js";
import { PageFooter } from "./SharedComponents.jsx";

// =============================================================
// PAGE: FREELANCE RATES
// =============================================================
export default function FreelancePage({ lang, t, setPage }) {
  const [search,setSearch]=useState(""),[selected,setSelected]=useState(null),[filterCat,setFilterCat]=useState("all"),[sortBy,setSortBy]=useState("demand");
  const [aiQuery,setAiQuery]=useState(""),[aiResult,setAiResult]=useState(null),[aiLoading,setAiLoading]=useState(false),[aiError,setAiError]=useState(null);
  const getName=s=>lang==="ar"?s.ar:lang==="nl"?s.nl:s.en;
  const getDesc=s=>lang==="ar"?s.arDesc:lang==="nl"?s.nlDesc:s.enDesc;
  const dc=d=>d>=90?GREEN:d>=75?ORANGE:RED;
  const dl=d=>lang==="ar"?(d>=90?"عالٍ جداً":d>=75?"عالٍ":"متوسط"):lang==="nl"?(d>=90?"Zeer hoog":d>=75?"Hoog":"Gemiddeld"):(d>=90?"Very High":d>=75?"High":"Medium");
  const L={ar:{title:"أجور المستقلين في هولندا (ZZP)",sub:"CBS · Malt.nl · 2024",ph:"ابحث عن تخصص...",perHour:"€/ساعة",demand:"الطلب",learn:"وقت التعلم",months:"شهر",certs:"الشهادات",courses:"أقصر الكورسات",tools:"الأدوات",free:"مجاني",paid:"مدفوع",all:"الكل",tech:"تقنية",dev:"برمجة",data:"بيانات",design:"تصميم",marketing:"تسويق",sortDemand:"الأعلى طلباً",sortRate:"الأعلى سعراً",sortLearn:"الأسرع تعلماً",aiTitle:"🔍 تحليل أي مهنة بالذكاء الاصطناعي",aiSub:"اكتب اسم المهنة واحصل على تحليل كامل للسوق الهولندي",analyzeBtn:"تحليل →",demandLabel:"نسبة الطلب",studyLabel:"مدة الدراسة",riskLabel:"المخاطرة",entryLabel:"كيفية الدخول",skillsLabel:"المهارات",certsLabel:"الشهادات",fastLabel:"أقصر الكورسات",sitesLabel:"ابحث في:"},nl:{title:"ZZP Tarieven Nederland",sub:"CBS · Malt.nl · 2024",ph:"Zoek specialisatie...",perHour:"€/uur",demand:"Vraag",learn:"Leertijd",months:"mnd",certs:"Certificaten",courses:"Snelste cursussen",tools:"Tools",free:"Gratis",paid:"Betaald",all:"Alle",tech:"Tech",dev:"Dev",data:"Data",design:"Design",marketing:"Marketing",sortDemand:"Meest gevraagd",sortRate:"Hoogste tarief",sortLearn:"Snelste te leren",aiTitle:"🔍 Analyseer elk beroep met AI",aiSub:"Voer een beroepsnaam in voor volledige analyse",analyzeBtn:"Analyseer →",demandLabel:"Vraag",studyLabel:"Studieduur",riskLabel:"Risico",entryLabel:"Hoe te beginnen",skillsLabel:"Vaardigheden",certsLabel:"Certificaten",fastLabel:"Snelste cursussen",sitesLabel:"Zoek op:"},en:{title:"Freelance Rates Netherlands (ZZP)",sub:"CBS · Malt.nl · 2024",ph:"Search specialization...",perHour:"€/hour",demand:"Demand",learn:"Learn time",months:"mo",certs:"Certificates",courses:"Fast-track Courses",tools:"Tools",free:"Free",paid:"Paid",all:"All",tech:"Tech",dev:"Dev",data:"Data",design:"Design",marketing:"Marketing",sortDemand:"Most in demand",sortRate:"Highest rate",sortLearn:"Fastest to learn",aiTitle:"🔍 Analyze Any Job with AI",aiSub:"Enter any job title for Dutch market analysis",analyzeBtn:"Analyze →",demandLabel:"Demand",studyLabel:"Study Time",riskLabel:"Risk",entryLabel:"How to Enter",skillsLabel:"Required Skills",certsLabel:"Certifications",fastLabel:"Fastest Courses",sitesLabel:"Find jobs at:"}}[lang]||{};

  const doAnalyze=async(activeLang)=>{
    if(!aiQuery.trim()||aiLoading)return;
    setAiLoading(true);setAiResult(null);setAiError(null);
    const prompts={
      ar:`أنت خبير سوق عمل في هولندا. حلّل: "${aiQuery}" للسوق الهولندي 2024. أجب بـ JSON فقط:\n{"jobTitle":"STRING","rateMin":NUMBER,"rateMax":NUMBER,"employeeHourlyMin":NUMBER,"employeeHourlyMax":NUMBER,"demand":NUMBER,"demandLabel":"STRING","studyMonths":NUMBER,"studyMonthsMax":NUMBER,"entryPath":"STRING","marketInsight":"STRING","topCourses":[{"name":"S","url":"https://...","free":true,"months":NUMBER}],"requiredSkills":["S","S","S"],"certifications":["S","S"],"riskLevel":"منخفض|متوسط|عالي","dutchJobSites":["https://linkedin.com/jobs"]}`,
      nl:`Je bent arbeidsmarktexpert voor Nederland. Analyseer: "${aiQuery}" 2024. ALLEEN JSON:\n{"jobTitle":"STRING","rateMin":NUMBER,"rateMax":NUMBER,"employeeHourlyMin":NUMBER,"employeeHourlyMax":NUMBER,"demand":NUMBER,"demandLabel":"STRING","studyMonths":NUMBER,"studyMonthsMax":NUMBER,"entryPath":"STRING","marketInsight":"STRING","topCourses":[{"name":"S","url":"https://...","free":true,"months":NUMBER}],"requiredSkills":["S","S","S"],"certifications":["S","S"],"riskLevel":"laag|gemiddeld|hoog","dutchJobSites":["https://linkedin.com/jobs"]}`,
      en:`Dutch labor market expert. Analyze: "${aiQuery}" Netherlands 2024. JSON only:\n{"jobTitle":"STRING","rateMin":NUMBER,"rateMax":NUMBER,"employeeHourlyMin":NUMBER,"employeeHourlyMax":NUMBER,"demand":NUMBER,"demandLabel":"STRING","studyMonths":NUMBER,"studyMonthsMax":NUMBER,"entryPath":"STRING","marketInsight":"STRING","topCourses":[{"name":"S","url":"https://...","free":true,"months":NUMBER}],"requiredSkills":["S","S","S"],"certifications":["S","S"],"riskLevel":"low|medium|high","dutchJobSites":["https://linkedin.com/jobs"]}`,
    };
    try{
      const raw=await apiFetch({max_tokens:4096,messages:[{role:"user",content:prompts[activeLang]||prompts.en}]});
      const s=raw.indexOf("{"),e=raw.lastIndexOf("}");
      if(s===-1||e===-1)throw new Error("No JSON");
      setAiResult(JSON.parse(raw.slice(s,e+1)));
    }catch(_){setAiError("Analysis unavailable. Please retry.");}
    finally{setAiLoading(false);}
  };

  const analyzeRef=useRef(null);analyzeRef.current=doAnalyze;
  const prevLangRef=useRef(lang);
  useEffect(()=>{
    if(prevLangRef.current!==lang){prevLangRef.current=lang;if(aiResult&&aiQuery.trim())setTimeout(()=>analyzeRef.current?.(lang),150);}
  });

  const filtered=FREELANCE_DATA.filter(s=>filterCat==="all"||s.cat===filterCat).filter(s=>{const q=search.toLowerCase();return!q||getName(s).toLowerCase().includes(q)||s.tools.some(tool=>tool.toLowerCase().includes(q));}).sort((a,b)=>sortBy==="demand"?b.demand-a.demand:sortBy==="rate"?b.rateMax-a.rateMax:a.learnMin-b.learnMin);
  const ai=aiResult;
  const aiRc=ai?(["منخفض","laag","low"].includes((ai.riskLevel||"").toLowerCase())?GREEN:["متوسط","gemiddeld","medium"].includes((ai.riskLevel||"").toLowerCase())?ORANGE:RED):ORANGE;

  return (
    <div style={{animation:"fadeUp 0.4s ease both",fontFamily:t.font,direction:t.dir}}>
      <div style={{borderRadius:20,overflow:"hidden",marginBottom:20,background:`linear-gradient(135deg,${DARK} 0%,#1a1040 100%)`,padding:"32px 24px",position:"relative",textAlign:"center"}}>
        <div style={{position:"absolute",top:-40,right:-40,width:160,height:160,borderRadius:"50%",background:`${PURPLE}15`,pointerEvents:"none"}}/>
        <div style={{width:56,height:56,borderRadius:16,background:`linear-gradient(145deg,${PURPLE},#5b21b6)`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",fontSize:26,boxShadow:`0 6px 20px ${PURPLE}44`}}>💼</div>
        <h2 style={{fontSize:22,fontWeight:900,color:"white",margin:"0 0 6px",fontFamily:t.font}}>{L.title}</h2>
        <p style={{color:"#ffffff88",fontSize:12,margin:0}}>{L.sub}</p>
      </div>

      {/* AI Job Analyzer */}
      <div style={{background:`linear-gradient(135deg,${DARK} 0%,#2d1f6e 100%)`,borderRadius:18,padding:20,marginBottom:18}}>
        <div style={{color:"white",fontWeight:800,fontSize:14,fontFamily:t.font,marginBottom:4}}>{L.aiTitle}</div>
        <div style={{color:"#ffffff88",fontSize:12,fontFamily:t.font,marginBottom:12}}>{L.aiSub}</div>
        <div style={{display:"flex",gap:8}}>
          <input value={aiQuery} onChange={e=>setAiQuery(e.target.value.slice(0,100))} onKeyDown={e=>e.key==="Enter"&&doAnalyze(lang)}
            placeholder="e.g. Blockchain Developer, Notaris..."
            style={{flex:1,border:"none",borderRadius:10,padding:"11px 14px",fontSize:13,fontFamily:t.font,background:"rgba(255,255,255,0.12)",color:"white",outline:"none"}}/>
          <button onClick={()=>doAnalyze(lang)} disabled={aiLoading||!aiQuery.trim()}
            style={{padding:"11px 18px",borderRadius:10,border:"none",background:aiLoading||!aiQuery.trim()?"#ffffff22":ORANGE,color:aiLoading||!aiQuery.trim()?"#ffffff44":"white",fontFamily:t.font,fontWeight:700,fontSize:13,cursor:aiLoading||!aiQuery.trim()?"not-allowed":"pointer",flexShrink:0}}>
            {aiLoading?<span style={{display:"flex",gap:3}}>{[0,1,2].map(i=><span key={i} style={{width:6,height:6,borderRadius:"50%",background:"white",display:"inline-block",animation:`bounce 1.2s ease-in-out ${i*0.2}s infinite`}}/>)}</span>:L.analyzeBtn}
          </button>
        </div>
        {aiError&&<div style={{marginTop:10,padding:"8px 12px",background:"#fee2e2",borderRadius:8,fontSize:12,color:RED,fontFamily:t.font}}>⚠️ {aiError}</div>}
        {ai&&(
          <div style={{marginTop:14,background:"rgba(255,255,255,0.06)",borderRadius:14,padding:16,animation:"fadeUp 0.4s ease both"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,flexWrap:"wrap",gap:8}}>
              <div><div style={{color:"white",fontWeight:900,fontSize:17,fontFamily:t.font}}>{ai.jobTitle}</div><div style={{color:"#ffffff88",fontSize:10}}>ZZP · NL 2024</div></div>
              <div style={{display:"flex",flexDirection:"row",gap:6}}>
                <div style={{textAlign:"center",background:ORANGE,borderRadius:10,padding:"7px 12px"}}>
                  <div style={{color:"rgba(255,255,255,0.7)",fontSize:12,fontFamily:t.font,marginBottom:2}}>
                    {lang==="ar"?"🧑‍💻 ZZP / مستقل":lang==="nl"?"🧑‍💻 ZZP / Freelance":"🧑‍💻 ZZP / Freelance"}
                  </div>
                  <div style={{color:"white",fontWeight:900,fontSize:18,direction:"ltr"}}>€{ai.rateMin}–€{ai.rateMax}</div>
                  <div style={{color:"rgba(255,255,255,0.8)",fontSize:12,fontFamily:t.font}}>{L.perHour}</div>
                </div>
                {ai.employeeHourlyMin && (
                  <div style={{textAlign:"center",background:BLUE,borderRadius:10,padding:"7px 12px"}}>
                    <div style={{color:"rgba(255,255,255,0.7)",fontSize:12,fontFamily:t.font,marginBottom:2}}>
                      {lang==="ar"?"👔 موظف (بالساعة)":lang==="nl"?"👔 Werknemer (uurloon)":"👔 Employee (hourly)"}
                    </div>
                    <div style={{color:"white",fontWeight:900,fontSize:18,direction:"ltr"}}>€{ai.employeeHourlyMin}–€{ai.employeeHourlyMax}</div>
                    <div style={{color:"rgba(255,255,255,0.8)",fontSize:12,fontFamily:t.font}}>{L.perHour}</div>
                  </div>
                )}
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(80px,1fr))",gap:8,marginBottom:12}}>
              {[{label:L.demandLabel,value:`${ai.demand}%`,color:ai.demand>=80?GREEN:ai.demand>=60?ORANGE:RED},{label:L.studyLabel,value:`${ai.studyMonths}–${ai.studyMonthsMax} ${L.months}`,color:PURPLE},{label:L.riskLabel,value:ai.riskLevel,color:aiRc}].map(k=>(
                <div key={k.label} style={{background:"rgba(255,255,255,0.08)",borderRadius:10,padding:"10px 8px",textAlign:"center"}}>
                  <div style={{fontSize:12,color:"#ffffffaa",fontFamily:t.font,marginBottom:3}}>{k.label}</div>
                  <div style={{fontSize:13,fontWeight:800,color:k.color,fontFamily:t.font}}>{k.value}</div>
                </div>
              ))}
            </div>
            {ai.marketInsight&&<div style={{marginBottom:10,padding:"9px 12px",background:"rgba(255,255,255,0.07)",borderRadius:10,fontSize:12,color:"#ffffffcc",fontFamily:t.font,lineHeight:1.75,direction:lang==="ar"?"rtl":"ltr"}}>💡 {ai.marketInsight}</div>}
            {ai.entryPath&&<div style={{marginBottom:10,padding:"9px 12px",background:"rgba(5,150,105,0.15)",border:"1px solid rgba(5,150,105,0.3)",borderRadius:10,fontSize:12,color:"#6ee7b7",fontFamily:t.font,lineHeight:1.75,direction:lang==="ar"?"rtl":"ltr"}}>🚀 {ai.entryPath}</div>}
            {ai.requiredSkills?.length>0&&<div style={{marginBottom:10}}><div style={{fontSize:12,fontWeight:700,color:"#ffffff88",fontFamily:t.font,marginBottom:6}}>🛠 {L.skillsLabel}</div><div style={{display:"flex",flexWrap:"wrap",gap:5}}>{ai.requiredSkills.map(sk=><span key={sk} style={{padding:"3px 9px",borderRadius:20,background:"rgba(124,58,237,0.3)",color:"#c4b5fd",fontSize:12,fontFamily:"monospace"}}>{sk}</span>)}</div></div>}
            {ai.certifications?.length>0&&<div style={{marginBottom:10}}><div style={{fontSize:12,fontWeight:700,color:"#ffffff88",fontFamily:t.font,marginBottom:6}}>🎓 {L.certsLabel}</div><div style={{display:"flex",flexWrap:"wrap",gap:5}}>{ai.certifications.map(c=><span key={c} style={{padding:"3px 9px",borderRadius:20,background:"rgba(29,78,216,0.3)",color:"#93c5fd",fontSize:12,fontFamily:t.font}}>📜 {c}</span>)}</div></div>}
            {ai.topCourses?.length>0&&<div style={{marginBottom:10}}><div style={{fontSize:12,fontWeight:700,color:"#ffffff88",fontFamily:t.font,marginBottom:8}}>🎯 {L.fastLabel}</div>{ai.topCourses.map((c,i)=><a key={i} href={c.url} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",marginBottom:6,background:c.free?"rgba(5,150,105,0.15)":"rgba(255,255,255,0.06)",border:`1px solid ${c.free?"rgba(5,150,105,0.35)":"rgba(255,255,255,0.1)"}`,borderRadius:10,textDecoration:"none"}}><div style={{flex:1,minWidth:0}}><div style={{fontSize:13,color:"white",fontFamily:t.font,fontWeight:600}}>{c.name}</div><div style={{fontSize:12,color:"#ffffffaa",direction:"ltr"}}>{c.months} {L.months}</div></div><span style={{padding:"2px 8px",borderRadius:20,fontSize:12,fontWeight:700,background:c.free?"rgba(5,150,105,0.4)":"rgba(217,119,6,0.4)",color:c.free?"#6ee7b7":"#fcd34d",flexShrink:0}}>{c.free?L.free:L.paid}</span></a>)}</div>}
            {ai.dutchJobSites?.length>0&&<div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}><span style={{fontSize:12,color:"#ffffffaa",fontFamily:t.font}}>🇳🇱 {L.sitesLabel}</span>{ai.dutchJobSites.map((site,i)=><a key={i} href={site} target="_blank" rel="noopener noreferrer" style={{fontSize:12,color:"#60a5fa",textDecoration:"none",padding:"2px 8px",background:"rgba(96,165,250,0.15)",borderRadius:20}}>{site.replace("https://","").replace("www.","").split("/")[0]} ↗</a>)}</div>}
          </div>
        )}
      </div>

      {/* Filter + Sort */}
      <div style={{background:CARD,borderRadius:16,padding:14,marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={L.ph} style={{width:"100%",border:"2px solid #eee",borderRadius:10,padding:"9px 13px",fontSize:13,fontFamily:t.font,direction:lang==="ar"?"rtl":"ltr",marginBottom:10,outline:"none"}}/>
        <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:8}}>
          {["all","tech","dev","data","design","marketing"].map(c=>(
            <button key={c} onClick={()=>setFilterCat(c)} style={{padding:"3px 11px",borderRadius:20,border:`1.5px solid ${filterCat===c?ORANGE:"#eee"}`,background:filterCat===c?ORANGE:"white",color:filterCat===c?"white":"#666",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:t.font,transition:"all 0.15s"}}>{L[c]||c}</button>
          ))}
        </div>
        <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
          {[["demand",L.sortDemand],["rate",L.sortRate],["learn",L.sortLearn]].map(([v,lbl])=>(
            <button key={v} onClick={()=>setSortBy(v)} style={{padding:"3px 11px",borderRadius:20,border:`1.5px solid ${sortBy===v?PURPLE:"#eee"}`,background:sortBy===v?PURPLE:"white",color:sortBy===v?"white":"#666",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:t.font,transition:"all 0.15s"}}>{lbl}</button>
          ))}
        </div>
      </div>

      {/* Specialization cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:12,marginBottom:16}}>
        {filtered.map(s=>{
          const isOpen=selected===s.id,dColor=dc(s.demand);
          return (
            <div key={s.id} style={{background:CARD,borderRadius:16,padding:16,border:`2px solid ${isOpen?s.color:"#e8e8e8"}`,boxShadow:isOpen?`0 8px 28px ${s.color}20`:"0 2px 8px rgba(0,0,0,0.04)",transition:"all 0.3s",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${s.color},${s.color}44)`}}/>
              <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:10,cursor:"pointer"}} onClick={()=>setSelected(isOpen?null:s.id)}>
                <div style={{width:40,height:40,borderRadius:10,background:`${s.color}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,flexShrink:0}}>{s.icon}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:700,fontSize:13,color:DARK,fontFamily:t.font,lineHeight:1.3}}>{getName(s)}</div>
                  <div style={{fontSize:12,color:"#444",textTransform:"uppercase"}}>{s.cat}</div>
                </div>
                <div style={{textAlign:"center",flexShrink:0}}>
                  <div style={{fontWeight:900,fontSize:15,color:s.color,fontFamily:t.font,direction:"ltr"}}>€{s.rateMin}–{s.rateMax}</div>
                  <div style={{fontSize:12,color:"#444",fontFamily:t.font}}>{L.perHour}</div>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(80px,1fr))",gap:6,cursor:"pointer"}} onClick={()=>setSelected(isOpen?null:s.id)}>
                <div style={{background:"#f8f9fa",borderRadius:8,padding:"5px 4px",textAlign:"center"}}><div style={{fontSize:8.5,color:"#444",fontFamily:t.font}}>{L.demand}</div><div style={{fontSize:12,fontWeight:800,color:dColor}}>{s.demand}%</div></div>
                <div style={{background:"#f8f9fa",borderRadius:8,padding:"5px 4px",textAlign:"center"}}><div style={{fontSize:8.5,color:"#444",fontFamily:t.font}}>{L.learn}</div><div style={{fontSize:12,fontWeight:800,color:DARK,direction:"ltr"}}>{s.learnMin}–{s.learnMax}{L.months}</div></div>
                <div style={{background:`${dColor}10`,borderRadius:8,padding:"5px 4px",textAlign:"center"}}><div style={{fontSize:8.5,color:"#444",fontFamily:t.font}}>Status</div><div style={{fontSize:12,fontWeight:700,color:dColor}}>{dl(s.demand)}</div></div>
              </div>
              {!isOpen&&<div style={{background:"#f0f0f0",borderRadius:6,height:5,overflow:"hidden",marginTop:8,cursor:"pointer"}} onClick={()=>setSelected(isOpen?null:s.id)}><div style={{width:`${s.demand}%`,height:"100%",background:`linear-gradient(90deg,${s.color},${s.color}88)`,transition:"width 1s ease"}}/></div>}
              {isOpen&&(
                <div style={{marginTop:12,animation:"fadeUp 0.3s ease both"}}>
                  <div style={{fontSize:12,color:"#444",fontFamily:t.font,lineHeight:1.75,marginBottom:10,padding:"9px 11px",background:"#f8f9fa",borderRadius:10,direction:lang==="ar"?"rtl":"ltr"}}>{getDesc(s)}</div>
                  <div style={{marginBottom:10}}><div style={{fontSize:12,fontWeight:700,color:DARK,fontFamily:t.font,marginBottom:6}}>🛠 {L.tools}</div><div style={{display:"flex",flexWrap:"wrap",gap:4}}>{s.tools.map(tool=><span key={tool} style={{padding:"2px 8px",borderRadius:20,background:`${s.color}12`,color:s.color,fontSize:12,fontWeight:600,fontFamily:"monospace"}}>{tool}</span>)}</div></div>
                  <div style={{marginBottom:10}}><div style={{fontSize:12,fontWeight:700,color:DARK,fontFamily:t.font,marginBottom:6}}>🎓 {L.certs}</div>{s.certs.map((cert,i)=><a key={i} href={(() => {
                    const u = s.certUrls[i] || "";
                    return u.startsWith("http") ? u : `https://www.google.com/search?q=${encodeURIComponent(cert)}+certification`;
                  })()} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 10px",marginBottom:5,background:"#f0f9ff",border:"1px solid #bae6fd",borderRadius:8,textDecoration:"none",gap:8}}><span style={{fontSize:12,color:"#0369a1",fontFamily:t.font,fontWeight:600}}>📜 {cert}</span><span style={{fontSize:12,color:BLUE,flexShrink:0}}>↗</span></a>)}</div>
                  <div><div style={{fontSize:12,fontWeight:700,color:DARK,fontFamily:t.font,marginBottom:6}}>🚀 {L.courses}</div>{s.courses.map((c,i)=><a key={i} href={(() => {
                    const u = c.u || "";
                    return u.startsWith("http") ? u : `https://www.google.com/search?q=${encodeURIComponent(c.n)}+course`;
                  })()} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",marginBottom:6,background:c.free?"#f0fdf4":"#fafafa",border:`1px solid ${c.free?"#bbf7d0":"#eee"}`,borderRadius:9,textDecoration:"none"}}><div style={{flex:1,minWidth:0}}><div style={{fontSize:12,color:"#333",fontFamily:t.font,fontWeight:600}}>{c.n}</div><div style={{fontSize:12,color:"#333",direction:"ltr"}}>{c.mo} {L.months}</div></div><span style={{padding:"2px 7px",borderRadius:20,fontSize:12,fontWeight:700,background:c.free?"#dcfce7":"#fef9c3",color:c.free?GREEN:GOLD,flexShrink:0}}>{c.free?L.free:L.paid}</span></a>)}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <PageFooter t={t} setPage={setPage}/>
    </div>
  );
}