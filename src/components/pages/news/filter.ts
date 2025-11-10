export const child1: filter = [
    { label: '科技與製造產業(1)', value: '科技與製造產業', checked: false },
    { label: '零售與電商產業(5)', value: '零售與電商產業', checked: false },
    { label: '餐飲與連鎖服務產業(2)', value: '餐飲與連鎖服務產業', checked: false },
    { label: '醫療與照護產業(2)', value: '醫療與照護產業', checked: false },
    { label: '教育與訓練產業(1)', value: '教育與訓練產業', checked: false },
    { label: '建築與工程產業(1)', value: '建築與工程產業', checked: false },
    { label: '旅宿與觀光產業(1)', value: '旅宿與觀光產業', checked: false },
    { label: '顧問服務產業(1)', value: '顧問服務產業', checked: false },
];

export const child2: filter = [
    { label: 'AWS (1)', value: 'AWS', checked: false },
    { label: 'GCP (1)', value: 'GCP', checked: false },
    { label: '雲端運算 (1)', value: '雲端運算', checked: false },
    { label: 'AI發展 (1)', value: 'AI發展', checked: false },
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