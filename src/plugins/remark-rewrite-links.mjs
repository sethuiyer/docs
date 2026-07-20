import path from 'node:path';

function walk(node, visitor) {
  visitor(node);
  if (Array.isArray(node.children)) {
    for (const child of node.children) walk(child, visitor);
  }
}

function routeForSource(relativePath) {
  const normalized = relativePath.split(path.sep).join('/');
  if (normalized === 'index.md') return '/';
  if (normalized.endsWith('/index.md')) {
    return `/${normalized.slice(0, -'index.md'.length)}`;
  }
  return `/${normalized.slice(0, -'.md'.length)}/`;
}

/** Rewrite MkDocs-style relative Markdown links to canonical Astro routes. */
export function remarkRewriteLinks({ projectRoot, base = '' } = {}) {
  const normalizedBase = base === '/' ? '' : base.replace(/\/$/, '');

  return (tree, file) => {
    if (!file.path) return;

    walk(tree, (node) => {
      if (!['link', 'definition', 'image'].includes(node.type) || !node.url) return;
      if (/^[a-z][a-z\d+.-]*:/i.test(node.url) || node.url.startsWith('//')) return;

      if (node.url.startsWith('/')) {
        const [pathname, suffix = ''] = node.url.split(/([?#].*)/, 2);
        if (pathname === '/docs') {
          node.url = `${normalizedBase}/navokoj/api-documentation/${suffix}`;
        } else if (pathname === '/#pricing' || node.url.startsWith('/#pricing')) {
          node.url = `${normalizedBase}/marketing/pricing/${suffix}`;
        } else {
          node.url = `${normalizedBase}${node.url}`;
        }
        return;
      }

      const match = node.url.match(/^([^?#]+\.md)([?#].*)?$/i);
      if (!match) return;

      const sourceTarget = decodeURIComponent(match[1]);
      const absoluteTarget = path.resolve(path.dirname(file.path), sourceTarget);
      const relativeTarget = path.relative(projectRoot, absoluteTarget);

      if (relativeTarget.startsWith('..') || path.isAbsolute(relativeTarget)) return;

      node.url = `${normalizedBase}${routeForSource(relativeTarget)}${match[2] ?? ''}`;
    });
  };
}
