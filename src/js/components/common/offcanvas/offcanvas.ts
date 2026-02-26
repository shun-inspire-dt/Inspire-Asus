import { Offcanvas as BsOffcanvas } from 'bootstrap';

/**
 * Bootstrap Offcanvas 封裝類別
 *
 * 封裝 Bootstrap 內建的 `Offcanvas` 並擴展自定義事件（`close`、`clickOutside`、`showOn`、`hideOff` 等）。
 *
 * @example
 * const oc = new Offcanvas(document.getElementById('myOffcanvas'));
 * oc.show();
 * oc.on('hidden', () => console.log('offcanvas closed'));
 */
export class Offcanvas {
    public offcanvas: HTMLElement;
    public myOffcanvas: BsOffcanvas | null = null;
    private options: BsOffcanvas.Options = {
        backdrop: true,
        keyboard: true,
        scroll: true
    };
    public myEvents = ['hide', 'hidden', 'hidePrevented', 'show', 'shown', 'close', 'clickOutside', 'showOn', 'hideOff'] as const;

    /**
     * @param offcanvas - Offcanvas 的根 HTML 元素
     * @param options - Bootstrap Offcanvas 設定選項（可選）
     */
    constructor(offcanvas: HTMLElement, options: Partial<BsOffcanvas.Options> = {}) {
        this.offcanvas = offcanvas;
        if (options) this.options = Object.assign(this.options, options);
        if (offcanvas) this.myOffcanvas = new BsOffcanvas(this.offcanvas, this.options);
    }

    /** 切換 Offcanvas 顯示/隱藏狀態 */
    public toggle() {
        if (this.offcanvas) this.myOffcanvas?.toggle(this.offcanvas);
    }

    /** 隱藏 Offcanvas */
    public hide() {
        if (this.offcanvas) this.myOffcanvas?.hide();
    }

    /** 顯示 Offcanvas */
    public show() {
        if (this.offcanvas) this.myOffcanvas?.show();
    }

    /**
     * 切換到另一個 Offcanvas（隱藏自身、顯示目標 Offcanvas，並在 500ms 後 dispose 自身實例）
     * @param related - 要開啟的目標 Offcanvas 元素
     */
    public switch(related: HTMLElement) {
        if (this.offcanvas && related) {
            const selfModal = this.myOffcanvas;
            const relatedModal = BsOffcanvas.getOrCreateInstance(related);

            selfModal?.hide();
            relatedModal.show(related);

            setTimeout(() => {
                selfModal?.dispose();
            }, 500);
        }
    }

    /**
     * 纁定 Offcanvas 事件監聽器
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
            hide: 'hide.bs.offcanvas',
            hidden: 'hidden.bs.offcanvas',
            hidePrevented: 'hidePrevented.bs.offcanvas',
            show: 'show.bs.offcanvas',
            shown: 'shown.bs.offcanvas'
        };
        const newEventAfterShown: { [key: string]: string } = {
            close: 'close',
            clickOutside: 'clickOutside',
            hideOff: 'hide'
        };
        const newEvent: { [key: string]: string } = {
            showOn: 'show'
        };

        events.forEach((x) => {
            if (originEvent.hasOwnProperty(x)) {
                this.offcanvas?.addEventListener(
                    originEvent[x],
                    (e: Event) => {
                        callback && callback(e);
                    },
                    options
                );
            }
            if (newEventAfterShown.hasOwnProperty(x)) {
                this.offcanvas?.addEventListener('show.bs.offcanvas', () => {
                    if (newEventAfterShown[x] === 'close') this.addCloseEvent();
                    if (newEventAfterShown[x] === 'clickOutside') this.addClickOutsideEvent();
                    if (newEventAfterShown[x] === 'hide') this.addHideOffEvent();
                    this.offcanvas?.addEventListener(
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
                this.offcanvas?.addEventListener(
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
        const closeButton = this.offcanvas?.querySelector('[data-bs-dismiss="modal"]') as HTMLButtonElement;
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                this.offcanvas?.dispatchEvent(new CustomEvent('close'));
            });
        }
    }

    private addClickOutsideEvent() {
        document.addEventListener('mouseup', (e: Event) => {
            if (e.target === this.offcanvas) {
                this.offcanvas?.dispatchEvent(new CustomEvent('clickOutside'));
            }
        });
    }

    private addShowOnEvent() {
        this.offcanvas?.dispatchEvent(new CustomEvent('show'));
    }

    private addHideOffEvent() {
        this.offcanvas?.dispatchEvent(new CustomEvent('hide'));
    }

    /**
     * 注冊預建自定義事件處理：`showOn` 自動開啟、`hideOff` 自動關閉
     * 常在 Astro 元件 `onload` 頭尾呼叫一次以啟用自定義事件派送
     */
    public addMethod() {
        this.customDispatchEvent('showOn', () => this.show());
        this.customDispatchEvent('hideOff', () => this.hide());
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
