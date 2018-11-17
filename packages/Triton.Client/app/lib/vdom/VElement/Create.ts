import { VElement, VNodeList } from '../Interfaces';

export const createVElement = (
  tag: string,
  props: VElement["props"],
  ...children: VNodeList
): VElement => ({
  tag,
  props,
  childrens: children,
  dom: null
});