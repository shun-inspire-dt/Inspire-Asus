// 常數定義
const CSS_CLASSES = {
    CUSTOM_SELECT: 'custom-select',
    SELECT_SELECTED: 'select-selected',
    SELECT_ITEMS: 'select-items',
    SELECT_HIDE: 'select-hide',
    SELECT_ARROW_ACTIVE: 'select-arrow-active',
    SELECT_PLACEHOLDER: 'select-selected-placeholder',
    SAME_AS_SELECTED: 'same-as-selected'
} as const;

const ARIA_ATTRIBUTES = {
    ROLE: 'role',
    ARIA_HIDDEN: 'aria-hidden',
    ARIA_DISABLED: 'aria-disabled',
    TABINDEX: 'tabindex'
} as const;

const DATA_ATTRIBUTES = {
    SELECT_LINK: 'data-select-link',
    DISABLED: 'data-disabled'
} as const;

const CUSTOM_EVENTS = {
    UPDATE: 'custom-select:update'
} as const;

const KEYBOARD_KEYS = {
    ENTER: 'Enter',
    SPACE: ' ',
    ARROW_DOWN: 'ArrowDown',
    ARROW_UP: 'ArrowUp',
    ESCAPE: 'Escape'
} as const;

/**
 * 關閉所有自定義選擇器，除了指定的元素
 * @param currentElement - 當前選中的元素，不會被關閉
 */
export const closeAllSelect = (currentElement?: HTMLElement): void => {
    const selectItems = document.getElementsByClassName(CSS_CLASSES.SELECT_ITEMS);
    const selectElements = document.getElementsByClassName(CSS_CLASSES.SELECT_SELECTED);
    const excludedIndexes: number[] = [];

    // 找出需要排除的元素索引
    for (let i = 0; i < selectElements.length; i++) {
        if (currentElement === selectElements[i]) {
            excludedIndexes.push(i);
        } else {
            selectElements[i].classList.remove(CSS_CLASSES.SELECT_ARROW_ACTIVE);
        }
    }

    // 隱藏所有非排除的選項容器
    for (let i = 0; i < selectItems.length; i++) {
        if (!excludedIndexes.includes(i)) {
            selectItems[i].classList.add(CSS_CLASSES.SELECT_HIDE);
        }
    }
};

/**
 * 清除容器中的自定義選擇器元素
 * @param container - 包含選擇器的容器元素
 */
export const clearSelect = (container: HTMLElement): void => {
    const selectDisplay = container?.querySelector(`.${CSS_CLASSES.SELECT_SELECTED}`) as HTMLElement;
    const selectItems = container?.querySelector(`.${CSS_CLASSES.SELECT_ITEMS}`) as HTMLElement;

    selectDisplay?.remove();
    selectItems?.remove();
};

/**
 * 設定 ARIA 屬性的輔助函數
 * @param element - 要設定屬性的元素
 * @param attributes - 屬性物件
 */
const setAriaAttributes = (element: HTMLElement, attributes: Record<string, string>): void => {
    Object.entries(attributes).forEach(([key, value]) => {
        if (!element.hasAttribute(key)) {
            element.setAttribute(key, value);
        }
    });
};

/**
 * 建立選項元素的輔助函數
 * @param isLinkSelect - 是否為連結選擇器
 * @param optionValue - 選項值
 * @returns 建立的選項元素
 */
const createOptionElement = (isLinkSelect: boolean, optionValue?: string): HTMLElement => {
    if (isLinkSelect) {
        const anchor = document.createElement('A') as HTMLAnchorElement;
        if (optionValue) {
            anchor.href = optionValue;
        }
        return anchor;
    } else {
        const div = document.createElement('DIV');
        div.setAttribute(ARIA_ATTRIBUTES.TABINDEX, '0');
        return div;
    }
};

/**
 * 處理選項的 disabled 狀態
 * @param element - 選項元素
 * @param isDisabled - 是否禁用
 * @param isLinkSelect - 是否為連結選擇器
 */
const handleOptionDisabled = (element: HTMLElement, isDisabled: boolean, isLinkSelect: boolean): void => {
    if (isDisabled) {
        element.setAttribute(DATA_ATTRIBUTES.DISABLED, 'true');
        element.setAttribute(ARIA_ATTRIBUTES.ARIA_DISABLED, 'true');
        if (!isLinkSelect) {
            element.removeAttribute(ARIA_ATTRIBUTES.TABINDEX);
        }
    }
};

/**
 * 為選項添加鍵盤事件處理
 * @param element - 選項元素
 */
