/**
 * ToggleGroup 設定選項
 */
type options = {
    /** 指定包裹表單的容器，用於表單 `reset` 時自動收起所有區塊 */
    wrapInForm: string | HTMLElement;
};

/**
 * 區塊切換控制類別
 *
 * 基於 `data-toggle-container`、`data-toggle-item`、`data-toggle` 屬性組織 UI 區塊的顯示/隱藏。
 * 支援 radio/checkbox 觸發、URL query 同步、表單重置自動收起。
 *
 * @example
 * // HTML: <div data-toggle-container="#myGroup"> ... </div>
 * const group = new ToggleGroup('#myGroup');
 * group.click(); // 纁定點擊事件
 * group.check(); // 纁定复選框事件
 */
export class ToggleGroup {
    private container: HTMLElement;
    private items: HTMLElement[];
    private options: options;

    /**
     * @param selectors - CSS 選擇器，選取含 `[data-toggle-container]` 屬性的容器元素
     * @param options - 設定選項（可選）
     */
    constructor(selectors: string, options?: options) {
        this.container = document.querySelector(`${selectors}[data-toggle-container]`) as HTMLElement;
        this.items = this.getItems();
        this.options = options as options;
        this.initialize();
    }

    private getItems() {
        const items = new Set<HTMLElement>();

        const innerItems = (this.container?.querySelectorAll('[data-toggle-item]') as NodeListOf<HTMLElement>) || [];
        [...innerItems].forEach((el) => el && items.add(el));

        const toggles = (this.container?.querySelectorAll('input[data-toggle]') as NodeListOf<HTMLInputElement>) || [];
        [...toggles].forEach((toggle) => {
            const selector = toggle?.dataset?.toggle;
            if (!selector) return;
            const targets = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
            [...targets].forEach((el) => el && items.add(el));
        });

        return [...items];
    }

    private initialize() {
        this.edgeEffects();
    }

    private show(target: HTMLElement) {
        target?.classList.add('active');
        this.toggleInputAttribute(target, true);
    }

    private hide(target: HTMLElement) {
        target?.classList.remove('active');
        this.toggleInputAttribute(target, false);
    }

    /** 顯示所有音區塊（加上 `active` 類別） */
    public allShow() {
        [...this.items].forEach((x: Element) => {
            x?.classList.add('active');
            this.toggleInputAttribute(x, true);
        });
    }

    /** 隱藏所有區塊（移除 `active` 類別） */
    public allHide() {
        [...this.items].forEach((x: Element) => {
            x?.classList.remove('active');
            this.toggleInputAttribute(x, false);
        });
    }

    private toggleInputAttribute(x: Element, boolean: boolean) {
        if (this.options?.wrapInForm) {
            const list = x instanceof HTMLInputElement || x instanceof HTMLTextAreaElement ? [x] : [...x.querySelectorAll('input')];
            list.forEach((y: Element) => {
                if (y && y.hasAttribute('data-valid') && y.getAttribute('data-valid') === 'required') {
                    if (boolean) y.setAttribute('required', '');
                    if (!boolean) y.removeAttribute('required');
                }
            });
        }
    }

    private edgeEffects() {
        if (this.options?.wrapInForm) {
            const wrapInForm = this.options?.wrapInForm;
            const form =
                typeof this.options?.wrapInForm === 'string'
                    ? (document.querySelector(wrapInForm as string) as HTMLFormElement)
                    : (wrapInForm as HTMLFormElement);
            form.addEventListener('reset', () => {
                this.allHide();
            });
        }
    }

