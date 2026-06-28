# BizAnalyzer.nl 🇳🇱

> **AI-powered Business Analyzer for the Netherlands**  
> Trilingual platform (Arabic 🇸🇦 · Dutch 🇳🇱 · English 🇬🇧) helping migrants and entrepreneurs analyze business ideas for the Dutch market.

[![Live](https://img.shields.io/badge/Live-bizanalyzer.nl-FF5F00?style=flat-square)](https://www.bizanalyzer.nl)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.35-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## 📋 Overview

BizAnalyzer.nl is a multilingual web application that helps migrants, expats, and entrepreneurs analyze their business ideas for the Dutch market. The platform provides:

- **4-agent AI business analysis** (Market, Legal, Innovation, Finance)
- **Real-time data** on top sectors, freelance rates, and job opportunities
- **Economic news** filtered by category (taxes, law, subsidies, economy)
- **Professional blog** with 10 in-depth articles about entrepreneurship in the Netherlands
- **Full RTL support** for Arabic-speaking users

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14.2.35 (App Router, SSR) |
| Frontend | React 18 |
| Styling | Inline CSS (zero dependencies) |
| AI API | OpenRouter → GPT-4o-mini (via Vercel Serverless) |
| Deployment | Vercel |
| Domain | Namecheap → bizanalyzer.nl |
| Analytics | Google Analytics 4 (G-989PXZPDQZ) |
| SEO | Dynamic sitemap, robots.txt, meta tags, canonical URLs |

---

## 📁 Project Structure

```
bizanalyzer-next/
├── app/
│   ├── api/proxy/route.js        ← Secured API (rate limiting, CORS, validation)
│   ├── sitemap.xml/route.js      ← Dynamic sitemap (auto-updates on deploy)
│   ├── layout.jsx                ← Root layout, CSP/HSTS headers, GA4, inline CSS
│   ├── globals.css               ← CSS animations and keyframes
│   ├── page.jsx                  ← Home page
│   ├── blog/page.jsx
│   ├── blog/[slug]/page.jsx
│   ├── top-sectors/page.jsx
│   ├── freelance/page.jsx
│   ├── jobs/page.jsx
│   ├── news/page.jsx
│   ├── about/page.jsx
│   ├── contact/page.jsx
│   └── privacy/page.jsx
├── components/
│   ├── AppClient.jsx             ← 'use client' — all interactive logic
│   ├── BlogPage.jsx              ← 10 articles (AR/NL/EN)
│   ├── BlogPostPage.jsx
│   ├── SharedComponents.jsx      ← AgentCard, FinancialDashboard, SBIBadge
│   ├── TopSectorsPage.jsx
│   ├── FreelancePage.jsx
│   ├── JobSearchPage.jsx
│   ├── NewsPage.jsx
│   ├── AboutPage.jsx
│   ├── ContactPage.jsx
│   └── PrivacyPage.jsx
├── lib/
│   ├── constants.js              ← Colors, T (translations AR/NL/EN), SECTORS, SBI_MAP
│   └── api.js                   ← apiFetch, extractJSON
├── public/
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── llms.txt
│   ├── robots.txt
│   └── site.webmanifest
├── next.config.js                ← CSP, HSTS, image formats, redirects, caching
├── package.json
└── .browserslistrc               ← Modern browsers only
```

---

## 🌐 Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Business idea analyzer with 4 AI specialists |
| Blog | `/blog` | 10 articles on entrepreneurship in the Netherlands |
| Blog Post | `/blog/[slug]` | Individual article pages |
| Top Sectors | `/top-sectors` | Top 10 most profitable sectors in NL |
| Freelance | `/freelance` | ZZP rates by specialization |
| Jobs | `/jobs` | Job search linking to LinkedIn, Indeed, Werk.nl |
| News | `/news` | Economic news by category |
| About | `/about` | About the platform |
| Contact | `/contact` | Contact form |
| Privacy | `/privacy` | Privacy policy (GDPR compliant) |

---

## 🤖 AI Analysis Agents

| Agent | Focus |
|-------|-------|
| 🕵️ Market Analysis | Market size, competition, growth |
| ⚖️ Legal Framework | KVK registration, BTW, permits |
| 🚀 Innovation & Grants | RVO subsidies, innovation opportunities |
| 💰 Financial Analysis | ROI, break-even, risk level (JSON output) |

---

## 🔒 Security

- ✅ Content Security Policy (CSP) headers
- ✅ HSTS (Strict-Transport-Security)
- ✅ CORS restricted to `https://www.bizanalyzer.nl` only
- ✅ API rate limiting (20 req/min per IP)
- ✅ Input validation & max token cap (4096)
- ✅ Safe error messages (no internal details exposed)
- ✅ Next.js 14.2.35 (latest patched version)

---

## 🛠️ Setup & Development

### Prerequisites
- Node.js 18+
- OpenRouter API key ([openrouter.ai](https://openrouter.ai))

### Installation

```bash
git clone https://github.com/AssadAiDeveloper/bizanalyzer.git
cd bizanalyzer
npm install
```

### Environment Variables

Add `OR_KEY` in Vercel → Settings → Environment Variables:

```
OR_KEY=sk-or-v1-your-openrouter-key
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

---

## 🌍 Multilingual Support

Full trilingual support with automatic RTL for Arabic:

| Language | Code | Direction |
|----------|------|-----------|
| Arabic | `ar` | RTL |
| Dutch | `nl` | LTR |
| English | `en` | LTR (default) |

---

## 📊 Performance (Lighthouse)

| Metric | Mobile | Desktop |
|--------|--------|---------|
| Performance | 85+ | 85+ |
| Accessibility | 96-100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

---

## 📝 Adding New Blog Articles

1. Open `components/BlogPage.jsx` and add your article to `BLOG_POSTS` array
2. Open `app/sitemap.xml/route.js` and add the slug to `BLOG_POSTS`
3. Commit and push — the sitemap updates automatically on next deploy

---

## 📄 License

MIT © 2026 [BizAnalyzer.nl](https://www.bizanalyzer.nl)

---

## 👨‍💻 Developer

Built by **Assad** — Freelance AI Web Developer (ZZP) based in Haarlem, Netherlands.

[![GitHub](https://img.shields.io/badge/GitHub-AssadAiDeveloper-181717?style=flat-square&logo=github)](https://github.com/AssadAiDeveloper)
