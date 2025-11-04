import './useCollapse.scss';

export class useCollapse {
    static parent: HTMLElement;
    static collapseTriggers: NodeListOf<HTMLAnchorElement>;
    static status: boolean;
    static target: string;
    static effectStatus: string;
    static childStatus: boolean;
    static content: HTMLElement;
    static children: HTMLElement;
    static minScrollHeight: number;
    static maxHeight: string;
    static totalHeight: number;
    static arrow: HTMLElement;
    static activeArrowDegree: number | string = '90';

    static init({
        parent,
        showCallback,
        hideCallback
    }: {
        parent: string | HTMLElement;
        showCallback?: (arg0?: HTMLAnchorElement) => void;
        hideCallback?: (arg0?: HTMLAnchorElement) => void;
    }) {
        this.parent =
            typeof parent === 'string' ? (document.querySelector(parent as string) as HTMLElement) : (parent as HTMLElement);
        this.collapseTriggers = this.parent?.querySelectorAll('[data-collapse]') as NodeListOf<HTMLAnchorElement>;
        this.trigger({
            showCallback,
            hideCallback
        });
    }

    static trigger({
        showCallback,
        hideCallback
    }: {
        showCallback?: (arg0?: HTMLAnchorElement) => void;
        hideCallback?: (arg0?: HTMLAnchorElement) => void;
    }) {
        [...this.collapseTriggers].forEach((x) => {
            x.addEventListener('click', (e) => {
                e.preventDefault();
                this.status = x.hasAttribute('data-collapse') as boolean;
                this.target = (x.getAttribute('data-collapse') as string) || (x.getAttribute('href') as string);
                this.effectStatus = x.getAttribute('data-effect') as string;
                this.childStatus = x.hasAttribute('data-collapse-child') as boolean;

                if (this.status) {
                    e.preventDefault();
                    this.content =
                        this.target && this.target !== '#'
                            ? (document.querySelector(this.target) as HTMLElement)
                            : this.target === 'prev'
                            ? (x.previousElementSibling as HTMLElement)
                            : (x.nextElementSibling as HTMLElement);
                    this.children = this.content.children[0] as HTMLElement;
                    this.minScrollHeight = this.children.scrollHeight as number;
                    this.maxHeight = this.content.style.maxHeight as string;
                    this.totalHeight = this.minScrollHeight as number;
                    this.arrow = x?.querySelector('[data-collapse-arrow]') as HTMLElement;
                    this.activeArrowDegree = (this.arrow?.dataset?.collapseArrow as string) || '90';

                    if (!this.maxHeight || this.maxHeight === '0px') {
                        this.show(x);
                        showCallback && showCallback(x);
                        return;
                    }
                    if (!!this.maxHeight || this.maxHeight !== '0px') {
                        this.hide(x);
                        hideCallback && hideCallback(x);
                        return;
                    }
                }
            });
        });
    }

    static show(button: HTMLAnchorElement) {
        if (this.arrow) this.arrow.style.transform = `rotate(${this.activeArrowDegree}deg)`;
        if (this.effectStatus) this.content.style.opacity = `100`;
        if (this.content) {
            this.content.style.maxHeight = `${this.totalHeight}px`;
            this.content.classList.add('collapsed-show');
        }
        if (button) button.classList.add('collapsed-show');
        if (button && this.childStatus) {
            const parent = button.closest('div.collapsed-show') as HTMLElement;
            parent.style.maxHeight = `${parent.scrollHeight + this.totalHeight}px`;
        }
    }

    static hide(button?: HTMLAnchorElement) {
        if (button && this.childStatus) {
            const parent = button.closest('div.collapsed-show') as HTMLElement;
            parent.style.maxHeight = `${parent.scrollHeight - this.totalHeight}px`;
        }
        if (button) button.classList.remove('collapsed-show');
        if (this.content) {
            this.content.style.maxHeight = '0px';
            this.content.classList.remove('collapsed-show');
        }
        if (this.effectStatus) this.content.style.opacity = `0`;
        if (this.arrow) this.arrow.style.transform = 'rotate(0deg)';
    }
}
