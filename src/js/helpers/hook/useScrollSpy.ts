/**
 * ScrollSpy 配置選項
 */
export type options = {
    /** 預設目標元素，當按鈕沒有指定目標時使用 */
    Element?: HTMLElement;
    /** 滾動位置的比例係數，預設為 1 */
    offsetRatio?: number;
    /** 全域偏移量，可以是數字、HTMLElement 或 CSS selector */
    offset?: number | HTMLElement;
    /** 是否包含 header 高度在偏移計算中 */
    includeHeaderHeight?: boolean;
    /** active 狀態的 CSS 類別名稱，預設為 'active' */
    activeClass?: string;
    /** 元素可見度閾值 (0-1)，預設為 0.3 (30%) */
    threshold?: number;
};
/**
 * 共用的 offset 計算函數
 * 支援多種類型的 offset 值並統一轉換為數字
 * 
 * @param offsetValue - 偏移值，支援以下類型：
 *   - number: 直接返回數值
 *   - HTMLElement: 返回元素的 offsetHeight
 *   - string: 可以是數字字串或 CSS selector
 * @returns 計算後的偏移量（像素）
 */
const calculateOffset = (offsetValue?: string | number | HTMLElement): number => {
    // 空值處理
    if (!offsetValue) return 0;

    // 數字類型：直接返回
    if (typeof offsetValue === 'number') {
        return offsetValue;
    }

    // HTMLElement 類型：返回元素高度
    if (offsetValue instanceof HTMLElement) {
        return offsetValue.offsetHeight;
    }

    // 字串類型處理
    if (typeof offsetValue === 'string') {
        // 嘗試解析為數字
        const numValue = parseInt(offsetValue);
        if (!isNaN(numValue)) {
            return numValue;
        }

        // 嘗試作為 CSS selector 查詢元素並取得高度
        const element = document.querySelector(offsetValue) as HTMLElement;
        return element?.offsetHeight || 0;
    }

    // 預設返回 0
    return 0;
};

/**
 * ScrollSpy 主函數
 * 提供滾動監聽和自動導航功能
 * 
 * @param options - 配置選項
 * @returns ScrollSpy 實例，包含 trigger、scroll、spy 方法
 */
