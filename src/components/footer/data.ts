export type dataType = {
    title: string;
    links: { link?: string; linkText: string, external?: boolean }[][];
}[];

export const data: dataType = [
    {
        title: '解決方案',
        links: [
            [
                { link: '/solutions?category=科技與製造', linkText: '科技與製造' },
                { link: '/solutions?category=教育與訓練', linkText: '教育與訓練' },
                { link: '/solutions?category=零售與電商', linkText: '零售與電商' },
                { link: '/solutions?category=建築與工程', linkText: '建築與工程' },
            ],
            [
                { link: '/solutions?category=餐飲與連鎖服務', linkText: '餐飲與連鎖服務' },
                { link: '/solutions?category=旅宿與觀光', linkText: '旅宿與觀光' },
                { link: '/solutions?category=醫療與照護', linkText: '醫療與照護' },
                { link: '/solutions?category=顧問服務', linkText: '顧問服務' },
            ],
        ],
    },
    {
        title: '服務',
        links: [
            [
                { link: '/ivy?category=雲端與基礎設施', linkText: '雲端與基礎設施' },
                { link: '/ivy?category=數據分析與智能應用', linkText: '數據分析與智能應用' },
                { link: '/ivy?category=資安與合規服務', linkText: '資安與合規服務' },
                { link: '/ivy?category=顧問與專案交付', linkText: '顧問與專案交付' },
            ],
            [
                { link: '/ivy?category=企業系統導入與整合', linkText: '企業系統導入與整合' },
                { link: '/ivy?category=IT資源與資產服務', linkText: 'IT資源與資產服務' },
                { link: '/ivy?category=應用開發與客製化', linkText: '應用開發與客製化' },
            ],
        ],
    },
    {
        title: '資源',
        links: [
            [
                { link: '/news', linkText: '最新消息' },
                { link: '/success', linkText: '成功案例' },
            ],
        ],
    },
    {
        title: '關於我們',
        links: [
            [
                { link: '/aboutus', linkText: '關於我們' },
                { link: '/contactus', linkText: '聯絡我們' },
                { link: 'https://www.asus.com/', linkText: '華碩官網', external: true },
            ],
        ],
    },
];