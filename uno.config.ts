import { defineConfig } from 'unocss';

export default defineConfig({
    shortcuts: {
        // TT Norms Pro Medium 字體組合
        'tt-md-13': 'font-tt-medium text-13 leading-13 tracking-0 font-medium',
        'tt-md-14': 'font-tt-medium text-14 leading-14 tracking-0 font-medium',
        'tt-md-16': 'font-tt-medium text-16 leading-16 tracking-0 font-medium',
        'tt-md-18': 'font-tt-medium text-18 leading-18 tracking-0 font-medium',
        'tt-md-20': 'font-tt-medium text-20 leading-20 tracking-0 font-medium',
        'tt-md-24': 'font-tt-medium text-24 leading-24 tracking-0 font-medium',
        'tt-md-30': 'font-tt-medium text-30 leading-30 tracking-0 font-medium',
        'tt-md-36': 'font-tt-medium text-36 leading-36 tracking-0 font-medium',
        'tt-md-44': 'font-tt-medium text-44 leading-44 tracking-0 font-medium',
        'tt-md-52': 'font-tt-medium text-52 leading-52 tracking-0 font-medium',
        'tt-md-64': 'font-tt-medium text-64 leading-64 font-medium',
        'tt-md-72': 'font-tt-medium text-72 leading-72 font-medium',

        // TT Norms Pro Normal 字體組合
        'tt-nr-13': 'font-tt-normal text-13 leading-13 tracking-0 font-normal',
        'tt-nr-14': 'font-tt-normal text-14 leading-14 tracking-0 font-normal',
        'tt-nr-16': 'font-tt-normal text-16 leading-16 tracking-0 font-normal',
        'tt-nr-18': 'font-tt-normal text-18 leading-18 tracking-0 font-normal',
        'tt-nr-20': 'font-tt-normal text-20 leading-20 tracking-0 font-normal',
        'tt-nr-24': 'font-tt-normal text-24 leading-24 tracking-0 font-normal',

        // TT Norms Pro Normal 短行高版本
        'tt-nr-14-sh': 'font-tt-normal text-14 leading-14-sh tracking-0 font-normal',
        'tt-nr-16-sh': 'font-tt-normal text-16 leading-16-sh tracking-0 font-normal',
        'tt-nr-18-sh': 'font-tt-normal text-18 leading-18-sh tracking-0 font-normal',
        'tt-nr-20-sh': 'font-tt-normal text-20 leading-20-sh tracking-0 font-normal',

        // Roboto Bold 字體組合
        'ro-bd-13': 'font-roboto text-13 leading-13 tracking-0 font-bold',
        'ro-bd-14': 'font-roboto text-14 leading-14 tracking-0 font-bold',
        'ro-bd-16': 'font-roboto text-16 leading-16 tracking-0 font-bold',
        'ro-bd-18': 'font-roboto text-18 leading-18 tracking-0 font-bold',
        'ro-bd-20': 'font-roboto text-20 leading-20 tracking-0 font-bold',
        'ro-bd-24': 'font-roboto text-24 leading-24 tracking-0 font-bold',

        // Roboto Medium 字體組合
        'ro-md-13': 'font-roboto text-13 leading-13 tracking-0 font-medium',
        'ro-md-14': 'font-roboto text-14 leading-14 tracking-0 font-medium',
        'ro-md-16': 'font-roboto text-16 leading-16 tracking-0 font-medium',
        'ro-md-18': 'font-roboto text-18 leading-18 tracking-0 font-medium',
        'ro-md-20': 'font-roboto text-20 leading-20 tracking-0 font-medium',
        'ro-md-24': 'font-roboto text-24 leading-24 tracking-0 font-medium',

        // Roboto Regular 字體組合
        'ro-rg-13': 'font-roboto text-13 leading-13 tracking-0 font-normal',
        'ro-rg-14': 'font-roboto text-14 leading-14 tracking-0 font-normal',
        'ro-rg-16': 'font-roboto text-16 leading-16 tracking-0 font-normal',
        'ro-rg-18': 'font-roboto text-18 leading-18 tracking-0 font-normal',
        'ro-rg-20': 'font-roboto text-20 leading-20 tracking-0 font-normal',
        'ro-rg-24': 'font-roboto text-24 leading-24 tracking-0 font-normal',

        // === Semantics Typography ===
        // Label 系列
        'label-01': 'font-roboto text-12 leading-12 tracking-0 font-normal',
        'label-02': 'font-roboto text-13 leading-13 tracking-0 font-normal',
        'label-03': 'font-roboto text-14 leading-14 tracking-0 font-normal',

        // Body 系列
        'body-00-sh': 'font-roboto text-13 leading-13 tracking-0 font-normal',
        'body-01': 'font-roboto text-14 leading-14 tracking-0 font-normal',
        'body-01-sh': 'font-roboto text-14 leading-14-sh tracking-0 font-normal',
        'body-02': 'font-roboto text-16 leading-16 tracking-0 font-normal',
        'body-02-sh': 'font-roboto text-16 leading-16-sh tracking-0 font-normal',
        'body-03': 'font-roboto text-18 leading-18 tracking-0 font-normal',
        'body-03-sh': 'font-roboto text-18 leading-18-sh tracking-0 font-normal',
        'body-04': 'font-roboto text-20 leading-20 tracking-0 font-normal',
        'body-04-sh': 'font-roboto text-20 leading-20-sh tracking-0 font-normal',

        // Body Strong 系列
        'body-01-strong': 'font-roboto text-14 leading-14 tracking-0 font-medium',
        'body-02-strong': 'font-roboto text-16 leading-16 tracking-0 font-medium',
        'body-03-strong': 'font-roboto text-18 leading-18 tracking-0 font-medium',
        'body-04-strong': 'font-roboto text-20 leading-20 tracking-0 font-medium',

        // Heading 系列
        'heading-01': 'font-tt-medium text-20 leading-20 tracking-0 font-medium',
        'heading-02': 'font-tt-medium text-24 leading-24 tracking-0 font-medium',
        'heading-03': 'font-tt-medium text-30 leading-30 tracking-0 font-medium',
        'heading-04': 'font-tt-medium text-36 leading-36 tracking-0 font-medium',
        'heading-05': 'font-tt-medium text-44 leading-44 tracking-0 font-medium',
        'heading-06': 'font-tt-medium text-52 leading-52 tracking-0 font-medium',

        // Heading Short 系列
        'heading-00-sh': 'font-roboto text-13 leading-13 tracking-0 font-medium',
        'heading-01-sh': 'font-roboto text-14 leading-14 tracking-0 font-medium',
        'heading-02-sh': 'font-roboto text-16 leading-16 tracking-0 font-medium',
        'heading-03-sh': 'font-roboto text-18 leading-18 tracking-0 font-medium',
        'heading-04-sh': 'font-roboto text-20 leading-20 tracking-0 font-medium',

        // spacing 系列
        'sect-p-xl': 'pt-7.5rem pb-7.5rem',
        'sect-p-lg': 'pt-5rem pb-5rem',
        'sect-p-md': 'pt-4rem pb-4rem',
        'sect-p-sm': 'pt-3rem pb-3rem',
        'sect-p-xl-t': 'pt-7.5rem',
        'sect-p-lg-t': 'pt-5rem',
        'sect-p-md-t': 'pt-4rem',
        'sect-p-sm-t': 'pt-3rem',
        'sect-p-xl-b': 'pb-7.5rem',
        'sect-p-lg-b': 'pb-5rem',
        'sect-p-md-b': 'pb-4rem',
        'sect-p-sm-b': 'pb-3rem',
        'sect-p-sub-xl-t': 'pt-7.5rem pb-5rem',
        'sect-p-sub-xl-b': 'pt-5rem pb-7.5rem',
        'sect-p-sub-lg-t': 'pt-5rem pb-4rem',
        'sect-p-sub-lg-b': 'pt-4rem pb-5rem',
        'sect-p-sub-md-t': 'pt-4rem pb-3rem',
        'sect-p-sub-md-b': 'pt-3rem pb-4rem',
        'sect-p-sub-sm-t': 'pt-3rem pb-2rem',
        'sect-p-sub-sm-b': 'pt-2rem pb-3rem',

        // 自定義 container 規則
        'container-fluid': 'w-full sm:w-[87.5%] max-w-1260px mx-auto px-4 sm:px-0',
        'underline-offset-3': 'underline-offset-[var(--underline-offset)]',
        'bar': 'w-0.0625rem h-1lh bg-gray-200',
        'bar-sm': 'w-0.0625rem h-1lh py-0.0625rem bg-gray-200',
        'bar-c': 'h-full'
    },
    rules: [
        ['padding-tablet', { 'padding-left': 'var(--screen-tablet-padding-x)', 'padding-right': 'var(--screen-tablet-padding-x)' }],
        // 自定義 text-size 規則
        [/^text-(\d+)$/, ([, size]) => ({ 'font-size': `var(--fs-${size})` })],
        [/^text-(xs|sm|base|subtitle|h[1-6]|display-(?:sm|lg))$/, ([, size]) => ({ 'font-size': `var(--fs-${size})` })]
    ],
    theme: {
        breakpoints: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '1440': '1440px',
            '2xl': '1536px'
        },
        colors: {
            // 黑色系列
            black: {
                DEFAULT: 'var(--color-black)',
                '6': 'var(--color-black-6)',
                '16': 'var(--color-black-16)',
                '40': 'var(--color-black-40)',
                '50': 'var(--color-black-50)',
                '68': 'var(--color-black-68)',
                '70': 'var(--color-black-70)',
                '80': 'var(--color-black-80)',
                '85': 'var(--color-black-85)'
            },
            // 深色系列
            dark: {
                DEFAULT: 'var(--color-dark)',
                '80': 'var(--color-dark-80)'
            },
            // 白色系列
            white: {
                DEFAULT: 'var(--color-white)',
                '0': 'var(--color-white-0)',
                '10': 'var(--color-white-10)',
                '20': 'var(--color-white-20)',
                '40': 'var(--color-white-40)',
                '50': 'var(--color-white-50)',
                '60': 'var(--color-white-60)',
                '70': 'var(--color-white-70)',
                '90': 'var(--color-white-90)'
            },
            // Slate 顏色系列
            slate: {
                '50': 'var(--color-slate-50)',
                '100': 'var(--color-slate-100)',
                '200': 'var(--color-slate-200)',
                '300': 'var(--color-slate-300)',
                '400': 'var(--color-slate-400)',
                '500': 'var(--color-slate-500)',
                '600': 'var(--color-slate-600)',
                '700': 'var(--color-slate-700)',
                '800': 'var(--color-slate-800)',
                '900': 'var(--color-slate-900)',
                '950': 'var(--color-slate-950)'
            },
            // Neutral 顏色系列
            neutral: {
                '50': 'var(--color-neutral-50)',
                '100': 'var(--color-neutral-100)',
                '200': 'var(--color-neutral-200)',
                '300': 'var(--color-neutral-300)',
                '400': 'var(--color-neutral-400)',
                '500': 'var(--color-neutral-500)',
                '600': 'var(--color-neutral-600)',
                '700': 'var(--color-neutral-700)',
                '800': 'var(--color-neutral-800)',
                '900': 'var(--color-neutral-900)',
                '950': 'var(--color-neutral-950)'
            },
            // Gray 顏色系列
            gray: {
                '50': 'var(--color-gray-50)',
                '100': 'var(--color-gray-100)',
                '200': 'var(--color-gray-200)',
                '300': 'var(--color-gray-300)',
                '300_10': 'var(--color-gray-300-10)',
                '400': 'var(--color-gray-400)',
                '500': 'var(--color-gray-500)',
                '600': 'var(--color-gray-600)',
                '700': 'var(--color-gray-700)',
                '700_64': 'var(--color-gray-700-64)',
                '700_78': 'var(--color-gray-700-78)',
                '800': 'var(--color-gray-800)',
                '900': 'var(--color-gray-900)',
                '900_68': 'var(--color-gray-900-68)',
                '950': 'var(--color-gray-950)'
            },
            // Blue 顏色系列
            blue: {
                '50': 'var(--color-blue-50)',
                '100': 'var(--color-blue-100)',
                '200': 'var(--color-blue-200)',
                '300': 'var(--color-blue-300)',
                '400': 'var(--color-blue-400)',
                '400_30': 'var(--color-blue-400-30)',
                '500': 'var(--color-blue-500)',
                '500_10': 'var(--color-blue-500-10)',
                '600': 'var(--color-blue-600)',
                '700': 'var(--color-blue-700)',
                '800': 'var(--color-blue-800)',
                '900': 'var(--color-blue-900)',
                '950': 'var(--color-blue-950)'
            },
            // Green 顏色系列
            green: {
                '50': 'var(--color-green-50)',
                '100': 'var(--color-green-100)',
                '200': 'var(--color-green-200)',
                '300': 'var(--color-green-300)',
                '400': 'var(--color-green-400)',
                '500': 'var(--color-green-500)',
                '600': 'var(--color-green-600)',
                '700': 'var(--color-green-700)',
                '800': 'var(--color-green-800)',
                '900': 'var(--color-green-900)',
                '950': 'var(--color-green-950)'
            },
            // Orange 顏色系列
            orange: {
                '50': 'var(--color-orange-50)',
                '100': 'var(--color-orange-100)',
                '200': 'var(--color-orange-200)',
                '300': 'var(--color-orange-300)',
                '400': 'var(--color-orange-400)',
                '500': 'var(--color-orange-500)',
                '600': 'var(--color-orange-600)',
                '700': 'var(--color-orange-700)',
                '800': 'var(--color-orange-800)',
                '900': 'var(--color-orange-900)',
                '950': 'var(--color-orange-950)'
            },
            // Red 顏色系列
            red: {
                '50': 'var(--color-red-50)',
                '100': 'var(--color-red-100)',
                '200': 'var(--color-red-200)',
                '300': 'var(--color-red-300)',
                '400': 'var(--color-red-400)'
            },
            // 品牌色
            microsoft: {
                blue: 'var(--microsoft-blue)',
                green: 'var(--microsoft-green)',
                red: 'var(--microsoft-red)',
                yellow: 'var(--microsoft-yellow)'
            },
            google: {
                blue: 'var(--google-blue)',
                green: 'var(--google-green)',
                red: 'var(--google-red)',
                yellow: 'var(--google-yellow)'
            },
            asus: {
                black: 'var(--asus-black)',
                'blur-dark': 'var(--asus-blur-dark)',
                blue: 'var(--asus-blue)',
                'blue-light': 'var(--asus-blue-light)',
                green: 'var(--asus-green)',
                'green-light': 'var(--asus-green-light)',
                'green-dark': 'var(--asus-green-dark)'
            },
            // 其他品牌色
            cyan: {
                '500': 'var(--color-cyan-500)',
                '700': 'var(--color-cyan-700)'
            },
            // 社群媒體品牌色
            facebook: 'var(--color-facebook)',
            linkin: 'var(--color-linkin)',
            line: 'var(--color-line)',
            youtube: 'var(--color-youtube)',
            apple: 'var(--color-apple)',
            instagram: 'var(--color-instgram)',
            // Badge 顏色
            badge: {
                'light-outline': 'var(--badge-light-outline)',
                'dark-standard-bg': 'var(--badge-dark-standard-bg)',
                'dark-outline': 'var(--badge-dark-outline)',
                'danger-bg': 'var(--badge-danger-bg)',
                'danger-stroke': 'var(--badge-danger-stroke)',
                'danger-text': 'var(--badge-danger-text)',
                'dark-danger-stroke': 'var(--badge-dark-danger-stroke)',
                'dark-danger-bg': 'var(--badge-dark-danger-bg)',
                'dark-accent-bg': 'var(--badge-dark-accent-bg)'
            }
        },
        lineHeight: {
            // 基礎行高
            '12': 'var(--line-height-12)',
            '13': 'var(--line-height-13)',
            '14': 'var(--line-height-14)',
            '14-sh': 'var(--line-height-14-sh)',
            '16': 'var(--line-height-16)',
            '16-sh': 'var(--line-height-16-sh)',
            '18': 'var(--line-height-18)',
            '18-sh': 'var(--line-height-18-sh)',
            '20': 'var(--line-height-20)',
            '20-sh': 'var(--line-height-20-sh)',
            '24': 'var(--line-height-24)',
            '30': 'var(--line-height-30)',
            '36': 'var(--line-height-36)',
            '44': 'var(--line-height-44)',
            '52': 'var(--line-height-52)',
            '64': 'var(--line-height-64)',
            '72': 'var(--line-height-72)',
            // 百分比行高
            '100': 'var(--line-height-100)',
            '120': 'var(--line-height-120)',
            '125': 'var(--line-height-125)',
            '133': 'var(--line-height-133)',
            '140': 'var(--line-height-140)',
            '150': 'var(--line-height-150)',
            '155': 'var(--line-height-155)',
            '160': 'var(--line-height-160)',
            '180': 'var(--line-height-180)',
            // 預設行高
            DEFAULT: 'var(--line-height)'
        },
        fontSize: {
            // 基礎字體大小
            '12': 'var(--fs-12)',
            '13': 'var(--fs-13)',
            '14': 'var(--fs-14)',
            '16': 'var(--fs-16)',
            '18': 'var(--fs-18)',
            '20': 'var(--fs-20)',
            '24': 'var(--fs-24)',
            '30': 'var(--fs-30)',
            '36': 'var(--fs-36)',
            '44': 'var(--fs-44)',
            '52': 'var(--fs-52)',
            '64': 'var(--fs-64)',
            '72': 'var(--fs-72)',
            // 語義化字體大小
            xs: 'var(--fs-xs)',
            sm: 'var(--fs-sm)',
            base: 'var(--fs-base)',
            subtitle: 'var(--fs-subtitle)',
            h6: 'var(--fs-h6)',
            h5: 'var(--fs-h5)',
            h4: 'var(--fs-h4)',
            h3: 'var(--fs-h3)',
            h2: 'var(--fs-h2)',
            h1: 'var(--fs-h1)',
            'display-sm': 'var(--fs-display-sm)',
            'display-lg': 'var(--fs-display-lg)'
        },
        fontWeight: {
            '400': '400',
            '450': '450',
            '500': '500',
            '600': '600',
            '700': '700',
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700'
        },
        fontFamily: {
            // 字體家族
            'tt-normal': 'var(--font-family-tt-norms-pro-normal)',
            'tt-medium': 'var(--font-family-tt-norms-pro-medium)',
            roboto: 'var(--font-family-roboto)',
            // 預設字體
            DEFAULT: 'var(--font-family)'
        },
        letterSpacing: {
            // 字母間距
            '0': 'var(--letter-spacing)',
            DEFAULT: 'var(--letter-spacing)'
        }
    },
    content: {
        pipeline: {
            exclude: [/.*\/bootstrap\.scss(.*)?$/, /.*\/swiper\.css(.*)?$/]
        }
    }
});
