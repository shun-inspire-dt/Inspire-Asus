// FlowArrow 元件型別定義
export type FlowArrowWeight = 'regular' | 'bold';
export type FlowArrowSize = 'fs14' | 'fs16' | 'fs18' | 'fs20' | 'fs24';
export type FlowArrowDirection = 'left' | 'right';

export interface FlowArrowProps {
  weight?: FlowArrowWeight;
  size?: FlowArrowSize;
  direction?: FlowArrowDirection;
  class?: any;
  [key: string]: any;
}

// 變體組合型別
export interface FlowArrowVariant {
  name: string;
  nodeId: string;
  props: {
    weight: FlowArrowWeight;
    size: FlowArrowSize;
    direction: FlowArrowDirection;
  };
  isDefault?: boolean;
}

// SVG 元件映射型別
export type FlowSvgComponentKey = `${FlowArrowWeight}-${FlowArrowSize}-${FlowArrowDirection}`;

// CSS 變數映射型別
export interface FlowCssVariables {
  fontSize14: string;
  fontSize16: string;
  fontSize18: string;
  fontSize20: string;
  fontSize24: string;
}

// 元件配置型別
export interface FlowArrowConfig {
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
      values: FlowArrowWeight[];
      default: FlowArrowWeight;
      description: string;
    };
    size: {
      type: 'enum';
      values: FlowArrowSize[];
      default: FlowArrowSize;
      description: string;
    };
    direction: {
      type: 'enum';
      values: FlowArrowDirection[];
      default: FlowArrowDirection;
      description: string;
    };
  };
  variants: FlowArrowVariant[];
  assets: {
    svgFiles: string[];
  };
  styling: {
    color: string;
    cssVariables: FlowCssVariables;
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
export type GetFlowSizeVariable = (size: FlowArrowSize) => string;
export type GetFlowWidthVariable = (size: FlowArrowSize) => string;
export type GetFlowSvgComponent = (weight: FlowArrowWeight, size: FlowArrowSize, direction: FlowArrowDirection) => any;
