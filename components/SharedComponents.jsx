'use client';
// =============================================================
// src/components/index.jsx
// Shared UI: Gauge, MiniGauge, Bar, SBIBadge, CheckItem,
//            PageFooter, AgentCard, FinancialDashboard
// =============================================================

import { ORANGE, DARK, GREEN, BLUE, PURPLE, RED, CARD, SBI_MAP } from "../lib/constants.js";
import { cleanText } from "../lib/api.js";

// =============================================================
// SHARED UI COMPONENTS
// =============================================================

// Full arc gauge — used in financial dashboard success/failure display
export function Gauge({ value, color }) {
  const r=32, cx=44, cy=44, circ=2*Math.PI*r;
  const dash=Math.min(Math.max(value,0),100)/100*circ*0.75;
  return (
    <svg width={88} height={88} viewBox="0 0 88 88">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f0f0f0" strokeWidth="7" strokeDasharray={`${circ*0.75} ${circ*0.25}`} strokeLinecap="round" transform={`rotate(-225 ${cx} ${cy})`}/>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="7" strokeDasharray={`${dash} ${circ-dash+circ*0.25}`} strokeLinecap="round" transform={`rotate(-225 ${cx} ${cy})`} style={{transition:"stroke-dasharray 1s ease"}}/>
      <text x={cx} y={cy+1} textAnchor="middle" dominantBaseline="middle" fontSize="15" fontWeight="800" fill={color}>{value}%</text>
    </svg>
  );
}

// Mini arc gauge — used inside agent card finance preview
export function MiniGauge({ value, color, label, font }) {
  const r=22, cx=28, cy=28, circ=2*Math.PI*r;
  const dash=Math.min(Math.max(value,0),100)/100*circ*0.75;
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
      <svg width={56} height={56} viewBox="0 0 56 56">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f0f0f0" strokeWidth="5" strokeDasharray={`${circ*0.75} ${circ*0.25}`} strokeLinecap="round" transform={`rotate(-225 ${cx} ${cy})`}/>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="5" strokeDasharray={`${dash} ${circ-dash+circ*0.25}`} strokeLinecap="round" transform={`rotate(-225 ${cx} ${cy})`} style={{transition:"stroke-dasharray 1s ease"}}/>
        <text x={cx} y={cy+1} textAnchor="middle" dominantBaseline="middle" fontSize="10" fontWeight="800" fill={color}>{value}%</text>
      </svg>
      <div style={{fontSize:12,color:"#333",fontFamily:font,textAlign:"center"}}>{label}</div>
    </div>
  );
}

// Horizontal progress bar — used in ROI forecast display
export function Bar({ value, color, max=200 }) {
  return (
    <div style={{background:"#f0f0f0",borderRadius:8,height:9,overflow:"hidden"}}>
      <div style={{width:`${Math.min(value,max)/max*100}%`,height:"100%",background:color,borderRadius:8,transition:"width 1.2s ease"}}/>
    </div>
  );
}

// SBI code badge — shows official Dutch KVK sector code below sector selector
export function SBIBadge({ sector, t }) {
  const sbi = SBI_MAP[sector];
  if (!sbi) return null;
  return (
    <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"5px 12px",borderRadius:20,background:`${ORANGE}10`,border:`1.5px solid ${ORANGE}30`,fontSize:13,fontFamily:t.font,marginBottom:12}}>
      <span style={{fontWeight:800,color:ORANGE}}>SBI {sbi.code}</span>
      <span style={{color:"#333"}}>·</span>
      <span style={{color:"#444"}}>{sbi.desc}</span>
    </div>
  );
}

