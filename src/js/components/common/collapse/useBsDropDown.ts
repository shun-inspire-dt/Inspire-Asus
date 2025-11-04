import { Dropdown } from 'bootstrap';
import './useBsDropDown.scss';

export const useBsDropDown = (element: string | Element, options?: Partial<Dropdown.Options> | undefined) =>
    new Dropdown(element, options);