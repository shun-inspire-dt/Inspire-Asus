export type contactusData = {
    title: string;
    subtitle: string;
    link?: string;
    icon?: string;
}[];
export const contactusData: contactusData = [
    {
        title: '時間',
        subtitle: '週一 - 週五 ， 上午 8:30 - 下午 5:30 <br> 週六 - 週日 ， 未營業'
    },
    {
        title: '電話',
        subtitle: '0800-770168 / 04-7639963',
    },
    {
        title: '信箱',
        subtitle: 'valvolashop@gmail.com'
    },
    {
        title: '地址',
        subtitle: '(500) 彰化縣彰化市中央路184號4樓之1',
        link: 'https://maps.app.goo.gl/RouP9kfxc34cpQaS8'
    }
];
