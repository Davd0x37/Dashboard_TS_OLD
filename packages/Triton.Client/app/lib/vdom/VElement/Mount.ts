import { VElement } from "../Interfaces";
import { mount } from "../VDOM";

export const mountVElement = (
  element: VElement,
  parentNode: Element
): HTMLElement => {
  const { styles, classList } = element.props || { styles: [], classList: [] };
  const newElement = document.createElement(element.tag);
  element.dom = newElement;

  if (styles !== undefined) {
    Object.entries(styles).forEach(
      ([key, val]: [string, any]) => (newElement.style[key] = val)
    );
  }

  if (element.props && element.props !== null) {
    Object.entries(element.props).forEach(([key, val]: [string, any]) => {
      const eventNames = key.match(/on[a-zA-Z]+/g);
      if (eventNames) {
        eventNames.forEach(event => {
          const name = event.replace("on", "").toLowerCase();
          // const name = nameReplaced[0].toLowerCase() + nameReplaced.slice(1);
          newElement.addEventListener(name, (e: any) => val(e));
        });
      }
    });
  }

  if (classList !== undefined) {
    classList.forEach((cls: string) => newElement.classList.add(cls));
  }

  if (element.childrens) {
    if (Array.isArray(element.childrens) && element.childrens.length > 0) {
      element.childrens.forEach(child => mount(child, newElement));
    } else {
      mount(element.childrens, newElement);
    }
  }

  parentNode.appendChild(newElement);
  return newElement;
};
