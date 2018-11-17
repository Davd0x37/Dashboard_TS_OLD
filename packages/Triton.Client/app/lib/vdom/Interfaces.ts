import Component from "../Component";

// UTILS
export type vClass = { new (...args: any[]): any } | any;

// DOM Types
export type VText = string | number;

export type VElement = {
  tag: any;
  props?: {
    classList?: string[];
    styles?: string[];
    [key: string]: any;
  };
  childrens?: VNode | VNodeList;
  instance?: vClass | null;
  dom?: HTMLElement | null;
};

export type VNode = VElement | VText;
export type VNodeList = VNode[];
