/**
 * 資料型別：
 * @param global 所有頁面都會用到的組件
 * @param page 母頁面
 * @param path 頁面名稱
 * @param components 頁面該有的特定組件
 * @param common 頁面該有的共用組件
 * @param exclude 該頁面不需要引入的組件
 * @param child 子頁面們
 * @interface object
 *  type Array<{
        global?: string[],
        page: {
            path: string,
            components?: string[],
            common?: string[],
            exclude?: string[],
        },
        child?: {
            path: string,
            components?: string[],
            common?: string[],
            exclude?: string[],
        }[] 
    }>
 */

export const data = [
    {
        page: {
            path: 'index',
            components: ['banner', 'nav', 'section01', 'section02', 'section03', 'section04', 'section05']
        }
    }
];