// Checklist item — used in next-steps tab of results panel
export function CheckItem({ label, checked, onToggle, font }) {
  return (
    <div onClick={onToggle} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",borderRadius:10,cursor:"pointer",background:checked?`${ORANGE}08`:"transparent",border:`1px solid ${checked?ORANGE:"#eee"}`,marginBottom:8,transition:"all 0.2s"}}>
      <div style={{width:22,height:22,borderRadius:6,border:`2px solid ${checked?ORANGE:"#ddd"}`,background:checked?ORANGE:"white",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.2s"}}>
        {checked && <span style={{color:"white",fontSize:13}}>✓</span>}
      </div>
      <span style={{fontFamily:font,fontSize:13.5,color:checked?"#555":"#777",textDecoration:checked?"line-through":"none"}}>{label}</span>
    </div>
  );
}

export function PageFooter({ t, setPage }) {
  return (
    <div style={{marginTop:20,padding:"16px 20px",background:DARK,borderRadius:14}}>
      {/* Logo */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7,marginBottom:12,direction:"ltr"}}>
        <svg width="22" height="22" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" rx="9" fill={ORANGE}/>
          <rect x="5"  y="22" width="6" height="9"  rx="1.5" fill="white" fillOpacity="0.45"/>
          <rect x="13" y="15" width="6" height="16" rx="1.5" fill="#1a1a2e"/>
          <rect x="21" y="13" width="6" height="18" rx="1.5" fill="white"/>
          <polygon points="24,3 30,13 18,13" fill="white"/>
        </svg>
        <div style={{display:"flex",alignItems:"baseline",gap:0}}>
          <span style={{color:ORANGE,fontWeight:700,fontSize:13}}>biz</span>
          <span style={{color:"white",fontWeight:700,fontSize:13}}>analyzer</span>
          <span style={{color:"#ffffff88",fontSize:11}}>.nl</span>
        </div>
      </div>
      {/* Nav links */}
      <div style={{display:"flex",justifyContent:"center",gap:20,flexWrap:"wrap",marginBottom:12,paddingBottom:12,borderBottom:"1px solid #ffffff12"}}>
        {[
          {pg:"top-sectors",label:t.navTop},
          {pg:"freelance",  label:t.navFreelance},
          {pg:"jobs",       label:t.navJobs},
          {pg:"news",       label:t.navNews},
          {pg:"blog",       label:t.navBlog},
          {pg:"about",      label:t.navAbout},
          {pg:"contact",    label:t.navContact},
          {pg:"privacy",    label:t.navPrivacy},
        ].map(link => (
          <button key={link.pg} onClick={()=>setPage(link.pg)}
            style={{background:"transparent",border:"none",color:"#ffffffcc",fontSize:13,cursor:"pointer",fontFamily:t.font,textDecoration:"none",padding:"2px 0"}}>
            {link.label}
          </button>
        ))}
      </div>
      {/* Copyright — bottom */}
      <div style={{textAlign:"center",fontSize:12,color:"#ffffff88",fontFamily:t.font}}>
        {t.footer}
      </div>
    </div>
  );
}

// =============================================================
// AGENT CARD
// =============================================================
export function AgentCard({ agent, status, result, t, finData, onShowFinance }) {
  const isLoading=status==="loading", isDone=status==="done", isFinance=agent.id==="finance";
  const showPreview=isFinance&&isDone&&result==="✅"&&finData;
  const rk=(finData?.riskLevel||"").toLowerCase();
  const rc=["منخفض","laag","low"].includes(rk)?GREEN:["متوسط","gemiddeld","medium"].includes(rk)?ORANGE:RED;
  return (
    <div style={{background:CARD,borderRadius:16,padding:20,border:`2px solid ${isDone?agent.color:"#e8e8e8"}`,boxShadow:isDone?`0 6px 24px ${agent.color}20`:"0 2px 10px rgba(0,0,0,0.05)",transition:"all 0.4s",minHeight:185,position:"relative",overflow:"hidden",display:"flex",flexDirection:"column"}}>
      {isDone&&<div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${agent.color},${agent.color}44)`}}/>}
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
        <div style={{width:44,height:44,borderRadius:11,background:`${agent.color}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:21,flexShrink:0}}>{agent.icon}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontWeight:700,fontSize:14,color:DARK,fontFamily:t.font}}>{agent.title}</div>
          <div style={{fontSize:12,color:"#444",textTransform:"uppercase",letterSpacing:"0.06em"}}>{agent.sub}</div>
        </div>
        {isDone&&<div style={{background:`${agent.color}15`,color:agent.color,borderRadius:20,padding:"2px 9px",fontSize:12,fontWeight:700,flexShrink:0}}>{t.doneLabel}</div>}
      </div>
      <div style={{flex:1}}>
        {status==="idle"&&<div style={{color:"#444",fontSize:12,fontFamily:t.font,textAlign:"center",paddingTop:18}}>{t.idleText}</div>}
        {isLoading&&(
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10,paddingTop:14}}>
            <div style={{display:"flex",gap:5}}>{[0,1,2].map(i=><div key={i} style={{width:9,height:9,borderRadius:"50%",background:agent.color,animation:`bounce 1.2s ease-in-out ${i*0.2}s infinite`}}/>)}</div>
            <div style={{color:"#444",fontSize:12,fontFamily:t.font}}>{t.workingText}</div>
          </div>
        )}
        {isDone&&!isFinance&&result&&<div style={{fontSize:12.5,lineHeight:1.85,color:"#444",fontFamily:t.font,direction:t.dir}}>{cleanText(result)}</div>}
        {isDone&&isFinance&&result==="error"&&<div style={{color:RED,fontSize:12,fontFamily:t.font,textAlign:"center",paddingTop:10}}>⚠️ {t.finError}</div>}
        {showPreview&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-around",marginBottom:10}}>
              <MiniGauge value={finData.successRate||0} color={GREEN}  label={t.dir==="rtl"?"نجاح":"Success"} font={t.font}/>
              <MiniGauge value={finData.failureRate||0} color={RED}    label={t.dir==="rtl"?"خسارة":"Failure"} font={t.font}/>
              <MiniGauge value={finData.netMargin||0}   color={PURPLE} label={t.dir==="rtl"?"هامش":"Margin"}  font={t.font}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(100px,1fr))",gap:6,marginBottom:6}}>
              {[{label:t.dir==="rtl"?"التعادل":"Break-even",value:`${finData.breakEvenMonths||"—"} ${t.months}`},{label:t.dir==="rtl"?"ربح سنة 3":"Y3 Profit",value:finData.year3Profit||"—"}].map(k=>(
                <div key={k.label} style={{background:"#f8f9fa",borderRadius:8,padding:"6px 8px",textAlign:"center"}}>
                  <div style={{fontSize:12,color:"#444",fontFamily:t.font}}>{k.label}</div>
                  <div style={{fontSize:12,fontWeight:800,color:DARK,fontFamily:t.font}}>{k.value}</div>
                </div>
              ))}
            </div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
              <span style={{fontSize:12}}>{rc===GREEN?"🟢":rc===ORANGE?"🟡":"🔴"}</span>
              <span style={{fontSize:12,fontWeight:700,color:rc,fontFamily:t.font}}>{rc===GREEN?t.riskLow:rc===ORANGE?t.riskMed:t.riskHigh}</span>
            </div>
          </div>
        )}
      </div>
      {isDone&&isFinance&&(
        <button onClick={onShowFinance} style={{marginTop:10,width:"100%",padding:"8px",background:showPreview?PURPLE:`${RED}15`,color:showPreview?"white":RED,border:`1.5px solid ${showPreview?PURPLE:RED}`,borderRadius:10,fontFamily:t.font,fontWeight:700,fontSize:12,cursor:"pointer"}}>
          {showPreview?(t.dir==="rtl"?"📊 تفاصيل التحليل المالي →":"📊 Full Financial Analysis →"):(t.dir==="rtl"?"⚠️ عرض تفاصيل الخطأ":"⚠️ View Error Details")}
        </button>
      )}
    </div>
  );
}

