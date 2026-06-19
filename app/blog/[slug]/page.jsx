import AppClient from '../../../components/AppClient.jsx';

export default function BlogPostPage({ params }) {
  return <AppClient initialPage="blog-post" initialBlogId={params.slug}/>;
}
