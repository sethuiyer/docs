function headingText(node) {
  if (node.type === 'text') return node.value;
  if (!Array.isArray(node.children)) return '';
  return node.children.map(headingText).join('');
}

export function mkdocsSlug(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\x00-\x7f]/g, '')
    .replace(/[^A-Za-z0-9_\s-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[-\s]+/g, '-');
}

/** Match Python-Markdown/MkDocs IDs, including `_1` suffixes for duplicates. */
export function rehypeMkdocsHeadingIds() {
  return (tree) => {
    const used = new Set();

    function walk(node) {
      if (node?.type === 'element' && /^h[1-6]$/.test(node.tagName)) {
        node.properties ??= {};
        let id = typeof node.properties.id === 'string' ? node.properties.id : mkdocsSlug(headingText(node));
        const base = id;
        let suffix = 1;
        while (!id || used.has(id)) id = `${base}_${suffix++}`;
        node.properties.id = id;
        used.add(id);
      }

      for (const child of node?.children ?? []) walk(child);
    }

    walk(tree);
  };
}
