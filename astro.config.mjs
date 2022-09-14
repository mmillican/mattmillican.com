import { defineConfig } from 'astro/config';
import partytown from '@astrojs/partytown';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
	integrations: [
		preact(),
		tailwind({
			config: {
				applyAstroStyles: false,
			},
		}),
    partytown({
      config: { forward: ['dataLayer.push'] },
    }),
	],
  markdown: {
    drafts: true,
  },
	site: 'https://mattmillican.com',
	trailingSlash: 'ignore',
});
