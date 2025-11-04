import path from 'node:path';
import fs from 'node:fs';

/** 時間搓 */
const date = new Date();
export const timestamp = `${date.getFullYear()}-${
    date.getMonth() + 1
}-${date.getDate()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
/** Linux Root Private Path */
export const HOME = path.join(process.env.HOME, '../../private');
export const PUBLIC_FOLDERS_TYPE = ['/assets', '/chunks', '/js', '/_astro'];

/** 前端配置 */
/** 前端絕對路徑，process.cwd() 會等於此地的絕對路徑 */
export const INPUT_FILE_PATH = path.join(process.cwd(), './file/input');

/** 後端配置 */
/** 專案的絕對位置 */
export const OUTPUT_PROJECT_PATH = '/var/www/html/metamatch-backend';
/** 專案 html 的絕對位置 */
export const OUTPUT_TEMPLATE_PATH = '/app/views/web/custom';
/** 專案 public 的絕對位置 */
export const OUTPUT_PUBLIC_PATH = '/public/templates/custom';
/** html script src 路徑的 php 變數前綴 */
export const OUTPUT_PUBLIC_PATH_PREFIX = '<?= $_webTemplateFrontFloder; ?>';
/** 是否在後端專案位置對舊檔案進行拷貝 */
export const PUBLIC_FOLDER_BACKUP = true;
/** 是否先刪除檔案在覆蓋(true)，或是直接覆蓋(false) */
export const PUBLIC_FOLDER_DELETE = false;
/** 拷貝過去的整個 html 是否美化格式 */
export const BEAUTY_HTML = false;

/**
 * 為後端(對象)的 html
 * @param id 為對應 前端檔案 的 id
 * 由於前端單頁可能在後端是多頁，取決於後端設計，所以以ID作為標準
 * 即只要標示後端頁面是配哪一個前端頁面即可。
 * inputFiles 會附上說明。
 * */
export const outputFiles = [
    { id: '1', link: '/search/normal.html' },
    { id: '2', link: '/products/category.html' },
    { id: '3', link: '/news/list.html' },
    { id: '4', link: '/store/list.html' },
    { id: '5', link: '/inquiry/list.html' },
    { id: '6', link: '/index/index.html' },
    { id: '7', link: '/faq/list.html' },
    { id: '8', link: '/contactus/form.html' },
    { id: '9', link: '/aboutus/form.html' },
    { id: '12', link: '/products/detail.html' },
    { id: '13', link: '/news/form.html' },
    { id: '14', link: '/member/setPassword.html' },
    { id: '14', link: '/member/registerComplete.html' },
    { id: '16', link: '/member/register.html' },
    { id: '16', link: '/member/register-step2.html' },
    { id: '17', link: '/member/profile.html' },
    { id: '18', link: '/member/login.html' },
    { id: '19', link: '/member/inquiry.html' },
    { id: '21', link: '/member/favorite.html' },
    { id: '22', link: '/store/form.html' }
];

/** 為前端的 html */
export const inputFiles = [
    { id: '1', link: '/search.html' },
    { id: '2', link: '/products.html' },
    { id: '3', link: '/news.html' },
    { id: '4', link: '/isv.html' },
    { id: '5', link: '/inquiry.html' },
    { id: '6', link: '/index.html' },
    { id: '7', link: '/faqs.html' },
    { id: '8', link: '/contactus.html' },
    { id: '9', link: '/aboutus.html' },
    { id: '11', link: '/search/products.html' },
    { id: '12', link: '/product/1.html' },
    { id: '13', link: '/news/1.html' },
    { id: '14', link: '/member/updatePassword.html' },
    { id: '15', link: '/member/setPassword.html' },
    { id: '16', link: '/member/register.html' },
    { id: '17', link: '/member/portfolio.html' },
    { id: '18', link: '/member/login.html' },
    { id: '19', link: '/member/inquiry.html' },
    { id: '20', link: '/member/forgetPassword.html' },
    { id: '21', link: '/member/favorite.html' },
    { id: '22', link: '/isv/1.html' },
    { id: '23', link: '/aboutus/stories.html' },
    { id: '24', link: '/aboutus/franchise.html' }
];

/** ---------------------------- */
/** 窗口CLI */
export const questions = [
    {
        type: 'toggle',
        name: 'execute',
        message: '是否直接執行複製？',
        initial: true,
        active: 'yes',
        inactive: 'no'
    },
    {
        type: 'toggle',
        name: 'backup',
        message: '是否拷貝原專案(後端)的檔案？',
        initial: PUBLIC_FOLDER_BACKUP,
        active: 'yes',
        inactive: 'no'
    },
    {
        type: 'toggle',
        name: 'Delete',
        message: '是否刪除檔案在覆蓋(yes)，或是直接覆蓋(no)？',
        initial: PUBLIC_FOLDER_DELETE,
        active: 'yes',
        inactive: 'no'
    },
    {
        type: 'toggle',
        name: 'beauty',
        message: '是否美化 HTML 檔案？',
        initial: BEAUTY_HTML,
        active: 'yes',
        inactive: 'no'
    },
    {
        type: 'text',
        name: 'filePath',
        message: `專案路徑為？(Tab)`,
        initial: OUTPUT_PROJECT_PATH,
        validate: (value) => (!fs.existsSync(value) ? '路徑不存在' : true)
    },
    {
        type: 'text',
        name: 'publicPath',
        message: `靜態檔檔案路徑為？(Tab)`,
        initial: OUTPUT_PUBLIC_PATH
    },
    {
        type: 'text',
        name: 'htmlPath',
        message: `HTML檔案路徑為？(Tab)`,
        initial: OUTPUT_TEMPLATE_PATH
    },
    {
        type: 'text',
        name: 'prefix',
        message: `src 載入腳本 php 路徑變數？(Tab)`,
        initial: OUTPUT_PUBLIC_PATH_PREFIX
    },
    {
        type: 'toggle',
        name: 'save',
        message: '是否儲存以上設定，以便下次直接執行？',
        initial: true,
        active: 'yes',
        inactive: 'no'
    }
];

export const overWriteRegex = {
    filePath: { key: 'OUTPUT_PROJECT_PATH', regex: /export\s+const\s+OUTPUT\_PROJECT\_PATH\s+=(.+?)\;/gis },
    htmlPath: { key: 'OUTPUT_TEMPLATE_PATH', regex: /export\s+const\s+OUTPUT\_TEMPLATE\_PATH\s+=(.+?)\;/gis },
    publicPath: { key: 'OUTPUT_PUBLIC_PATH', regex: /export\s+const\s+OUTPUT\_PUBLIC\_PATH\s+=(.+?)\;/gis },
    prefix: {
        key: 'OUTPUT_PUBLIC_PATH_PREFIX',
        regex: /export\s+const\s+OUTPUT\_PUBLIC\_PATH\_PREFIX\s+=.+?['"]<\?[=php\s+](.+?) \?>['"]\;/gis
    },
    backup: { key: 'PUBLIC_FOLDER_BACKUP', regex: /export\s+const\s+PUBLIC\_FOLDER\_BACKUP\s+=(.+?)\;/gis },
    Delete: { key: 'PUBLIC_FOLDER_DELETE', regex: /export\s+const\s+PUBLIC\_FOLDER\_DELETE\s+=(.+?)\;/gis },
    beauty: { key: 'BEAUTY_HTML', regex: /export\s+const\s+BEAUTY\_HTML\s+=(.+?)\;/gis }
};
