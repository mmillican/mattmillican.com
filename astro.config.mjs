import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind'; // https://astro.build/config

import { SITE } from './src/config.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: SITE.origin,
  base: SITE.basePathName,
  // trailingSlash: SITE.trailingSlash ? 'always' : 'never',
  trailingSlash: 'ignore',

  integrations: [
    preact(),

    tailwind({
      config: {
        applyAstroStyles: false,
      },
    }),
  ],

  markdown: {
    drafts: true
  },

  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
