import { VElement, VNodeList } from "../Interfaces";
import { update } from "../VDOM";
import { updateVText } from "../VText/Update";
import { assignStyles } from "./Style";

export const updateVElement = (prevElem: VElement, nextElem: VElement) => {
  // Copy previous dom reference
  const dom = prevElem.dom;
  nextElem.dom = dom;

  if (prevElem.children && nextElem.children && dom) {
    updateChildren(prevElem.children, nextElem.children, dom);
  }

  // Assign new styles
  if (nextElem.props && nextElem.props.styles) {
    if (prevElem.props && prevElem.props.styles) {
      // Copy previous styles
      nextElem.props.styles = {
        ...prevElem.props.styles,
        ...nextElem.props.styles
      };
    }

    // And use them in DOM element
    nextElem.dom && assignStyles(nextElem.props.styles, nextElem.dom);
  }
};

export const updateChildren = (
  prevElem: VNodeList,
  nextElem: VNodeList,
  parentDom: HTMLElement
) => {
  if (prevElem.length === nextElem.length) {
    for (let i = 0; i < prevElem.length; i++) {
      if (isVText(prevElem[i]) && isVText(nextElem[i])) {
        updateVText(prevElem[i], nextElem[i], parentDom);
      } else {
        update(prevElem[i], nextElem[i]);
      }
    }
  }
};

const isVText = (el: any) => typeof el === "string" || typeof el === "number";
