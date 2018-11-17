import { VComponent } from "../Interfaces";
import { mount } from "../VDOM";

export const mountVComponent = (input: VComponent, parentNode: HTMLElement) => {
  // @TODO: Fix type checking for lacks `new`
  const CMP: any = input.tag;
  const instance = new CMP(input.props);
  // Create DOM Tree Object
  const rendered = instance.render();
  // Save created DOM Tree Object
  instance._currentElement = rendered;
  // Save HTMLElement parent
  instance._parentNode = parentNode;

  // console.log(input, instance)
  // Render HTMLElement and return it
  const dom: any = mount(rendered, parentNode);

  // Save instance
  input.instance = instance;
  // Save generated DOM tree
  input.dom = dom;

  parentNode.appendChild(dom);
};
