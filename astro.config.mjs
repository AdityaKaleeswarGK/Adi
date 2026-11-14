// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://adi-kaleez.vercel.app',
  // research now lives on the landing page; keep old links working
  redirects: { '/research': '/#research' },
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mdx()]
});