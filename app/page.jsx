// app/page.jsx — Home page (SSR)
import AppClient from '../components/AppClient.jsx';

export const metadata = {
  title: 'BizAnalyzer.nl — Bedrijfsanalyse voor Nederland | KVK ZZP Migranten',
  description: 'BizAnalyzer.nl helpt ondernemers en migranten hun bedrijfsidee te analyseren voor Nederland. KVK registratie, ZZP tarieven, vacatures en economisch nieuws.',
  alternates: { canonical: 'https://www.bizanalyzer.nl/' },
};

export default function HomePage() {
  return <AppClient initialPage="main"/>;
}
