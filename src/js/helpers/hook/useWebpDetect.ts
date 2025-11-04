import '@scss/components/background/background-image.scss';

export const useWebpDetect = () => {
    window.addEventListener('DOMContentLoaded', async () => {
        const detectWebp = (): Promise<boolean> =>
            new Promise((resolve) => {
                const imgSrc =
                    'data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA';
                const pixel = new Image();
                pixel.addEventListener('load', () => {
                    const isSuccess = pixel.width > 0 && pixel.height > 0;
                    resolve(isSuccess);
                });
                pixel.addEventListener('error', () => {
                    resolve(false);
                });
                pixel.setAttribute('src', imgSrc);
            });

        const hasSupport = await detectWebp();
        [...document.querySelectorAll('.bg-default')].map((x: Element) => {
            x.classList.add(hasSupport ? 'webp' : 'no-webp');
        });
    });
};
