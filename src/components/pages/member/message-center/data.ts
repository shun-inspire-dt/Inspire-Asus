/** Type */
import type { tableChidType, tableChidTRType } from '@components/common/tables/tables.type';

export const data: tableChidTRType[] = [
    ['未讀', '2025/09/15', '審核已通過', '您上架的解決方案 iShops 已審核通過'],
    ['已讀', '2025/09/14', '補件通知', '您上架的解決方案 iShops 需要補件'],
    ['已讀', '2025/09/13', '審核中', '您的解決方案 iShops 正在審核中'],
    ['已讀', '2025/09/12', '審核未通過', '您上架的解決方案 iShops 未審核通過，請檢查您的資料'],
    ['已讀', '2025/09/11', '已回覆', '審核團隊已回覆您的問題'],
    ['已讀', '2025/09/10', '需進一步審核', '您的解決方案 iShops 需要更詳細的資料進行審核'],
    ['已讀', '2025/09/09', '提交成功', '您的解決方案 iShops 已成功提交'],
    ['已讀', '2025/09/08', '修改建議', '我們建議對您的解決方案 iShops 進行一些修改'],
    ['已讀', '2025/09/07', '等待客戶確認', '您的解決方案 iShops 正在等待客戶的確認'],
    ['已讀', '2025/09/06', '已上架', '您的解決方案 iShops 已成功上架到平台']
].flatMap((x) => ({
    items: x.flatMap((y) => ({ text: y, attribute: { style: { 'color': y === '未讀' ? 'var(--color-red-300, #B42D18)' : '' } } }))
}));

export const emptyData: tableChidTRType[] = [
    ['目前沒有任何通知訊息'],
].flatMap((x) => ({
    items: x.flatMap((y) => ({ text: y, colspan: 4, attribute: { 'data-empty': true } }))
}));

const width = {
    狀態: '4.5rem',
    時間: '7.375rem',
    標題: '8rem',
    內容: 'auto'
};
export const field: tableChidType[] = ['狀態', '時間', '標題', '內容'].map((x) => ({
    text: x,
    attribute: { style: { 'min-width': width[x as keyof typeof width] } }
}));
