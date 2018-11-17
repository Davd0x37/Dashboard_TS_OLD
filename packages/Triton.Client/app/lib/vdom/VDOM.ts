import { VElement, VNodeList } from "./Interfaces";
import { createVComponent } from "./VComponent/Create";
import { mountVComponent } from "./VComponent/Mount";
import { updateVComponent } from "./VComponent/Update";
import { createVElement } from "./VElement/Create";
import { mountVElement } from "./VElement/Mount";
import { updateVElement } from "./VElement/Update";
import { mountVText } from "./VText/Mount";

export const createElement = (
  tag: string | Function,
  props: VElement["props"],
  ...children: VNodeList
) =>
  typeof tag === "function"
    ? createVComponent(tag, props || {})
    : createVElement(tag, props, ...children)

export const mount = (input: any, parentNode: HTMLElement) => {
  // console.log(input)
  if (typeof input.tag === "function") {
    // VComponent
    return mountVComponent(input, parentNode);
  } else if (typeof input.tag === "string") {
    // VElement
    return mountVElement(input, parentNode);
  } else {
    // VText
    return mountVText(input, parentNode);
  }
};

export const update = (prevElem: VElement, nextElem: VElement) => {
  if (prevElem.tag === nextElem.tag) {
    if (typeof prevElem.tag === "string") {
      updateVElement(prevElem, nextElem);
    } else if (typeof prevElem.tag === "function") {
      updateVComponent(prevElem, nextElem);
    }
  } else {
    // Render everything
  }
};
