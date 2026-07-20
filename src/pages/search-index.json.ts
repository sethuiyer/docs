import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { isDraftEntry, metaFromEntry, searchText } from '../lib/content';
import { withBase } from '../lib/paths';

export const GET: APIRoute = async () => {
  const entries = await getCollection('docs', (entry) => entry.id !== 'index' && !isDraftEntry(entry));
  const index = entries.map((entry) => {
    const meta = metaFromEntry(entry);
    return {
      title: meta.title,
      description: meta.description,
      path: withBase(meta.path),
      section: meta.section,
      text: searchText(entry)
    };
  });

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
};
