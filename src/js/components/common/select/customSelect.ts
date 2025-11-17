export const closeAllSelect = (elmnt?: HTMLElement) => {
    /* a function that will close all select boxes in the document, except the current select box: */
    let i: number;
    const arrNo = [];
    const selectItems = document.getElementsByClassName('select-items');
    const select = document.getElementsByClassName('select-selected');
    const optionAmount = selectItems.length;
    const selectAmount = select.length;
    for (i = 0; i < selectAmount; i++) {
        if (elmnt == select[i]) {
            arrNo.push(i);
        } else {
            select[i].classList.remove('select-arrow-active');
        }
    }
    for (i = 0; i < optionAmount; i++) {
        if (arrNo.indexOf(i)) {
            selectItems[i].classList.add('select-hide');
        }
    }
};

export const clearSelect = (container: HTMLElement) => {
    const select = container?.querySelector('.select-selected') as HTMLElement;
    const items = container?.querySelector('.select-items') as HTMLElement;
    if (select) select.remove();
    if (items) items.remove();
};

export const setSelect = (__containers__?: HTMLElement[]) => {
    let optionIndex: number,
        optionAmount: number,
        select: HTMLSelectElement,
        DIV_A: HTMLElement,
        DIV_B: HTMLElement,
        DIV_C: HTMLElement;
    /* look for any elements with the class "custom-select": */
    const containers = __containers__ || (document.getElementsByClassName('custom-select') as HTMLCollectionOf<HTMLElement>);

    [...containers].forEach((container) => {
        select = container?.getElementsByTagName('select')[0] as HTMLSelectElement;
        optionAmount = select.length as number;
        const isLinkSelect = container.hasAttribute('data-select-link');

        // 檢查是否已有預先寫好的 HTML 結構
        let existingSelected = container.querySelector('.select-selected') as HTMLDivElement;
        let existingItems = container.querySelector('.select-items') as HTMLDivElement;

        if (existingSelected && existingItems) {
            // 使用現有的 HTML 結構
            DIV_A = existingSelected;
            DIV_B = existingItems;

            // 更新顯示內容
            DIV_A.innerHTML = select.options[select.selectedIndex].innerHTML;

            // 清空現有選項，重新生成
            DIV_B.innerHTML = '';
        } else {
            // 清除可能存在的舊結構
            clearSelect(container);

            // 動態創建新結構
            /*  這是 select 的 input */
            DIV_A = document.createElement('DIV') as HTMLDivElement;
            DIV_A.setAttribute('class', 'select-selected select-selected-placeholder');
            DIV_A.innerHTML = select.options[select.selectedIndex].innerHTML;
            container.appendChild(DIV_A);

            /* 這是 select 的 下拉選單 */
            DIV_B = document.createElement('DIV') as HTMLDivElement;
            DIV_B.setAttribute('class', 'select-items select-hide');
        }
        for (optionIndex = 1; optionIndex < optionAmount; optionIndex++) {
            /* 這是 select 的 下拉選單 底下 建立 option */
            if (isLinkSelect) {
                DIV_C = document.createElement('A') as HTMLAnchorElement;
                const optionValue = select.options[optionIndex].value;
                if (optionValue) {
                    (DIV_C as HTMLAnchorElement).href = optionValue;
                }
            } else {
                DIV_C = document.createElement('DIV');
            }

            DIV_C.innerHTML = select.options[optionIndex].innerHTML;
            DIV_C.addEventListener('click', function () {
                /* when an item is clicked, update the original select box, and the selected item: */
                let selectOption, optionIndex, selectOptionIndex, select, optionAmount, selectOptionAmount;
                const ItemsParent = this.parentNode as HTMLElement;
                const containerParent = ItemsParent.parentNode as HTMLElement;
                const selectParent = this.parentNode?.previousSibling as HTMLElement;

                select = containerParent.getElementsByTagName('select')[0];
                optionAmount = select.length;

                selectParent.classList.remove('select-selected-placeholder');

                for (optionIndex = 0; optionIndex < optionAmount; optionIndex++) {
                    if (select.options[optionIndex].innerHTML == this.innerHTML) {
                        /** trigger 原本的 select */
                        select.selectedIndex = optionIndex;
                        selectParent.innerHTML = this.innerHTML;

                        // 觸發 change 事件，讓 URL 同步功能可以正常運作
                        select.dispatchEvent(new Event('change', { bubbles: true }));

                        selectOption = ItemsParent.getElementsByClassName('same-as-selected') as HTMLCollectionOf<HTMLElement>;
                        selectOptionAmount = selectOption.length;

                        for (selectOptionIndex = 0; selectOptionIndex < selectOptionAmount; selectOptionIndex++) {
                            selectOption[selectOptionIndex].removeAttribute('class');
                        }

                        this.setAttribute('class', 'same-as-selected');
                        break;
                    }
                }

                // 如果是連結選擇器，不要關閉下拉選單，讓連結正常跳轉
                if (!isLinkSelect) {
                    selectParent.click();
                }
            });
            DIV_B.appendChild(DIV_C);
        }

        // 只有在動態創建時才需要將 DIV_B 添加到容器
        if (!existingItems) {
            container.appendChild(DIV_B);
        }

        DIV_A.addEventListener('click', function (e) {
            /* when the select box is clicked, close any other select boxes, and open/close the current select box: */
            e.stopPropagation();
            closeAllSelect(this);
            /** 下拉選單 */
            const nextSibling = this.nextSibling as HTMLElement;
            nextSibling.classList.toggle('select-hide');
            this.classList.toggle('select-arrow-active');
        });

        // 監聽原生 select 的 change 事件，同步更新自定義 select 顯示
        select.addEventListener('change', function () {
            const selectedOption = this.options[this.selectedIndex];
            const customSelectDisplay = container.querySelector('.select-selected') as HTMLElement;

            if (customSelectDisplay && selectedOption) {
                // 更新顯示文字
                customSelectDisplay.innerHTML = selectedOption.innerHTML;

                // 移除 placeholder 樣式（如果有選擇值）
                if (this.value) {
                    customSelectDisplay.classList.remove('select-selected-placeholder');
                } else {
                    customSelectDisplay.classList.add('select-selected-placeholder');
                }

                // 更新選項的 same-as-selected 狀態
                const allOptions = container.querySelectorAll('.select-items > *');
                allOptions.forEach((option, index) => {
                    option.classList.remove('same-as-selected');
                    // index + 1 因為自定義選項從第二個開始（跳過 placeholder）
                    if (index + 1 === this.selectedIndex) {
                        option.classList.add('same-as-selected');
                    }
                });
            }
        });
    });
};
