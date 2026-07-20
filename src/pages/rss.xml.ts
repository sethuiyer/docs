import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { metaFromEntry, sortBlogEntries } from '../lib/content';
import { withBase } from '../lib/paths';

export async function GET(context: { site?: URL }) {
  const entries = await getCollection('docs');
  const posts = sortBlogEntries(entries);

  return rss({
    title: 'ShunyaBar Labs — Field Notes',
    description: 'Writing on arithmetic geometry, constraint intelligence, and proof-aware optimization.',
    site: context.site!,
    items: posts.map((entry) => {
      const meta = metaFromEntry(entry);
      return {
        title: meta.title,
        description: meta.description,
        pubDate: new Date(`${meta.blog!.publishedAt}T00:00:00Z`),
        link: withBase(meta.path),
        categories: meta.blog!.tags
      };
    }),
    customData: '<language>en-us</language>'
  });
}
