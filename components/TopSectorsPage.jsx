'use client';
// =============================================================
// src/pages/TopSectorsPage.jsx
// =============================================================
import { useState } from "react";
import { DARK, GREEN, BLUE, CARD, TOP_SECTORS } from "../lib/constants.js";
import { PageFooter } from "./SharedComponents.jsx";

// =============================================================
// PAGE: TOP SECTORS
// =============================================================
export default function TopSectorsPage({ lang, t, onSelect, setPage }) {
  const [openId,setOpenId]=useState(null);
  const getName=s=>lang==="ar"?s.ar:lang==="nl"?s.nl:s.en;
  const getDesc=s=>lang==="ar"?s.arDesc:lang==="nl"?s.nlDesc:s.enDesc;
  const L={ar:{title:"أكثر القطاعات ربحاً في هولندا",sub:"CBS · KVK · 2024",margin:"هامش الربح",growth:"نمو سنوي",success:"نسبة النجاح",analyze:"تحليل هذا القطاع →"},nl:{title:"Meest winstgevende sectoren",sub:"CBS · KVK · 2024",margin:"Nettomarge",growth:"Jaarlijkse groei",success:"Slagingspercentage",analyze:"Analyseer deze sector →"},en:{title:"Most Profitable Sectors",sub:"CBS · KVK · 2024",margin:"Net Margin",growth:"Annual Growth",success:"Success Rate",analyze:"Analyze this sector →"}}[lang]||{};
  return (
    <div style={{animation:"fadeUp 0.4s ease both",fontFamily:t.font,direction:t.dir}}>
      <div style={{borderRadius:20,overflow:"hidden",marginBottom:22,background:`linear-gradient(135deg,${DARK} 0%,#16213e 100%)`,padding:"36px 28px",textAlign:"center",position:"relative"}}>
        <div style={{position:"absolute",top:-40,right:-40,width:160,height:160,borderRadius:"50%",background:"#FFD70015",pointerEvents:"none"}}/>
        <div style={{width:60,height:60,borderRadius:16,background:"linear-gradient(145deg,#FFD700,#f0b800)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",fontSize:28,boxShadow:"0 6px 20px #FFD70044"}}>🏆</div>
        <h2 style={{fontSize:22,fontWeight:900,color:"white",margin:"0 0 6px",fontFamily:t.font}}>{L.title}</h2>
        <p style={{color:"#ffffff88",fontSize:12,margin:0}}>{L.sub}</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14,marginBottom:16}}>
        {TOP_SECTORS.map(s=>{
          const isOpen=openId===s.rank;
          return (
            <div key={s.rank} onClick={()=>setOpenId(isOpen?null:s.rank)}
              style={{background:CARD,borderRadius:16,padding:18,cursor:"pointer",border:`2px solid ${isOpen?s.color:"#e8e8e8"}`,boxShadow:isOpen?`0 8px 28px ${s.color}22`:"0 2px 10px rgba(0,0,0,0.05)",transition:"all 0.3s",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${s.color},${s.color}55)`}}/>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                <div style={{width:42,height:42,borderRadius:11,background:`${s.color}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{s.icon}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:800,fontSize:14,color:DARK,fontFamily:t.font}}>{getName(s)}</div>
                  <div style={{fontSize:9.5,color:"#777",direction:"ltr"}}>SBI {s.sbi}</div>
                </div>
                <div style={{width:34,height:34,borderRadius:"50%",flexShrink:0,background:`linear-gradient(145deg,${s.color},${s.color}cc)`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:13,color:"white"}}>{s.rank}</div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(70px,1fr))",gap:8,marginBottom:10}}>
                {[{label:L.margin,value:`${s.margin}%`,color:GREEN},{label:L.growth,value:`+${s.growth}%`,color:BLUE},{label:L.success,value:`${s.successRate}%`,color:s.color}].map(k=>(
                  <div key={k.label} style={{background:"#f8f9fa",borderRadius:8,padding:"6px 4px",textAlign:"center"}}>
                    <div style={{fontSize:9,color:"#666",fontFamily:t.font,marginBottom:2}}>{k.label}</div>
                    <div style={{fontSize:12,fontWeight:800,color:k.color,fontFamily:t.font}}>{k.value}</div>
                  </div>
                ))}
              </div>
              {isOpen&&(
                <div style={{animation:"fadeUp 0.3s ease both"}}>
                  <div style={{fontSize:12,color:"#555",fontFamily:t.font,direction:t.dir,lineHeight:1.75,marginBottom:12,padding:"10px 12px",background:"#f8f9fa",borderRadius:10}}>{getDesc(s)}</div>
                  <div style={{fontSize:10.5,color:"#666",fontFamily:t.font,direction:"ltr",marginBottom:10}}>Avg {s.avgRevenue}/yr</div>
                  <button onClick={e=>{e.stopPropagation();onSelect(s,lang);}}
                    style={{width:"100%",padding:"9px",background:s.color,color:"white",border:"none",borderRadius:10,fontFamily:t.font,fontWeight:700,fontSize:12.5,cursor:"pointer"}}>
                    {L.analyze}
                  </button>
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

