import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { metaFromEntry, sortBlogEntries } from '../lib/content';
import { withBase } from '../lib/paths';

export const GET: APIRoute = async () => {
  const posts = sortBlogEntries(await getCollection('docs')).slice(0, 6);
  return new Response(
    JSON.stringify({
      articles: posts.map((entry) => {
        const meta = metaFromEntry(entry);
        return {
          title: meta.title,
          url: withBase(meta.path),
          category: meta.blog!.type,
          date: meta.blog!.publishedAt
        };
      })
    }),
    { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
  );
};
