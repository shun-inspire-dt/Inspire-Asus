/**
 * 為指定元素纁定「回到頁首」點擊事件
 *
 * @param selector - 目標按鈕的 DOM 元素或 CSS 選擇器字串
 * @param option - `window.scrollTo` 的捲動選項，預設平滞回到頂部
 *
 * @example
 * GoTop('#backToTop');
 * GoTop(document.getElementById('btn'), { top: 0, behavior: 'auto' });
 */
export const GoTop = (selector: HTMLElement | string, option: ScrollToOptions = { top: 0, behavior: 'smooth' }) => {
    const hook = typeof selector === 'string' ? (document.querySelector(selector) as HTMLElement) : (selector as HTMLElement);
    hook?.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo(option);
    });
};