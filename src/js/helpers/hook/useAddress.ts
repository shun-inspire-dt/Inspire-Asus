/** Components */
import { setSelect } from '@js/components/common/select/customSelect';
import TW from '@js/data/address/counties-tw.json';

export type InputSelector = HTMLInputElement | HTMLSelectElement | string;

export const useAddress = {
    /**
     * 建立「區域」選項
     * @param county county 的 select
     * @param districts districts 的 select
     */
    setDistricts: (county: HTMLSelectElement, districts: HTMLSelectElement) => {
        const selectCounty = county.value;
        const countyIndex = TW?.counties?.findIndex((x: string) => x === selectCounty);
        const targetDistricts = TW?.districts?.[countyIndex]?.[0] ?? [];
        const template = targetDistricts.map((x: string) => `<option value="${x}">${x}</option>`);

        if (districts) {
            districts.value = '';
            districts.innerHTML = `
                    <option value="" selected>區域</option>
                    ${template.join('')}
                `;
        }
    },
    /**
     * 縣市被選擇時，建立「區域」選項
     * @param selecter county 的 select
     * @param target districts 的 select
     */
    counties(selecter: InputSelector, target: InputSelector) {
        const realSelecter =
            typeof selecter === 'string'
                ? (document.querySelector(selecter) as HTMLSelectElement)
                : (selecter as HTMLSelectElement);
        const realTarget =
            typeof target === 'string' ? (document.querySelector(target) as HTMLSelectElement) : (target as HTMLSelectElement);
        realSelecter?.addEventListener('change', (e: Event) => {
            this.setDistricts(e.target as HTMLSelectElement, realTarget);
        });
    },
    setZip: (districts: HTMLSelectElement, county: HTMLSelectElement, zip: HTMLInputElement) => {
        const selectCounty = county.value;
        const selectDistrict = districts.value;
        const countyIndex = TW?.counties?.findIndex((x: string) => x === selectCounty);
        const targetDistricts = TW?.districts?.[countyIndex]?.[0];
        const districtIndex = targetDistricts?.findIndex((x: string) => x === selectDistrict);
        const targetZip = TW?.districts?.[countyIndex]?.[1]?.[districtIndex] ?? '';

        if (zip) zip.value = targetZip;
    },
    districts(selecter: InputSelector, countyTarget: InputSelector, zipTarget: InputSelector) {
        const realSelecter =
            typeof selecter === 'string'
                ? (document.querySelector(selecter) as HTMLSelectElement)
                : (selecter as HTMLSelectElement);
        const realCountyTarget =
            typeof countyTarget === 'string'
                ? (document.querySelector(countyTarget) as HTMLSelectElement)
                : (countyTarget as HTMLSelectElement);
        const realZipTarget =
            typeof zipTarget === 'string'
                ? (document.querySelector(zipTarget) as HTMLInputElement)
                : (zipTarget as HTMLInputElement);
        realSelecter?.addEventListener('change', (e: Event) => {
            this.setZip(e.target as HTMLSelectElement, realCountyTarget, realZipTarget);
        });
    },
    initialize: (countyTarget: InputSelector, districtTarget: InputSelector) => {
        const countySelecter =
            typeof countyTarget === 'string'
                ? (document.querySelector(countyTarget) as HTMLSelectElement)
                : (countyTarget as HTMLSelectElement);
        const districtSelecter =
            typeof districtTarget === 'string'
                ? (document.querySelector(districtTarget) as HTMLSelectElement)
                : (districtTarget as HTMLSelectElement);
        const Evt = new Event('change');

        if (countySelecter && countySelecter.value) {
            countySelecter.dispatchEvent(Evt);
            if (districtSelecter && districtSelecter.getAttribute('value')) {
                setTimeout(() => {
                    districtSelecter.value = districtSelecter.getAttribute('value') as string;
                    districtSelecter.dispatchEvent(Evt);
                }, 100);
            }
        }
    }
};

export const useAddressByCustomSelect = {
    counties: (selecter: InputSelector, target: InputSelector) => {
        const realSelecter =
            typeof selecter === 'string'
                ? (document.querySelector(selecter) as HTMLSelectElement)
                : (selecter as HTMLSelectElement);
        const realTarget =
            typeof target === 'string' ? (document.querySelector(target) as HTMLSelectElement) : (target as HTMLSelectElement);

        if (realSelecter.classList.contains('custom-origin-select')) {
            setTimeout(() => {
                const parentNode = realSelecter.parentNode as HTMLElement;
                const realSelectItem = parentNode?.querySelectorAll('.select-items > div') as NodeListOf<HTMLElement>;
                [...realSelectItem].forEach((x) => {
                    x.addEventListener('click', () => {
                        useAddress.setDistricts(realSelecter, realTarget);
                        const targetParentNode = realTarget.parentNode as HTMLElement;
                        setSelect([targetParentNode]);
                    });
                });
            }, 1000);
        }
    },
    districts(selecter: InputSelector, countyTarget: InputSelector, zipTarget: InputSelector) {
        const realSelecter =
            typeof selecter === 'string'
                ? (document.querySelector(selecter) as HTMLSelectElement)
                : (selecter as HTMLSelectElement);
        const realCountyTarget =
            typeof countyTarget === 'string'
                ? (document.querySelector(countyTarget) as HTMLSelectElement)
                : (countyTarget as HTMLSelectElement);
        const realZipTarget =
            typeof zipTarget === 'string'
                ? (document.querySelector(zipTarget) as HTMLInputElement)
                : (zipTarget as HTMLInputElement);
        if (realSelecter.classList.contains('custom-origin-select')) {
            setTimeout(() => {
                const parentNode = realSelecter.parentNode as HTMLElement;
                const realSelectItem = parentNode?.querySelectorAll('.select-items > div') as NodeListOf<HTMLElement>;
                [...realSelectItem].forEach((x) => {
                    x.addEventListener('click', () => {
                        useAddress.setZip(realSelecter, realCountyTarget, realZipTarget);
                    });
                });
            }, 1000);
        }
    },
    initialize: (countyTarget: InputSelector, districtTarget: InputSelector) => {
        const countySelecter =
            typeof countyTarget === 'string'
                ? (document.querySelector(countyTarget) as HTMLSelectElement)
                : (countyTarget as HTMLSelectElement);
        const districtSelecter =
            typeof districtTarget === 'string'
                ? (document.querySelector(districtTarget) as HTMLSelectElement)
                : (districtTarget as HTMLSelectElement);

        useAddress.initialize(countyTarget, districtTarget);

        setTimeout(() => {
            const countyParentNode = countySelecter.parentNode as HTMLElement;
            setSelect([countyParentNode]);
            const districtParentNode = districtSelecter.parentNode as HTMLElement;
            setSelect([districtParentNode]);
        }, 300);
    }
};
