/**
 * Select Placeholder 顏色管理
 *
 * 處理原生 select 元素的 placeholder 顏色顯示
 * 由於原生 select 的 placeholder option 顏色難以透過 CSS 控制，
 * 使用 JavaScript 動態管理顏色狀態
 *
 * @author Asus Team
 * @version 1.0.0
 */

export {}; // 使文件成為模塊

interface PlaceholderStateDetail {
    selectId: string;
    hasValue: boolean;
    value: string;
    isPlaceholder: boolean;
}

interface PlaceholderState {
    hasValue: boolean;
    isPlaceholder: boolean;
    value: string;
    classList: string[];
}

/**
 * CSS 類別定義
 */
const CSS_CLASSES = {
    PLACEHOLDER: 'has-placeholder',
    VALUE_SELECTED: 'has-value'
} as const;

interface SelectPlaceholderAPI {
    init: () => void;
    reinitialize: (selector: string | HTMLSelectElement) => void;
    getState: (selector: string | HTMLSelectElement) => PlaceholderState | null;
    CSS_CLASSES: typeof CSS_CLASSES;
}

(function (): void {
    'use strict';

    let initialized: boolean = false;


    /**
     * 設定單個 select 元素的 placeholder 顏色管理
     * @param select - select 元素
     */
    function setupSelectPlaceholder(select: HTMLSelectElement): void {
        if (!select || select.dataset.placeholderInitialized) return;

        // 標記已初始化，避免重複綁定
        select.dataset.placeholderInitialized = 'true';

        /**
         * 更新 select 的顏色狀態
         */
        function updatePlaceholderState(): void {
            const selectedValue: string = select.value;
            const hasValue: boolean = Boolean(selectedValue && selectedValue !== '');

            // 移除所有狀態類別
            select.classList.remove(CSS_CLASSES.PLACEHOLDER, CSS_CLASSES.VALUE_SELECTED);

            // 根據是否有值添加對應類別
            if (hasValue) {
                select.classList.add(CSS_CLASSES.VALUE_SELECTED);
            } else {
                select.classList.add(CSS_CLASSES.PLACEHOLDER);
            }

            // 觸發自定義事件
            const event = new CustomEvent<PlaceholderStateDetail>('placeholderStateChanged', {
                detail: {
                    selectId: select.id,
                    hasValue: hasValue,
                    value: selectedValue,
                    isPlaceholder: !hasValue
                },
                bubbles: true
            });
            select.dispatchEvent(event);
        }

        /**
         * 處理 select 值改變事件
         */
        function handleChange(): void {
            updatePlaceholderState();
        }

        /**
         * 處理 select 獲得焦點事件
         */
        function handleFocus(): void {
            // 焦點時可以添加特殊樣式
            select.classList.add('is-focused');
        }

        /**
         * 處理 select 失去焦點事件
         */
        function handleBlur(): void {
            select.classList.remove('is-focused');
            updatePlaceholderState();
        }

        // 綁定事件
        select.addEventListener('change', handleChange);
        select.addEventListener('input', handleChange);
        select.addEventListener('focus', handleFocus);
        select.addEventListener('blur', handleBlur);

        // 初始化狀態
        updatePlaceholderState();

        console.log(`Select placeholder initialized for: ${select.id || 'unnamed select'}`);
    }

    /**
     * 初始化所有 select 元素的 placeholder 管理
     */
    function initSelectPlaceholders(): void {
        if (initialized) return;

        const selects = document.querySelectorAll<HTMLSelectElement>('select.control-select');
        selects.forEach((select) => setupSelectPlaceholder(select));

        initialized = true;
        console.log(`Initialized ${selects.length} select elements for placeholder management`);
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
                            setupSelectPlaceholder(element as HTMLSelectElement);
                        }

                        // 檢查新增節點的子元素中是否有 select
                        const childSelects = element.querySelectorAll && element.querySelectorAll<HTMLSelectElement>('select.control-select');
                        if (childSelects) {
                            childSelects.forEach((select) => setupSelectPlaceholder(select));
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
            delete select.dataset.placeholderInitialized;
            setupSelectPlaceholder(select);
        }
    }

    /**
     * 獲取 select 的當前 placeholder 狀態
     * @param selector - CSS 選擇器或 DOM 元素
     * @returns 狀態物件或 null
     */
    function getPlaceholderState(selector: string | HTMLSelectElement): PlaceholderState | null {
        const select = typeof selector === 'string' ? document.querySelector<HTMLSelectElement>(selector) : selector;

        if (!select || select.tagName !== 'SELECT') return null;

        const hasValue: boolean = Boolean(select.value && select.value !== '');

        return {
            hasValue: hasValue,
            isPlaceholder: !hasValue,
            value: select.value,
            classList: Array.prototype.slice.call(select.classList)
        };
    }

    // 全域 API
    (window as any).SelectPlaceholder = {
        init: initSelectPlaceholders,
        reinitialize: reinitializeSelect,
        getState: getPlaceholderState,
        CSS_CLASSES: CSS_CLASSES
    };

    // 初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initSelectPlaceholders();
            observeNewSelects();
        });
    } else {
        initSelectPlaceholders();
        observeNewSelects();
    }
})();
