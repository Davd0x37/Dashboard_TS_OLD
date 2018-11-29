import {
  VComponent,
  VElement,
  vFNType,
  VNode,
  VNodeList,
  VText
} from "./Interfaces";
import { createVComponent } from "./VComponent/Create";
import { mountVComponent } from "./VComponent/Mount";
import { updateVComponent } from "./VComponent/Update";
import { createVElement } from "./VElement/Create";
import { mountVElement } from "./VElement/Mount";
import { updateVElement } from "./VElement/Update";
import { mountVText } from "./VText/Mount";

/**
 * Create Virtual Dom Tree
 * @param tag string | vFNType
 * @param props any
 * @param children VNodeList
 */
export const createElement = (
  tag: string | vFNType,
  props: {},
  ...children: VNodeList
) =>
  typeof tag === "function"
    ? createVComponent(tag, props)
    : createVElement(tag, props, ...children);

export const mount = (input: VNode | VText, parentNode: HTMLElement) => {
  if (typeof input === "object") {
    if (typeof input.tag === "function") {
      // VComponent
      return mountVComponent(input as VComponent, parentNode);
    } else if (typeof input.tag === "string") {
      // VElement
      return mountVElement(input as VElement, parentNode);
    }
  } else {
    // VText
    return mountVText(input, parentNode);
  }
};

export const update = (
  prevElem: VElement | VComponent,
  nextElem: VElement | VComponent
) => {
  // If previous rendered element is the same as new one
  // Then just update childrens
  if (prevElem.tag === nextElem.tag) {
    if (typeof prevElem.tag === "string") {
      updateVElement(prevElem as VElement, nextElem as VElement);
    } else if (typeof prevElem.tag === "function") {
      updateVComponent(prevElem as VComponent, nextElem as VComponent);
    }
  } else {
    // @TODO: Add option for toggling text
    if (typeof prevElem.tag === "function") {
      // While updating, instance always exists
      mount(nextElem, (prevElem as VComponent).instance!.pParentNode);
      // @TODO: replace remove with something else
      prevElem.dom!.remove();
    }
  }
};
