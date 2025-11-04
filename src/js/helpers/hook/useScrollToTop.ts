export type options = {
    Element?: HTMLElement;
    offsetRatio?: number;
    offset?: number;
};
export const useScrollToTop = (options?: options) => ({
    trigger() {
        const buttons = document.querySelectorAll('a[data-scroll-to-top]');
        [...buttons].forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const target = button.getAttribute('href') as string;
                const targetElement = document.querySelector(target) as HTMLElement;
                const offsetString = button.getAttribute('data-scroll-to-top-offset') as string;
                let offset = isNaN(parseInt(offsetString))
                    ? (document.querySelector(offsetString) as HTMLElement)
                        ? (document.querySelector(offsetString) as HTMLElement)?.offsetHeight
                        : 0
                    : parseInt(offsetString);
                this.scroll(targetElement, offset);
            });
        });
    },
    scroll(target?: HTMLElement, offset: number = 0): void {
        const header = document.querySelector('header') as HTMLElement;
        const headerHeight = header.offsetHeight || 0;
        const { offsetRatio = 1, Element } = options as options;
        const element = (target as HTMLElement) || (Element as HTMLElement);
        const top = element?.offsetTop || element?.getBoundingClientRect()?.top - document.body.getBoundingClientRect().top || 0;
        if (top) window.scrollTo({ top: top * offsetRatio - headerHeight - offset, behavior: 'smooth' });
    }
});
