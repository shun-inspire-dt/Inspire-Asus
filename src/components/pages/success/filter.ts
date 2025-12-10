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

export const data: category = [
    {
        title: '產業類別',
        show: true,
        more: true,
        children: child1,
    }
];