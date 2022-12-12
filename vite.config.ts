import { defineConfig } from 'vite';

export default defineConfig({
    base: '',
    root: './src',
    server: {
        open: true,
        port: 8080,
    },
    build: {
        outDir: '../dist',
        assetsDir: './',
        minify: "terser",
    },
});