// =============================================================
// FINANCIAL DASHBOARD
// =============================================================
export function FinancialDashboard({ data, t, error, onRetry }) {
  if (error) {
    return (
      <div style={{padding:20,background:"#fff5f5",borderRadius:12,fontFamily:t.font}}>
        <div style={{color:RED,fontWeight:700,fontSize:14,marginBottom:10,direction:t.dir}}>{t.finError}</div>
        {onRetry&&<button onClick={onRetry} style={{marginTop:12,width:"100%",padding:"9px",background:ORANGE,color:"white",border:"none",borderRadius:10,fontFamily:t.font,fontWeight:700,fontSize:13,cursor:"pointer"}}>{t.retryBtn}</button>}
      </div>
    );
  }
  if (!data) return <div style={{padding:30,textAlign:"center",color:"#444",fontFamily:t.font}}>{t.idleText}</div>;
  const rk=(data.riskLevel||"").toLowerCase();
  const rc=["منخفض","laag","low"].includes(rk)?GREEN:["متوسط","gemiddeld","medium"].includes(rk)?ORANGE:RED;
  const rl=rc===GREEN?t.riskLow:rc===ORANGE?t.riskMed:t.riskHigh;
  return (
    <div style={{animation:"fadeUp 0.4s ease both"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14,marginBottom:14}}>
        {[{label:t.successLabel,v:data.successRate||0,c:GREEN},{label:t.failureLabel,v:data.failureRate||0,c:RED}].map(g=>(
          <div key={g.label} style={{background:`${g.c}08`,border:`1.5px solid ${g.c}22`,borderRadius:14,padding:"16px 18px",display:"flex",alignItems:"center",gap:14}}>
            <Gauge value={g.v} color={g.c}/>
            <div><div style={{fontWeight:800,fontSize:22,color:g.c,fontFamily:t.font}}>{g.v}%</div><div style={{fontSize:12,color:"#333",fontFamily:t.font,marginTop:3}}>{g.label}</div></div>
          </div>
        ))}
      </div>
      <div style={{background:"#f8f9fa",borderRadius:14,padding:"16px 18px",marginBottom:14}}>
        <div style={{fontWeight:700,fontSize:12.5,color:DARK,fontFamily:t.font,marginBottom:12}}>ROI Forecast</div>
        {[{label:t.roi12,val:data.roi12m||0,color:PURPLE,max:150},{label:t.roi36,val:data.roi36m||0,color:GREEN,max:350}].map(r=>(
          <div key={r.label} style={{marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
              <span style={{fontSize:13,color:"#444",fontFamily:t.font}}>{r.label}</span>
              <span style={{fontSize:12,fontWeight:800,color:r.color,fontFamily:t.font}}>{r.val}%</span>
            </div>
            <Bar value={r.val} color={r.color} max={r.max}/>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(90px,1fr))",gap:10,marginBottom:14}}>
        {[{label:t.breakEven,value:`${data.breakEvenMonths||"—"} ${t.months}`,color:BLUE},{label:t.initialInv,value:data.initialInvestment||"—",color:ORANGE},{label:t.monthlyRev,value:data.monthlyRevenue||"—",color:GREEN},{label:t.netMargin,value:`${data.netMargin||"—"}%`,color:PURPLE},{label:t.year1Profit,value:data.year1Profit||"—",color:GREEN},{label:t.year3Profit,value:data.year3Profit||"—",color:GREEN}].map(k=>(
          <div key={k.label} style={{padding:"11px 10px",borderRadius:12,textAlign:"center",background:`${k.color}08`,border:`1px solid ${k.color}22`}}>
            <div style={{fontSize:12,color:"#444",fontFamily:t.font,marginBottom:4,lineHeight:1.3}}>{k.label}</div>
            <div style={{fontWeight:800,fontSize:13.5,color:k.color,fontFamily:t.font}}>{k.value}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:`${rc}08`,border:`1.5px solid ${rc}30`,borderRadius:12,marginBottom:14}}>
        <span style={{fontSize:18}}>{rc===GREEN?"🟢":rc===ORANGE?"🟡":"🔴"}</span>
        <div><div style={{fontSize:12,color:"#444",fontFamily:t.font}}>{t.riskLabel}</div><div style={{fontWeight:800,fontSize:14,color:rc,fontFamily:t.font}}>{rl}</div></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12,marginBottom:14}}>
        <div style={{background:"#fff5f5",border:"1px solid #fecaca",borderRadius:12,padding:"13px 14px"}}>
          <div style={{fontWeight:700,fontSize:12,color:RED,marginBottom:8,fontFamily:t.font}}>⚠️ {t.mainRisks}</div>
          {(data.mainRisks||[]).map((r,i)=><div key={i} style={{display:"flex",gap:7,alignItems:"flex-start",marginBottom:5}}><div style={{width:5,height:5,borderRadius:"50%",background:RED,marginTop:5,flexShrink:0}}/><span style={{fontSize:13,color:"#333",fontFamily:t.font,lineHeight:1.5}}>{r}</span></div>)}
        </div>
        <div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:12,padding:"13px 14px"}}>
          <div style={{fontWeight:700,fontSize:12,color:GREEN,marginBottom:8,fontFamily:t.font}}>✅ {t.strengths}</div>
          {(data.strengths||[]).map((s,i)=><div key={i} style={{display:"flex",gap:7,alignItems:"flex-start",marginBottom:5}}><div style={{width:5,height:5,borderRadius:"50%",background:GREEN,marginTop:5,flexShrink:0}}/><span style={{fontSize:13,color:"#333",fontFamily:t.font,lineHeight:1.5}}>{s}</span></div>)}
        </div>
      </div>
      <div style={{padding:"13px 14px",background:"#f5f3ff",border:"1px solid #ddd6fe",borderRadius:12,marginBottom:10,fontSize:13,color:"#444",lineHeight:1.85,direction:t.dir,fontFamily:t.font}}>
        <strong style={{color:PURPLE}}>💡 {t.summaryLabel}:</strong>{" "}{data.summary}
      </div>
      {data.dataSource&&<div style={{padding:"7px 12px",background:"#f0f9ff",border:"1px solid #bae6fd",borderRadius:10,fontSize:12,color:"#0369a1",fontFamily:t.font,direction:"ltr"}}>📌 <strong>{t.sourceLabel}:</strong> {data.dataSource}</div>}
    </div>
  );
}