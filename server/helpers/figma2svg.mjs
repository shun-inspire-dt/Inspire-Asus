import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { config } from 'dotenv';

// 載入環境變數
config();

// 從命令行參數獲取參數
const args = process.argv.slice(2);
const figmaUrl = args[0];
const outputFolder = args[1] || 'public/assets/images/icons';

// 驗證參數
if (args.includes('--help') || args.includes('-h')) {
    console.log(`
使用方法: node figma2svg.mjs [figma_url] [output_folder]

參數:
  figma_url      Figma component set 的 URL
  output_folder  SVG 檔案的輸出資料夾 (預設: public/assets/images/icons)

環境變數:
  FIGMA_ACCESS_TOKEN  你的 Figma 存取權杖 (必需)

範例:
  node figma2svg.mjs "https://www.figma.com/design/fileKey/fileName?node-id=123-456" public/assets/images/icons/arrows
  node figma2svg.mjs "https://www.figma.com/design/fileKey/fileName?node-id=123-456"
`);
    process.exit(0);
}

if (!figmaUrl) {
    console.error('錯誤: 請提供 Figma URL');
    console.log('使用 --help 查看使用說明');
    process.exit(1);
}

const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
if (!FIGMA_ACCESS_TOKEN) {
    console.error('錯誤: 請在 .env 檔案中設定 FIGMA_ACCESS_TOKEN');
    process.exit(1);
}

console.log(`Figma URL: ${figmaUrl}`);
console.log(`輸出資料夾: ${outputFolder}`);

// 解析 Figma URL
function parseFigmaUrl(url) {
    try {
        const urlObj = new URL(url);
        const pathParts = urlObj.pathname.split('/');
        
        // URL 格式: https://www.figma.com/design/fileKey/fileName?node-id=123-456
        if (pathParts[1] === 'design' && pathParts[2]) {
            const fileKey = pathParts[2];
            const nodeId = urlObj.searchParams.get('node-id');
            
            if (!nodeId) {
                throw new Error('URL 中沒有找到 node-id 參數');
            }
            
            return {
                fileKey,
                nodeId: nodeId.replace('-', ':') // 將 123-456 轉換為 123:456
            };
        }
        
        throw new Error('無效的 Figma URL 格式');
    } catch (error) {
        throw new Error(`解析 Figma URL 失敗: ${error.message}`);
    }
}

// 取得 Figma 檔案資訊
async function getFigmaFile(fileKey, nodeId) {
    const url = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${nodeId}`;
    
    try {
        const response = await fetch(url, {
            headers: {
                'X-Figma-Token': FIGMA_ACCESS_TOKEN
            }
        });
        
        if (!response.ok) {
            throw new Error(`Figma API 錯誤: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`取得 Figma 檔案失敗: ${error.message}`);
    }
}

// 取得 SVG 內容
async function getSvgExports(fileKey, nodeIds) {
    const idsParam = nodeIds.join(',');
    const url = `https://api.figma.com/v1/images/${fileKey}?ids=${idsParam}&format=svg`;
    
    try {
        const response = await fetch(url, {
            headers: {
                'X-Figma-Token': FIGMA_ACCESS_TOKEN
            }
        });
        
        if (!response.ok) {
            throw new Error(`Figma API 錯誤: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`取得 SVG 匯出失敗: ${error.message}`);
    }
}

// 下載 SVG 檔案
async function downloadSvg(url, outputPath) {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`下載失敗: ${response.status} ${response.statusText}`);
        }
        
        const svgContent = await response.text();
        writeFileSync(outputPath, svgContent, { encoding: 'utf8' });
        return true;
    } catch (error) {
        console.error(`下載 SVG 失敗: ${error.message}`);
        return false;
    }
}

// 清理檔案名稱
function sanitizeFileName(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s\-_=,]/g, '') // 保留等號和逗號用於解析
        .replace(/\s*=\s*/g, '_') // 將等號和周圍空格轉換為底線
        .replace(/\s*,\s*/g, '-') // 將逗號和周圍空格轉換為連字號
        .replace(/\s+/g, '_') // 將剩餘空格轉換為底線
        .replace(/_+/g, '_') // 合併多個底線
        .replace(/-+/g, '-') // 合併多個連字號
        .replace(/^[-_]|[-_]$/g, ''); // 移除開頭和結尾的連字號或底線
}

// 遞迴搜尋所有 component 節點
function findComponentNodes(node, components = []) {
    if (node.type === 'COMPONENT') {
        components.push({
            id: node.id,
            name: node.name,
            type: node.type
        });
    }
    
    if (node.children) {
        for (const child of node.children) {
            findComponentNodes(child, components);
        }
    }
    
    return components;
}

// 主要執行函數
async function main() {
    try {
        // 解析 Figma URL
        const { fileKey, nodeId } = parseFigmaUrl(figmaUrl);
        console.log(`檔案 ID: ${fileKey}`);
        console.log(`節點 ID: ${nodeId}`);
        
        // 確保輸出資料夾存在
        const outputPath = resolve(outputFolder);
        if (!existsSync(outputPath)) {
            mkdirSync(outputPath, { recursive: true });
            console.log(`已創建輸出資料夾: ${outputPath}`);
        }
        
        // 取得 Figma 檔案資訊
        console.log('\n正在取得 Figma 檔案資訊...');
        const fileData = await getFigmaFile(fileKey, nodeId);
        
        if (!fileData.nodes || !fileData.nodes[nodeId]) {
            throw new Error('找不到指定的節點');
        }
        
        const rootNode = fileData.nodes[nodeId].document;
        console.log(`根節點: ${rootNode.name} (${rootNode.type})`);
        
        // 搜尋所有 component 節點
        const components = findComponentNodes(rootNode);
        
        if (components.length === 0) {
            console.log('在指定節點中沒有找到任何 component');
            process.exit(0);
        }
        
        console.log(`找到 ${components.length} 個 component:`);
        components.forEach((comp, index) => {
            console.log(`  ${index + 1}. ${comp.name} (${comp.id})`);
        });
        
        // 取得 SVG 匯出 URL
        console.log('\n正在取得 SVG 匯出 URL...');
        const nodeIds = components.map(comp => comp.id);
        const exportData = await getSvgExports(fileKey, nodeIds);
        
        if (!exportData.images) {
            throw new Error('無法取得 SVG 匯出 URL');
        }
        
        // 下載 SVG 檔案
        console.log('\n開始下載 SVG 檔案...');
        let successCount = 0;
        let failCount = 0;
        
        for (const component of components) {
            const svgUrl = exportData.images[component.id];
            
            if (!svgUrl) {
                console.log(`跳過 ${component.name}: 沒有 SVG URL`);
                failCount++;
                continue;
            }
            
            const fileName = sanitizeFileName(component.name) + '.svg';
            const filePath = join(outputPath, fileName);
            
            if (existsSync(filePath)) {
                console.log(`跳過 ${component.name}: 檔案已存在`);
                continue;
            }
            
            console.log(`下載中: ${component.name} -> ${fileName}`);
            const success = await downloadSvg(svgUrl, filePath);
            
            if (success) {
                successCount++;
                console.log(`✅ 已下載: ${fileName}`);
            } else {
                failCount++;
                console.log(`❌ 下載失敗: ${fileName}`);
            }
        }
        
        console.log(`\n下載完成!`);
        console.log(`成功: ${successCount} 個檔案`);
        console.log(`失敗: ${failCount} 個檔案`);
        
    } catch (error) {
        console.error('執行失敗:', error.message);
        process.exit(1);
    }
}

// 執行主函數
main();
