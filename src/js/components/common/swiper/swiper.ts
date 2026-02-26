import type { SwiperOptions, PaginationOptions, NavigationOptions, SwiperModule } from 'swiper/types';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
/** Style */
/** libs swiper style */
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/**
 * 立即建立 Swiper 實例
 *
 * 自動從元素最近的 `.swiper-container` 中偵測 pagination 與 navigation DOM，
 * 完成後回傳 Swiper 實例。
 *
 * @param el - Swiper 根元素（DOM 元素或 CSS 選擇器字串）
 * @param opts - Swiper 設定選項（可選），會覆蓋自動偵測的 navigation/pagination
 * @returns Swiper 實例（元素不存在時回傳 `undefined`）
 *
 * @example
 * const swiper = mySwiper('.my-swiper', { loop: true });
 */
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

/**
 * 監聽自定義 `build.swiper` 事件來延遲建立 Swiper 實例
 *
 * 適用於元件需要在运行時接收動態設定（例如 slides 數量、breakpoints）的情況。
 * 內部使用 `setTimeout(···, 0)` 確保監聽器註冊後再回傳 Promise。
 *
 * @param el - Swiper 根元素（DOM 元素或 CSS 選擇器字串）
 * @param options - 預設 Swiper 設定選項（會被 `build.swiper` 事件的 `detail` 覆蓋）
 * @returns Promise， resolve 時備含 Swiper 實例（元素不存在時為 `undefined`）
 *
 * @example
 * // 在 Astro `<script>` 中使用
 * mySwiperListen(swiperEl, { modules: [A11y, Keyboard] });
 */
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