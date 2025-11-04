/** Type */
import type { Props as IconsProps } from '@components/common/icons/icons.astro';

export type ChidType = string | number | boolean;

export type tableChidType = {
    text?: ChidType;
    colspan?: number;
    rowspan?: number;
    attribute?: attribute;
    component?: (_props: customComponentProps) => any;
    data?: any;
};
export type tableChidTRType = { attribute?: attribute; items: tableChidType[] };

export interface childComponentProps {
    className?: any;
    index: number;
    field: tableChidType[];
    data: tableChidType[];
}

export interface customComponentProps {
    className?: any;
    index: number;
    data: tableChidType;
}

export interface EmptyComponentProps {
    emptyText?: string;
    emptyIcon?: IconsProps['icon'];
}
