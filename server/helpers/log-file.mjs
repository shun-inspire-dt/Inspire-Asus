import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { glob } = require('/usr/local/lib/node_modules/glob');

const filePath = process.argv[2];
const jsfiles = await glob(`public/assets/images/pages/${filePath}/**/*.webp`);
console.log(jsfiles.reverse());