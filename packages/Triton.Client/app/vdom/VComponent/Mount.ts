import { VComponent, vClass } from "../Interfaces";
import { mount } from "../VDOM";

export const mountVComponent = (input: VComponent, parentNode: HTMLElement) => {
  // @TODO: Fix type checking for lacks `new`
  const CMP: any = input.tag;
  const instance: vClass = new CMP(input.props);
  // Create DOM Tree Object
  const rendered = instance.render();
  // Save created DOM Tree Object
  instance.pCurrentElement = rendered;
  // Save HTMLElement parent
  instance.pParentNode = parentNode;

  // console.log(input, instance)
  // Render HTMLElement and return it
  const dom: any = mount(rendered, parentNode);

  // Save instance
  input.instance = instance;
  // Save generated DOM tree
  input.dom = dom;

  parentNode.appendChild(dom);
};
