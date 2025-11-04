/** 模擬 Common JS 的 require */
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
/** 讀、寫 檔案所用 */
import fs from 'node:fs';
import path from 'node:path';
/** 對話框 CLI */
const prompts = require('/usr/local/lib/node_modules/prompts');
/** Self Config and Function */
import { questions, overWriteRegex } from './config.mjs';
import { coverSchema, copyAssets } from './helpers.mjs';

(async () => {
    const onSubmit = async ( p, execute ) =>
    {
        if (execute) {
            console.log('直接執行吧！');
            coverSchema();
            copyAssets();
        }
        if (!execute) {
            const restQuestions = questions.slice(1);
            const answers = await prompts(restQuestions);
            const { backup, Delete, filePath, htmlPath, publicPath, prefix, beauty, save } = answers;
            if (Object.keys(answers).length === restQuestions.length) {
                if (save) {
                    try {
                        const Path = path.join(process.cwd(), './config.mjs');
                        fs.readFile(Path, 'utf8', async (error, data) => {
                            if (error) {
                                console.error(error);
                                return;
                            }
    
                            const matched = (key) => [...data.matchAll(overWriteRegex[key]['regex'])][0][0];
                            const text = (key) => {
                                const newText = typeof answers[key] == 'boolean' ? answers[key] : `'${answers[key]}'`;
                                return `export const ${overWriteRegex[key]['key']} = ${newText};`;
                            };
    
                            const result = data
                                .replace(matched('backup'), text('backup'))
                                .replace(matched('Delete'), text('Delete'))
                                .replace(matched('beauty'), text('beauty'))
                                .replace(matched('filePath'), text('filePath'))
                                .replace(matched('htmlPath'), text('htmlPath'))
                                .replace(matched('publicPath'), text('publicPath'))
                                .replace(matched('prefix'), text('prefix'));
    
                            await fs.writeFileSync(Path, result, { encoding: 'utf8' });
                            setTimeout(() => {
                                coverSchema({
                                    outputprojectpath: filePath,
                                    outputTemplatePath: htmlPath,
                                    outputAssetsPathPrefix: prefix,
                                    beautyHtml: beauty
                                });
                                copyAssets({
                                    outputprojectpath: filePath,
                                    outputPublicPath: publicPath,
                                    publicFolderBackUp: backup,
                                    publicFolderDelete: Delete
                                });
                            }, 1000);
                        });
                    } catch (error) {
                        console.error(error);
                    }
                } else {
                    coverSchema({
                        outputprojectpath: filePath,
                        outputTemplatePath: htmlPath,
                        outputAssetsPathPrefix: prefix,
                        beautyHtml: beauty
                    });
                    copyAssets({
                        outputprojectpath: filePath,
                        outputPublicPath: publicPath,
                        publicFolderBackUp: backup,
                        publicFolderDelete: Delete
                    });
                }
            }
        }  
    };
    const answers = await prompts(questions.slice(0, 1), { onSubmit });
})();
