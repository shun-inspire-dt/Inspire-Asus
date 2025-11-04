// AccordionArrow 元件型別定義
export type AccordionArrowWeight = 'regular' | 'bold';
export type AccordionArrowSize = 'fs14' | 'fs16' | 'fs18' | 'fs20' | 'fs24';
export type AccordionArrowDirection = 'up' | 'down';

export interface AccordionArrowProps {
  weight?: AccordionArrowWeight;
  size?: AccordionArrowSize;
  direction?: AccordionArrowDirection;
  class?: any;
  [key: string]: any;
}

// 變體組合型別
export interface AccordionArrowVariant {
  name: string;
  nodeId: string;
  props: {
    weight: AccordionArrowWeight;
    size: AccordionArrowSize;
    direction: AccordionArrowDirection;
  };
  isDefault?: boolean;
}

// SVG 元件映射型別
export type SvgComponentKey = `${AccordionArrowWeight}-${AccordionArrowSize}-${AccordionArrowDirection}`;

// CSS 變數映射型別
export interface CssVariables {
  fontSize14: string;
  fontSize16: string;
  fontSize18: string;
  fontSize20: string;
  fontSize24: string;
}

// 元件配置型別
export interface AccordionArrowConfig {
  component: {
    name: string;
    nodeId: string;
    type: string;
    category: string;
    description: string;
    figmaUrl: string;
  };
  props: {
    weight: {
      type: 'enum';
      values: AccordionArrowWeight[];
      default: AccordionArrowWeight;
      description: string;
    };
    size: {
      type: 'enum';
      values: AccordionArrowSize[];
      default: AccordionArrowSize;
      description: string;
    };
    direction: {
      type: 'enum';
      values: AccordionArrowDirection[];
      default: AccordionArrowDirection;
      description: string;
    };
  };
  variants: AccordionArrowVariant[];
  assets: {
    svgFiles: string[];
  };
  styling: {
    color: string;
    cssVariables: CssVariables;
    note: string;
  };
  usage: {
    examples: Array<{
      description: string;
      code: string;
    }>;
  };
  metadata: {
    createdAt: string;
    updatedAt?: string;
    version: string;
    tags: string[];
    changelog: Array<{
      version: string;
      date: string;
      changes: string[];
    }>;
  };
}

// 工具函數型別
export type GetSizeVariable = (size: AccordionArrowSize) => string;
export type GetSvgComponent = (weight: AccordionArrowWeight, size: AccordionArrowSize, direction: AccordionArrowDirection) => any;
