import { defineConfig } from 'astro/config';
import { config, integrations, unoCssConfig } from './astro.config.mjs';

/** unocss */
import UnoCSS from 'unocss/astro';
/**
 * Compile class transformer
 * Compile group of classes into one class. Inspired by the compilation mode of Windi CSS and issue #948 by @UltraCakeBakery.
 */
import transformerCompileClass from '@unocss/transformer-compile-class';

/** Performance */
import htmlBeautifier from 'astro-html-beautifier';
import viteCompression from 'vite-plugin-compression';

/** Environment Variables */
import { loadEnv } from 'vite';
const { PUBLIC_META_PROJECT_NAME } = loadEnv(import.meta.env.MODE, process.cwd(), '');

const newConfig = Object.assign(config, {
    base: '/',
    outDir: process.env.LOCAL === 'true' ? 'build.local' : 'build',
    build: {
        format: 'file',
        inlineStylesheets: 'never'
    },
    site: process.env.LOCAL === 'true' ? 'http://localhost:3001' : `https://www.${PUBLIC_META_PROJECT_NAME}.com.tw`,
    server: { port: 3001 },
    compressHTML: false
});

newConfig.integrations = [
    UnoCSS({
        ...unoCssConfig,
        transformers: [
            ...unoCssConfig.transformers,
            transformerCompileClass({
                classPrefix: ''
            })
        ]
    }),
    (await import('astro-compress')).default({
        Image: false,
        HTML: false,
        path: ['build']
    }),
    htmlBeautifier()
];

newConfig.vite = Object.assign(newConfig.vite, {
    plugins: [viteCompression()],
    build: {
        rollupOptions: {
            output: {
                entryFileNames: 'js/[name].[hash].js',
                assetFileNames: ({ name }) => {
                    if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? '')) {
                        return 'assets/images/[name][extname]';
                    }
                    if (/\.css$/.test(name ?? '')) {
                        return 'assets/css/[name].[hash][extname]';
                    }
                    return 'assets/[name][extname]';
                }
            }
        }
    }
});

export default defineConfig(newConfig);
