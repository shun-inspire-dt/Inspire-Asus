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
    { label: 'AWS (1)', value: 'aws', name: 'theme', checked: false },
    { label: 'GCP (1)', value: 'gcp', name: 'theme', checked: false },
    { label: '雲端運算 (1)', value: 'cloud-computing', name: 'theme', checked: false },
    { label: 'AI發展 (1)', value: 'ai-development', name: 'theme', checked: false },
];

export const data: category = [
    {
        title: '產業類別',
        show: true,
        more: true,
        children: child1,
    },
    {
        title: '主題類別',
        show: true,
        children: child2,
    },
];