import { VElement } from "../Interfaces";
import { mount } from "../VDOM";
import { assignStyles } from "./Style";
import Observer from "#/lib/Observer";

export const mountVElement = (
  element: VElement,
  parentNode: HTMLElement
): HTMLElement => {
  // Create element with tag passed in createElement
  const newElement: HTMLElement = document.createElement(element.tag);
  /**
   * Save reference in createElement arguments
   * Before
   * createElement(...) => {tag: "div", props: null, dom: null}
   * After
   * createElement(...) => {tag: "div", props: null, dom: newElement -> HTMLElement}
   * With that reference you can change all styles, attributes etc.
   */
  element.dom = newElement;

  if (element.props) {
    const { styles, className } = element.props;

    // Add styles to element with double brackets
    /**
     * <div styles={{backgroundColor: "red"}}></div>
     */
    if (styles) {
      assignStyles(styles, newElement);
    }

    // Add classes to element
    /**
     * <button className="btn btn--red"></button>
     */
    if (className) {
      // newElement.classList.add(className);
      newElement.className = className;
    }

    // Attach events and other attributes
    Object.entries(element.props).forEach(([key, val]: [string, any]) => {
      if (element.props && !element.props.hasOwnProperty("ignoreEvents")) {
        // Test event name if starts with "on" eg. onClick or onclick
        const eventNames = key.match(/on[a-zA-Z]+/g);
        // If is event
        if (eventNames) {
          // Remove "on" prefix and lowercase them
          eventNames.forEach(event => {
            const name = event.replace("on", "").toLowerCase();
            newElement.addEventListener(name, (e: any) => val(e));
          });
        }
      }

      // Two way data binding
      const dataBinding = key.match(/v-bind/g);
      if (dataBinding) {
        // @TODO: Remove function and add watcher instead
        dataBinding.forEach(() => {
          newElement.addEventListener("keyup", (e: any) => val(e.target.value));
        });
      }

      // Two way data binding
      const routers = key.match(/v-link/g);
      if (routers) {
        // @TODO: Remove function and add watcher instead
        routers.forEach((router: string) => {
          newElement.addEventListener("click", (e: any) => {
            history.pushState({}, "", element.props![router]);
            Observer.notify("RouterChange", element.props![router]);
          });
        });
      }

      // Check if it is not a style or classList
      if (key !== "styles" && key !== "className") {
        newElement.setAttribute(key, val);
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
