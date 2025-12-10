export const child1: filter = [
    { label: '科技與製造產業', value: 'tech-manufacturing', name: 'industry', checked: false, count: 1 },
    { label: '零售與電商產業', value: 'retail-ecommerce', name: 'industry', checked: false, count: 5 },
    { label: '餐飲與連鎖服務產業', value: 'food-service', name: 'industry', checked: false, count: 2 },
    { label: '醫療與照護產業', value: 'healthcare', name: 'industry', checked: false, count: 2 },
    { label: '教育與訓練產業', value: 'education', name: 'industry', checked: false, count: 1 },
    { label: '建築與工程產業', value: 'construction', name: 'industry', checked: false, count: 1 },
    { label: '旅宿與觀光產業', value: 'hospitality', name: 'industry', checked: false, count: 1 },
    { label: '顧問服務產業', value: 'consulting', name: 'industry', checked: false, count: 1 },
];

export const child2: filter = [
    { label: '微型（1-10人）', value: 'micro', name: 'size', checked: false },
    { label: '小型（10-49人）', value: 'small', name: 'size', checked: false },
    { label: '中型（50-199人）', value: 'medium', name: 'size', checked: false },
    { label: '大型（200 人-500人）', value: 'large', name: 'size', checked: false },
    { label: '巨型（500人以上）', value: 'enterprise', name: 'size', checked: false },
];

export const data: category = [
    {
        title: '產業類別',
        show: true,
        children: child1,
    },
    {
        title: '主題類別',
        show: true,
        children: child2,
    },
];