export const GoTop = (selector: HTMLElement | string, option: ScrollToOptions = { top: 0, behavior: 'smooth' }) => {
    const hook = typeof selector === 'string' ? (document.querySelector(selector) as HTMLElement) : (selector as HTMLElement);
    hook?.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo(option);
    });
};