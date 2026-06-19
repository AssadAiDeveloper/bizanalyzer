'use client';
// =============================================================
// src/pages/ContactPage.jsx
// =============================================================
import { useState } from "react";
import { ORANGE, DARK, GREEN, RED, CARD } from "../lib/constants.js";
import { PageFooter } from "./SharedComponents.jsx";

// =============================================================
// PAGE: CONTACT
// =============================================================
export default function ContactPage({ lang, t, setPage }) {
  const [name,setName]=useState(""),[email,setEmail]=useState(""),[message,setMessage]=useState(""),[sent,setSent]=useState(false),[error,setError]=useState("");
  const isValidEmail=e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const handleSubmit=()=>{
    if(!name.trim()){setError(L.errName);return;}
    if(!isValidEmail(email)){setError(L.errEmail);return;}
    if(!message.trim()){setError(L.errMessage);return;}
    setError("");
    const sub=encodeURIComponent("BizAnalyzer.nl — "+name);
    const body=encodeURIComponent("Name: "+name+"\nEmail: "+email+"\n\n"+message);
    window.open("mailto:info@bizanalyzer.nl?subject="+sub+"&body="+body,"_blank");
    setSent(true);
  };
  const L={ar:{title:"تواصل معنا",sub:"نرحب بأسئلتك واقتراحاتك",nameLabel:"الاسم",emailLabel:"البريد الإلكتروني",msgLabel:"الرسالة",namePh:"اسمك الكريم",emailPh:"example@email.com",msgPh:"اكتب رسالتك هنا...",sendBtn:"إرسال الرسالة",sentTitle:"تم الإرسال! ✓",sentText:"شكراً على تواصلك. سنرد عليك قريباً.",errName:"يرجى إدخال اسمك",errEmail:"يرجى إدخال بريد صحيح",errMessage:"يرجى كتابة رسالتك",emailInfo:"info@bizanalyzer.nl",locationInfo:"هولندا",hoursInfo:"الرد خلال 24-48 ساعة"},nl:{title:"Contact",sub:"Stuur ons een bericht",nameLabel:"Naam",emailLabel:"E-mailadres",msgLabel:"Bericht",namePh:"Uw volledige naam",emailPh:"example@email.com",msgPh:"Schrijf hier uw bericht...",sendBtn:"Verstuur bericht",sentTitle:"Verstuurd! ✓",sentText:"Bedankt. We reageren zo snel mogelijk.",errName:"Vul uw naam in",errEmail:"Voer een geldig e-mailadres in",errMessage:"Schrijf uw bericht",emailInfo:"info@bizanalyzer.nl",locationInfo:"Nederland",hoursInfo:"Reactie binnen 24-48 uur"},en:{title:"Contact Us",sub:"We'd love to hear from you",nameLabel:"Name",emailLabel:"Email address",msgLabel:"Message",namePh:"Your full name",emailPh:"example@email.com",msgPh:"Write your message here...",sendBtn:"Send message",sentTitle:"Sent! ✓",sentText:"Thank you. We'll get back to you soon.",errName:"Please enter your name",errEmail:"Please enter a valid email",errMessage:"Please write your message",emailInfo:"info@bizanalyzer.nl",locationInfo:"Netherlands",hoursInfo:"Reply within 24-48 hours"}}[lang]||{};
  const inp={width:"100%",border:"2px solid #eee",borderRadius:10,padding:"10px 13px",fontSize:13.5,fontFamily:t.font,direction:lang==="ar"?"rtl":"ltr",transition:"all 0.2s",outline:"none"};
  return (
    <div style={{animation:"fadeUp 0.4s ease both",fontFamily:t.font,direction:t.dir}}>
      <div style={{borderRadius:20,overflow:"hidden",marginBottom:22,background:`linear-gradient(135deg,${DARK} 0%,#1a3a2a 100%)`,padding:"36px 28px",textAlign:"center",position:"relative"}}>
        <div style={{position:"absolute",top:-40,right:-40,width:160,height:160,borderRadius:"50%",background:`${GREEN}15`,pointerEvents:"none"}}/>
        <div style={{width:60,height:60,borderRadius:16,background:`linear-gradient(145deg,${GREEN},#047857)`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",fontSize:28,boxShadow:`0 6px 20px ${GREEN}44`}}>✉️</div>
        <h1 style={{fontSize:24,fontWeight:900,color:"white",margin:"0 0 8px",fontFamily:t.font}}>{L.title}</h1>
        <p style={{color:"#ffffff88",fontSize:13,margin:0}}>{L.sub}</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:16,marginBottom:16}}>
        <div style={{background:CARD,borderRadius:16,padding:24,boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
          {sent?(
            <div style={{textAlign:"center",padding:"30px 0"}}>
              <div style={{fontSize:48,marginBottom:12}}>✅</div>
              <div style={{fontWeight:800,fontSize:18,color:GREEN,fontFamily:t.font,marginBottom:8}}>{L.sentTitle}</div>
              <div style={{fontSize:13.5,color:"#666",fontFamily:t.font}}>{L.sentText}</div>
            </div>
          ):(
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div><label style={{display:"block",fontWeight:700,fontSize:12.5,color:DARK,marginBottom:5,fontFamily:t.font}}>{L.nameLabel}</label><input value={name} onChange={e=>setName(e.target.value.slice(0,100))} placeholder={L.namePh} style={inp}/></div>
              <div><label style={{display:"block",fontWeight:700,fontSize:12.5,color:DARK,marginBottom:5,fontFamily:t.font}}>{L.emailLabel}</label><input value={email} onChange={e=>setEmail(e.target.value.slice(0,200))} placeholder={L.emailPh} type="email" style={inp}/></div>
              <div><label style={{display:"block",fontWeight:700,fontSize:12.5,color:DARK,marginBottom:5,fontFamily:t.font}}>{L.msgLabel}</label><textarea value={message} onChange={e=>setMessage(e.target.value.slice(0,1000))} placeholder={L.msgPh} rows={5} style={{...inp,resize:"vertical"}}/></div>
              {error&&<div style={{padding:"8px 12px",background:"#fff5f5",border:"1px solid #fecaca",borderRadius:8,fontSize:12.5,color:RED,fontFamily:t.font}}>{error}</div>}
              <button onClick={handleSubmit} style={{padding:"12px 24px",background:GREEN,color:"white",border:"none",borderRadius:12,fontSize:14,fontWeight:700,fontFamily:t.font,cursor:"pointer"}}>{L.sendBtn}</button>
            </div>
          )}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {[{icon:"📧",label:L.emailInfo},{icon:"📍",label:L.locationInfo},{icon:"⏱️",label:L.hoursInfo}].map((item,i)=>(
            <div key={i} style={{background:CARD,borderRadius:14,padding:"14px 16px",boxShadow:"0 2px 10px rgba(0,0,0,0.05)",display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:36,height:36,borderRadius:10,background:`${ORANGE}12`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{item.icon}</div>
              <span style={{fontSize:12.5,color:"#444",fontFamily:t.font}}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <PageFooter t={t} setPage={setPage}/>
    </div>
  );
}

