/** 模擬 Common JS 的 require */
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
/** 讀、寫 檔案所用 */
import fs from 'node:fs';
const fs_extra = require('/usr/local/lib/node_modules/fs-extra');
/** 類 JQuery 讀寫 innerHTML 用，起手式 cheerio.load(${準備修改的 html 的 innerHTML，型態為 string}) */
const cheerio = require('/usr/local/lib/node_modules/cheerio');
/** pretty HTML 用 */
import prettier from '/usr/local/lib/node_modules/prettier/index.cjs';
/** Self Config and Function */
import {
    inputFiles,
    outputFiles,
    INPUT_FILE_PATH,
    OUTPUT_PROJECT_PATH,
    OUTPUT_TEMPLATE_PATH,
    OUTPUT_PUBLIC_PATH,
    OUTPUT_PUBLIC_PATH_PREFIX,
    PUBLIC_FOLDER_BACKUP,
    PUBLIC_FOLDER_DELETE,
    BEAUTY_HTML,
    PUBLIC_FOLDERS_TYPE,
    timestamp
} from './config.mjs';

/** 複寫 link 與 script */
export const coverSchema = (
    { outputprojectpath, outputTemplatePath, outputAssetsPathPrefix, beautyHtml } = {
        outputprojectpath: OUTPUT_PROJECT_PATH,
        outputTemplatePath: OUTPUT_TEMPLATE_PATH,
        outputAssetsPathPrefix: OUTPUT_PUBLIC_PATH_PREFIX,
        beautyHtml: BEAUTY_HTML
    }
) => {
    outputFiles.forEach((outputFile) => {
        /** 找出前端對應頁面的資料 index */
        const inputID = inputFiles.findIndex((x) => x.id === outputFile.id);

        /** 如果 前端 有對應的檔案才執行 */
        if (inputID !== -1 && fs.existsSync(INPUT_FILE_PATH + inputFiles[inputID]['link'])) {
            /** fs.readFileSync 會讀取檔案的 innerHTML */
            /** 前端的檔案 */
            const $$ = cheerio.load(fs.readFileSync(INPUT_FILE_PATH + inputFiles[inputID]['link']));

            /** 如果 後端 有該檔案才執行 */
            if (fs.existsSync(outputprojectpath + outputTemplatePath + outputFile.link)) {
                /** fs.readFile 會讀取檔案的 innerHTML */
                fs.readFile(outputprojectpath + outputTemplatePath + outputFile.link, 'utf8', async (error, data) => {
                    if (error) console.warn(error);

                    /**
                     *  取出目標 link 字串的 Regex
                     * */
                    const stylesheetRegex =
                        /<link.+?rel="stylesheet".+?href="(?:<\?= \$_webTemplateFrontFloder; \?>|assets\/css\/)[^"]*".+?\/>/gm;

                    /** 先修改 $ 的內容再 fs.writeFileSync，改寫整個回文件 */
                    /** 先做 link css 部分 */
                    /** 先抓出前端的新 Link */
                    const links = [];
                    $$('head > link[rel="stylesheet"][href*="assets/css/"]').each((i, e) => {
                        const src = $$(e).attr('href');
                        links.push(src);
                    });

                    /** 組合 Link 字串 */
                    const stylesheets = [...links]
                        .map(
                            (x, i, arr) =>
                                `<link rel="stylesheet" href="${outputAssetsPathPrefix}${x}" />${
                                    i !== arr.length - 1 ? '\n' : ''
                                }`
                        )
                        .join('');
                    const resultStyleSheetsHTML = await prettier.format(stylesheets, {
                        tabWidth: 4,
                        semi: true,
                        bracketSpacing: true,
                        printWidth: 200,
                        singleQuote: true,
                        trailingComma: 'none',
                        parser: 'html'
                    });

                    /**
                     *  取出目標 script 字串的 Regex
                     * */
                    const scriptRegex =
                        /<script[^>]*(type="module"[^>]*src="(?:<\?= \$_webTemplateFrontFloder; \?>|assets\/js\/)[^"]*"|src="(?:<?= \$_webTemplateFrontFloder; ?>|assets\/js\/)[^"]*"[^>]*type="module")[^>]*>[^>]*[<\/script>]/gm;

                    /** script js 部分 */
                    /** 先抓出前端的新 script */
                    const scripts = [];
                    $$('head > script[type="module"]').each((i, e) => {
                        const src = $$(e).attr('src');
                        scripts.push(src);
                    });

                    /** 組合 script 字串 */
                    const scriptText = [...scripts]
                        .map(
                            (x, i, arr) =>
                                `<script type="module" src="${outputAssetsPathPrefix}${x}"></script>${
                                    i !== arr.length - 1 ? '\n' : ''
                                }`
                        )
                        .join('');
                    const resultScriptHTML = await prettier.format(scriptText, {
                        tabWidth: 4,
                        semi: true,
                        bracketSpacing: true,
                        printWidth: 200,
                        singleQuote: true,
                        trailingComma: 'none',
                        parser: 'html'
                    });

                    /** rewrite 文件用 */
                    const headRegex = /<head[^>]*>([\s\S]*?)<\/head>/gi;
                    const stylesheetPlaceholder = `<!-- My Astro New StyleSheet::${timestamp} -->`;
                    const scriptPlaceholder = `<!-- My Astro New Script::${timestamp} -->`;
                    const result = data
                        .replace(stylesheetRegex, stylesheetPlaceholder)
                        .replace(stylesheetPlaceholder, resultStyleSheetsHTML)
                        .replaceAll(stylesheetPlaceholder, '')
                        .replace(scriptRegex, scriptPlaceholder)
                        .replace(scriptPlaceholder, resultScriptHTML)
                        .replaceAll(scriptPlaceholder, '')
                        .replace(headRegex, (matched) => {
                            return matched.replace(/^\s*\n/gm, '');
                        });

                    let resultHTML = result;
                    if (beautyHtml) {
                        resultHTML = await prettier.format(result, {
                            tabWidth: 4,
                            semi: true,
                            bracketSpacing: true,
                            printWidth: 200,
                            singleQuote: true,
                            trailingComma: 'none',
                            parser: 'html'
                        });
                    }
                    fs.writeFileSync(outputprojectpath + outputTemplatePath + outputFile.link, resultHTML, { encoding: 'utf8' });
                });
            } else {
                /** 如果 後端 自己沒有這個檔案會跳提示 */
                console.log(
                    '\x1b[31m%s\x1b[0m',
                    `「後端」此檔案不存在："${outputprojectpath + outputTemplatePath + outputFile.link}"`
                );
            }
        } else {
            /** 如果 前端 自己沒有這個檔案會跳提示 */
            console.log('\x1b[31m%s\x1b[0m', `此對應的「前端」檔案不存在："${INPUT_FILE_PATH + inputFiles[inputID]['link']}"`);
        }
    });
};

