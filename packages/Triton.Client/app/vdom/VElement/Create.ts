import { VElement, VNodeList } from "../Interfaces";

export const createVElement = (
  tag: string,
  props: VElement["props"],
  ...childrens: VNodeList
): VElement => ({
  tag,
  props,
  children: childrens,
  dom: null
});
