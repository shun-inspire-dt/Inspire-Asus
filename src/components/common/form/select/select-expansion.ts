/**
 * Select 展開狀態管理
 *
 * 監聽 select 元素的 focus/blur 事件來切換箭頭方向
 * 由於原生 select 沒有展開狀態的 CSS 偽類，需要用 JavaScript 模擬
 *
 * @author Asus Team
 * @version 1.0.0
 */

export {}; // 使文件成為模塊

interface ExpansionEventDetail {
    selectId: string;
    expanded: boolean;
}

interface ExpansionState {
    isExpanded: boolean;
    isFocused: boolean;
    classList: string[];
}

/**
 * CSS 類別定義
 */
const EXPANSION_CSS_CLASSES = {
    EXPANDED: 'is-expanded',
    FOCUSED: 'is-focused'
} as const;

interface SelectExpansionAPI {
    init: () => void;
    reinitialize: (selector: string | HTMLSelectElement) => void;
    getState: (selector: string | HTMLSelectElement) => ExpansionState | null;
    toggle: (selector: string | HTMLSelectElement, forceState?: boolean) => void;
    CSS_CLASSES: typeof EXPANSION_CSS_CLASSES;
}

(function (): void {
    'use strict';

    let initialized: boolean = false;

    /**
     * 設定單個 select 元素的展開狀態切換
     * @param select - select 元素
     */
    function setupSelectExpansion(select: HTMLSelectElement): void {
        if (!select || select.dataset.selectInitialized) return;

        // 標記已初始化，避免重複綁定
        select.dataset.selectInitialized = 'true';

        /**
         * 處理 select 獲得焦點時的展開狀態
         */
        function handleFocus(): void {
            select.classList.add(EXPANSION_CSS_CLASSES.EXPANDED);
            select.classList.add(EXPANSION_CSS_CLASSES.FOCUSED);

            // 觸發自定義事件
            const event = new CustomEvent<ExpansionEventDetail>('selectExpanded', {
                detail: { selectId: select.id, expanded: true },
                bubbles: true
            });
            select.dispatchEvent(event);
        }

        /**
         * 處理 select 失去焦點時的收合狀態
         */
        function handleBlur(): void {
            select.classList.remove(EXPANSION_CSS_CLASSES.EXPANDED);
            select.classList.remove(EXPANSION_CSS_CLASSES.FOCUSED);

            // 觸發自定義事件
            const event = new CustomEvent<ExpansionEventDetail>('selectCollapsed', {
                detail: { selectId: select.id, expanded: false },
                bubbles: true
            });
            select.dispatchEvent(event);
        }

        /**
         * 處理鍵盤事件（Space 或 Enter 鍵展開）
         */
        function handleKeydown(e: KeyboardEvent): void {
            if (e.key === ' ' || e.key === 'Enter') {
                if (!select.classList.contains(EXPANSION_CSS_CLASSES.EXPANDED)) {
                    select.classList.add(EXPANSION_CSS_CLASSES.EXPANDED);
                }
            }

            if (e.key === 'Escape') {
                select.blur();
            }
        }

        // 綁定事件
        select.addEventListener('focus', handleFocus);
        select.addEventListener('blur', handleBlur);
        select.addEventListener('keydown', handleKeydown);

        // 處理 change 事件（選擇完成後收合）
        select.addEventListener('change', () => {
            setTimeout(() => {
                select.classList.remove(EXPANSION_CSS_CLASSES.EXPANDED);
            }, 100);
        });
    }

    /**
     * 初始化所有 select 元素的展開狀態管理
     */
    function initSelectExpansion(): void {
        if (initialized) return;

        const selects = document.querySelectorAll<HTMLSelectElement>('select.control-select');
        selects.forEach((select) => setupSelectExpansion(select));

        initialized = true;
    }

    /**
     * 監聽動態新增的 select 元素
     */
    function observeNewSelects(): void {
        const observer = new MutationObserver((mutations: MutationRecord[]) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const element = node as Element;

                        // 檢查新增的節點是否為 select
                        if (element.matches && element.matches('select.control-select')) {
                            setupSelectExpansion(element as HTMLSelectElement);
                        }

                        // 檢查新增節點的子元素中是否有 select
                        const childSelects = element.querySelectorAll && element.querySelectorAll<HTMLSelectElement>('select.control-select');
                        if (childSelects) {
                            childSelects.forEach((select) => setupSelectExpansion(select));
                        }
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    /**
     * 手動重新初始化指定的 select 元素
     * @param selector - CSS 選擇器或 DOM 元素
     */
    function reinitializeSelect(selector: string | HTMLSelectElement): void {
        const select = typeof selector === 'string' ? document.querySelector<HTMLSelectElement>(selector) : selector;

        if (select && select.tagName === 'SELECT') {
            // 重置初始化標記
            delete select.dataset.selectInitialized;
            setupSelectExpansion(select);
        }
    }

    /**
     * 獲取 select 的當前展開狀態
     * @param selector - CSS 選擇器或 DOM 元素
     * @returns 狀態物件或 null
     */
    function getExpansionState(selector: string | HTMLSelectElement): ExpansionState | null {
        const select = typeof selector === 'string' ? document.querySelector<HTMLSelectElement>(selector) : selector;

        if (!select || select.tagName !== 'SELECT') return null;

        const isExpanded: boolean = select.classList.contains(EXPANSION_CSS_CLASSES.EXPANDED);
        const isFocused: boolean = select.classList.contains(EXPANSION_CSS_CLASSES.FOCUSED);

        return {
            isExpanded: isExpanded,
            isFocused: isFocused,
            classList: Array.prototype.slice.call(select.classList)
        };
    }

    /**
     * 手動切換 select 的展開狀態
     * @param selector - CSS 選擇器或 DOM 元素
     * @param forceState - 強制設定狀態（true=展開, false=收合）
     */
    function toggleExpansion(selector: string | HTMLSelectElement, forceState?: boolean): void {
        const select = typeof selector === 'string' ? document.querySelector<HTMLSelectElement>(selector) : selector;

        if (!select || select.tagName !== 'SELECT') return;

        const isCurrentlyExpanded: boolean = select.classList.contains(EXPANSION_CSS_CLASSES.EXPANDED);
        const shouldExpand: boolean = forceState !== undefined ? forceState : !isCurrentlyExpanded;

        if (shouldExpand) {
            select.classList.add(EXPANSION_CSS_CLASSES.EXPANDED);
            select.focus();
        } else {
            select.classList.remove(EXPANSION_CSS_CLASSES.EXPANDED);
            select.blur();
        }
    }

    // 全域 API
    (window as any).SelectExpansion = {
        init: initSelectExpansion,
        reinitialize: reinitializeSelect,
        getState: getExpansionState,
        toggle: toggleExpansion,
        CSS_CLASSES: EXPANSION_CSS_CLASSES
    };

    // 初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initSelectExpansion();
            observeNewSelects();
        });
    } else {
        initSelectExpansion();
        observeNewSelects();
    }
})();
