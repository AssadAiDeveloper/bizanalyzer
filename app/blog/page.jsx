import AppClient from '../../components/AppClient.jsx';

export const metadata = {
  title: 'Blog — Ondernemen in Nederland',
  description: 'Artikelen over KVK registratie, ZZP tarieven, BTW, subsidies en meer voor ondernemers in Nederland.',
  alternates: { canonical: 'https://www.bizanalyzer.nl/blog' },
};

export default function BlogPage() {
  return <AppClient initialPage="blog"/>;
}
