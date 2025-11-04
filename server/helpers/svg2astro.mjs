import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, basename, dirname, resolve } from 'node:path';
const { glob } = require('/usr/local/lib/node_modules/glob');

// 從命令行參數獲取輸入和輸出資料夾
const args = process.argv.slice(2);
const inputFolder = args[0] || 'public/assets/images/icons';
const outputFolder = args[1] || 'src/components/common/icons/svg';

// 驗證參數
if (args.includes('--help') || args.includes('-h')) {
    console.log(`
使用方法: node svg2astro.mjs [input_folder] [output_folder]

參數:
  input_folder   SVG 檔案的來源資料夾 (預設: public/assets/images/icons)
  output_folder  Astro 檔案的輸出資料夾 (預設: src/components/common/icons/svg)

範例:
  node svg2astro.mjs
  node svg2astro.mjs public/assets/images/icons src/components/common/icons/arrows/svg
  node svg2astro.mjs ./icons ./output
`);
    process.exit(0);
}

console.log(`輸入資料夾: ${inputFolder}`);
console.log(`輸出資料夾: ${outputFolder}`);

// 確保輸出資料夾存在
const outputPath = resolve(outputFolder);
if (!existsSync(outputPath)) {
    mkdirSync(outputPath, { recursive: true });
    console.log(`已創建輸出資料夾: ${outputPath}`);
}

// 搜尋 SVG 檔案
const searchPattern = join(inputFolder, '*.svg');
console.log(`搜尋模式: ${searchPattern}`);

try {
    const svgFiles = await glob(searchPattern);
    
    if (svgFiles.length === 0) {
        console.log(`在 ${inputFolder} 中沒有找到 SVG 檔案`);
        process.exit(1);
    }
    
    console.log(`找到 ${svgFiles.length} 個 SVG 檔案`);
    
    let processedCount = 0;
    let skippedCount = 0;
    
    for (const svgFile of svgFiles) {
        try {
            const content = readFileSync(svgFile, { encoding: 'utf8' });
            const fileName = basename(svgFile).replaceAll('.svg', '.astro');
            const outputFilePath = join(outputPath, fileName);
            
            if (existsSync(outputFilePath)) {
                console.log(`跳過 (已存在): ${fileName}`);
                skippedCount++;
            } else {
                writeFileSync(outputFilePath, content, { encoding: 'utf8' });
                console.log(`已轉換: ${fileName}`);
                processedCount++;
            }
        } catch (error) {
            console.error(`處理檔案 ${svgFile} 時發生錯誤:`, error.message);
        }
    }
    
    console.log(`\n轉換完成!`);
    console.log(`已處理: ${processedCount} 個檔案`);
    console.log(`已跳過: ${skippedCount} 個檔案`);
    
} catch (error) {
    console.error('搜尋 SVG 檔案時發生錯誤:', error.message);
    process.exit(1);
}
