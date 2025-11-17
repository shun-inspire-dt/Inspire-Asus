/** Type */
import type { iconMap } from "./acctSideNavTab.astro";

/**
 * 會員中心導航選單數據
 * 基於 Figma 設計：https://www.figma.com/design/9Fzbh26dt5lLnYTms25dbw/Asus-inspire-%E5%88%87%E7%89%88?node-id=2562-54782
 */

export interface NavItem {
    id: string;
    label: string;
    icon: keyof typeof iconMap;
    href?: string;
    hasSubmenu?: boolean;
    children?: SubNavItem[];
    isExpandable?: boolean;
}

export interface SubNavItem {
    id: string;
    label: string;
    href?: string;
}

/**
 * 會員中心主導航項目
 */
export const memberNavItems: NavItem[] = [
    {
        id: 'overview',
        label: '會員中心',
        icon: 'overview' as keyof typeof iconMap,
        href: '/member',
        hasSubmenu: false,
        isExpandable: false
    },
    {
        id: 'message-center',
        label: '訊息中心',
        icon: 'message' as keyof typeof iconMap,
        href: '/member/message-center',
        hasSubmenu: false,
        isExpandable: false
    },
    {
        id: 'account-settings',
        label: '帳戶設定',
        icon: 'setting' as keyof typeof iconMap,
        href: '',
        hasSubmenu: true,
        isExpandable: true,
        children: [
            {
                id: 'basic-info',
                label: '基本資料',
                href: '/member/basic-info'
            },
            {
                id: 'account-management',
                label: '帳號管理',
                href: '/member/account-management'
            },
            {
                id: 'update-password',
                label: '變更密碼',
                href: '/member/update-password'
            }
        ]
    },
    {
        id: 'my-order-aocc',
        label: '我的諮詢夾',
        icon: 'order-aocc' as keyof typeof iconMap,
        href: '/member/order-aocc',
        hasSubmenu: false,
        isExpandable: false
    },
    {
        id: 'my-wishlist',
        label: '我的收藏清單',
        icon: 'wishlist' as keyof typeof iconMap,
        href: '/member/my-wishlist',
        hasSubmenu: false,
        isExpandable: false
    }
];