import { VElement, VComponent } from '../Interfaces';

export const createVComponent = (tag: Function, props: {}): VComponent => ({
  tag,
  props,
  instance: null,
  dom: null
});