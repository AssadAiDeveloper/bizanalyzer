'use client';
// =============================================================
// src/pages/AboutPage.jsx
// =============================================================
import { ORANGE, DARK, BLUE, CARD } from "../lib/constants.js";
import { PageFooter } from "./SharedComponents.jsx";

// =============================================================
// PAGE: ABOUT
// =============================================================
export default function AboutPage({ lang, t, setPage }) {
  const L={ar:{title:"عن BizAnalyzer.nl",sub:"محلل الأعمال الذكي للسوق الهولندي",whoTitle:"من نحن",whoText:"BizAnalyzer.nl هو أداة مستقلة مبنية بالذكاء الاصطناعي لمساعدة رواد الأعمال على تحليل أفكارهم التجارية في السوق الهولندي.",whatTitle:"ما نقدمه",whatItems:["تحليل السوق الهولندي بواسطة 4 وكلاء ذكاء اصطناعي","بيانات القطاعات الأكثر ربحاً في هولندا","أجور المستقلين (ZZP) وبيانات سوق العمل","البحث عن وظائف في هولندا","آخر الأخبار الاقتصادية الهولندية"],version:"الإصدار 1.0 — 2025"},nl:{title:"Over BizAnalyzer.nl",sub:"De AI-gedreven bedrijfsanalysator voor Nederland",whoTitle:"Wie zijn wij",whoText:"BizAnalyzer.nl is een onafhankelijke AI-tool om ondernemers te helpen hun bedrijfsideeën te analyseren op de Nederlandse markt.",whatTitle:"Wat bieden wij",whatItems:["Marktanalyse met 4 specialisten","Data over meest winstgevende sectoren in NL","ZZP-tarieven en arbeidsmarktdata","Vacatures zoeken in Nederland","Laatste economisch nieuws"],version:"Versie 1.0 — 2025"},en:{title:"About BizAnalyzer.nl",sub:"The AI-powered business analyzer for the Dutch market",whoTitle:"Who we are",whoText:"BizAnalyzer.nl is an independent AI tool to help entrepreneurs analyze their business ideas in the Dutch market.",whatTitle:"What we offer",whatItems:["Market analysis with 4 AI agents","Data on most profitable sectors in NL","ZZP freelance rates and labor market data","Job search in the Netherlands","Latest economic news"],version:"Version 1.0 — 2025"}}[lang]||{};
  return (
    <div style={{animation:"fadeUp 0.4s ease both",fontFamily:t.font,direction:t.dir}}>
      <div style={{borderRadius:20,overflow:"hidden",marginBottom:22,background:`linear-gradient(135deg,${DARK} 0%,#1a2a4a 100%)`,padding:"36px 28px",textAlign:"center",position:"relative"}}>
        <div style={{position:"absolute",top:-40,right:-40,width:160,height:160,borderRadius:"50%",background:`${BLUE}15`,pointerEvents:"none"}}/>
        <div style={{width:60,height:60,borderRadius:16,background:`linear-gradient(145deg,${BLUE},#1e40af)`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",fontSize:28,boxShadow:`0 6px 20px ${BLUE}44`}}>ℹ️</div>
        <h1 style={{fontSize:24,fontWeight:900,color:"white",margin:"0 0 8px",fontFamily:t.font}}>{L.title}</h1>
        <p style={{color:"#ffffff88",fontSize:13,margin:0}}>{L.sub}</p>
      </div>
      <div style={{background:CARD,borderRadius:16,padding:22,marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <div style={{width:36,height:36,borderRadius:10,background:`${BLUE}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🏢</div>
          <div style={{fontWeight:800,fontSize:16,color:DARK,fontFamily:t.font}}>{L.whoTitle}</div>
        </div>
        <p style={{fontSize:13.5,color:"#444",lineHeight:1.85,fontFamily:t.font,margin:0}}>{L.whoText}</p>
      </div>
      <div style={{background:CARD,borderRadius:16,padding:22,marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <div style={{width:36,height:36,borderRadius:10,background:`${ORANGE}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🚀</div>
          <div style={{fontWeight:800,fontSize:16,color:DARK,fontFamily:t.font}}>{L.whatTitle}</div>
        </div>
        {L.whatItems.map((item,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<L.whatItems.length-1?"1px solid #f0f0f0":"none"}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:ORANGE,flexShrink:0}}/>
            <span style={{fontSize:13.5,color:"#333",fontFamily:t.font}}>{item}</span>
          </div>
        ))}
      </div>
      <div style={{textAlign:"center",padding:"12px",color:"#666",fontSize:12,fontFamily:t.font,marginBottom:8}}>{L.version}</div>
      <PageFooter t={t} setPage={setPage}/>
    </div>
  );
}

