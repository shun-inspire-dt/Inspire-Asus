import { Collapse } from 'bootstrap';
import './useBsCollapse.scss';

export const useBsCollapse = (element: string | Element, options?: Partial<Collapse.Options> | undefined) =>
    new Collapse(element, options);