export const useScrollSpy = (options?: options) => {
    const scrollSpyInstance = {
        /**
         * 初始化點擊事件監聽器
         * 為所有帶有 [data-spy] 屬性的元素添加點擊滾動功能
         */
        trigger() {
            const buttons = document.querySelectorAll('[data-spy]');
            [...buttons].forEach((button) => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    // 取得目標元素的 selector（優先使用 href，其次 data-target）
                    const target = (button.getAttribute('href') as string) || (button.getAttribute('data-target') as string);
                    
                    // 防呆：檢查是否有有效的 target selector
                    if (!target) {
                        console.warn('ScrollSpy: 按鈕缺少 href 或 data-target 屬性', button);
                        return;
                    }
                    
                    const targetElement = document.querySelector(target) as HTMLElement;
                    
                    // 防呆：檢查目標元素是否存在
                    if (!targetElement) {
                        console.warn(`ScrollSpy: 找不到目標元素 "${target}"`, button);
                        return;
                    }
                    
                    // 取得按鈕的 offset 設定
                    const offsetString = button.getAttribute('data-offset') as string;
                    
                    // 取得滾動行為設定（預設為平滑滾動）
                    const smoothScroll = button.getAttribute('data-smooth-scroll') !== 'false';
                    
                    // 計算 offset 並執行滾動
                    const offset = calculateOffset(offsetString);
                    scrollSpyInstance.scroll(targetElement, offset, smoothScroll);
                });
            });
        },
        /**
         * 滾動到指定元素
         * 
         * @param target - 目標元素
         * @param offset - 額外的偏移量
         * @param smoothScroll - 是否使用平滑滾動，預設為 true
         */
        scroll(target?: HTMLElement, offset: number = 0, smoothScroll: boolean = true): void {
            const { offsetRatio = 1, Element, includeHeaderHeight = false, offset: optionsOffset } = options as options;
            
            // 計算 header 高度（如果啟用）
            const headerHeight = includeHeaderHeight
                ? (() => {
                      const header = document.querySelector('header') as HTMLElement;
                      return header.offsetHeight || 0;
                  })()
                : 0;

            // 處理 options 中的全域 offset
            const calculatedOptionsOffset = calculateOffset(optionsOffset);

            // 確定目標元素（優先使用參數，其次使用 options 中的預設元素）
            const element = (target as HTMLElement) || (Element as HTMLElement);
            
            // 防呆：檢查是否有有效的目標元素
            if (!element) {
                console.warn('ScrollSpy: 沒有指定有效的目標元素');
                return;
            }
            
            // 計算元素在文檔中的位置
            const top =
                element?.offsetTop || element?.getBoundingClientRect()?.top - document.body.getBoundingClientRect().top || 0;
            
            // 決定滾動行為
            const scrollBehavior = smoothScroll ? 'smooth' : 'auto';
            
            // 執行滾動：目標位置 = 元素位置 * 比例 - header高度 - 參數offset - 全域offset
            if (top)
                window.scrollTo({
                    top: top * offsetRatio - headerHeight - offset - calculatedOptionsOffset,
                    behavior: scrollBehavior
                });
        },
        /**
         * 啟動 ScrollSpy 監聽功能
         * 監聽頁面滾動和視窗大小改變，自動更新導航按鈕的 active 狀態
         * 
         * @returns 清理函數，用於移除事件監聽器
         */
        spy(): () => void {
            const { activeClass = 'active', threshold = 0, includeHeaderHeight = false } = options as options;
            const buttons = document.querySelectorAll('[data-spy]');

            // 取得所有目標元素和其配置（不預先計算 offset，因為可能會因 resize 而改變）
            const targets = Array.from(buttons)
                .map((button) => {
                    const target = button.getAttribute('href') || button.getAttribute('data-target');
                    const targetElement = target ? (document.querySelector(target) as HTMLElement) : null;
                    const offsetString = button.getAttribute('data-offset') as string;

                    return { button, targetElement, target, offsetString };
                })
                .filter((item) => item.targetElement !== null) as Array<{
                button: Element;
                targetElement: HTMLElement;
                target: string;
                offsetString: string;
            }>;

            /**
             * 更新所有按鈕的 active 狀態
             * 根據元素在視窗中的可見度來決定哪個按鈕應該是 active
             */
            const updateActiveStates = () => {
                // === 第一步：計算所有動態 offset 值 ===
                
                // 計算 header 高度（響應式設計可能改變）
                const headerHeight = includeHeaderHeight
                    ? (() => {
                          const header = document.querySelector('header') as HTMLElement;
                          return header.offsetHeight || 0;
                      })()
                    : 0;

                // 計算全域 offset（元素大小可能因 resize 改變）
                const { offset: optionsOffset } = options as options;
                const calculatedOptionsOffset = calculateOffset(optionsOffset);
                
                // 取得當前滾動位置和視窗大小
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const windowHeight = window.innerHeight;

                // === 第二步：找出可見度最高的元素 ===
                let activeTarget: Element | null = null;
                let maxVisibility = 0;

                targets.forEach(({ button, targetElement, offsetString }) => {
                    // 每次檢查時重新計算 button 的 offset（可能因 resize 改變）
                    const buttonOffset = calculateOffset(offsetString);
                    
                    // 取得元素的位置和大小資訊
                    const rect = targetElement.getBoundingClientRect();
                    const elementTop = rect.top + scrollTop;
                    const elementBottom = elementTop + rect.height;

                    // 計算總 offset（header + 全域 + 按鈕）
                    const totalOffset = headerHeight + calculatedOptionsOffset + buttonOffset;

                    // === 第三步：計算可見度 ===
                    
                    // 定義有效視窗範圍（考慮所有 offset）
                    const viewportTop = scrollTop + totalOffset;
                    const viewportBottom = scrollTop + windowHeight;

                    // 計算元素與視窗的交集
                    const visibleTop = Math.max(elementTop, viewportTop);      // 可見區域頂部
                    const visibleBottom = Math.min(elementBottom, viewportBottom); // 可見區域底部
                    const visibleHeight = Math.max(0, visibleBottom - visibleTop); // 可見高度
                    
                    // 計算可見度百分比 (0.0 - 1.0)
                    const visibility = visibleHeight / rect.height;

                    // === 第四步：判斷是否符合 active 條件 ===
                    
                    // 條件：可見度 >= 閾值 且 是目前最高可見度
                    if (visibility >= threshold && visibility > maxVisibility) {
                        maxVisibility = visibility;
                        activeTarget = button;
                    }
                });

                // === 第五步：更新所有按鈕的 active 狀態 ===
                targets.forEach(({ button }) => {
                    if (button === activeTarget) {
                        button.classList.add(activeClass);
                    } else {
                        button.classList.remove(activeClass);
                    }
                });
            };

            /**
             * 節流函數
             * 使用 requestAnimationFrame 來限制更新頻率，提升效能
             */
            let ticking = false;
            const throttledUpdate = () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        updateActiveStates();
                        ticking = false;
                    });
                    ticking = true;
                }
            };

            // === 事件監聽器設置 ===
            
            // 監聽滾動事件：當使用者滾動頁面時更新 active 狀態
            window.addEventListener('scroll', throttledUpdate, { passive: true });
            
            // 監聽視窗大小改變事件：響應式設計可能改變元素大小和位置
            window.addEventListener('resize', throttledUpdate, { passive: true });

            // 初始化：頁面載入時執行一次，設定初始的 active 狀態
            updateActiveStates();

            /**
             * 返回清理函數
             * 用於移除事件監聽器，防止記憶體洩漏
             */
            return () => {
                window.removeEventListener('scroll', throttledUpdate);
                window.removeEventListener('resize', throttledUpdate);
            };
        }
    };

    return scrollSpyInstance;
};

