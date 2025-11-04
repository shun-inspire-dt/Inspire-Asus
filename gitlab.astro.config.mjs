import { defineConfig } from 'astro/config';
import { config } from './astro.config.mjs';

/** Performance */
import compress from 'astro-compress';
import viteCompression from 'vite-plugin-compression';

// environment variables
import { loadEnv } from 'vite';
const { PUBLIC_META_PROJECT_NAME } = loadEnv(import.meta.env.MODE, process.cwd(), '');

const newConfig = Object.assign(config, {
    sitemap: true,
    site: `https://www.${PUBLIC_META_PROJECT_NAME}.com.tw`,
    outDir: 'public',
    publicDir: 'static'
});

newConfig.integrations = newConfig.integrations.concat([
    compress({
        path: './deploy',
        html: false
    })
]);

newConfig.vite = Object.assign(newConfig.vite, {
    plugins: [viteCompression()]
});

export default defineConfig(newConfig);
