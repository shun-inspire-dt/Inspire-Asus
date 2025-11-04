export type NavsDataChild = {
    id?: string;
    className?: any;
    title: string;
    subTitle?: string;
    link: string;
    attribute?: attribute;
    children?: NavsDataChild;
}[];
export type NavsData = {
    id?: string;
    title?: string;
    subTitle?: string;
    link?: string;
    className?: any;
    attribute?: attribute;
    children?: NavsDataChild;
}[];

export const NavsData: NavsData = [
    {
        title: '關於我們',
        subTitle: 'ABOUT',
        link: '/aboutus'
    },
    {
        title: '購物商城',
        subTitle: 'SHOP',
        link: '/products'
    },
    {
        title: '最新消息',
        subTitle: 'NEWS',
        link: '/news'
    },
    {
        title: '聯絡我們',
        subTitle: 'CONTACT',
        link: '/contactus'
    },
    {
        title: '會員專區',
        subTitle: 'MEMBER',
        link: '/member/profile',
        children: [
            {
                title: '個人資訊',
                link: '/member/profile'
            },
            {
                title: '訂單列表',
                link: '/member/orders'
            },
            {
                title: '團購專區',
                link: '/member/group'
            },
            {
                title: '折價券',
                link: '/member/coupon'
            },
            {
                title: '購物金',
                link: '/member/points'
            },
            {
                title: '快速查看訂單',
                link: '#',
                attribute: {
                    'data-bs-toggle': 'modal',
                    'data-bs-target': '#OrdersSearchModal',
                    'data-dismiss': 'offcanvas'
                }
            },
            {
                title: '登入',
                link: '#',
                attribute: {
                    'data-bs-toggle': 'modal',
                    'data-bs-target': '#LoginModal',
                    'data-dismiss': 'offcanvas'
                }
            },
            {
                title: '註冊',
                link: '#',
                attribute: {
                    'data-bs-toggle': 'modal',
                    'data-bs-target': '#RegisterModal',
                    'data-dismiss': 'offcanvas'
                }
            },
            {
                title: '登出',
                link: '#',
                className: 'LogOutButton',
                attribute: {
                    'data-dismiss': 'offcanvas'
                }
            },
        ]
    }
];
