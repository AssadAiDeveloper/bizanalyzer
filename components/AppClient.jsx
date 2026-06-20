'use client';
// components/AppClient.jsx — Main client component (all interactive logic)
import { useState, useEffect, useRef } from "react";
import { ORANGE, DARK, BLUE, GOLD, CARD, T, SECTORS, SBI_MAP } from "../lib/constants.js";
import { apiFetch, extractJSON } from "../lib/api.js";
import { AgentCard, FinancialDashboard, SBIBadge, CheckItem } from "./SharedComponents.jsx";
import TopSectorsPage from "./TopSectorsPage.jsx";
import FreelancePage  from "./FreelancePage.jsx";
import JobSearchPage  from "./JobSearchPage.jsx";
import NewsPage       from "./NewsPage.jsx";
import AboutPage      from "./AboutPage.jsx";
import ContactPage    from "./ContactPage.jsx";
import PrivacyPage    from "./PrivacyPage.jsx";
import BlogPage       from "./BlogPage.jsx";
import BlogPostPage   from "./BlogPostPage.jsx";

export default function AppClient({ initialPage = "main", initialBlogId = null }) {
  const [lang, setLang]           = useState("en");
  const [page, setPage]           = useState(initialPage);
  const [idea, setIdea]           = useState("");
  const [sector, setSector]       = useState(null);
  const [statuses, setStatuses]   = useState({ market:"idle", legal:"idle", innovation:"idle", finance:"idle" });
  const [results, setResults]     = useState({});
  const [finData, setFinData]     = useState(null);
  const [finError, setFinError]   = useState(null);
  const [activeTab, setActiveTab] = useState("summary");
  const [checks, setChecks]       = useState({ a:false, b:false, c:false });
  const [running, setRunning]     = useState(false);
  const [done, setDone]           = useState(false);
  const [isMobile, setIsMobile]   = useState(false);
  const [blogPostId, setBlogPostId] = useState(initialBlogId);
  const [mobileMenu, setMobileMenu] = useState(false);
  const lastRunRef = useRef(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = lang === "ar" ? "ar" : lang === "nl" ? "nl" : "en";
  }, [lang]);

  useEffect(() => {
    if (page === "main") {
      window.history.pushState(null, "", "/");
    } else if (page === "blog-post" && blogPostId) {
      window.history.pushState(null, "", `/blog/${blogPostId}`);
    } else {
      window.history.pushState(null, "", `/${page}`);
    }
  }, [page, blogPostId]);

  useEffect(() => {
    const onPop = () => {
      const path = window.location.pathname.replace("/", "").split("/")[0];
      const valid = ["top-sectors","freelance","jobs","news","blog","about","contact","privacy"];
      setPage(valid.includes(path) ? path : "main");
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const prevLangRef = useRef(lang);
  useEffect(() => {
    if (prevLangRef.current === lang) return;
    if (sector) {
      const oldIdx = SECTORS[prevLangRef.current]?.indexOf(sector);
      if (oldIdx !== -1) setSector(SECTORS[lang]?.[oldIdx] ?? sector);
    }
    prevLangRef.current = lang;
  });

  const t = T[lang] || T.en;
  const sbi = sector ? SBI_MAP[sector] : null;
  const checkedCount = Object.values(checks).filter(Boolean).length;

  const handleTopSelect = (s) => {
    const name = lang==="ar"?s.ar:lang==="nl"?s.nl:s.en;
    setSector(name);
    setPage("main");
    setTimeout(() => document.getElementById("idea-input")?.focus(), 300);
  };

  const runAgents = async () => {
    if (!idea.trim()) return;
    const now = Date.now();
    if (now - lastRunRef.current < 8000) return;
    lastRunRef.current = now;
    const aT      = T[lang] || T.en;
    const aSector = sector || (lang==="ar"?"تكنولوجيا المعلومات والبرمجيات":lang==="nl"?"IT & Software":"IT & Software");
    setRunning(true); setDone(false); setResults({}); setFinData(null); setFinError(null);
    setActiveTab("summary");
    setStatuses({ market:"loading", legal:"loading", innovation:"loading", finance:"loading" });
    const runOne = async (agent, delay=0) => {
      if (delay) await new Promise(r => setTimeout(r, delay));
      try {
        if (agent.id === "finance") {
          const raw    = await apiFetch({ max_tokens:4096, messages:[{ role:"user", content:aT.prompts.finance(idea, aSector) }] });
          const parsed = extractJSON(raw);
          if (parsed) { setFinData(parsed); setResults(p => ({ ...p, finance:"✅" })); }
          else        { setFinError(raw.slice(0,500)); setResults(p => ({ ...p, finance:"error" })); }
        } else {
          const raw = await apiFetch({ max_tokens:4096, messages:[{ role:"user", content:aT.prompts[agent.id](idea, aSector) }] });
          setResults(p => ({ ...p, [agent.id]: raw }));
        }
      } catch(err) {
        if (agent.id === "finance") { setFinError("Analysis failed. Please retry."); setResults(p => ({ ...p, finance:"error" })); }
        else { setResults(p => ({ ...p, [agent.id]:"Analysis unavailable. Please retry." })); }
      }
      setStatuses(p => ({ ...p, [agent.id]:"done" }));
    };
    for (let i = 0; i < t.agents.length; i++) {
      await runOne(t.agents[i], i * 800);
    }
    setRunning(false); setDone(true);
  };

  const NavBtn = ({ pg, label, activeColor }) => (
    <button onClick={() => setPage(p => p===pg?"main":pg)}
      style={{ padding:"10px 11px", minHeight:38, borderRadius:20, border:`1.5px solid ${page===pg?activeColor:"#ffffff20"}`, background:page===pg?activeColor:"transparent", color:page===pg?"white":"#ffffffdd", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:t.font, whiteSpace:"nowrap", transition:"all 0.2s" }}>
      {label}
    </button>
  );

  return (
    <div style={{ minHeight:"100vh", background:"#f4f5f7", fontFamily:t.font }}>
      {/* Navbar */}
      <nav style={{ background:DARK, position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 20px rgba(0,0,0,0.3)" }}>
        <div style={{ maxWidth:1080, width:"100%", boxSizing:"border-box", margin:"0 auto", padding:"0 16px", height:52, display:"flex", alignItems:"center", justifyContent:"space-between", position:"relative", overflow:"hidden" }}>
          {/* Logo */}
          <div style={{ display:"flex", alignItems:"center", gap:9, cursor:"pointer", flexShrink:0 }} onClick={() => { setPage("main"); setMobileMenu(false); }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="9" fill={ORANGE}/>
              <rect x="5" y="22" width="6" height="9" rx="1.5" fill="white" fillOpacity="0.45"/>
              <rect x="13" y="15" width="6" height="16" rx="1.5" fill={DARK}/>
              <rect x="21" y="13" width="6" height="18" rx="1.5" fill="white"/>
              <polygon points="24,3 30,13 18,13" fill="white"/>
            </svg>
            <div style={{ display:"flex", flexDirection:"column" }}>
              <div style={{ display:"flex", alignItems:"baseline" }}>
                <span style={{ fontFamily:"Segoe UI, Arial, sans-serif", fontWeight:900, fontSize:17, color:ORANGE, letterSpacing:"-0.3px" }}>biz</span>
                <span style={{ fontFamily:"Segoe UI, Arial, sans-serif", fontWeight:900, fontSize:17, color:"white", letterSpacing:"-0.3px" }}>analyzer</span>
                <span style={{ fontFamily:"Segoe UI, Arial, sans-serif", fontWeight:700, fontSize:13, color:"#ffffff88" }}>.nl</span>
              </div>
              <div style={{ color:"#ffffffaa", fontSize:7.5, letterSpacing:"0.1em", fontFamily:"monospace" }}>NEDERLAND</div>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="desktop-nav-only" style={{ gap:4, alignItems:"center", position:"absolute", left:"50%", transform:"translateX(-50%)" }}>
              {page !== "main" && (
                <button onClick={() => setPage("main")} style={{ padding:"4px 10px", borderRadius:20, border:"1.5px solid #ffffff40", background:"rgba(255,255,255,0.1)", color:"white", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:t.font, whiteSpace:"nowrap" }}>
                  {t.navHome}
                </button>
              )}
              <NavBtn pg="top-sectors" label={t.navTop}      activeColor="#FFD700"/>
              <NavBtn pg="freelance"   label={t.navFreelance} activeColor="#A78BFA"/>
              <NavBtn pg="jobs"        label={t.navJobs}      activeColor="#34D399"/>
              <NavBtn pg="news"        label={t.navNews}      activeColor={GOLD}/>
              <NavBtn pg="blog"        label={t.navBlog}      activeColor={BLUE}/>
            </div>

          {/* Right: lang + hamburger */}
          <div style={{ display:"flex", gap:4, alignItems:"center", flexShrink:0 }}>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              aria-label="Select language"
              style={{
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                padding: "10px 30px 10px 14px",
                minHeight: 40,
                borderRadius: 20,
                border: `1.5px solid ${ORANGE}`,
                background: `${DARK} url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23FF5F00' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat right 12px center`,
                color: "white",
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "inherit",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option value="en" style={{ background: DARK, color: "white" }}>🇬🇧 English</option>
              <option value="nl" style={{ background: DARK, color: "white" }}>🇳🇱 Nederlands</option>
              <option value="ar" style={{ background: DARK, color: "white" }}>🇸🇦 العربية</option>
            </select>
            <button className="mobile-nav-only" onClick={() => setMobileMenu(p => !p)} aria-label={mobileMenu ? "Close menu" : "Open menu"} aria-expanded={mobileMenu}
                style={{ background:"transparent", border:"none", cursor:"pointer", padding:"12px 10px", minWidth:44, minHeight:44, flexDirection:"column", justifyContent:"center", alignItems:"center", gap:4 }}>
                {[0,1,2].map(i => <div key={i} style={{ width:17, height:2, background:"white", borderRadius:1 }}/>)}
              </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {isMobile && mobileMenu && (
          <div style={{ background:"#111128", borderTop:"1px solid #ffffff12", padding:"10px 14px 14px", display:"flex", flexDirection:"column", gap:8 }}>
            {page !== "main" && (
              <button onClick={() => { setPage("main"); setMobileMenu(false); }} style={{ padding:"11px 14px", borderRadius:10, border:"1.5px solid #ffffff25", background:"rgba(255,255,255,0.07)", color:"white", fontSize:13.5, fontWeight:700, cursor:"pointer", fontFamily:t.font, textAlign:"start" }}>{t.navHome}</button>
            )}
            {[
              { pg:"top-sectors", label:t.navTop,      color:"#FFD700" },
              { pg:"freelance",   label:t.navFreelance, color:"#A78BFA" },
              { pg:"jobs",        label:t.navJobs,      color:"#34D399" },
              { pg:"news",        label:t.navNews,      color:GOLD },
              { pg:"blog",        label:t.navBlog,      color:BLUE },
            ].map(item => (
              <button key={item.pg} onClick={() => { setPage(p => p===item.pg?"main":item.pg); setMobileMenu(false); }}
                style={{ padding:"11px 14px", borderRadius:10, border:`1.5px solid ${page===item.pg?item.color:"#ffffff18"}`, background:page===item.pg?`${item.color}18`:"rgba(255,255,255,0.04)", color:page===item.pg?item.color:"white", fontSize:13.5, fontWeight:700, cursor:"pointer", fontFamily:t.font, textAlign:"start" }}>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Page content */}
      <main style={{ maxWidth:1080, margin:"0 auto", padding:"24px 18px", direction:t.dir, fontFamily:t.font }}>
        {page==="top-sectors" && <TopSectorsPage lang={lang} t={t} onSelect={handleTopSelect} setPage={setPage}/>}
        {page==="freelance"   && <FreelancePage  lang={lang} t={t} setPage={setPage}/>}
        {page==="jobs"        && <JobSearchPage  lang={lang} t={t} setPage={setPage}/>}
        {page==="news"        && <NewsPage       lang={lang} t={t} setPage={setPage}/>}
        {page==="blog"        && <BlogPage       lang={lang} t={t} setPage={setPage} setBlogPostId={setBlogPostId}/>}
        {page==="blog-post"   && <BlogPostPage   lang={lang} t={t} setPage={setPage} postId={blogPostId} setBlogPostId={setBlogPostId}/>}
        {page==="about"       && <AboutPage      lang={lang} t={t} setPage={setPage}/>}
        {page==="contact"     && <ContactPage    lang={lang} t={t} setPage={setPage}/>}
        {page==="privacy"     && <PrivacyPage    lang={lang} t={t} setPage={setPage}/>}

        {/* Main page */}
        {page==="main" && (
          <>
            {/* Hero */}
            <div style={{ position:"relative", borderRadius:24, overflow:"hidden", marginBottom:24, minHeight:320, contain:"layout" }}>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,#0d0d1a,#1a0533,#0f1e4a,#001a1a,#1a0a00,#0d0d1a)", backgroundSize:"400% 400%", animation:"bgShift 8s ease infinite" }}/>
              <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize:"40px 40px", animation:"gridMove 4s linear infinite", opacity:0.5 }}/>
              <div style={{ position:"absolute", top:"-30%", left:"-10%", width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,95,0,0.25) 0%,transparent 70%)", animation:"float1 7s ease-in-out infinite", pointerEvents:"none" }}/>
              <div style={{ position:"absolute", bottom:"-40%", right:"-5%", width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,rgba(124,58,237,0.2) 0%,transparent 70%)", animation:"float2 9s ease-in-out infinite", pointerEvents:"none" }}/>
              <div style={{ position:"absolute", top:"20%", right:"20%", width:200, height:200, borderRadius:"50%", background:"radial-gradient(circle,rgba(5,150,105,0.15) 0%,transparent 70%)", animation:"float3 11s ease-in-out infinite", pointerEvents:"none" }}/>
              <div style={{ position:"relative", padding:"48px 28px 40px", textAlign:"center" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14, marginBottom:20, direction:"ltr" }}>
                  <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter:`drop-shadow(0 8px 20px rgba(255,95,0,0.6))` }}>
                    <rect x="8"  y="44" width="13" height="22" rx="3" fill="white" fillOpacity="0.45"/>
                    <rect x="27" y="32" width="13" height="34" rx="3" fill={ORANGE}/>
                    <rect x="46" y="22" width="13" height="44" rx="3" fill="white"/>
                    <polygon points="52,6 64,22 40,22" fill="white"/>
                  </svg>
                  <div style={{ textAlign:"start" }}>
                    <div style={{ display:"flex", alignItems:"baseline", lineHeight:1 }}>
                      <span style={{ fontFamily:"Segoe UI, Arial, sans-serif", fontWeight:900, fontSize:28, background:"linear-gradient(90deg,#FF5F00,#ff8533,#FF5F00)", backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"textShimmer 3s linear infinite" }}>biz</span>
                      <span style={{ fontFamily:"Segoe UI, Arial, sans-serif", fontWeight:900, fontSize:28, color:"white" }}>analyzer</span>
                      <span style={{ fontFamily:"Segoe UI, Arial, sans-serif", fontWeight:700, fontSize:18, color:"rgba(255,255,255,0.3)" }}>.nl</span>
                    </div>
                    <div style={{ color:"rgba(255,255,255,0.4)", fontSize:8.5, letterSpacing:"0.2em", fontFamily:"monospace", marginTop:3 }}>NEDERLAND</div>
                  </div>
                </div>
                <h1 style={{ fontSize:24, fontWeight:900, margin:"0 0 10px", fontFamily:t.font, direction:t.dir, lineHeight:1.3, background:"linear-gradient(90deg,#FF5F00,#a855f7,#06b6d4,#10b981,#f59e0b,#FF5F00)", backgroundSize:"300% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"taglineColor 4s linear infinite" }}>
                  {t.tagline}
                </h1>
                <div style={{ display:"flex", justifyContent:"center", gap:8, flexWrap:"wrap", marginTop:18 }}>
                  {t.agents.map((a,i) => (
                    <div key={a.id} style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 14px", borderRadius:30, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)", animation:`badgeIn 0.5s ease ${0.1+i*0.1}s both`, transition:"all 0.2s" }}
                      onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,95,0,0.2)"; e.currentTarget.style.borderColor="rgba(255,95,0,0.5)"; }}
                      onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.15)"; }}>
                      <span style={{ fontSize:14 }}>{a.icon}</span>
                      <span style={{ fontSize:12, color:"rgba(255,255,255,0.85)", fontFamily:t.font, fontWeight:600 }}>{a.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Input panel */}
            <div style={{ boxSizing:"border-box", background:CARD, borderRadius:20, padding:22, marginBottom:16, height:380, boxShadow:"0 4px 20px rgba(0,0,0,0.07)", direction:t.dir, overflow:"hidden" }}>
              <div style={{ marginBottom:12 }}>
                <label style={{ display:"block", fontWeight:700, fontSize:13, color:DARK, marginBottom:6, fontFamily:t.font }}>{t.ideaLabel}</label>
                <textarea id="idea-input" aria-label="Business idea description" value={idea} onChange={e=>setIdea(e.target.value.slice(0,600))} placeholder={t.ideaPlaceholder}
                  style={{ width:"100%", height:90, border:"2px solid #eee", borderRadius:12, padding:"11px 14px", fontSize:16, fontFamily:"inherit", direction:t.dir, resize:"none", outline:"none", lineHeight:1.7, transition:"border-color 0.2s", display:"block" }}
                  onFocus={e=>{e.target.style.borderColor=ORANGE;}} onBlur={e=>{e.target.style.borderColor="#eee";}} maxLength={600}/>
                <div style={{ textAlign:"end", fontSize:12, color:"#444", marginTop:3, fontFamily:"monospace" }}>{idea.length}/600</div>
              </div>
              <div style={{ marginBottom:14 }}>
                <label style={{ display:"block", fontWeight:700, fontSize:13, color:DARK, marginBottom:6, fontFamily:t.font }}>{t.sectorLabel}</label>
                {sbi && <SBIBadge sector={sector} t={t}/>}
                <select aria-label="Business sector selector" value={sector||""} onChange={e=>setSector(e.target.value||null)}
                  style={{ width:"100%", border:"2px solid #eee", borderRadius:12, padding:"10px 14px", fontSize:16, fontFamily:"inherit", direction:t.dir, background:"white", cursor:"pointer", outline:"none", minHeight:44 }}>
                  <option value="">{lang==="ar"?"— اختر القطاع —":lang==="nl"?"— Kies sector —":"— Select sector —"}</option>
                  {SECTORS[lang].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <button aria-label="Analyze business idea" onClick={runAgents} disabled={running||!idea.trim()}
                style={{ width:"100%", padding:"13px 20px", background:running||!idea.trim()?`${ORANGE}66`:ORANGE, color:"white", border:"none", borderRadius:14, fontSize:15, fontWeight:800, fontFamily:t.font, cursor:running||!idea.trim()?"not-allowed":"pointer", transition:"all 0.2s", boxShadow:running||!idea.trim()?"none":`0 6px 20px ${ORANGE}44` }}>
                {running?(
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                    <div style={{ display:"flex", gap:4 }}>{[0,1,2].map(i=><div key={i} style={{ width:7, height:7, borderRadius:"50%", background:"white", animation:`bounce 1.2s ease-in-out ${i*0.2}s infinite` }}/>)}</div>
                    {t.runningBtn}
                  </div>
                ):<>📊 {t.analyzeBtn}</>}
              </button>
              {done && <div style={{ marginTop:7, textAlign:"center", fontSize:12, color:"#444", fontFamily:t.font }}>{t.rerunHint}</div>}
            </div>

            {/* Agent cards */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:13, marginBottom:16, animation:"fadeUp 0.5s 0.14s ease both", direction:t.dir, minHeight:280 }}>
              {t.agents.map(agent => (
                <AgentCard key={agent.id} agent={agent} status={statuses[agent.id]} result={results[agent.id]} t={t}
                  finData={agent.id==="finance"?finData:null}
                  onShowFinance={() => { setActiveTab("finance"); setTimeout(()=>document.getElementById("results-panel")?.scrollIntoView({behavior:"smooth"}),100); }}
                />
              ))}
            </div>

            {/* Results panel */}
            {done && (
              <div id="results-panel" style={{ background:CARD, borderRadius:20, padding:22, boxShadow:"0 4px 20px rgba(0,0,0,0.07)", animation:"fadeUp 0.4s ease both", direction:t.dir }}>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
                  <div style={{ width:40, height:40, borderRadius:11, background:`${ORANGE}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>📊</div>
                  <div style={{ fontWeight:800, fontSize:17, color:DARK, fontFamily:t.font }}>{t.resultsTitle}</div>
                </div>
                <div style={{ display:"flex", gap:2, borderBottom:"2px solid #f0f0f0", marginBottom:18 }}>
                  {[{id:"summary",l:t.tab1},{id:"finance",l:t.tab2},{id:"steps",l:t.tab3}].map(tab => (
                    <button key={tab.id} onClick={()=>setActiveTab(tab.id)}
                      style={{ padding:"8px 15px", border:"none", background:"transparent", fontFamily:t.font, fontWeight:700, fontSize:12.5, cursor:"pointer", color:activeTab===tab.id?ORANGE:"#bbb", borderBottom:`2px solid ${activeTab===tab.id?ORANGE:"transparent"}`, marginBottom:-2 }}>
                      {tab.l}
                    </button>
                  ))}
                </div>
                {activeTab==="summary" && (
                  <div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(100px,1fr))", gap:10, marginBottom:14 }}>
                      {t.kpis.map(k => (
                        <div key={k.label} style={{ padding:"12px", borderRadius:12, textAlign:"center", background:`${k.color}08`, border:`1px solid ${k.color}22` }}>
                          <div style={{ fontSize:12, color:"#444", marginBottom:4, fontFamily:t.font }}>{k.label}</div>
                          <div style={{ fontWeight:800, fontSize:15, color:k.color, fontFamily:t.font }}>{k.value}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ padding:"13px 14px", background:"#f8f9fa", borderRadius:12, fontSize:13, color:"#333", lineHeight:1.85, direction:t.dir, fontFamily:t.font }}>
                      <strong>{t.recommendationLabel}</strong>{" "}{t.recommendation}
                    </div>
                  </div>
                )}
                {activeTab==="finance" && (
                  <FinancialDashboard data={finData} t={t} error={finError}
                    onRetry={finError ? async () => {
                      setFinError(null); setStatuses(p=>({...p,finance:"loading"}));
                      try {
                        const raw=await apiFetch({max_tokens:4096,messages:[{role:"user",content:t.prompts.finance(idea,sector)}]});
                        const parsed=extractJSON(raw);
                        if(parsed){setFinData(parsed);setResults(p=>({...p,finance:"✅"}));}
                        else{setFinError(raw.slice(0,500));}
                      } catch(_){setFinError("Analysis failed. Please retry.");}
                      setStatuses(p=>({...p,finance:"done"}));
                    } : null}
                  />
                )}
                {activeTab==="steps" && (
                  <div>
                    {t.steps.map((step,i) => {
                      const key=["a","b","c"][i];
                      return <CheckItem key={key} label={step} checked={checks[key]} onToggle={()=>setChecks(p=>({...p,[key]:!p[key]}))} font={t.font}/>;
                    })}
                    <div style={{ marginTop:10, padding:"10px 14px", background:`${ORANGE}08`, borderRadius:10, fontSize:13, color:ORANGE, fontWeight:600, fontFamily:t.font }}>
                      {t.stepsProgress(checkedCount)}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Footer */}
            <div style={{ marginTop:28, padding:"16px 24px", background:DARK, borderRadius:16 }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:7, marginBottom:12, direction:"ltr" }}>
                <svg width="22" height="22" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="36" height="36" rx="9" fill={ORANGE}/>
                  <rect x="5" y="22" width="6" height="9" rx="1.5" fill="white" fillOpacity="0.45"/>
                  <rect x="13" y="15" width="6" height="16" rx="1.5" fill="#1a1a2e"/>
                  <rect x="21" y="13" width="6" height="18" rx="1.5" fill="white"/>
                  <polygon points="24,3 30,13 18,13" fill="white"/>
                </svg>
                <div style={{ display:"flex", alignItems:"baseline" }}>
                  <span style={{ color:ORANGE, fontWeight:700, fontSize:13 }}>biz</span>
                  <span style={{ color:"white", fontWeight:700, fontSize:13 }}>analyzer</span>
                  <span style={{ color:"#ffffff88", fontSize:12 }}>.nl</span>
                </div>
              </div>
              <div style={{ display:"flex", justifyContent:"center", gap:20, flexWrap:"wrap", marginBottom:12, paddingBottom:12, borderBottom:"1px solid #ffffff12" }}>
                {[
                  {pg:"top-sectors",label:t.navTop},{pg:"freelance",label:t.navFreelance},
                  {pg:"jobs",label:t.navJobs},{pg:"news",label:t.navNews},
                  {pg:"blog",label:t.navBlog},{pg:"about",label:t.navAbout},
                  {pg:"contact",label:t.navContact},{pg:"privacy",label:t.navPrivacy},
                ].map(link => (
                  <button key={link.pg} onClick={()=>setPage(link.pg)}
                    style={{ background:"transparent", border:"none", color:"#ffffffcc", fontSize:12, cursor:"pointer", fontFamily:t.font, padding:"2px 0", transition:"color 0.2s" }}
                    onMouseEnter={e=>e.currentTarget.style.color="white"}
                    onMouseLeave={e=>e.currentTarget.style.color="#ffffffcc"}>
                    {link.label}
                  </button>
                ))}
              </div>
              <div style={{ textAlign:"center", fontSize:12, color:"#ffffff88", fontFamily:t.font }}>
                {t.footer}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}