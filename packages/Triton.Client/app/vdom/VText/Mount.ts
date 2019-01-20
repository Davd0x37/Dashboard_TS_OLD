import { VText } from "../Interfaces";

export const mountVText = (
  input: VText,
  parentDOMNode: HTMLElement
): boolean => {
  parentDOMNode.textContent = input.toString();
  return true;
};
