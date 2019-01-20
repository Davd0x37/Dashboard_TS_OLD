// Class Type
export type vClass = {
  props?: {};
  pCurrentElement: VNode;
  pParentNode: HTMLElement;
  render: () => VNode;
  mounted: () => void;
  new (...args: any[]): any;
};

// Function type
export type vFNType = (...args: any[]) => any;

// String/number type
export type VText = string | number;
// Element - HTML etc.
export type VElement = {
  tag: string;
  props: {
    className?: string;
    styles?: {};
    [key: string]: any;
  } | null;
  children?: VNodeList;
  dom: HTMLElement | null;
};
// Component - Class
export type VComponent = {
  tag: (...args: any[]) => any | { new (...args: any[]): any };
  props: {};
  instance: vClass | null;
  dom: HTMLElement | null;
};

export type VNode = VElement | VComponent;
export type VNodeList = VNode[] & VText[];