const addOptionKeyboardEvents = (element: HTMLElement, nativeSelect: HTMLSelectElement): void => {
    element.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === KEYBOARD_KEYS.ENTER || e.key === KEYBOARD_KEYS.SPACE) {
            e.preventDefault();
            (element as HTMLElement).click();
            if (nativeSelect) nativeSelect.focus();
        }
    });
};

/**
 * 處理選項點擊事件
 * @param optionElement - 被點擊的選項元素
 * @param nativeSelect - 原生 select 元素
 * @param isLinkSelect - 是否為連結選擇器
 */
const handleOptionClick = (optionElement: HTMLElement, nativeSelect: HTMLSelectElement, isLinkSelect: boolean): void => {
    const itemsParent = optionElement.parentNode as HTMLElement;
    const containerParent = itemsParent.parentNode as HTMLElement;
    const selectDisplay = containerParent.querySelector(`.${CSS_CLASSES.SELECT_SELECTED}`) as HTMLElement;

    if (selectDisplay) {
        selectDisplay.classList.remove(CSS_CLASSES.SELECT_PLACEHOLDER);
    }

    // 更新原生 select 的選中項
    for (let i = 0; i < nativeSelect.length; i++) {
        if (nativeSelect.options[i].innerHTML === optionElement.innerHTML) {
            nativeSelect.selectedIndex = i;
            if (selectDisplay) {
                selectDisplay.innerHTML = optionElement.innerHTML;
            }

            // 觸發 change 事件
            nativeSelect.dispatchEvent(new Event('change', { bubbles: true }));

            // 更新選項的選中狀態
            const allOptions = itemsParent.querySelectorAll('*') as NodeListOf<HTMLElement>;
            allOptions.forEach((option) => option.classList.remove(CSS_CLASSES.SAME_AS_SELECTED));
            optionElement.classList.add(CSS_CLASSES.SAME_AS_SELECTED);
            break;
        }
    }

    // 如果不是連結選擇器，關閉下拉選單
    if (!isLinkSelect && selectDisplay) {
        selectDisplay.click();
    }
};

/**
 * 創建選項元素
 * @param nativeSelect - 原生 select 元素
 * @param optionIndex - 選項索引
 * @param isLinkSelect - 是否為連結選擇器
 * @returns 創建的選項元素
 */
const createSelectOption = (nativeSelect: HTMLSelectElement, optionIndex: number, isLinkSelect: boolean): HTMLElement => {
    const option = nativeSelect.options[optionIndex];
    const optionElement = createOptionElement(isLinkSelect, option.value);

    optionElement.innerHTML = option.innerHTML;
    optionElement.setAttribute(ARIA_ATTRIBUTES.ROLE, 'option');

    handleOptionDisabled(optionElement, option.disabled, isLinkSelect);
    addOptionKeyboardEvents(optionElement, nativeSelect);

    optionElement.addEventListener('click', () => {
        handleOptionClick(optionElement, nativeSelect, isLinkSelect);
    });

    return optionElement;
};

/**
 * 處理方向鍵導航
 * @param selectItemsContainer - 選項容器
 * @param key - 按下的鍵
 */
const handleArrowNavigation = (selectItemsContainer: HTMLElement, key: string): void => {
    const options = selectItemsContainer.querySelectorAll(':where(div, a):not([data-disabled])') as NodeListOf<HTMLElement>;
    if (options.length === 0) return;

    let currentIndex = -1;
    // 找到當前 focus 的選項
    for (let i = 0; i < options.length; i++) {
        if (document.activeElement === options[i]) {
            currentIndex = i;
            break;
        }
    }

    // 計算下一個 focus 的選項
    if (currentIndex === -1) {
        currentIndex = key === KEYBOARD_KEYS.ARROW_DOWN ? 0 : options.length - 1;
    } else {
        if (key === KEYBOARD_KEYS.ARROW_DOWN) {
            currentIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
        } else {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
        }
    }

    options[currentIndex].focus();
};

const syncPlaceholderState = (selectDisplay: HTMLElement, nativeSelect: HTMLSelectElement): void => {
    if (nativeSelect.value) {
        selectDisplay.classList.remove(CSS_CLASSES.SELECT_PLACEHOLDER);
    } else {
        selectDisplay.classList.add(CSS_CLASSES.SELECT_PLACEHOLDER);
    }
};

