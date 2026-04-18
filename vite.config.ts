import {defineConfig} from 'vite';

export default defineConfig({
  base: '/',
  server: {
    open: true,
    port: 3000,
  },
  preview: {
    open: true,
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "/src/styles/variables.scss" as *;
          @use "/src/styles/mixins.scss" as *;
        `,
      },
    },
  },
});
