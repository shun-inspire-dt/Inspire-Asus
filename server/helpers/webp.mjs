import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const webp = require('/usr/local/lib/node_modules/webp-converter');
const { glob } = require('/usr/local/lib/node_modules/glob');

const jsfiles = await glob('public/assets/**/*.{png,jpeg,jpg}', { ignore: 'public/assets/meta/**' });
jsfiles.map((img) => {
    const webImg = img.replace(/\.[png|jpeg|jpg]+$/i, '.webp');
    if (!existsSync(webImg)) console.log(img);
    webp.cwebp(img, webImg, '-q 100');
});
