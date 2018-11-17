// Class Type
export type vClass = {
  new (...args: any[]): any;
  props?: {};
  _currentElement: VNode;
  _parentNode: HTMLElement;
  render: () => VNode;
};

// String/number type
export type VText = string | number;
// Element - HTML etc.
export type VElement = {
  tag: string;
  props: {
    classList?: string;
    styles?: {};
    [key: string]: any;
  } | null;
  children?: VNodeList;
  dom?: HTMLElement | null;
};
// Component - Class
export type VComponent = {
  tag: Function | { new (...args: any[]): any };
  props: {};
  instance: vClass | null;
  dom?: HTMLElement | null;
};

export type VNode = VElement | VComponent; // | VText;
export type VNodeList = VNode[] & VText[];
