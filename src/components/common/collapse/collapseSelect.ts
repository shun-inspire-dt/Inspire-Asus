/**
 * CollapseSelect 組件的互動邏輯
 * 處理選項變更和標籤文字更新
 */

interface CollapseSelectElement extends HTMLSelectElement {
    dataset: DOMStringMap & {
        type?: 'expand' | 'collapse';
    };
}

interface CollapseSelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

/**
 * 初始化 CollapseSelect 組件
 * @param container - 包含 CollapseSelect 組件的容器元素
 */
export function initCollapseSelect(container: HTMLElement | Document = document): void {
    const collapseSelects = container.querySelectorAll('.collapse-select');

    collapseSelects.forEach((selectContainer) => {
        const selectElement = selectContainer.querySelector('.collapse-select__element') as CollapseSelectElement;
        const labelElement = selectContainer.querySelector('.collapse-select__label') as HTMLElement;

        if (!selectElement || !labelElement) return;

        // 設定初始標籤文字
        updateLabelText(selectElement, labelElement, selectContainer as HTMLElement);

        // 監聽選項變更
        selectElement.addEventListener('change', () => {
            updateLabelText(selectElement, labelElement, selectContainer as HTMLElement);
        });
    });
}

/**
 * 更新標籤文字
 * @param selectElement - select 元素
 * @param labelElement - 標籤元素
 */
function updateLabelText(selectElement: CollapseSelectElement, labelElement: HTMLElement, parentElement: HTMLElement): void {
    const selectedOption = selectElement.selectedOptions[0];
    const type = selectElement.dataset.type || 'expand';

    if (!selectedOption || selectedOption.value === '') {
        // 沒有選擇或選擇預設選項
        labelElement.textContent = type === 'expand' ? '選擇選項' : '已選擇';
    } else {
        // 有選擇具體選項
        labelElement.textContent = selectedOption.textContent || selectedOption.value;
    }
    // 模擬失焦
    parentElement.blur();
}

/**
 * 設定 CollapseSelect 的選項
 * @param container - CollapseSelect 容器元素
 * @param options - 選項陣列
 */
export function setCollapseSelectOptions(container: HTMLElement, options: CollapseSelectOption[]): void {
    const selectElement = container.querySelector('.collapse-select__element') as HTMLSelectElement;
    const labelElement = container.querySelector('.collapse-select__label') as HTMLElement;

    if (!selectElement || !labelElement) return;

    // 清除現有選項（保留預設選項）
    const defaultOption = selectElement.querySelector('option[value=""]');
    selectElement.innerHTML = '';

    if (defaultOption) {
        selectElement.appendChild(defaultOption);
    }

    // 添加新選項
    options.forEach((option) => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.label;
        if (option.disabled) {
            optionElement.disabled = true;
        }
        selectElement.appendChild(optionElement);
    });

    // 更新標籤文字
    updateLabelText(selectElement as CollapseSelectElement, labelElement, container);
}

/**
 * 取得 CollapseSelect 的當前值
 * @param container - CollapseSelect 容器元素
 * @returns 當前選擇的值
 */
export function getCollapseSelectValue(container: HTMLElement): string {
    const selectElement = container.querySelector('.collapse-select__element') as HTMLSelectElement;
    return selectElement?.value || '';
}

/**
 * 設定 CollapseSelect 的值
 * @param container - CollapseSelect 容器元素
 * @param value - 要設定的值
 */
export function setCollapseSelectValue(container: HTMLElement, value: string): void {
    const selectElement = container.querySelector('.collapse-select__element') as HTMLSelectElement;
    const labelElement = container.querySelector('.collapse-select__label') as HTMLElement;

    if (!selectElement || !labelElement) return;

    selectElement.value = value;
    updateLabelText(selectElement as CollapseSelectElement, labelElement, container);

    // 觸發 change 事件
    selectElement.dispatchEvent(new Event('change', { bubbles: true }));
}

// 自動初始化
if (typeof window !== 'undefined') {
    // DOM 載入完成後自動初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => initCollapseSelect());
    } else {
        initCollapseSelect();
    }
}
