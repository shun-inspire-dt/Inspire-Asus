import { defineConfig } from 'astro/config';
import { config } from './astro.config.mjs';

/** Performance */
import compress from 'astro-compress';
import viteCompression from 'vite-plugin-compression';

/** Adapter */
import netlify from '@astrojs/netlify';

const newConfig = Object.assign(config, {
    output: 'server',
    adapter: netlify({
        dist: new URL('./deploy/', import.meta.url)
    }),
    site: 'https://new-houbi-inspire-dt.netlify.app'
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