const syncCustomSelectUIByNativeSelect = (nativeSelect: HTMLSelectElement, container: HTMLElement): void => {
    const selectedOption = nativeSelect.options[nativeSelect.selectedIndex];
    const customSelectDisplay = container.querySelector(`.${CSS_CLASSES.SELECT_SELECTED}`) as HTMLElement;

    if (!customSelectDisplay || !selectedOption) return;

    customSelectDisplay.innerHTML = selectedOption.innerHTML;
    syncPlaceholderState(customSelectDisplay, nativeSelect);

    const allOptions = container.querySelectorAll(`.${CSS_CLASSES.SELECT_ITEMS} > *`);
    allOptions.forEach((option, index) => {
        option.classList.remove(CSS_CLASSES.SAME_AS_SELECTED);
        // index + 1 因為自定義選項從第二個開始（跳過 placeholder）
        if (index + 1 === nativeSelect.selectedIndex) {
            option.classList.add(CSS_CLASSES.SAME_AS_SELECTED);
        }
    });
};

/**
 * 為 select-items 容器添加鍵盤事件
 * @param selectItemsContainer - 選項容器
 * @param nativeSelect - 原生 select 元素
 * @param container - 主容器
 */
const addSelectItemsKeyboardEvents = (
    selectItemsContainer: HTMLElement,
    nativeSelect: HTMLSelectElement,
    container: HTMLElement
): void => {
    selectItemsContainer.addEventListener('keydown', (e: KeyboardEvent) => {
        const isOpen = !selectItemsContainer.classList.contains(CSS_CLASSES.SELECT_HIDE);

        if (isOpen && e.key === 'Tab' && document.activeElement === selectItemsContainer) {
            const selectedOption = selectItemsContainer.querySelector(
                `.${CSS_CLASSES.SAME_AS_SELECTED}:where(div, a):not([data-disabled])`
            ) as HTMLElement | null;
            const firstOption = selectItemsContainer.querySelector(':where(div, a):not([data-disabled])') as HTMLElement | null;

            (selectedOption || firstOption)?.focus();
            e.preventDefault();
            return;
        }

        if (isOpen && (e.key === KEYBOARD_KEYS.ARROW_DOWN || e.key === KEYBOARD_KEYS.ARROW_UP)) {
            e.preventDefault();
            handleArrowNavigation(selectItemsContainer, e.key);
        } else if (isOpen && e.key === KEYBOARD_KEYS.ESCAPE) {
            e.preventDefault();
            const selectDisplay = container.querySelector(`.${CSS_CLASSES.SELECT_SELECTED}`) as HTMLElement;
            if (selectDisplay) {
                selectDisplay.click();
                selectItemsContainer.setAttribute(ARIA_ATTRIBUTES.ARIA_HIDDEN, 'true');
                nativeSelect.focus();
            }
        }
    });
};

/**
 * 為原生 select 添加鍵盤事件
 * @param nativeSelect - 原生 select 元素
 * @param container - 主容器
 */
const addNativeSelectKeyboardEvents = (nativeSelect: HTMLSelectElement, container: HTMLElement): void => {
    nativeSelect.addEventListener('keydown', (e: KeyboardEvent) => {
        const selectItems = container.querySelector(`.${CSS_CLASSES.SELECT_ITEMS}`) as HTMLElement;

        if (e.key === KEYBOARD_KEYS.ENTER || e.key === KEYBOARD_KEYS.SPACE) {
            e.preventDefault();
            const selectDisplay = container.querySelector(`.${CSS_CLASSES.SELECT_SELECTED}`) as HTMLElement;
            const wasHidden = selectItems.classList.contains(CSS_CLASSES.SELECT_HIDE);

            if (selectDisplay) {
                selectDisplay.click();
                selectItems.setAttribute(ARIA_ATTRIBUTES.ARIA_HIDDEN, wasHidden ? 'false' : 'true');
                selectItems.focus();
            }
        }
    });
};

/**
 * 為 select-selected 添加點擊事件
 * @param selectDisplay - 選擇器顯示元素
 * @param container - 主容器
 */
const addSelectDisplayClickEvent = (selectDisplay: HTMLElement, container: HTMLElement): void => {
    selectDisplay.addEventListener('click', (e: Event) => {
        e.stopPropagation();
        closeAllSelect(selectDisplay);

        const selectItems = container.querySelector(`.${CSS_CLASSES.SELECT_ITEMS}`) as HTMLElement;
        selectItems.classList.toggle(CSS_CLASSES.SELECT_HIDE);
        selectDisplay.classList.toggle(CSS_CLASSES.SELECT_ARROW_ACTIVE);
    });
};

/**
 * 為原生 select 添加 change 事件監聽
 * @param nativeSelect - 原生 select 元素
 * @param container - 主容器
 */
const addNativeSelectChangeEvent = (nativeSelect: HTMLSelectElement, container: HTMLElement): void => {
    nativeSelect.addEventListener('change', () => {
        syncCustomSelectUIByNativeSelect(nativeSelect, container);
    });
};

