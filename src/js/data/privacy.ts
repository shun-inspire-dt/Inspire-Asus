export type dataType = {
    title: string;
    link: string;
    attribute: attribute;
}

export const privacy: dataType[] = [
    {
        title: '隱私權政策',
        link: '#PrivacyModal',
        attribute: {
            'data-bs-toggle': 'modal',
            'data-dismiss': 'offcanvas'
        }
    },
    {
        title: '服務條款',
        link: '#ItemsModal',
        attribute: {
            'data-bs-toggle': 'modal',
            'data-dismiss': 'offcanvas'
        }
    },
    {
        title: '相關連結',
        link: '#RefLinkModal',
        attribute: {
            'data-bs-toggle': 'modal',
            'data-dismiss': 'offcanvas'
        }
    },
    {
        title: '退換貨條款',
        link: '#RefuseModal',
        attribute: {
            'data-bs-toggle': 'modal',
            'data-dismiss': 'offcanvas'
        }
    },
    {
        title: '會員條款',
        link: '#MemberItemsModal',
        attribute: {
            'data-bs-toggle': 'modal',
            'data-dismiss': 'offcanvas'
        }
    },
    {
        title: '購物說明',
        link: '#PurchaseModal',
        attribute: {
            'data-bs-toggle': 'modal',
            'data-dismiss': 'offcanvas'
        }
    }
];