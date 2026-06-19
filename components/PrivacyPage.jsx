'use client';
// =============================================================
// src/pages/PrivacyPage.jsx
// =============================================================
import { DARK, GREEN, PURPLE, CARD } from "../lib/constants.js";
import { PageFooter } from "./SharedComponents.jsx";

// =============================================================
// PAGE: PRIVACY POLICY
// =============================================================
export default function PrivacyPage({ lang, t, setPage }) {
  const sections={ar:[{title:"المعلومات التي نجمعها",text:"لا نجمع بيانات شخصية. الأفكار التي تدخلها تُرسل لـ Gemini API للتحليل فقط."},{title:"كيف نستخدم المعلومات",text:"المعلومات تُستخدم فقط لتوليد التحليل. لا نشاركها مع أي طرف ثالث."},{title:"ملفات تعريف الارتباط",text:"قد يستخدم موقعنا cookies لتحسين الأداء."},{title:"حقوقك (GDPR)",text:"لك الحق في الوصول لبياناتك وتصحيحها وحذفها. تواصل: info@bizanalyzer.nl"},{title:"أمان البيانات",text:"نستخدم HTTPS مشفر. لا نخزن بيانات المستخدمين."},{title:"التغييرات",text:"نحتفظ بحق تحديث هذه السياسة. سيتم إخطارك عبر الموقع."}],nl:[{title:"Informatie die we verzamelen",text:"Wij verzamelen geen persoonlijke gegevens. Ingevoerde ideeën worden naar Gemini API gestuurd voor analyse."},{title:"Hoe we informatie gebruiken",text:"Informatie wordt uitsluitend voor analyse gebruikt. We delen geen gegevens met derden."},{title:"Cookies",text:"Onze website kan cookies gebruiken om de gebruikerservaring te verbeteren."},{title:"Uw rechten (AVG/GDPR)",text:"U heeft recht op inzage, rectificatie en verwijdering. Contact: info@bizanalyzer.nl"},{title:"Gegevensbeveiliging",text:"We gebruiken HTTPS. We slaan geen gebruikersgegevens op."},{title:"Wijzigingen",text:"We behouden ons het recht voor dit beleid bij te werken."}],en:[{title:"Information We Collect",text:"We do not collect personal data. Business ideas are sent to Gemini API for analysis only."},{title:"How We Use Information",text:"Entered information is used solely for AI analysis. We don't share data with third parties."},{title:"Cookies",text:"Our website may use cookies to improve user experience."},{title:"Your Rights (GDPR)",text:"You have the right to access, rectify and erase your data. Contact: info@bizanalyzer.nl"},{title:"Data Security",text:"We use HTTPS encryption. We do not store user data on our servers."},{title:"Changes",text:"We reserve the right to update this policy. Users will be notified via the website."}]}[lang]||[];
  const L={ar:{title:"سياسة الخصوصية",sub:"آخر تحديث: 1 يناير 2025",gdpr:"متوافقة مع GDPR"},nl:{title:"Privacybeleid",sub:"Laatste update: 1 januari 2025",gdpr:"AVG/GDPR-conform"},en:{title:"Privacy Policy",sub:"Last updated: January 1, 2025",gdpr:"GDPR Compliant"}}[lang]||{};
  return (
    <div style={{animation:"fadeUp 0.4s ease both",fontFamily:t.font,direction:t.dir}}>
      <div style={{borderRadius:20,overflow:"hidden",marginBottom:22,background:`linear-gradient(135deg,${DARK} 0%,#2a1a3a 100%)`,padding:"36px 28px",textAlign:"center",position:"relative"}}>
        <div style={{position:"absolute",top:-40,right:-40,width:160,height:160,borderRadius:"50%",background:`${PURPLE}15`,pointerEvents:"none"}}/>
        <div style={{width:60,height:60,borderRadius:16,background:`linear-gradient(145deg,${PURPLE},#5b21b6)`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",fontSize:28,boxShadow:`0 6px 20px ${PURPLE}44`}}>🔒</div>
        <h1 style={{fontSize:24,fontWeight:900,color:"white",margin:"0 0 8px",fontFamily:t.font}}>{L.title}</h1>
        <p style={{color:"#ffffff88",fontSize:13,margin:0}}>{L.sub}</p>
        <div style={{marginTop:12,display:"inline-flex",alignItems:"center",gap:6,padding:"4px 14px",borderRadius:20,background:`${GREEN}22`,border:`1px solid ${GREEN}44`}}>
          <span style={{fontSize:12,color:"#6ee7b7",fontWeight:600}}>✓ {L.gdpr}</span>
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:16}}>
        {sections.map((sec,i)=>(
          <div key={i} style={{background:CARD,borderRadius:14,padding:"18px 20px",boxShadow:"0 2px 10px rgba(0,0,0,0.05)"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <div style={{width:28,height:28,borderRadius:8,background:`${PURPLE}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:PURPLE,flexShrink:0}}>{i+1}</div>
              <div style={{fontWeight:800,fontSize:14,color:DARK,fontFamily:t.font}}>{sec.title}</div>
            </div>
            <p style={{fontSize:13,color:"#444",lineHeight:1.85,fontFamily:t.font,margin:0}}>{sec.text}</p>
          </div>
        ))}
      </div>
      <div style={{background:`${PURPLE}08`,border:`1px solid ${PURPLE}22`,borderRadius:14,padding:"16px 20px",marginBottom:16}}>
        <div style={{fontSize:13,color:"#555",fontFamily:t.font}}>{lang==="ar"?"📧 للاستفسارات: ":lang==="nl"?"📧 Voor vragen: ":"📧 For inquiries: "}<a href="mailto:info@bizanalyzer.nl" style={{color:PURPLE,fontWeight:700}}>info@bizanalyzer.nl</a></div>
      </div>
      <PageFooter t={t} setPage={setPage}/>
    </div>
  );
}

