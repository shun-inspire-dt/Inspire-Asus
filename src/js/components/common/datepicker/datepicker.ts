/** Type */
import type { AirDatepickerOptions } from 'air-datepicker';
import AirDatepicker from 'air-datepicker';
import locale from 'air-datepicker/locale/en';
/** Style */
import 'air-datepicker/air-datepicker.css';
import './datepicker.scss';

export const DatePicker = <E extends HTMLInputElement>(el: string | E, opts?: Partial<AirDatepickerOptions>) => {
    if (el) {
        new AirDatepicker(el, {
            locale,
            firstDay: 1,
            dateFormat: 'yyyy-MM-dd',
            autoClose: true,
            keyboardNav: false,
            toggleSelected: false,
            prevHtml: `<svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 9.25781L8.75736 13.5005L13 17.7431" stroke="#A7856D"/>
            </svg>
            `,
            nextHtml: `<svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 17.7422L17.2426 13.4995L13 9.25691" stroke="#A7856D"/>
            </svg>
            `,
            navTitles: {
                days: 'MMMM yyyy'
            },
            ...opts
        });
    }
};
