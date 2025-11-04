/** Type */
import type { icons } from '@components/common/icons/icons.astro'

export type SocialMediaData = {
    title: string;
    icon: keyof typeof icons;
    color: string;
    link: string;
}[];
export const SocialMediaData: SocialMediaData = [
    {
        title: 'Facebook 粉絲專頁',
        icon: 'icon-fb' as keyof typeof icons,
        color: '--color-gold',
        link: ''
    },
    {
        title: 'Messenger 官方帳號',
        icon: 'icon-messager' as keyof typeof icons,
        color: '--color-gold',
        link: ''
    },
    {
        title: 'instgram',
        icon: 'icon-instagram' as keyof typeof icons,
        color: '--color-gold',
        link: ''
    },
    {
        title: 'Line 官方帳號',
        icon: 'icon-line' as keyof typeof icons,
        color: '--color-gold',
        link: ''
    },
    // {
    //     title: 'Linkedin',
    //     icon: 'icon-linkedin' as keyof typeof icons,
    //     color: '--color-linkin',
    //     link: ''
    // },
    // {
    //     title: 'Youtube',
    //     icon: 'icon-yt' as keyof typeof icons,
    //     color: '--color-youtube',
    //     link: ''
    // }
];
