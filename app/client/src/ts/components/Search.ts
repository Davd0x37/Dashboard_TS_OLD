import { Component } from "./Component";
export class Search extends Component {
  protected element: Element;
  protected typing: boolean = false;
  protected checker: any;

  protected resultBox: HTMLElement;

  constructor(el: string, result: string) {
    super();
    this.element = document.querySelector(el);
    this.resultBox = document.querySelector(result);
    this.create();
  }

  /**
   * Update component
   *
   * @param {*} ev
   * @memberof Search
   */
  public update(ev: any): void {
    this.resultBox.style.visibility = "hidden";
    if (ev.target.value.length !== 0) {
      this.resultBox.style.visibility = "visible";
      this.clearBox();
      this.resultBox.appendChild(this.addItem("lock", ev.target.value));
    }
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
    this.attachEvent("keydown", (_: any) => {
      this.typing = true; // User is typing
      clearTimeout(this.checker); // Remove checker
    });

    this.attachEvent("keyup", (ev: any) => {
      this.typing = false; // User is not typing
      clearTimeout(this.checker);
      this.checker = setTimeout(() => {
        if (!this.typing) {
          this.update(ev);
        }
      }, 200);
    });
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
  protected addItem(type: string, message: string): Element {
    const item = document.createElement("a");
    item.classList.add("searchbox__item");
    item.href = "#";
    item.innerHTML = `
    <div class="item__icon">
      <i class="fas fa-${type}" style="font-size: 1.3rem; color: #59B369;"></i>
    </div>
    <p class="item__name">${message}</p>
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
}
