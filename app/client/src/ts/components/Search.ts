/**
 * Click on input -> fade background -> user is typing (while typing do nothing, after 200ms search for value) -> show resultbox
 */

import { SearchController } from "../controller/Search";
import { style } from "../utils/Style";
import { Component } from "./Component";
export class Search extends Component {
  // Input
  protected element: HTMLInputElement;
  protected resultBox: HTMLElement;
  protected backdrop: HTMLElement;

  // Timer for checking if user is typing
  protected checker: any;
  // Checker options
  protected checkerOptions = {
    cleanOnEnter: true
  };

  constructor(
    el: string,
    options?: object,
    result: string = "#searchbox__result",
    backdrop: string = "#background__backdrop"
  ) {
    super();
    this.element = document.querySelector(el);
    this.resultBox = document.querySelector(result);
    this.backdrop = document.querySelector(backdrop);

    // Overwrite options
    Object.assign(this.checkerOptions, options);
    this.create();
  }

  /**
   * Invokes all methods after creating component
   *
   * @memberof Search
   */
  public postProcess() {
    // FILL
  }

  /**
   * Update component
   *
   * @param {*} ev
   * @memberof Search
   */
  public update(): void {
    // FILL
  }

  /**
   * Attach event listeners to input, backdrop and resultbox
   *
   * @protected
   * @memberof Search
   */
  protected create(): void {
    this.controller();
  }

  /**
   * Generate view on update
   *
   * @protected
   * @param {*} ev
   * @memberof Search
   */
  protected view(ev: any): void {
    if (ev.target.value.length !== 0) {
      style(this.resultBox, { opacity: 1, visibility: "visible" });

      // Clear box every time after typing
      this.resultBox.innerHTML = "";

      // Get all actions matched to searched value
      const actions = SearchController.searchAction(ev.target.value);
      // Add all matched results to result box
      actions.forEach((action: any) => {
        // Add item to results
        this.resultBox.appendChild(
          this.addItem(action.icon, action.action, action.view)
        );
      });
    }
    // If input is empty hide result box
    if (ev.target.value.length === 0) {
      style(this.resultBox, { opacity: 0 });
      setTimeout(() => {
        style(this.resultBox, { visibility: "hidden" });
      }, 500);
    }
  }

  /**
   * Setup listeners
   *
   * @protected
   * @memberof Search
   */
  protected controller(): void {
    this.element.addEventListener("keydown", (ev: any) => {
      // Apply options
      if (this.checkerOptions.cleanOnEnter) {
        if (ev.key === "Enter") {
          this.element.value = "";
        }
      }
      clearTimeout(this.checker);
      this.checker = setTimeout(() => {
        this.view(ev);
      }, 200);
    });

    // Show backdrop with activating search input
    this.element.addEventListener("click", (_: any) => {
      style(this.backdrop, { opacity: 1, visibility: "visible" });
    });

    // After clicking backdrop it will fade out with result box
    this.backdrop.addEventListener("click", (ev: any) => {
      style(this.backdrop, { opacity: 0 });
      style(this.resultBox, { opacity: 0 });
      this.element.value = "";
      setTimeout(() => {
        style(this.backdrop, { visibility: "hidden" });
        style(this.resultBox, { visibility: "hidden" });
      }, 500);
    });
  }

  /**
   * Add item to searchbox result
   *
   * @protected
   * @param {string} type
   * @param {string} action
   * @param {string} view
   * @returns {Element}
   * @memberof Search
   */
  protected addItem(type: string, action: string, view: string): Element {
    const item = document.createElement("a");
    item.classList.add("searchbox__item");
    item.href = `#${view}`;
    item.innerHTML = `
    <div class="item__icon">
      <i class="fas fa-${type}" style="font-size: 1.3rem; color: #59B369;"></i>
    </div>
    <p class="item__name">${action}</p>
    `;
    return item;
  }
}
