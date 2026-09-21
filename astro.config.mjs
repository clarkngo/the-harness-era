import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

const isPages = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  site: 'https://clarkngo.github.io',
  base: isPages ? '/the-harness-era' : '/',
  integrations: [react()],
  markdown: {
    shikiConfig: {
      theme: 'everforest-light',
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
