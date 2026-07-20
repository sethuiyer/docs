import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, '../docs');
const contentDirectories = ['blog', 'concepts', 'getting-started', 'marketing', 'navokoj', 'projects', 'references', 'zenodo'];

function filesBelow(directory, extension) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return filesBelow(path, extension);
    return !extension || path.endsWith(extension) ? [path] : [];
  });
}

const markdownFiles = [
  ...readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => join(root, entry.name)),
  ...contentDirectories.flatMap((directory) => filesBelow(join(root, directory), '.md'))
];

function routeForMarkdown(file) {
  const source = relative(root, file).replaceAll('\\', '/');
  if (source === 'index.md') return '/docs/';
  if (source.endsWith('/index.md')) return `/docs/${source.slice(0, -'index.md'.length)}`;
  return `/docs/${source.slice(0, -'.md'.length)}/`;
}

function fileForRoute(pathname) {
  if (pathname === '/docs' || pathname === '/docs/') return join(output, 'index.html');
  const relativePath = pathname.replace(/^\/docs\/?/, '');
  if (!relativePath) return join(output, 'index.html');
  if (/\.[a-z0-9]+$/i.test(relativePath)) return join(output, relativePath);
  return join(output, relativePath, 'index.html');
}

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

assert(markdownFiles.length === 77, `Expected 77 Markdown sources, found ${markdownFiles.length}`);

for (const source of markdownFiles) {
  const route = routeForMarkdown(source);
  assert(existsSync(fileForRoute(route)), `Missing migrated route ${route}`);
}

for (const required of [
  '.nojekyll',
  '404.html',
  'favicon.svg',
  'googlee3e789f414934f51.html',
  'recent-articles.json',
  'robots.txt',
  'rss.xml',
  'search-index.json',
  'sitemap-index.xml'
]) {
  assert(existsSync(join(output, required)), `Missing required output ${required}`);
}

const htmlFiles = filesBelow(output, '.html');
let checkedLinks = 0;
let checkedFragments = 0;

for (const htmlFile of htmlFiles) {
  const html = readFileSync(htmlFile, 'utf8');
  const outputName = relative(output, htmlFile);
  assert(!/\smarkdown(?:=|>)/i.test(html), `${outputName} contains a legacy markdown attribute`);

  if (!['404.html', 'googlee3e789f414934f51.html'].includes(outputName)) {
    assert(
      /<link rel="canonical" href="https:\/\/sethuiyer\.github\.io\/docs\//.test(html),
      `${outputName} has an invalid canonical URL`
    );
  }

  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    const isExternal = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href);
    assert(isExternal || !/\.md(?:[#?]|$)/i.test(href), `${outputName} contains an internal .md link: ${href}`);
    if (/^(?:mailto:|https?:\/\/|#|javascript:)/.test(href)) continue;

    let url;
    try {
      url = new URL(href, `https://sethuiyer.github.io${routeForOutput(htmlFile)}`);
    } catch {
      failures.push(`${outputName} has an invalid href: ${href}`);
      continue;
    }

    if (url.origin !== 'https://sethuiyer.github.io' || !url.pathname.startsWith('/docs')) continue;
    checkedLinks += 1;
    const targetFile = fileForRoute(url.pathname);
    assert(existsSync(targetFile), `${outputName} links to missing ${url.pathname}`);

    if (url.hash && existsSync(targetFile) && targetFile.endsWith('.html')) {
      checkedFragments += 1;
      const targetHtml = readFileSync(targetFile, 'utf8');
      const fragment = decodeURIComponent(url.hash.slice(1));
      const escaped = fragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      assert(new RegExp(`\\sid=["']${escaped}["']`).test(targetHtml), `${outputName} links to missing fragment ${url.pathname}${url.hash}`);
    }
  }
}

function routeForOutput(file) {
  const path = relative(output, file).replaceAll('\\', '/');
  if (path === 'index.html') return '/docs/';
  if (path === '404.html') return '/docs/404.html';
  return `/docs/${path.replace(/index\.html$/, '')}`;
}

for (const source of markdownFiles) {
  const markdown = readFileSync(source, 'utf8');
  assert(!/^\s*\\\[.+\\\]\s*$/m.test(markdown), `${relative(root, source)} has same-line \\[...\\] display math`);
  assert(!/^\s*\$\$.+\$\$\s*$/m.test(markdown), `${relative(root, source)} has same-line $$...$$ display math`);
  if (!/(?:\\\(|\\\[|\$\$)/.test(markdown)) continue;
  const html = readFileSync(fileForRoute(routeForMarkdown(source)), 'utf8');
  assert(html.includes('class="katex'), `${relative(root, source)} contains math but its page has no KaTeX output`);
  assert(!html.includes('class="katex-error'), `${relative(root, source)} contains a KaTeX error`);
}

const launchHtml = readFileSync(join(output, 'blog/navokoj-launch/index.html'), 'utf8');
const reportHtml = readFileSync(join(output, 'research-report/index.html'), 'utf8');
assert(launchHtml.includes('language-mermaid'), 'Navokoj launch is missing its Mermaid source block');
assert(reportHtml.includes('language-mermaid'), 'Research report is missing its Mermaid source block');

if (failures.length) {
  console.error(`Build validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Validated ${markdownFiles.length} migrated routes, ${htmlFiles.length} HTML files, ${checkedLinks} local links, and ${checkedFragments} fragments.`);