/** 複製 靜態檔案 */
export const copyAssets = (
    { outputprojectpath, outputPublicPath, publicFolderBackUp, publicFolderDelete } = {
        outputprojectpath: OUTPUT_PROJECT_PATH,
        outputPublicPath: OUTPUT_PUBLIC_PATH,
        publicFolderBackUp: PUBLIC_FOLDER_BACKUP,
        publicFolderDelete: PUBLIC_FOLDER_DELETE
    }
) => {
    PUBLIC_FOLDERS_TYPE.forEach(async (folder) => {
        const inputPATH = INPUT_FILE_PATH + folder;
        const outputPATH = outputprojectpath + outputPublicPath + folder;

        if (fs.existsSync(outputprojectpath + outputPublicPath)) {
            if (fs.existsSync(inputPATH)) {
                if (publicFolderBackUp && fs.existsSync(outputPATH)) {
                    const backupFolder = outputprojectpath + outputPublicPath + `/bk-${timestamp}`;
                    if (!fs.existsSync(backupFolder)) {
                        fs.mkdirSync(backupFolder, { recursive: true, force: true });
                    }
                    await fs_extra.copySync(outputPATH, backupFolder + folder);
                    console.log(`備份 "\x1b[32m%s\x1b[0m" 到 "\x1b[32m%s\x1b[0m" 成功!`, outputPATH, backupFolder);
                }

                if (!fs.existsSync(outputPATH)) {
                    fs.mkdirSync(outputPATH, { recursive: true, force: true });
                } else {
                    if (publicFolderDelete) {
                        await fs_extra.removeSync(outputPATH);
                        console.log(`刪除 "\x1b[33m%s\x1b[0m" 成功!`, outputPATH);
                    }
                }

                await fs_extra.copySync(inputPATH, outputPATH);
                console.log(`複製 "\x1b[32m%s\x1b[0m" 到 "\x1b[32m%s\x1b[0m" 成功!`, inputPATH, outputPATH);
            } else {
                console.log('\x1b[31m%s\x1b[0m', `「前端專案」Public 資料夾不存在："${inputPATH}"`);
            }
        } else {
            console.log('\x1b[31m%s\x1b[0m', `此「後端專案」Public 資料夾不存在："${outputprojectpath + outputPublicPath}"`);
        }
    });
};
