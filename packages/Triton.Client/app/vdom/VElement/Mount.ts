import { VElement } from "../Interfaces";
import { mount } from "../VDOM";

export const mountVElement = (
  element: VElement,
  parentNode: HTMLElement
): HTMLElement => {
  // Create element with tag passed in createElement
  const newElement: HTMLElement = document.createElement(element.tag);
  // Save reference in createElement arguments
  /**
   * Before
   * createElement(...) => {tag: "div", props: null, dom: null}
   * After
   * createElement(...) => {tag: "div", props: null, dom: newElement -> HTMLElement}
   * With that reference you can change all styles, attributes etc.
   */
  element.dom = newElement;

  if (element.props) {
    const { styles, classList } = element.props;

    // Add styles to element with double brackets
    /**
     * <div styles={{backgroundColor: "red"}}></div>
     */
    if (styles) {
      Object.entries(styles).forEach(
        ([key, val]: [string, any]) => (newElement.style[key] = val)
      );
    }

    // Add classes to element
    /**
     * <button classList="btn btn--red"></button>
     */
    if (classList) {
      newElement.classList.add(classList);
    }

    // Attach events and other attributes
    Object.entries(element.props).forEach(([key, val]: [string, any]) => {
      // Test event name if starts with "on" eg. onClick or onclick
      const eventNames = key.match(/on[a-zA-Z]+/g);
      // If is event
      if (eventNames) {
        // Remove "on" prefix and flatten them
        eventNames.forEach(event => {
          const name = event.replace("on", "").toLowerCase();
          newElement.addEventListener(name, val);
        });
      } else {
        // If not, just assign as attribute
        // Check if it is not a style or classList
        if (key !== "styles" && key !== "classList") {
          newElement.setAttribute(key, val);
        }
      }
    });
  }

  // If element contains children
  if (element.children) {
    element.children.forEach(child => mount(child, newElement));
  }

  // Append new DOM Tree
  parentNode.appendChild(newElement);

  return newElement;
};
