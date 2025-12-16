import type { SwiperOptions, PaginationOptions, NavigationOptions, SwiperModule } from 'swiper/types';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
/** Style */
/** libs swiper style */
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const mySwiper = <E extends HTMLElement>(el: string | E, opts?: Partial<SwiperOptions>) => {
    if (el) {
        let navigation: NavigationOptions = {};
        let pagination: PaginationOptions = {};
        const element = typeof el === 'string' ? (document.querySelector(el) as HTMLElement) : el;
        const container = element?.closest('.swiper-container') as HTMLElement;

        if (container) {
            const paginationEl = container?.querySelector('.swiper-pagination') as HTMLElement;
            if (paginationEl) {
                pagination = {
                    el: paginationEl,
                    clickable: true
                };
            }
            const navigationEl = container?.querySelector('.swiper-buttons') as HTMLElement;
            if (navigationEl) {
                const nextEl = navigationEl.querySelector('.swiper-button-next') as HTMLButtonElement;
                const prevEl = navigationEl.querySelector('.swiper-button-prev') as HTMLButtonElement;
                navigation = {
                    nextEl,
                    prevEl
                };
            }
        }

        return new Swiper(el, {
            ...opts,
            modules: [Navigation, Pagination, ...((opts?.modules as SwiperModule[]) ?? [])],
            ...{ navigation: opts?.navigation ? opts.navigation : navigation },
            ...{ pagination: opts?.pagination ? opts?.pagination : pagination }
        });
    }
};

export const mySwiperListen = <E extends HTMLElement>(el: string | E, options?: Partial<SwiperOptions>): Promise<Swiper | undefined> => {
    return new Promise((resolve) => {
        const swiper = el && typeof el === 'string' ? document.querySelector(el) as HTMLElement : el as HTMLElement;
        let instance: Swiper | undefined;
        if (swiper) {
            swiper.addEventListener('build.swiper', (e) => {
                const event = e as CustomEvent<Partial<SwiperOptions>>;
                const opts = event.detail;
                instance = mySwiper(swiper, {...options, ...opts});
            });
            // 使用 nextTick 確保監聽器已經註冊
            setTimeout(() => resolve(instance), 0);
        } else {
            resolve(undefined);
        }
    });
}