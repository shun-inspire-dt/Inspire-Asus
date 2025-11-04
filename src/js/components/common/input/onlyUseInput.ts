type options = {
    wrapInForm?: string | HTMLFormElement;
};
export class OnlyUseInput {
    private parent: HTMLElement;
    private fields: HTMLInputElement[];
    private relatedFields: NodeListOf<HTMLInputElement> | [];
    private options: options;

    constructor(selectors: string, options?: options) {
        this.parent = document.querySelector?.(selectors) as HTMLElement;
        this.fields = Array.from(this.parent?.querySelectorAll?.('[data-only-use]') as NodeListOf<HTMLInputElement>).filter(
            (x) => x.dataset.onlyUse !== 'false' || x.dataset.onlyUse === undefined
        );
        this.relatedFields = [];
        this.options = options as options;
        this.initialize();
    }

    private initialize() {
        if (this.parent) {
            this.change();
            this.edgeEffects();
        }
    }

    private change() {
        ['input', 'change'].forEach((evt) => {
            [...this.fields].forEach((input) => {
                input?.addEventListener(evt, (x) => {
                    if (evt === 'change') input?.dispatchEvent(new CustomEvent('onlyUse'));
                    const target = x.target as HTMLInputElement;
                    const relatedText = target?.dataset?.onlyUse as string;
                    this.relatedFields = document.querySelectorAll?.(relatedText) as NodeListOf<HTMLInputElement>;

                    if (this.relatedFields.length) {
                        if (target.type === 'checkbox' || target.type === 'radio') {
                            if (!target.checked) this.open();
                            if (target.checked) this.mute();
                        } else {
                            if (!target.value) this.open();
                            if (!!target.value) this.mute();
                        }
                    }
                });
            });
        });
    }

    private mute() {
        [...this.relatedFields].forEach((input) => {
            if (input) {
                input.checked = false;
                input.value = '';
                input.disabled = true;
            }
        });
    }

    private open() {
        [...this.relatedFields].forEach((input) => {
            if (input) input.disabled = false;
        });
    }

    private allOpen() {
        [...this.fields].forEach((input) => {
            if (input) input.disabled = false;
        });
    }

    private edgeEffects() {
        if (this.options?.wrapInForm) {
            const wrapInForm = this.options?.wrapInForm;
            const form =
                typeof this.options?.wrapInForm === 'string'
                    ? (document.querySelector(wrapInForm as string) as HTMLFormElement)
                    : (wrapInForm as HTMLFormElement);
            form?.addEventListener('reset', () => {
                this.allOpen();
            });
        }
    }

    public on(Event: string, callback: (e: NodeListOf<HTMLInputElement>) => void) {
        const events = Event.split(/(\s+)/)?.filter((e) => e.trim().length > 0);
        const Events: { [key: string]: string } = {
            onlyUse: 'onlyUSe'
        };
        events.forEach((event) => {
            if (Events.hasOwnProperty(event)) {
                [...this.fields].forEach((input) => {
                    input?.addEventListener(event, () => {
                        callback && callback(this.relatedFields as NodeListOf<HTMLInputElement>);
                    });
                });
            }
        });
    }
}
