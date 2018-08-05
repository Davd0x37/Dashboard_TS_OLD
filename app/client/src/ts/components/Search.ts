/**
 * Click on input -> fade background -> user is typing (while typing do nothing, after 200ms search for value) -> show resultbox
 */

import { SearchController } from "../controller/Search";
import { Component } from "./Component";
export class Search extends Component {
  // Input
  protected element: HTMLInputElement;

  // User is typing
  protected typing: boolean = false;

  // Timer for checking if user is typing
  protected checker: any;

  protected resultBox: HTMLElement;
  protected backdrop: HTMLElement;

  constructor(
    el: string,
    result: string = "#searchbox__result",
    backdrop: string = "#background__backdrop"
  ) {
    super();
    this.element = document.querySelector(el);
    this.resultBox = document.querySelector(result);
    this.backdrop = document.querySelector(backdrop);
    this.create();
  }

  /**
   * Update component
   *
   * @param {*} ev
   * @memberof Search
   */
  public update(ev: any): void {
    if (ev.target.value.length !== 0) {
      this.resultBox.style.visibility = "visible";
      // Clear box every time after typing
      this.clearBox();
      const actions: object[] = SearchController.searchAction(ev.target.value);
      actions.forEach((action: any) => {
        this.resultBox.appendChild(
          this.addItem(action.icon, action.action)
        )
      });
      // this.resultBox.appendChild(this.addItem("lock", ev.target.value));
    }

    // After clicking greyed background it will clean out input and remove background
    this.backdrop.addEventListener("click", () => {
      ev.target.value = "";
    });
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
   * Invokes all needed methods
   *
   * @protected
   * @memberof Search
   */
  protected create(): void {
    this.listenEvents();
    this.setAnimations();
  }

  /**
   * Create event listener for searchbox
   *
   * @protected
   * @param {string} type
   * @param {(...el: any[]) => any} fn
   * @memberof Search
   */
  protected attachEvent(type: string, fn: (...el: any[]) => any): void {
    this.element.addEventListener(type, (ev: any) => {
      fn(ev);
    });
  }

  /**
   * Attach events to searchbox
   *
   * @protected
   * @memberof Search
   */
  protected listenEvents() {
    this.attachEvent("keydown", (ev: any) => {
      // Clear input
      if (ev.key === "Enter") {
        this.element.value = "";
      }

      this.typing = true; // User is typing
      clearTimeout(this.checker); // Remove previous checker
      this.startChecker(ev); // Start new checker
    });

    this.attachEvent("keyup", (ev: any) => {
      this.typing = false; // User is not typing
    });
  }

  /**
   * Start checking if user is typing
   *
   * @protected
   * @param {*} ev
   * @memberof Search
   */
  protected startChecker(ev: any) {
    this.checker = setTimeout(() => {
      if (!this.typing) {
        this.update(ev);
      }
    }, 200);
  }

  /**
   * Add item to searchbox result
   *
   * @protected
   * @param {string} type
   * @param {string} message
   * @returns {Element}
   * @memberof Search
   */
  protected addItem(type: string, action: string): Element {
    const item = document.createElement("a");
    item.classList.add("searchbox__item");
    item.href = "#";
    item.innerHTML = `
    <div class="item__icon">
      <i class="fas fa-${type}" style="font-size: 1.3rem; color: #59B369;"></i>
    </div>
    <p class="item__name">${action}</p>
    `;
    return item;
  }

  /**
   * Clear results
   *
   * @protected
   * @memberof Search
   */
  protected clearBox() {
    this.resultBox.innerHTML = "";
  }

  /**
   * Set animation of backdrop and result box
   *
   * @protected
   * @memberof Search
   */
  protected setAnimations() {
    this.attachEvent("focus", (_: any) => {
      this.backdrop.style.opacity = "1";
      this.backdrop.style.visibility = "visible";
    });
    this.attachEvent("blur", (ev: any) => {
      this.backdrop.style.opacity = "0";
      this.resultBox.style.visibility = "hidden";
      setTimeout(() => (this.backdrop.style.visibility = "hidden"), 500);
      ev.target.value = "";
    });
  }
}
