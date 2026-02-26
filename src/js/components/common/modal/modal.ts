import { Modal as BsModal } from 'bootstrap';

/**
 * Bootstrap Modal 封裝類別
 *
 * 封裝 Bootstrap 內建的 `Modal` 並擴展自定義事件（`close`、`clickOutside`、`switch` 等）。
 * 支援同時只能有一個 Modal 顯示，開啟新 Modal 前會自動隙藏目前顯示中的 Modal。
 *
 * @example
 * const modal = new Modal(document.getElementById('myModal'));
 * modal.show();
 * modal.on('hidden', () => console.log('closed'));
 */
export class Modal {
    public modal: HTMLElement;
    public myModal: BsModal | null = null;
    private options: BsModal.Options = {
        backdrop: true,
        keyboard: true,
        focus: true
    };
    public myEvents = [
        'hide',
        'hidden',
        'hidePrevented',
        'show',
        'shown',
        'close',
        'clickOutside',
        'showOn',
        'hideOff',
        'switch'
    ] as const;

    /**
     * @param modal - Modal 的根 HTML 元素
     * @param options - Bootstrap Modal 設定選項（可選）
     */
    constructor(modal: HTMLElement, options: Partial<BsModal.Options> = {}) {
        this.modal = modal;
        if (options) this.options = Object.assign(this.options, options);
        if (modal) this.myModal = new BsModal(this.modal, this.options);
    }

    /** 切換 Modal 顯示/隱藏狀態 */
    public toggle() {
        if (this.modal) this.myModal?.toggle(this.modal);
    }

    /** 隐藏 Modal */
    public hide() {
        if (this.modal) this.myModal?.hide();
    }

    /**
     * 顯示 Modal，若目前已有其他 Modal 開啟，會先將其隐藏再開啟此 Modal
     */
    public show() {
        if (this.modal) {
            const shownModal = document.querySelector('.modal.show') as HTMLElement;
            if (shownModal) shownModal.dispatchEvent(new CustomEvent('hide'));
            setTimeout(() => {
                this.myModal?.show();
            }, 0);
        }
    }

    /**
     * 切換到另一個 Modal（隐藏自身、顯示目標 Modal）
     * @param related - 要開啟的目標 Modal 元素
     */
    public switch(related: HTMLElement) {
        if (this.modal && related) {
            const selfModal = this.myModal;
            const relatedModal = BsModal.getOrCreateInstance(related);

            selfModal?.hide();
            relatedModal.show(related);

            // setTimeout(() => {
            //     selfModal?.dispose();
            // }, 500);
        }
    }

    /**
     * 纁定 Modal 事件監聽器
     * @param Event - 事件名稱（支援 Bootstrap 原生事件及自定義擴展事件）
     * @param callback - 事件觸發時的回調函數
     * @param options - `addEventListener` 選項（可選）
     */
    public on(
        Event: (typeof this.myEvents)[number],
        callback: (e: Event | CustomEvent) => void,
        options?: boolean | AddEventListenerOptions
    ) {
        const events = Event.split(/(\s+)/)?.filter((e) => e.trim().length > 0);
        const originEvent: { [key: string]: string } = {
            hide: 'hide.bs.modal',
            hidden: 'hidden.bs.modal',
            hidePrevented: 'hidePrevented.bs.modal',
            show: 'show.bs.modal',
            shown: 'shown.bs.modal'
        };
        const newEventAfterShown: { [key: string]: string } = {
            close: 'close',
            clickOutside: 'clickOutside',
            hideOff: 'hide',
            switch: 'switch'
        };
        const newEvent: { [key: string]: string } = {
            showOn: 'show'
        };

        events.forEach((x) => {
            if (originEvent.hasOwnProperty(x)) {
                this.modal?.addEventListener(
                    originEvent[x],
                    (e: Event) => {
                        callback && callback(e);
                    },
                    options
                );
            }
            if (newEventAfterShown.hasOwnProperty(x)) {
                this.modal?.addEventListener('show.bs.modal', () => {
                    if (newEventAfterShown[x] === 'close') this.addCloseEvent();
                    if (newEventAfterShown[x] === 'clickOutside') this.addClickOutsideEvent();
                    if (newEventAfterShown[x] === 'hide') this.addHideOffEvent();
                    if (newEventAfterShown[x] === 'switch') this.addSwitchOnEvent();
                    this.modal?.addEventListener(
                        newEventAfterShown[x],
                        (e: Event | CustomEvent) => {
                            callback && callback(e);
                        },
                        options
                    );
                });
            }
            if (newEvent.hasOwnProperty(x)) {
                if (newEvent[x] === 'show') this.addShowOnEvent();
                this.modal?.addEventListener(
                    newEvent[x],
                    (e: Event | CustomEvent) => {
                        callback && callback(e);
                    },
                    options
                );
            }
        });
    }

    private addCloseEvent() {
        const closeButton = this.modal?.querySelector('[data-bs-dismiss="modal"]') as HTMLButtonElement;
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                this.modal?.dispatchEvent(new CustomEvent('close'));
            });
        }
    }

    private addClickOutsideEvent() {
        document.addEventListener('mouseup', (e: Event) => {
            if (e.target === this.modal) {
                this.modal?.dispatchEvent(new CustomEvent('clickOutside'));
            }
        });
    }

    private addShowOnEvent() {
        this.modal?.dispatchEvent(new CustomEvent('show'));
    }

    private addHideOffEvent() {
        this.modal?.dispatchEvent(new CustomEvent('hide'));
    }

    private addSwitchOnEvent() {
        this.modal?.dispatchEvent(new CustomEvent('switch'));
    }

    public addMethod() {
        this.customDispatchEvent('showOn', () => this.show());
        this.customDispatchEvent('hideOff', () => this.hide());
        this.customDispatchEvent('switch', (e) => {
            const event = e as CustomEvent;
            const element =
                typeof event.detail === 'string'
                    ? (document.querySelector(event.detail) as HTMLElement)
                    : (event.detail as HTMLElement);
            this.switch(element);
        });
    }

    private customDispatchEvent(
        event: (typeof this.myEvents)[number],
        callback: (e: Event | CustomEvent) => void,
        options?: boolean | AddEventListenerOptions
    ) {
        this.on(
            event,
            (e: Event | CustomEvent) => {
                callback && callback(e);
            },
            options
        );
    }
}
