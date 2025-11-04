import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, basename, dirname, resolve } from 'node:path';
const { glob } = require('/usr/local/lib/node_modules/glob');

// 從命令行參數獲取輸入和輸出資料夾
const args = process.argv.slice(2);
const inputFolder = args[0] || 'src/components/common/icons/svg';
const outputFolder = args[1] || 'public/assets/images/icons';

// 驗證參數
if (args.includes('--help') || args.includes('-h')) {
    console.log(`
使用方法: node astro2svg.mjs [input_folder] [output_folder]

參數:
  input_folder   Astro 檔案的來源資料夾 (預設: src/components/common/icons/svg)
  output_folder  SVG 檔案的輸出資料夾 (預設: public/assets/images/icons)

範例:
  node astro2svg.mjs
  node astro2svg.mjs src/components/common/icons/arrows/svg-astro public/assets/images/icons/arrows
  node astro2svg.mjs ./astro-components ./svg-output
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

// 搜尋 Astro 檔案
const searchPattern = join(inputFolder, '*.astro');
console.log(`搜尋模式: ${searchPattern}`);

// 檢查內容是否為有效的 SVG
function isValidSvgContent(content) {
    const trimmedContent = content.trim();
    return trimmedContent.startsWith('<svg') && trimmedContent.includes('</svg>');
}

// 清理 SVG 內容，移除多餘的空白和格式
function cleanSvgContent(content) {
    return content
        .trim()
        .replace(/\n\s*\n/g, '\n') // 移除多餘的空行
        .replace(/\n\s*/g, '\n') // 移除行首的空白
        .replace(/>\s+</g, '><') // 移除標籤間的空白
        .replace(/\s+/g, ' ') // 將多個空白合併為一個
        .trim();
}

try {
    const astroFiles = await glob(searchPattern);
    
    if (astroFiles.length === 0) {
        console.log(`在 ${inputFolder} 中沒有找到 Astro 檔案`);
        process.exit(1);
    }
    
    console.log(`找到 ${astroFiles.length} 個 Astro 檔案`);
    
    let processedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    
    for (const astroFile of astroFiles) {
        try {
            const content = readFileSync(astroFile, { encoding: 'utf8' });
            const fileName = basename(astroFile).replaceAll('.astro', '.svg');
            const outputFilePath = join(outputPath, fileName);
            
            // 檢查內容是否為有效的 SVG
            if (!isValidSvgContent(content)) {
                console.log(`跳過 (非 SVG 內容): ${fileName}`);
                skippedCount++;
                continue;
            }
            
            if (existsSync(outputFilePath)) {
                console.log(`跳過 (已存在): ${fileName}`);
                skippedCount++;
            } else {
                // 清理並寫入 SVG 內容
                const cleanedContent = cleanSvgContent(content);
                writeFileSync(outputFilePath, cleanedContent, { encoding: 'utf8' });
                console.log(`已轉換: ${fileName}`);
                processedCount++;
            }
        } catch (error) {
            console.error(`處理檔案 ${astroFile} 時發生錯誤:`, error.message);
            errorCount++;
        }
    }
    
    console.log(`\n轉換完成!`);
    console.log(`已處理: ${processedCount} 個檔案`);
    console.log(`已跳過: ${skippedCount} 個檔案`);
    if (errorCount > 0) {
        console.log(`錯誤: ${errorCount} 個檔案`);
    }
    
} catch (error) {
    console.error('搜尋 Astro 檔案時發生錯誤:', error.message);
    process.exit(1);
}
