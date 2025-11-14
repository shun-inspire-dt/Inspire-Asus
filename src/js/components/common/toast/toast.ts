import { Modal } from '@js/components/common/modal/modal';

export const buttonEvent = ['close'] as const;
export type options = {
    title?: string;
    text?: string;
    icon?: 'error' | 'success';
    className?: string;
    link?: {
        primaryText?: string;
        primaryLink?: string;
        primaryIcon?: string;
        primarySvg?: string;
        primaryVariant?: string;
        primaryAttribute?: { [key: string]: string };
        primaryLinkSecond?: string;
        secondaryText?: string;
        secondaryLink?: string;
        secondaryIcon?: string;
        secondarySvg?: string;
        secondaryAttribute?: { [key: string]: string };
        secondaryVariant?: string;
        secondaryLinkSecond?: string;
        ok?: () => void | (typeof buttonEvent)[number];
        cancel?: () => void | (typeof buttonEvent)[number];
    };
    close?: () => void;
    hideCloseButton?: boolean;
    hidePrevented?: boolean;
    timeout?: number;
};
export type links = {
    text: string;
    link: string;
    variant: string;
    attribute?: { [key: string]: string };
    icon?: string;
    svg?: string;
    do?: () => void | (typeof buttonEvent)[number];
};

export class Toast {
    private button: HTMLButtonElement;
    private data: DOMStringMap = {};
    private title: string = '';
    private text: string = '';
    private icon: string = '';
    private className: string = '';
    private close?: () => void;
    private hideCloseButton?: boolean = true;
    private hidePrevented?: boolean = false;
    public toast: HTMLElement = document.getElementById('toastModal') as HTMLElement;
    private myModal: Modal = new Modal(this.toast);
    private timeout?: number = 0;
    private links: Map<number, links> | Map<number, {}> = new Map();
    private linkText: string = '';

    constructor(selector?: HTMLButtonElement | string, timeout?: number) {
        this.button =
            typeof selector === 'string'
                ? (document.querySelector?.(`${selector}[data-toast]`) as HTMLButtonElement)
                : (selector as HTMLButtonElement);
        this.timeout = timeout || parseInt(this.toast?.dataset?.timeout as string) || 0;
        this.initialize();
    }

