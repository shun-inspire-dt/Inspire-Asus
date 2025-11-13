/** Path */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** Ui Css */

/** unocss */
import UnoCSS from 'unocss/astro';
/** Compile group of classes into one class */
import transformerCompileClass from '@unocss/transformer-compile-class';
/**
 * This enables the attributify mode for other presets.
 * URL: https://unocss.dev/presets/attributify#attributify-mode
 * */
import presetAttributify from '@unocss/preset-attributify';
/** UnoCSS transformer for @apply, @screen and theme() directives */
import transformerDirectives from '@unocss/transformer-directives';
/**
 * Enables the variant group feature of Windi CSS for UnoCSS.
 * URL: https://windicss.org/features/variant-groups.html
 */
import transformerVariantGroup from '@unocss/transformer-variant-group';
/** Presets are the heart of UnoCSS. They let you make your own custom framework in minutes */
import presetUno from '@unocss/preset-uno';
/** Generate css prefixer */
import presetAutoprefixer from 'unocss-preset-autoprefixer';
/** My Custom Config */
export const unoCssConfig = {
    injectReset: true,
    transformers: [transformerDirectives(), transformerVariantGroup()],
    transformCSS: true
};
export const integrations = [UnoCSS(unoCssConfig)];
/** Framework */

export const config = {
    integrations,
    devToolbar: {
        enabled: false
    },
    vite: {
        resolve: {
            alias: {
                '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
                '~~/': path.resolve(__dirname, 'src/')
            }
        }
    }
};
