/** Type */
import type { tableChidType, tableChidTRType } from '@components/common/tables/tables.type';
/** Common Component */
// @ts-ignore
import TableLink from '@components/pages/member/order-aocc/tableLink.astro';

export const data: tableChidTRType[] = [
    ['O20250915001', '2025/09/15', 'iERP｜智慧採購叫貨系統', '1', '待處理', '查看明細'],
    ['O20250915002', '2025/09/14', 'iERP｜智慧採購叫貨系統', '3', '待處理', '查看明細'],
    ['O20250915002', '2025/09/14', 'iERP｜智慧採購叫貨系統', '1', '待處理', '查看明細'],
    ['O20250915002', '2025/09/14', 'iERP｜智慧採購叫貨系統', '3', '待處理', '查看明細'],
    ['O20250915002', '2025/09/14', 'iERP｜智慧採購叫貨系統', '3', '待處理', '查看明細'],
    ['O20250915002', '2025/09/14', 'iERP｜智慧採購叫貨系統', '3', '待處理', '查看明細'],
    ['O20250915002', '2025/09/14', 'iERP｜智慧採購叫貨系統', '3', '待處理', '查看明細'],
    ['O20250915002', '2025/09/14', 'iERP｜智慧採購叫貨系統', '3', '待處理', '查看明細'],
    ['O20250915002', '2025/09/14', 'iERP｜智慧採購叫貨系統', '3', '待處理', '查看明細'],
    ['O20250915002', '2025/09/14', 'iERP｜智慧採購叫貨系統', '3', '待處理', '查看明細']
].flatMap((x) => ({
    items: x.flatMap((y) => ({
        text: y,
        attribute: { style: { 'text-align': (!isNaN(y as unknown as number) || y === '待處理') ? 'center' : '' } },
        component: y === '查看明細' ? TableLink : undefined,
        data: y === '查看明細' ? { id: x[0] } : undefined
    }))
}));

export const emptyData: tableChidTRType[] = [
    ['目前沒有任何諮詢紀錄'],
].flatMap((x) => ({
    items: x.flatMap((y) => ({ text: y, colspan: 6, attribute: { 'data-empty': true } }))
}));

const width = {
    詢問單號: '9rem',
    詢問日期: '7.375rem',
    產品名稱: 'auto',
    數量: '4rem',
    狀態: '5rem',
    '': '6rem'
};
export const field: tableChidType[] = ['詢問單號', '詢問日期', '產品名稱', '數量', '狀態', ''].map((x) => ({
    text: x,
    attribute: { style: { width: width[x as keyof typeof width], 'text-align': ['數量', '狀態'].includes(x) ? 'center' : '' } }
}));
