/** Type */
import type { icons } from '@components/common/icons/icons.astro'

export type SocialMediaData = {
    title: string;
    icon: keyof typeof icons;
    color: string;
    link: string;
}[];
export const SocialMediaData: SocialMediaData = [
];