const addNativeSelectCustomUpdateEvent = (nativeSelect: HTMLSelectElement, container: HTMLElement): void => {
    nativeSelect.addEventListener(CUSTOM_EVENTS.UPDATE, () => {
        syncCustomSelectUIByNativeSelect(nativeSelect, container);
    });
};

/**
 * 初始化單個自定義選擇器
 * @param container - 選擇器容器
 */
const initializeCustomSelect = (container: HTMLElement): void => {
    const nativeSelect = container?.getElementsByTagName('select')[0] as HTMLSelectElement;
    const optionCount = nativeSelect.length;
    const isLinkSelect = container.hasAttribute(DATA_ATTRIBUTES.SELECT_LINK);

    // 檢查是否已有預先寫好的 HTML 結構
    const existingSelected = container.querySelector(`.${CSS_CLASSES.SELECT_SELECTED}`) as HTMLDivElement;
    const existingItems = container.querySelector(`.${CSS_CLASSES.SELECT_ITEMS}`) as HTMLDivElement;

    let selectDisplay: HTMLElement;
    let selectItemsContainer: HTMLElement;

    if (existingSelected && existingItems) {
        // 使用現有的 HTML 結構
        selectDisplay = existingSelected;
        selectItemsContainer = existingItems;

        // 確保容器有正確的 ARIA 屬性
        setAriaAttributes(selectItemsContainer, {
            [ARIA_ATTRIBUTES.TABINDEX]: '-1',
            [ARIA_ATTRIBUTES.ROLE]: 'listbox',
            [ARIA_ATTRIBUTES.ARIA_HIDDEN]: 'true'
        });

        // 更新顯示內容
        selectDisplay.innerHTML = nativeSelect.options[nativeSelect.selectedIndex].innerHTML;
        syncPlaceholderState(selectDisplay, nativeSelect);

        // 清空現有選項，重新生成
        selectItemsContainer.innerHTML = '';
    } else {
        // 清除可能存在的舊結構
        clearSelect(container);

        // 動態創建新結構
        selectDisplay = document.createElement('DIV');
        selectDisplay.setAttribute('class', `${CSS_CLASSES.SELECT_SELECTED}`);
        selectDisplay.innerHTML = nativeSelect.options[nativeSelect.selectedIndex].innerHTML;
        syncPlaceholderState(selectDisplay, nativeSelect);
        container.appendChild(selectDisplay);

        selectItemsContainer = document.createElement('DIV');
        selectItemsContainer.setAttribute('class', `${CSS_CLASSES.SELECT_ITEMS} ${CSS_CLASSES.SELECT_HIDE}`);
        setAriaAttributes(selectItemsContainer, {
            [ARIA_ATTRIBUTES.TABINDEX]: '-1',
            [ARIA_ATTRIBUTES.ROLE]: 'listbox',
            [ARIA_ATTRIBUTES.ARIA_HIDDEN]: 'true'
        });
    }

    // 創建選項元素（跳過第一個 placeholder 選項）
    for (let i = 1; i < optionCount; i++) {
        const optionElement = createSelectOption(nativeSelect, i, isLinkSelect);
        selectItemsContainer.appendChild(optionElement);
    }

    // 只有在動態創建時才需要將容器添加到 DOM
    if (!existingItems) {
        container.appendChild(selectItemsContainer);
    }

    // 設定初始選中狀態的 .same-as-selected 類別
    const allOptions = selectItemsContainer.querySelectorAll('*') as NodeListOf<HTMLElement>;
    allOptions.forEach((option, index) => {
        option.classList.remove(CSS_CLASSES.SAME_AS_SELECTED);
        // index + 1 因為自定義選項從第二個開始（跳過 placeholder）
        if (index + 1 === nativeSelect.selectedIndex) {
            option.classList.add(CSS_CLASSES.SAME_AS_SELECTED);
        }
    });

    // 添加事件監聽器
    addSelectDisplayClickEvent(selectDisplay, container);
    addNativeSelectKeyboardEvents(nativeSelect, container);
    addSelectItemsKeyboardEvents(selectItemsContainer, nativeSelect, container);
    addNativeSelectChangeEvent(nativeSelect, container);
    addNativeSelectCustomUpdateEvent(nativeSelect, container);
};

/**
 * 初始化自定義選擇器
 * @param containers - 選擇器容器陣列，如果未提供則自動尋找
 */
export const setSelect = (containers?: HTMLElement[]): void => {
    const targetContainers =
        containers || Array.from(document.getElementsByClassName(CSS_CLASSES.CUSTOM_SELECT) as HTMLCollectionOf<HTMLElement>);

    targetContainers.forEach(initializeCustomSelect);
};