    private initialize() {
        const _this = this;
        const toastHeader = this.toast?.querySelector('.modal-header') as HTMLElement;
        const toastBody = this.toast?.querySelector('.modal-body') as HTMLElement;
        const toastTitle = this.toast?.querySelector('.modal-title > span') as HTMLElement;
        const toastText = this.toast?.querySelector('.toast-text') as HTMLElement;
        const toastIconContainer = this.toast?.querySelector('.toast-icon') as HTMLElement;
        const toastIcons = toastIconContainer?.querySelectorAll('[data-toast-icon]') as NodeListOf<HTMLElement>;
        const toastFooter = this.toast?.querySelector('.toast-footer') as HTMLElement;
        const toastLinks = toastFooter?.querySelectorAll('.toast-button') as NodeListOf<HTMLButtonElement>;

        this.toast?.addEventListener('show.bs.modal', () => {
            if (this.hideCloseButton) toastHeader.classList.add('hideCloseButton');
            if (this.className) this.toast.classList.add(this.className);
            if (this.title && toastTitle) toastTitle.innerHTML = this.title;

            if (this.text && toastText) {
                toastText.style.display = 'block';
                toastText.innerHTML = this.text;
            }

            if (this.icon) {
                if (toastIconContainer) toastIconContainer.style.display = 'flex';

                if (this.icon === 'error') {
                    toastTitle?.classList.remove('text-success');
                    toastTitle?.classList.add('text-gold');
                }
                if (this.icon === 'success') {
                    toastTitle?.classList.remove('text-gold');
                    toastTitle?.classList.add('text-success');
                }

                [...toastIcons].forEach((icon) => {
                    if (icon) {
                        icon.style.display = 'none';
                        const type = icon?.dataset.toastIcon as string;

                        if (type === this.icon) icon.style.display = 'block';
                    }
                });
            }

            if (!this.title) {
                toastHeader.classList.add('hideTitle');
            }
            if (!this.icon && !this.title && toastHeader) {
                toastHeader.classList.add('hideHeader');
            }

            if (!this.text && !this.links.size && toastBody) {
                toastBody.classList.add('hideContent');
            }

            if (this.links.size) {
                if (toastFooter) toastFooter.style.display = 'flex';
                this.toast.classList.add('HasToastFooter');
                [...toastLinks].forEach((link, index) => {
                    const data = this.links.get(index) as links;
                    const title = data?.text;
                    const href = data?.link;
                    const icon = data?.icon;
                    const svg = data?.svg;
                    const attribute = data?.attribute as { [key: string]: string };
                    const variant = data?.variant ?? 'primary';
                    const Do = data?.do;
                    if (link && title) {
                        link.style.display = 'flex';
                        link.setAttribute('href', href);
                        link.setAttribute('title', title);
                        link.setAttribute('data-variant', variant);
                        if (attribute && Object.keys(attribute).length) {
                            Object.keys(attribute).forEach((key) => {
                                link.setAttribute(key, attribute[key]);
                            });
                        }
                        if (icon && !svg) {
                            const div = document.createElement('i');
                            div.classList.add('toast-button-icon', icon);
                            link.appendChild(div);
                        }
                        if (svg) {
                            const div = document.createElement('div');
                            div.classList.add('toast-button-svg');
                            div.innerHTML = svg;
                            link.appendChild(div);
                        }
                        if (title) {
                            const titleNode = document.createTextNode(title) as Text;
                            link.appendChild(titleNode);
                        }
                        if (Do) {
                            const func = async (e: Event) => {
                                e.preventDefault();

                                _this.loading([...toastLinks], index, true);
                                if (typeof Do === 'function') {
                                    Do && (await Do());
                                    this.myModal.hide();
                                }
                                if (typeof Do === 'string') {
                                    if (Do === 'close') this.myModal.hide();
                                }
                                _this.loading([...toastLinks], index, true);
                            };
                            link.addEventListener('click', func, { once: true });

                            this.myModal.on(
                                'hidden',
                                () => {
                                    link.removeEventListener('click', func, false);
                                },
                                { once: true }
                            );
                        }
                    }
                });
            }
        });

        this.toast?.addEventListener('hidden.bs.modal', async () => {
            if (toastHeader.classList.contains('hideCloseButton')) toastHeader.classList.remove('hideCloseButton');
            if (!!this.className) {
                const classNames = this.className.split(/(\s+)/)?.filter((e) => e.trim().length > 0);
                classNames.forEach((x) => {
                    if (this.toast.classList.contains(x)) {
                        this.toast.classList.remove(x);
                    }
                });
            }
            if (toastTitle) toastTitle.innerHTML = '';
            if (toastTitle) toastTitle.classList.remove('text-success', 'text-gold');
            if (toastHeader) toastHeader.classList.remove('hideTitle', 'hideHeader');
            if (toastBody) toastBody.classList.remove('hideContent');
            if (toastText) toastText.innerHTML = '';
            if (toastText) toastText.style.display = 'none';
            if (toastIconContainer) toastIconContainer.style.display = 'none';
            if (toastFooter) toastFooter.style.display = 'none';
            this.toast.classList.remove('HasToastFooter');
            [...toastLinks].forEach((link, index) => {
                if (link) {
                    link.style.display = 'none';
                    link.innerHTML = '';
                    link.setAttribute('href', '#');
                    link.setAttribute('title', '');
                    link.removeAttribute('data-variant');

                    const iconDivs = link?.querySelectorAll('toast-button-icon') as NodeListOf<HTMLElement>;
                    [...iconDivs].forEach((icon) => icon.remove());

                    const svgDivs = link?.querySelectorAll('toast-button-svg') as NodeListOf<HTMLElement>;
                    [...svgDivs].forEach((svg) => svg.remove());

                    const data = this.links.get(index) as links;
                    const attribute = data?.attribute as { [key: string]: string };
                    if (attribute && Object.keys(attribute).length) {
                        Object.keys(attribute).forEach((key) => {
                            if (link.hasAttribute(key)) link.removeAttribute(key);
                        });
                    }
                }
            });
            if (this.hidePrevented) {
                this.myModal = new Modal(this.toast, {
                    backdrop: true,
                    keyboard: true
                });
            }
            this.close && (await this.close());
            this.reset();
        });
    }

