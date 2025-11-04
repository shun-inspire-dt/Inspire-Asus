type options = {
    wrapInForm: string | HTMLElement;
};
export class ToggleGroup {
    private container: HTMLElement;
    private items: NodeListOf<HTMLElement>;
    private options: options;

    constructor(selectors: string, options?: options) {
        this.container = document.querySelector(`${selectors}[data-toggle-container]`) as HTMLElement;
        this.items = (this.container?.querySelectorAll('[data-toggle-item]') as NodeListOf<HTMLElement>) || [];
        this.options = options as options;
        this.initialize();
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

    public allShow() {
        [...this.items].forEach((x: Element) => {
            x?.classList.add('active');
            this.toggleInputAttribute(x, true);
        });
    }

    public allHide() {
        [...this.items].forEach((x: Element) => {
            x?.classList.remove('active');
            this.toggleInputAttribute(x, false);
        });
    }

    private toggleInputAttribute(x: Element, boolean: boolean) {
        if (this.options?.wrapInForm) {
            [...x.querySelectorAll('input')].forEach((y: Element) => {
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

    public check() {
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
