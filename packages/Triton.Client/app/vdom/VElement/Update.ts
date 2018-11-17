import { VElement, VNodeList, VText } from "../Interfaces";
import { update } from "../VDOM";
import { updateVText } from "../VText/Update";

export const updateVElement = (prevElem: VElement, nextElem: VElement) => {
  const dom = prevElem.dom;
  nextElem.dom = dom;

  if (prevElem.children && nextElem.children) {
    updateChildren(prevElem.children, nextElem.children, dom!);
  }

  if (
    prevElem.props &&
    nextElem.props &&
    prevElem.props.styles !== nextElem.props.styles
  ) {
    const prevStyles = prevElem.props.styles;
    const nextStyles = nextElem.props.styles;
    prevStyles &&
      nextStyles &&
      (nextElem.props.styles = [...prevStyles, ...nextStyles]);
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
