import { defineConfig } from 'vite'

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
})
