import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math-extended';
import rehypeKatex from 'rehype-katex';
import { remarkRewriteLinks } from './src/plugins/remark-rewrite-links.mjs';
import { rehypeHeadingAnchors } from './src/plugins/rehype-heading-anchors.mjs';
import { rehypeMkdocsHeadingIds } from './src/plugins/rehype-mkdocs-heading-ids.mjs';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  site: 'https://sethuiyer.github.io',
  base: '/docs',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },
  integrations: [sitemap()],
  markdown: {
    processor: unified({
      gfm: true,
      smartypants: true,
      remarkPlugins: [
        [remarkMath, { singleDollarTextMath: false }],
        [remarkRewriteLinks, { projectRoot, base: '/docs' }]
      ],
      rehypePlugins: [rehypeMkdocsHeadingIds, rehypeKatex, rehypeHeadingAnchors]
    }),
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid', 'math']
    },
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      defaultColor: false,
      wrap: true
    }
  },
  vite: {
    build: {
      cssMinify: 'lightningcss'
    }
  }
});
