function textContent(node) {
  if (node.type === 'text') return node.value;
  if (!Array.isArray(node.children)) return '';
  return node.children.map(textContent).join('');
}

function visit(node) {
  if (
    node.type === 'element' &&
    /^h[2-4]$/.test(node.tagName) &&
    typeof node.properties?.id === 'string'
  ) {
    const label = textContent(node);
    node.children.push({
      type: 'element',
      tagName: 'a',
      properties: {
        className: ['heading-anchor'],
        href: `#${node.properties.id}`,
        ariaLabel: `Link to ${label}`
      },
      children: [{ type: 'text', value: '#' }]
    });
  }

  if (Array.isArray(node.children)) node.children.forEach(visit);
}

export function rehypeHeadingAnchors() {
  return (tree) => visit(tree);
}
