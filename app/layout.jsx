// app/layout.jsx — Root layout with SEO metadata
import Script from 'next/script';

const CRITICAL_CSS = `
* { box-sizing: border-box; margin: 0; padding: 0; }
html { overflow-x: hidden; scroll-behavior: smooth; }
body {
  background: #f4f5f7;
  font-family: "Segoe UI", Arial, "Helvetica Neue", sans-serif;
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}
:lang(ar), [dir="rtl"] {
  font-family: "Segoe UI", "Tahoma", "Arial Unicode MS", sans-serif;
}
input, select, textarea, button { font-family: inherit; }
input, select, textarea { font-size: 16px !important; }
@keyframes fadeUp    { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
@keyframes heroIn    { from{opacity:0;transform:scale(0.97)} to{opacity:1;transform:scale(1)} }
@keyframes bounce    { 0%,80%,100%{transform:scale(0)} 40%{transform:scale(1)} }
@keyframes pulse     { 0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.02)} }
@keyframes bgShift   { 0%{opacity:1} 50%{opacity:0.92} 100%{opacity:1} }
@keyframes float1    { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.1)} 66%{transform:translate(-20px,15px) scale(0.95)} }
@keyframes float2    { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-25px,20px) scale(1.08)} 66%{transform:translate(20px,-18px) scale(0.97)} }
@keyframes float3    { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(15px,25px) scale(1.05)} 66%{transform:translate(-30px,-10px) scale(0.98)} }
@keyframes gridMove  { from{transform:translateY(0)} to{transform:translateY(40px)} }
@keyframes textShimmer { 0%{opacity:0.9} 50%{opacity:1} 100%{opacity:0.9} }
@keyframes taglineColor { 0%{opacity:0.85} 50%{opacity:1} 100%{opacity:0.85} }
@keyframes badgeIn   { from{opacity:0;transform:translateY(8px) scale(0.9)} to{opacity:1;transform:translateY(0) scale(1)} }
@keyframes spin      { to { transform: rotate(360deg); } }

/* Responsive nav - CSS-driven to prevent hydration layout shift */
.mobile-nav-only { display: none; }
.desktop-nav-only { display: flex; }
@media (max-width: 639px) {
  .mobile-nav-only { display: flex; }
  .desktop-nav-only { display: none; }
}
`;

export const metadata = {
  metadataBase: new URL('https://www.bizanalyzer.nl'),
  title: {
    default: 'BizAnalyzer.nl — Bedrijfsanalyse voor Nederland | KVK ZZP Migranten',
    template: '%s — BizAnalyzer.nl',
  },
  description: 'BizAnalyzer.nl helpt ondernemers en migranten hun bedrijfsidee te analyseren voor Nederland. KVK registratie, ZZP tarieven, vacatures en economisch nieuws.',
  keywords: ['KVK registratie', 'ZZP tarieven Nederland', 'bedrijf starten Nederland', 'migranten ondernemen', 'statushouder ondernemen', 'BTW ZZP'],
  authors: [{ name: 'BizAnalyzer.nl' }],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'BizAnalyzer.nl — Bedrijfsanalyse voor Nederland',
    description: 'KVK registratie, ZZP tarieven, vacatures en nieuws voor ondernemers en migranten in Nederland.',
    url: 'https://www.bizanalyzer.nl',
    siteName: 'BizAnalyzer.nl',
    locale: 'nl_NL',
    type: 'website',
    images: [{ url: '/android-chrome-512x512.png', width: 512, height: 512 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BizAnalyzer.nl — Bedrijfsanalyse voor Nederland',
    description: 'KVK registratie, ZZP tarieven en nieuws voor ondernemers in Nederland.',
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport = {
  themeColor: '#FF5F00',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <head>
        {/* Critical CSS inlined to eliminate render-blocking stylesheet request */}
        <style dangerouslySetInnerHTML={{ __html: CRITICAL_CSS }} />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://region1.google-analytics.com" />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#f4f5f7', fontFamily: '"Segoe UI", Arial, "Helvetica Neue", sans-serif' }}>
        {children}
        {/* Google Analytics — loaded after page is interactive, no render blocking */}
        <Script strategy="lazyOnload" src="https://www.googletagmanager.com/gtag/js?id=G-989PXZPDQZ"/>
        <Script id="ga-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-989PXZPDQZ');
          `}
        </Script>
      </body>
    </html>
  );
}
