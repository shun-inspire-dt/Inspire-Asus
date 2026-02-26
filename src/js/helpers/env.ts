/**
 * 根據 Astro 的 `BASE_URL` 環境變數推斷目前的編譯環境
 *
 * - `BASE_URL === '/./'` 表示為靜態產出（GitLab Pages / 本地雜項檔）模式
 * - 其他情況為主機/Netlify 部署模式，路由不需要導入 `.html` 後綴
 */

/**
 * 靜態產出模式下頁面檔名後綴（例如 `.html`），主機模式下為空字串
 */
const ext = import.meta.env.BASE_URL === '/./' ? '.html' : '';

/**
 * 靜態產出模式下首頁檔名（`index`），主機模式下為空字串
 */
const index = import.meta.env.BASE_URL === '/./' ? 'index' : '';

export { ext, index };
