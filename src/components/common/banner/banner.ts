export const bannerImage = (text: string) =>  `/assets/images/pages/${text}-sm.png`
/**
 * 響應式圖片斷點設定，依照不同螢幕尺寸載入對應圖片
 * 支援多種像素密度 (1x, 1.5x, 2x) 提供更清晰的顯示效果
 * 
 * @param text - 圖片名稱
 */
export const bannerImages = (text: string) => ([
    {
        width: 1280, // 桌面版斷點 (1280px+)
        img: `/assets/images/pages/${text}-lg`, // 向後相容的預設圖片
        densities: {
            '1x': `/assets/images/pages/${text}-lg`, // 標準解析度
            '1.5x': `/assets/images/pages/${text}-lg`, // 1.5倍解析度
            '2x': `/assets/images/pages/${text}-lg` // 2倍解析度（高解析度螢幕）
        }
    },
    {
        width: 768, // 平板版斷點 (768px-1279px)
        img: `/assets/images/pages/${text}-md`,
        densities: {
            '1x': `/assets/images/pages/${text}-md`,
            '1.5x': `/assets/images/pages/${text}-md`,
            '2x': `/assets/images/pages/${text}-md`
        }
    },
    {
        width: 0, // 手機版斷點 (767px 以下)
        img: `/assets/images/pages/${text}-sm`,
        densities: {
            '1x': `/assets/images/pages/${text}-sm`,
            '1.5x': `/assets/images/pages/${text}-sm`,
            '2x': `/assets/images/pages/${text}-sm`
        }
    }
])