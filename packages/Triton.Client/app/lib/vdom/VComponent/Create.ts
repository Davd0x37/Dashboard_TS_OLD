import { VElement } from '../Interfaces';

export const createVComponent = (tag: Function, props: {}): VElement => ({
  tag,
  props
});