type item = HTMLInputElement | HTMLButtonElement | HTMLElement;
export class useSameInfo<T extends item, U extends item, k extends item> {
    private sameInfoTrigger: T;
    private fromBlockFields: U[] = [];
    private toBlockFields: k[] = [];
    private Evt: Event = new Event('change');

    constructor(trigger: T | string, fromBlock: U | string, toBlock: U | string) {
        /** trigger */
        this.sameInfoTrigger = typeof trigger === 'string' ? (document.querySelector(trigger) as T) : (trigger as T);
        /** From block */
        const realFromBlock =
            typeof fromBlock === 'string'
                ? (document.querySelector(fromBlock as string) as HTMLElement)
                : (fromBlock as HTMLElement);
        this.fromBlockFields = [...realFromBlock?.querySelectorAll('[data-same-info]') ?? []] as U[];
        /** To block */
        const realToBlock =
            typeof toBlock === 'string' ? (document.querySelector(toBlock as string) as HTMLElement) : (toBlock as HTMLElement);
        this.toBlockFields = [...realToBlock?.querySelectorAll('[data-same-info]') ?? []] as k[];
    }

    public on(event: string, callback: (e: Event) => void) {
        this.sameInfoTrigger?.addEventListener(event, (e) => {
            e.preventDefault();
            callback && callback(e);
        });
    }

    public fieldToField() {
        const input = this.sameInfoTrigger as HTMLInputElement;
        if (input.checked) {
            this.setter(({ FormField, ToField }) => {
                const value = (FormField as HTMLInputElement).value;
                if (value) {
                    (ToField as HTMLInputElement).value = value;
                    ToField?.dispatchEvent(this.Evt);
                }
            });
        }
        if (!input.checked) {
            this.clear();
        }
    }

    public textToField() {
        this.setter(({ FormField, ToField }) => {
            const value = (FormField as HTMLInputElement).innerHTML.trim() as string;
            if (value) {
                (ToField as HTMLInputElement).value = value;
                ToField?.dispatchEvent(this.Evt);
            }
        });
    }

    public fieldToText() {
        this.setter(({ FormField, ToField }) => {
            const value = (FormField as HTMLInputElement).value;
            if (ToField && value) (ToField as HTMLElement).innerHTML = value;
        });
    }

    public textToText() {
        this.setter(({ FormField, ToField }) => {
            const value = (FormField as HTMLInputElement).innerHTML.trim() as string;
            if (ToField && value) (ToField as HTMLElement).innerHTML = value;
        });
    }

    private setter(callback: (arg0: { FormField: U; ToField: k }) => void) {
        this.toBlockFields.forEach((ToField) => {
            this.fromBlockFields.forEach((FormField) => {
                const FormName = FormField?.dataset?.sameInfo as string;
                const ToName = ToField?.dataset?.sameInfo as string;
                if (FormName === ToName) {
                    setTimeout(
                        () => {
                            callback && callback({ FormField, ToField });
                        },
                        parseInt(ToField?.dataset?.sameInfoDelay as string) || 0
                    );
                }
            });
        });
    }

    private clear() {
        this.toBlockFields.forEach((ToField) => {
            if (ToField) {
                (ToField as HTMLInputElement).value = '';
                ToField.dispatchEvent(this.Evt);
            }
        });
    }
}
