/**
 * CheckboxGroup 雙向同步邏輯
 * 提供主 checkbox 與子 checkbox 之間的雙向同步功能
 */

/**
 * CheckboxGroup 配置選項
 */
export type CheckboxGroupOptions = {
    /** 是否自動初始化，預設為 true */
    autoInit?: boolean;
    /** 要處理的 input 類型，預設為 ['checkbox', 'radio'] */
    inputTypes?: ('checkbox' | 'radio')[];
};

/**
 * CheckboxGroup Hook
 * 為頁面上的所有 checkbox group 提供雙向同步功能
 * 
 * @param options - 配置選項
 * @returns 包含初始化和清理方法的物件
 */
export const useCheckboxGroup = (options: CheckboxGroupOptions = {}) => {
    const { autoInit = true, inputTypes = ['checkbox', 'radio'] } = options;
    
    /**
     * 初始化 CheckboxGroup 功能
     */
    const init = () => {
        // 處理頁面上所有的 checkbox group
        const checkboxGroups = document.querySelectorAll('[data-checkbox-group]');

        checkboxGroups.forEach((group) => {
            inputTypes.forEach((type) => {
                // 在當前 group 內尋找主 checkbox
                const mainCheckbox = group.querySelector(`input[type=${type}][data-checkbox-main]`) as HTMLInputElement;

                if (!mainCheckbox) return;

                const getChildCheckboxes = () => 
                    group.querySelectorAll(`input[type=${type}]:not([data-checkbox-main])`) as NodeListOf<HTMLInputElement>;

                /**
                 * 更新主 checkbox 狀態
                 * 根據子 checkbox 的選中狀態來決定主 checkbox 的狀態
                 */
                const updateMainCheckboxState = () => {
                    const children = getChildCheckboxes();
                    const checkedChildren = Array.from(children).filter((child) => child.checked);
                    const totalChildren = children.length;

                    if (totalChildren === 0) return;

                    const mainCheckboxContainer = mainCheckbox.closest('.form-check');

                    if (checkedChildren.length === 0) {
                        // 沒有子項被選中：未勾選狀態
                        mainCheckbox.checked = false;
                        mainCheckbox.indeterminate = false;
                        mainCheckboxContainer?.removeAttribute('data-indeterminate');
                    } else if (checkedChildren.length === totalChildren) {
                        // 所有子項都被選中：全選狀態
                        mainCheckbox.checked = true;
                        mainCheckbox.indeterminate = false;
                        mainCheckboxContainer?.removeAttribute('data-indeterminate');
                    } else {
                        // 部分子項被選中：indeterminate 狀態
                        mainCheckbox.checked = false;
                        mainCheckbox.indeterminate = true;
                        mainCheckboxContainer?.setAttribute('data-indeterminate', 'true');
                    }
                };

                /**
                 * 主 checkbox 變更事件：控制所有子 checkbox
                 */
                const handleMainCheckboxChange = (e: Event) => {
                    const children = getChildCheckboxes();
                    const targetState = mainCheckbox.checked;
                    
                    children.forEach((child) => {
                        child.checked = targetState;
                    });

                    // 清除 indeterminate 狀態（因為現在是明確的全選或全不選）
                    mainCheckbox.indeterminate = false;
                    const mainCheckboxContainer = mainCheckbox.closest('.form-check');
                    mainCheckboxContainer?.removeAttribute('data-indeterminate');
                };

                /**
                 * 子 checkbox 變更事件：更新主 checkbox 狀態
                 */
                const handleChildCheckboxChange = () => {
                    updateMainCheckboxState();
                };

                // 綁定事件監聽器
                mainCheckbox.addEventListener('change', handleMainCheckboxChange);

                const children = getChildCheckboxes();
                children.forEach((child) => {
                    child.addEventListener('change', handleChildCheckboxChange);
                });

                // 初始化時檢查一次狀態
                updateMainCheckboxState();
            });
        });
    };

    /**
     * 清理函數（如果需要的話）
     */
    const cleanup = () => {
        // 這裡可以添加清理邏輯，比如移除事件監聽器
        // 目前由於事件監聽器綁定在 DOM 元素上，當元素被移除時會自動清理
    };

    // 自動初始化
    if (autoInit) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    }

    return {
        init,
        cleanup
    };
};
