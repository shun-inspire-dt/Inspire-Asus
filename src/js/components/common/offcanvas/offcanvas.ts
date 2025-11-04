import { Offcanvas as BsOffcanvas } from 'bootstrap';

export class Offcanvas {
    public offcanvas: HTMLElement;
    public myOffcanvas: BsOffcanvas | null = null;
    private options: BsOffcanvas.Options = {
        backdrop: true,
        keyboard: true,
        scroll: true
    };
    public myEvents = ['hide', 'hidden', 'hidePrevented', 'show', 'shown', 'close', 'clickOutside', 'showOn', 'hideOff'] as const;

    constructor(offcanvas: HTMLElement, options: Partial<BsOffcanvas.Options> = {}) {
        this.offcanvas = offcanvas;
        if (options) this.options = Object.assign(this.options, options);
        if (offcanvas) this.myOffcanvas = new BsOffcanvas(this.offcanvas, this.options);
    }

    public toggle() {
        if (this.offcanvas) this.myOffcanvas?.toggle(this.offcanvas);
    }

    public hide() {
        if (this.offcanvas) this.myOffcanvas?.hide();
    }

    public show() {
        if (this.offcanvas) this.myOffcanvas?.show();
    }

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
