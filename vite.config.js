import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  appType: 'mpa',
  build: {
    rolldownOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'about/index.html'),
        locations: resolve(import.meta.dirname, 'locations/index.html'),
        jobs: resolve(import.meta.dirname, 'jobs/index.html'),
        notFound: resolve(import.meta.dirname, '404.html'),
      },
    },
  },
});
