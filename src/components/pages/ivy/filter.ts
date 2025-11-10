export const child1: filter = [
    { label: '科技與製造產業(1)', value: 'tech-manufacturing', name: 'industry', checked: false },
    { label: '零售與電商產業(5)', value: 'retail-ecommerce', name: 'industry', checked: false },
    { label: '餐飲與連鎖服務產業(2)', value: 'food-service', name: 'industry', checked: false },
    { label: '醫療與照護產業(2)', value: 'healthcare', name: 'industry', checked: false },
    { label: '教育與訓練產業(1)', value: 'education', name: 'industry', checked: false },
    { label: '建築與工程產業(1)', value: 'construction', name: 'industry', checked: false },
    { label: '旅宿與觀光產業(1)', value: 'hospitality', name: 'industry', checked: false },
    { label: '顧問服務產業(1)', value: 'consulting', name: 'industry', checked: false },
];

export const child2: filter = [
    { label: '北部地區(1)', value: 'north', name: 'region', checked: false },
    { label: '中部地區(1)', value: 'central', name: 'region', checked: false },
    { label: '南部地區(1)', value: 'south', name: 'region', checked: false },
    { label: '東部地區(10)', value: 'east', name: 'region', checked: false },
    { label: '離島地區(100)', value: 'islands', name: 'region', checked: false },
];

export const data: category = [
    {
        title: '產業類別',
        show: true,
        more: true,
        children: child1,
    },
    {
        title: '服務地區',
        show: true,
        children: child2,
    },
];