import { VComponent, vFNType } from "../Interfaces";

export const createVComponent = (tag: vFNType, props: {}): VComponent => ({
  tag,
  props,
  instance: null,
  dom: null
});
