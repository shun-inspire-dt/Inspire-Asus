import { Modal as BsModal } from 'bootstrap';
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

    constructor(modal: HTMLElement, options: Partial<BsModal.Options> = {}) {
        this.modal = modal;
        if (options) this.options = Object.assign(this.options, options);
        if (modal) this.myModal = new BsModal(this.modal, this.options);
    }

    public toggle() {
        if (this.modal) this.myModal?.toggle(this.modal);
    }

    public hide() {
        if (this.modal) this.myModal?.hide();
    }

    public show() {
        if (this.modal) {
            const shownModal = document.querySelector('.modal.show') as HTMLElement;
            if (shownModal) shownModal.dispatchEvent(new CustomEvent('hide'));
            setTimeout(() => {
                this.myModal?.show();
            }, 0);
        }
    }

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
