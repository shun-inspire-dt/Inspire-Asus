export const bannerImage = (text: string) => `/assets/images/pages/${text}`
/**
 * 響應式圖片斷點設定，依照不同螢幕尺寸載入對應圖片
 * 支援多種像素密度 (1x, 1.5x, 2x) 提供更清晰的顯示效果
 * 
 * @param text - 圖片名稱
 */
export const bannerImages = (text: string) => ([
    {
        width: 1280, // 桌面版斷點 (1280px+)
        img: `/assets/images/pages/${text}`, // 向後相容的預設圖片
        densities: {
            '1x': `/assets/images/pages/${text}`, // 標準解析度
            '1.5x': `/assets/images/pages/${text}`, // 1.5倍解析度
            '2x': `/assets/images/pages/${text}` // 2倍解析度（高解析度螢幕）
        }
    },
    {
        width: 768, // 平板版斷點 (768px-1279px)
        img: `/assets/images/pages/${text}`,
        densities: {
            '1x': `/assets/images/pages/${text}`,
            '1.5x': `/assets/images/pages/${text}`,
            '2x': `/assets/images/pages/${text}`
        }
    },
    {
        width: 0, // 手機版斷點 (767px 以下)
        img: `/assets/images/pages/${text}`,
        densities: {
            '1x': `/assets/images/pages/${text}`,
            '1.5x': `/assets/images/pages/${text}`,
            '2x': `/assets/images/pages/${text}`
        }
    }
])

export type dataType = {
    title: string;
    text: string;
    img: string;
    imgBreakpoints: {
        width: number;
        img: string;
        densities: {
            '1x': string;
            '1.5x': string;
            '2x': string;
        };
    }[];
}[]

export const data: dataType = [
    {
        title: '使命',
        text: '在全球化與數位化的浪潮下，企業正面臨前所未有的挑戰。供應鏈重組、跨國競爭加劇、科技快速演進，加上後疫情時代的工作型態轉變，都迫使企業必須更快適應市場的不確定性。對多數中小企業而言，技術資源與專業有限，使數位轉型成為一條艱鉅卻不得不走的道路。',
        img: bannerImage('aboutus-BG-01'),
        imgBreakpoints: bannerImages('aboutus-BG-01')
    },
    {
        title: '願景',
        text: '因此，華碩以「平台、生態圈、服務導向」為核心精神，整合多元的數位解決方案與專業服務團隊， 搭配不同採購模式、創造多元選擇，進而降低門檻，協助企業快速導入所需工具。 並透過聚合效應與生態圈夥伴合作，推動中小企業在數位轉型中穩健前行。',
        img: bannerImage('aboutus-BG-02'),
        imgBreakpoints: bannerImages('aboutus-BG-02')
    },
    {
        title: '核心價值',
        text: '我們的核心價值，建立在三大目標之上：一站式平台，以安全穩定的架構支撐多元解決方案； 生態圈合作，串聯軟體供應商、硬體夥伴與系統整合商，共同打造共好環境；服務導向， 以客戶需求為核心，提供彈性、持續優化的數位體驗和服務。這三大支柱，構成我們推動企業數位轉型的重要基石。',
        img: bannerImage('aboutus-BG-03'),
        imgBreakpoints: bannerImages('aboutus-BG-03')
    },
]