    private setAttributeByButton(button?: HTMLButtonElement): void {
        const targetButton: HTMLButtonElement = button || this.button;
        this.data = targetButton.dataset;

        this.title = this.data.toastTitle?.startsWith('@')
            ? (document.querySelector(this.data.toastTitle)?.innerHTML as string)
            : (this.data.toastTitle as string);
        this.text = this.data.toastText?.startsWith('@')
            ? (document.querySelector(this.data.toastText)?.innerHTML as string)
            : (this.data.toastText as string);
        this.icon = this.data.toastIcon as string;
        this.timeout = (parseInt(this.data.toastTimeout as string) as number) || 0;
        this.className = this.data.toastClassname as string;
        this.hideCloseButton = this.data.toastHideCloseButton && this.data.toastHideCloseButton === 'true' ? true : false;
        this.hidePrevented = this.data.toastHidePrevented && this.data.toastHidePrevented === 'true' ? true : false;
        if (this.data.hasOwnProperty('toastButton')) {
            this.links.set(0, {
                text: this.data?.toastButtonPrimaryText ?? '',
                link: this.data?.toastButtonPrimaryLink2
                    ? this.data?.toastButtonPrimaryLink2
                    : this.data?.toastButtonPrimaryLink ?? '',
                attribute: JSON.parse(this.data?.toastButtonPrimaryAttribute as string) ?? {},
                variant: this.data?.toastButtonPrimaryVariant ?? 'primary',
                icon: this.data?.toastButtonPrimaryIcon ?? '',
                svg: this.data?.toastButtonPrimarySvg ?? ''
            });
            this.links.set(1, {
                text: this.data?.toastButtonSecondaryText ?? '',
                link: this.data?.toastButtonSecondaryLink2
                    ? this.data?.toastButtonSecondaryLink2
                    : this.data?.toastButtonSecondaryLink ?? '',
                attribute: JSON.parse(this.data?.toastButtonSecondaryAttribute as string) ?? {},
                variant: this.data?.toastButtonSecondaryVariant ?? 'primary',
                icon: this.data?.toastButtonSecondaryIcon ?? '',
                svg: this.data?.toastButtonSecondarySvg ?? ''
            });
        }
    }

    private setAttribute(options: options = {}) {
        const { title, text, icon, className, timeout, close, hideCloseButton, hidePrevented, link } = options;
        this.title = title as string;
        this.text = text as string;
        this.icon = icon as string;
        this.className = className as string;
        this.timeout = (timeout as number) || this.timeout;
        this.close = close as () => void;
        this.hideCloseButton = hideCloseButton as boolean || this.hideCloseButton;
        this.hidePrevented = hidePrevented as boolean || this.hidePrevented;
        if (!!link && !!Object.values(link).length) {
            const {
                primaryText,
                primaryLink,
                primaryLinkSecond,
                primaryVariant,
                primaryAttribute,
                primaryIcon,
                primarySvg,
                secondaryText,
                secondaryLink,
                secondaryLinkSecond,
                secondaryVariant,
                secondaryAttribute,
                secondaryIcon,
                secondarySvg,
                cancel,
                ok
            } = link;
            this.links.set(0, {
                text: primaryText ?? '',
                link: (primaryLinkSecond as string) ? (primaryLinkSecond as string) : primaryLink ?? '',
                variant: primaryVariant ?? 'primary',
                attribute: primaryAttribute && typeof primaryAttribute === 'object' ? primaryAttribute : {},
                icon: primaryIcon ?? '',
                svg: primarySvg ?? '',
                do: cancel
            });
            this.links.set(1, {
                text: secondaryText ?? '',
                link: (secondaryLinkSecond as string) ? (secondaryLinkSecond as string) : secondaryLink ?? '',
                variant: secondaryVariant ?? 'primary',
                attribute: secondaryAttribute && typeof secondaryAttribute === 'object' ? secondaryAttribute : {},
                icon: secondaryIcon ?? '',
                svg: secondarySvg ?? '',
                do: ok
            });
        }
    }

