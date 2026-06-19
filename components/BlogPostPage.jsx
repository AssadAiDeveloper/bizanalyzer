'use client';
// =============================================================
// src/pages/BlogPostPage.jsx
// =============================================================
import { DARK, CARD } from "../lib/constants.js";
import { PageFooter } from "./SharedComponents.jsx";
import { BLOG_POSTS } from "./BlogPage.jsx";

// =============================================================
// PAGE: BLOG POST
// =============================================================
export default function BlogPostPage({ lang, t, setPage, postId, setBlogPostId }) {
  const post = BLOG_POSTS.find(p => p.id === postId);
  if (!post) { setPage("blog"); return null; }

  const getTitle = () => lang==="ar" ? post.title.ar : lang==="nl" ? post.title.nl : post.title.en;
  const getContent = () => lang==="ar" ? post.content.ar : lang==="nl" ? post.content.nl : post.content.en;
  const getCat = () => lang==="ar" ? post.category.ar : lang==="nl" ? post.category.nl : post.category.en;

  const L = {
    ar:{ back:"← العودة للمدونة", readTime:"دقيقة قراءة", related:"مقالات ذات صلة" },
    nl:{ back:"← Terug naar blog", readTime:"min lezen", related:"Gerelateerde artikelen" },
    en:{ back:"← Back to blog", readTime:"min read", related:"Related articles" },
  }[lang]||{};

  const related = BLOG_POSTS.filter(p => p.id !== postId && p.color === post.color).slice(0, 2);
  const getName = p => lang==="ar" ? p.title.ar : lang==="nl" ? p.title.nl : p.title.en;

  return (
    <div style={{animation:"fadeUp 0.4s ease both",fontFamily:t.font,direction:t.dir}}>
      {/* Back button */}
      <button onClick={()=>setPage("blog")}
        style={{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:20,border:`1.5px solid ${post.color}`,background:"transparent",color:post.color,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:t.font,marginBottom:18}}>
        {L.back}
      </button>

      {/* Article header */}
      <div style={{background:CARD,borderRadius:20,padding:28,marginBottom:16,boxShadow:"0 4px 20px rgba(0,0,0,0.07)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <span style={{padding:"3px 12px",borderRadius:20,background:`${post.color}12`,color:post.color,fontSize:11,fontWeight:700,fontFamily:t.font}}>{getCat()}</span>
          <span style={{fontSize:11,color:"#666",fontFamily:"monospace"}}>{post.date} · {post.readTime} {L.readTime}</span>
        </div>
        <h1 style={{fontSize:22,fontWeight:900,color:DARK,fontFamily:t.font,lineHeight:1.4,marginBottom:0}}>{getTitle()}</h1>
      </div>

      {/* Ad slot top */}
      <div id="ad-slot-post-top" style={{width:"100%",minHeight:90,background:"transparent",marginBottom:16,borderRadius:8,overflow:"hidden"}}/>

      {/* Article content */}
      <div style={{background:CARD,borderRadius:20,padding:28,marginBottom:16,boxShadow:"0 4px 20px rgba(0,0,0,0.07)"}}>
        <style>{`
          .blog-content h2 { font-size:18px; font-weight:800; color:${DARK}; margin:24px 0 10px; }
          .blog-content h3 { font-size:15px; font-weight:700; color:${DARK}; margin:18px 0 8px; }
          .blog-content p  { font-size:14px; color:#444; line-height:1.9; margin-bottom:14px; }
          .blog-content ul { padding-${lang==="ar"?"right":"left"}:20px; margin-bottom:14px; }
          .blog-content li { font-size:14px; color:#444; line-height:1.8; margin-bottom:6px; }
          .blog-content strong { color:${DARK}; font-weight:700; }
          .blog-content a  { color:${post.color}; }
        `}</style>
        <div className="blog-content" style={{fontFamily:t.font,direction:t.dir}}
          // SECURITY: content comes only from the static BLOG_POSTS array defined
          // in BlogPage.jsx — never from user input or external APIs. If blog
          // content is ever made dynamic/CMS-driven, this MUST be sanitized
          // (e.g. with DOMPurify) before being rendered here.
          dangerouslySetInnerHTML={{__html: getContent()}}/>
      </div>

      {/* Ad slot bottom */}
      <div id="ad-slot-post-bottom" style={{width:"100%",minHeight:90,background:"transparent",marginBottom:16,borderRadius:8,overflow:"hidden"}}/>

      {/* Related articles */}
      {related.length > 0 && (
        <div style={{background:CARD,borderRadius:18,padding:20,marginBottom:16,boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
          <div style={{fontWeight:800,fontSize:14,color:DARK,fontFamily:t.font,marginBottom:14}}>{L.related}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:10}}>
            {related.map(p => (
              <div key={p.id} onClick={()=>setBlogPostId(p.id)}
                style={{padding:"12px 14px",borderRadius:12,border:`1.5px solid ${p.color}22`,cursor:"pointer",transition:"all 0.2s"}}
                onMouseEnter={e=>e.currentTarget.style.background=`${p.color}08`}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <div style={{fontSize:18,marginBottom:6}}>{p.image}</div>
                <div style={{fontSize:12.5,fontWeight:700,color:DARK,fontFamily:t.font,lineHeight:1.4}}>{getName(p)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <PageFooter t={t} setPage={setPage}/>
    </div>
  );
}
