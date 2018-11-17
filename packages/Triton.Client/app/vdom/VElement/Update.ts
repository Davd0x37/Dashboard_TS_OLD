import { VElement, VNodeList, VText } from "../Interfaces";
import { update } from "../VDOM";
import { updateVText } from "../VText/Update";

export const updateVElement = (prevElem: VElement, nextElem: VElement) => {
  const dom = prevElem.dom;
  nextElem.dom = dom;

  if (prevElem.children && nextElem.children) {
    updateChildren(prevElem.children, nextElem.children, dom!);
  }

  // Assign new styles
  if (
    prevElem.props &&
    nextElem.props &&
    prevElem.props.styles &&
    nextElem.props.styles
  ) {
    // Save styles in props
    nextElem.props.styles = {
      ...prevElem.props.styles,
      ...nextElem.props.styles
    };

    // And use them in DOM element
    Object.entries(nextElem.props.styles).forEach(
      ([key, val]) => nextElem.dom && (nextElem.dom.style[key] = val)
    );
  }
};

export const updateChildren = (
  prevElem: VNodeList,
  nextElem: VNodeList,
  parentDom: HTMLElement
) => {
  for (let i = 0; i < prevElem.length; i++) {
    if (
      (typeof prevElem[i] === "string" && typeof nextElem[i] === "string") ||
      (typeof prevElem[i] === "number" && typeof nextElem[i] === "number")
    ) {
      updateVText(prevElem[i] as VText, nextElem[i] as VText, parentDom);
    } else {
      update(prevElem[i] as VElement, nextElem[i] as VElement);
    }
  }
};
