import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const docs = defineCollection({
  loader: glob({
    base: '.',
    pattern:
      '{*.md,blog/**/*.md,concepts/**/*.md,getting-started/**/*.md,marketing/**/*.md,navokoj/**/*.md,projects/**/*.md,references/**/*.md,zenodo/**/*.md}',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
    deferRender: true
  })
});

export const collections = { docs };
