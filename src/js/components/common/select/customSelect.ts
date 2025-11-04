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
    let optionIndex, optionAmount: number, select, DIV_A, DIV_B, DIV_C;
    /* look for any elements with the class "custom-select": */
    const containers = __containers__ || (document.getElementsByClassName('custom-select') as HTMLCollectionOf<HTMLElement>);

    [...containers].forEach((container) => {
        /** Clear */
        clearSelect(container);

        select = container?.getElementsByTagName('select')[0] as HTMLSelectElement;
        optionAmount = select.length as number;
        /*  這是 select 的 input */
        DIV_A = document.createElement('DIV') as HTMLDivElement;
        DIV_A.setAttribute('class', 'select-selected select-selected-placeholder');
        DIV_A.innerHTML = select.options[select.selectedIndex].innerHTML;
        container.appendChild(DIV_A);
        /* 這是 select 的 下拉選單 */
        DIV_B = document.createElement('DIV') as HTMLDivElement;
        DIV_B.setAttribute('class', 'select-items select-hide');
        for (optionIndex = 1; optionIndex < optionAmount; optionIndex++) {
            /* 這是 select 的 下拉選單 底下 建立 option */
            DIV_C = document.createElement('DIV');
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

                        selectOption = ItemsParent.getElementsByClassName('same-as-selected') as HTMLCollectionOf<HTMLElement>;
                        selectOptionAmount = selectOption.length;

                        for (selectOptionIndex = 0; selectOptionIndex < selectOptionAmount; selectOptionIndex++) {
                            selectOption[selectOptionIndex].removeAttribute('class');
                        }

                        this.setAttribute('class', 'same-as-selected');
                        break;
                    }
                }
                selectParent.click();
            });
            DIV_B.appendChild(DIV_C);
        }
        container.appendChild(DIV_B);

        DIV_A.addEventListener('click', function (e) {
            /* when the select box is clicked, close any other select boxes, and open/close the current select box: */
            e.stopPropagation();
            closeAllSelect(this);
            /** 下拉選單 */
            const nextSibling = this.nextSibling as HTMLElement;
            nextSibling.classList.toggle('select-hide');
            this.classList.toggle('select-arrow-active');
        });
    });
};
