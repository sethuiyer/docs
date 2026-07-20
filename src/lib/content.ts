import type { CollectionEntry } from 'astro:content';
import { blogDetails } from '../data/blog';
import { routeFromId, withBase } from './paths';

export type DocEntry = CollectionEntry<'docs'>;

type Frontmatter = Record<string, unknown>;

function frontmatterFromEntry(entry: DocEntry): Frontmatter {
  return (entry.data ?? {}) as Frontmatter;
}

function materialsFromEntry(entry: DocEntry) {
  const materials = frontmatterFromEntry(entry).materials;
  if (!Array.isArray(materials)) return [];

  return materials.flatMap((item) => {
    if (!item || typeof item !== 'object') return [];
    const material = item as Record<string, unknown>;
    if (typeof material.label !== 'string' || typeof material.href !== 'string') return [];
    const href = /^[a-z][a-z\d+.-]*:/i.test(material.href) || material.href.startsWith('//')
      ? material.href
      : material.href === '/docs' || material.href.startsWith('/docs#')
        ? `${withBase('/navokoj/api-documentation/')}${material.href.slice('/docs'.length)}`
        : withBase(material.href);
    return [{
      label: material.label,
      href,
      note: typeof material.note === 'string' ? material.note : undefined
    }];
  });
}

function fallbackBlogDetails(entry: DocEntry) {
  const data = frontmatterFromEntry(entry);
  const tags = Array.isArray(data.tags) ? data.tags.map(String) : ['Navokoj'];
  const publishedAt = typeof data.date === 'string' ? data.date : '2026-01-01';
  const type = typeof data.type === 'string' ? data.type : tags.includes('research') ? 'Research note' : 'Field note';
  const description = typeof data.description === 'string' ? data.description : descriptionFromEntry(entry);
  return { publishedAt, type, tags, description };
}

const sectionLabels: Record<string, string> = {
  blog: 'Writing',
  concepts: 'Concepts',
  'getting-started': 'Developer guide',
  marketing: 'Navokoj',
  navokoj: 'Developer guide',
  projects: 'Projects',
  references: 'References',
  zenodo: 'Publications'
};

const descriptionOverrides: Record<string, string> = {
  index:
    'Physics-informed constraint intelligence and proof-aware optimization from ShunyaBar Labs.',
  'core-vision':
    'The Arithmetic Manifold: a unified theory of prime weighting, partition functions, phase transitions, and computational geometry.',
  'research-report':
    'A unified technical report on the mathematical systems, solvers, and research projects developed by ShunyaBar Labs.',
  'projects/index':
    'Explore ShunyaBar Labs projects spanning MaxSAT, physics-informed optimization, arithmetic geometry, and distributed agents.',
  'marketing/index':
    'Navokoj is a verifiable MaxSAT API for hard scheduling, planning, routing, and allocation problems.',
  'zenodo/index': 'Citable ShunyaBar Labs research artifacts, preprints, software records, and reproducibility packages.'
};

function stripMarkdown(value: string) {
  return value
    .replace(/<!--([\s\S]*?)-->/g, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[`*_~>#|]/g, ' ')
    .replace(/\\[()[\]]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function titleFromEntry(entry: DocEntry) {
  const frontmatterTitle = frontmatterFromEntry(entry).title;
  if (typeof frontmatterTitle === 'string' && frontmatterTitle.trim()) return frontmatterTitle.trim();

  const body = entry.body ?? '';
  const heading = body.match(/^#\s+(.+)$/m)?.[1];
  if (heading) return stripMarkdown(heading);

  if (entry.id === 'index') return 'ShunyaBar Labs';
  return entry.id
    .split('/')
    .at(-1)!
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function descriptionFromEntry(entry: DocEntry) {
  const blogDescription = blogDetails[entry.id]?.description;
  if (blogDescription) return blogDescription;
  const frontmatterDescription = frontmatterFromEntry(entry).description;
  if (typeof frontmatterDescription === 'string' && frontmatterDescription.trim()) return frontmatterDescription.trim();
  if (descriptionOverrides[entry.id]) return descriptionOverrides[entry.id];

  const paragraphs = (entry.body ?? '')
    .replace(/^#\s+.+$/m, '')
    .split(/\n\s*\n/)
    .map(stripMarkdown)
    .filter(
      (paragraph) =>
        paragraph.length > 80 &&
        !/^Published\b/i.test(paragraph) &&
        !/^Tags\b/i.test(paragraph) &&
        !/^Related\b/i.test(paragraph)
    );

  const description = paragraphs[0] ?? 'Research and technical writing from ShunyaBar Labs.';
  return description.length > 190 ? `${description.slice(0, 187).trimEnd()}…` : description;
}

export function readingMinutes(entry: DocEntry) {
  const words = stripMarkdown(entry.body ?? '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function sectionFromEntry(entry: DocEntry) {
  const section = entry.id.split('/')[0];
  if (!entry.id.includes('/')) return 'Field notes';
  return sectionLabels[section] ?? section;
}

export function isBlogEntry(entry: DocEntry) {
  return entry.id.startsWith('blog/');
}

export function isDraftEntry(entry: DocEntry) {
  return entry.id === 'concepts/stop-operator-manuscript';
}

export function metaFromEntry(entry: DocEntry) {
  const blog = blogDetails[entry.id] ?? (isBlogEntry(entry) ? fallbackBlogDetails(entry) : undefined);
  const data = frontmatterFromEntry(entry);
  return {
    id: entry.id,
    title: titleFromEntry(entry),
    description: descriptionFromEntry(entry),
    path: routeFromId(entry.id),
    section: sectionFromEntry(entry),
    readingMinutes: readingMinutes(entry),
    blog,
    author: typeof data.author === 'string' ? data.author : undefined,
    materials: materialsFromEntry(entry),
    draft: isDraftEntry(entry)
  };
}

export function sortBlogEntries(entries: DocEntry[]) {
  return entries
    .filter(isBlogEntry)
    .sort((a, b) => {
      const aDate = blogDetails[a.id]?.publishedAt ?? fallbackBlogDetails(a).publishedAt;
      const bDate = blogDetails[b.id]?.publishedAt ?? fallbackBlogDetails(b).publishedAt;
      return bDate.localeCompare(aDate);
    });
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(`${date}T00:00:00Z`));
}

export function searchText(entry: DocEntry) {
  return stripMarkdown(entry.body ?? '').slice(0, 24000);
}

function headingSlug(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\x00-\x7f]/g, '')
    .replace(/[^A-Za-z0-9_\s-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[-\s]+/g, '-');
}

export function headingsFromEntry(entry: DocEntry) {
  const source = (entry.body ?? '').replace(/```[\s\S]*?```/g, '');
  const used = new Set<string>();

  return [...source.matchAll(/^(#{2,3})\s+(.+)$/gm)].map((match) => {
    const text = stripMarkdown(match[2]);
    const base = headingSlug(text);
    let slug = base;
    let suffix = 1;
    while (!slug || used.has(slug)) slug = `${base}_${suffix++}`;
    used.add(slug);
    return { depth: match[1].length, slug, text };
  });
}
