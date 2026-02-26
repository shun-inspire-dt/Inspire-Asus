import { Dropdown } from 'bootstrap';
import './useBsDropDown.scss';

/**
 * 建立 Bootstrap Dropdown 實例
 *
 * @param element - 觸發下拉選單的 DOM 元素或 CSS 選擇器字串
 * @param options - Bootstrap Dropdown 設定選項（可選）
 * @returns Bootstrap Dropdown 實例
 *
 * @example
 * const dropdown = useBsDropDown('#myDropdown');
 */
export const useBsDropDown = (element: string | Element, options?: Partial<Dropdown.Options> | undefined) =>
    new Dropdown(element, options);