    /**
     * 纁定 radio / checkbox 的 `change` 事件
     * - radio 觸發時：隱藏全部 → 顯示對應區塊
     * - checkbox 觸發時：選取則顯示、取消則隱藏
     */
    public check() {
        const radios = this.container?.querySelectorAll('input[type="radio"]') || [];
        [...radios].forEach((x: Element) => {
            x?.addEventListener('change', (evt: Event) => {
                const radio = evt.target as HTMLInputElement;
                if (!radio.checked) return;

                this.allHide();

                const targetText = radio?.dataset?.toggle;
                if (!targetText) return;
                const target = document.querySelectorAll(targetText) as NodeListOf<HTMLElement>;
                [...target].forEach((el) => {
                    this.show(el);
                });
            });
        });

        const inputs = this.container?.querySelectorAll('input[data-toggle]') || [];
        [...inputs].forEach((x: Element) => {
            x?.addEventListener('change', (evt: Event) => {
                const checkbox = evt.target as HTMLInputElement;
                const targetText = checkbox?.dataset?.toggle as string;
                const target = document.querySelectorAll(targetText) as NodeListOf<HTMLElement>;
                const check = checkbox.checked;
                
                this.allHide();

                if (!!check) {
                    [...target].forEach((x) => {
                        this.show(x);
                    });
                    return;
                }

                if (!check) {
                    [...target].forEach((x) => {
                        this.hide(x);
                    });
                    return;
                }
            });
        });
    }

    private updateUrlQuery(tabName: string) {
        const url = new URL(window.location.href);
        url.searchParams.set('tab', tabName);
        window.history.replaceState(null, '', url.toString());
    }

    private getTabFromUrl(): string | null {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('tab');
    }

    private activateTabByQuery(triggers: NodeListOf<Element>, tabName: string) {
        if (!this.container || !tabName) return;
        const targetTrigger = this.container.querySelector(`[data-toggle="${tabName}"]`) as HTMLElement;
        if (!targetTrigger) return;

        // 手動觸發 tab 切換，避免重複綁定事件
        triggers.forEach((y) => {
            y?.classList.remove('active');
        });
        targetTrigger.classList.add('active');

        const targetText = (targetTrigger as HTMLElement)?.dataset?.toggle as string;
        const target = document.querySelectorAll(targetText) as NodeListOf<HTMLElement>;
        
        this.allHide();
        [...target].forEach((x) => {
            this.show(x);
        });
    }

    private initializeTabFromUrl(triggers: NodeListOf<Element>) {
        const handleDomReady = () => {
            const initialTab = this.getTabFromUrl();
            if (!initialTab) return;
            
            // 使用 setTimeout 確保 DOM 完全載入
            setTimeout(() => {
                this.activateTabByQuery(triggers, initialTab);
            }, 0);
        };

        // 根據文件載入狀態決定何時執行
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', handleDomReady);
        } else {
            // DOM 已經載入完成
            handleDomReady();
        }
    }

    /**
     * 纁定 `[data-toggle]` 元素的點擊事件以切換區塊
     *
     * @param updateUrlQuery - 是否將当前切換的 tab 名稱同步至 URL `?tab=` query，預設 `false`
     */
    public click(updateUrlQuery: boolean = false) {
        const triggers = this.container?.querySelectorAll('[data-toggle]') || [];
        
        // 設定點擊事件處理器
        [...triggers].forEach((x: Element) => {
            const targetText = (x as HTMLElement)?.dataset?.toggle as string;
            const target = document.querySelectorAll(targetText) as NodeListOf<HTMLElement>;
            const tabName = (x as HTMLElement)?.dataset?.tab || targetText.replace('#', '');

            x?.addEventListener('click', (evt: Event) => {
                evt.preventDefault();

                triggers.forEach((y) => {
                    y?.classList.remove('active');
                });
                x?.classList.add('active');

                this.allHide();
                [...target].forEach((x) => {
                    this.show(x);
                });

                if (updateUrlQuery && tabName) {
                    this.updateUrlQuery(tabName);
                }
            });
        });

        // 在 DOM 載入完成時對應到 query 的 tab
        if (updateUrlQuery) {
            this.initializeTabFromUrl(triggers);
        }
    }
}
