/** 導覽子項目的連結定義（二級選單項目） */
export type NavsDataChild = {
    id?: string;
    className?: any;
    title: string;
    subTitle?: string;
    link: string;
    linkText: string;
    attribute?: attribute;
    children?: {
        title: string;
        links: { link?: string; linkText: string }[][];
    }[];
}[];
/** 頂層導覽項目定義（一級選單） */
export type NavsData = {
    id?: string;
    title?: string;
    subTitle?: string;
    link?: string;
    className?: any;
    attribute?: attribute;
    children?: NavsDataChild;
}[];

/** 全站主導覽資料，供 Header Nav 元件消費 */
export const NavsData: NavsData = [
    {
        title: '解決方案',
        link: '/solution',
        children: [
            {
                title: '解決方案',
                subTitle: '選擇 ASUS Business，不只是選擇技術，更是選擇可靠的合作夥伴。我們以創新、穩定與安全為核心，助力企業持續成長。',
                linkText: '探索解決方案',
                link: '/solution',
                children: [
                    {
                        title: '依產業', links: [
                            [{ linkText: '科技與製造' }, { linkText: '零售與電商' }, { linkText: '餐飲與連鎖服務' }, { linkText: '医療與照護' }, { linkText: '科技照護設備及智慧居家系統' }],
                            [{ linkText: '教育與訓練' }, { linkText: '建築與工程' }, { linkText: '旅宿與觀光' }, { linkText: '顧問服務' }, { linkText: '策略規劃與企業流程再造' }]
                        ]
                    },
                    {
                        title: '依企業規模', links: [
                            [{ linkText: '微型 (1-10人)' }, { linkText: '小型 (10-49人)' }, { linkText: '中型 (50-199人)' }, { linkText: '大型 (200-500人)' }],
                            [{ linkText: '巨型 (500人以上)' }, { linkText: '全球企業 (超過五百名以上)' }],
                        ]
                    }
                ]
            }
        ]
    },
    {
        title: '合作夥伴',
        link: '/ivy',
        children: [
            {
                title: '合作夥伴',
                subTitle: '我們與各領域的專業夥伴攜手合作，建立跨產業的生態系，為企業提供更完整、更具價值的解決方案。',
                linkText: '探索合作夥伴',
                link: '/ivy',
                children: [
                    {
                        title: '依照類型', links: [
                            [{ linkText: '雲端與基礎設施' }, { linkText: '資安與合規服務' }, { linkText: '企業系統導入整合' }, { linkText: '應用開發與客製化' }],
                            [{ linkText: '數據分析與智能應用' }, { linkText: '顧問與專案交付服務' }, { linkText: 'IT資源與資產服務' }]
                        ]
                    },
                    {
                        title: '依服務地區', links: [
                            [{ linkText: '北部地區' }, { linkText: '中部地區' }, { linkText: '南部地區' }, { linkText: '東部地區' }],
                            [{ linkText: '離島地區' }],
                        ]
                    }
                ]
            }
        ]
    },
    {
        title: '成功案例',
        link: '/success'
    },
    {
        title: '最新消息',
        link: '/news'
    },
    {
        title: '關於我們',
        link: '/aboutus'
    },
];