    private show() {
        this.myModal.show();
        if (this.timeout) {
            setTimeout(() => {
                this.myModal.hide();
            }, this.timeout);
        }
    }

    public click() {
        this.button?.addEventListener('click', () => {
            this.setAttributeByButton();
            this.show();
        });
        return new Promise((resolve) => {
            this.toast?.addEventListener('hidden.bs.modal', () => {
                resolve(true);
            });
        });
    }

    public clickByAll() {
        const buttons = document.querySelectorAll('[data-toast][data-toast-trigger="click"]') as NodeListOf<HTMLButtonElement>;
        [...buttons].forEach((button) => {
            button?.addEventListener('click', () => {
                this.setAttributeByButton(button);
                this.show();
            });
        });
        return new Promise((resolve) => {
            this.toast?.addEventListener('hidden.bs.modal', () => {
                resolve(true);
            });
        });
    }

    private loading(links: HTMLButtonElement[], index: number, status: boolean) {
        const data = this.links.get(index) as links,
            href = data?.link;
        if (!!status) {
            [...links].forEach((link) => link.setAttribute('href', 'javascript: void(0)'));
            if (links[index]) {
                this.linkText = links[index].innerHTML;
                links[index].innerHTML = `<span class="toast-button-loader"></span>`;
            }
        }
        if (!status) {
            [...links].forEach((link) => link.setAttribute('href', href || '#'));
            if (links[index]) {
                links[index].innerHTML = this.linkText;
                this.linkText = '';
            }
        }
    }

    public fire(options: options = {}) {
        if (options && !!Object.values(options).length) this.setAttribute(options);
        if (options && !Object.values(options).length) this.setAttributeByButton();
        if (this.hidePrevented) {
            this.myModal = new Modal(this.toast, {
                backdrop: 'static',
                keyboard: false
            });
        }

        this.show();
        return new Promise((resolve) => {
            this.toast?.addEventListener('hidden.bs.modal', () => {
                resolve(true);
            });
        });
    }

    public on(
        Event: (typeof this.myModal.myEvents)[number],
        callback: (e: Event | CustomEvent) => void,
        options?: boolean | AddEventListenerOptions
    ) {
        this.myModal.on(Event, callback, options);
    }

    public addMethod() {
        // this.myModal.modal.addEventListener('hide', () => {
        //     this.myModal.hide();
        // });
        this.myModal.modal.addEventListener('fire', (e: Event | CustomEvent) => {
            const event = e as CustomEvent;
            this.fire(event.detail as options);
        });
        (document.querySelector('#toastModalCloseButton') as HTMLButtonElement).addEventListener('click', () => {
            this.myModal.hide();
        });
        // this.myModal.modal.addEventListener('switch', (e: Event | CustomEvent) => {
        //     console.log('modal switch');

        //     this.myModal.hide();
        //     this.myModal.on(
        //         'hidden',
        //         () => {
        //             const event = e as CustomEvent;
        //             this.fire(event.detail as options);
        //         },
        //         { once: true }
        //     );
        // });
    }

    private reset() {
        this.data = {};
        this.title = '';
        this.text = '';
        this.icon = '';
        this.className = '';
        this.hideCloseButton = true;
        this.hidePrevented = false;
        this.timeout = 0;
        this.links = new Map();
        this.linkText = '';
        this.close = undefined;
    }
}
