import { VText } from "../Interfaces";

export const updateVText = (
  prevElem: VText,
  nextElem: VText,
  parentNode: HTMLElement
) => {
  if (prevElem !== nextElem) {
    parentNode.textContent = nextElem.toString();
  }
};
