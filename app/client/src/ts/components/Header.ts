import { SearchController } from "../controller/Search";
import { View } from "../controller/View";
import { style } from "../utils/Style";
import { Component } from "./Component";

interface IData {
  username: string;
  avatar: string;
}

class Header extends Component {
  // Header template
  protected template: string;

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

  // User details showed before app is load them
  protected userData: IData = {
    username: "Vernon",
    avatar: "avatar.f01dff67.png"
  };

  constructor(
    el: string = "#searchbox__search-input",
    result: string = "#searchbox__result",
    backdrop: string = "#background__backdrop"
  ) {
    super();
    this.element = document.querySelector(el);
    this.resultBox = document.querySelector(result);
    this.backdrop = document.querySelector(backdrop);
  }

  /**
   * Invoke all needed methods to create component
   *
   * @memberof Header
   */
  public create({
    options = {},
    data = {}
  }: { options?: object; data?: IData } = {}): void {
    this.view(); // Render template
    Object.assign(this.userData, data); // Update user data
    Object.assign(this.checkerOptions, options); // Update searchbox options
    this.renderUserProfile();
    this.controller();
  }

  /**
   * Update component
   *
   * @memberof Header
   */
  public update(data?: IData): void {
    Object.assign(this.userData, data);
    this.view();
    this.renderUserProfile();
  }

  /**
   * Invokes all methods after creating component
   *
   * @memberof Header
   */
  public postProcess(): void {
    // FILL
  }

  protected view(): void {
    this.template = `
  <div class="user">
    <div class="user__profile">
      <p class="user__name">${this.userData.username}</p>
      <img src="${this.userData.avatar}" alt="Avatar" class="user__avatar">
    </div>
  </div>`;
  }

  /**
   * Controll buttons and all data
   *
   * @protected
   * @memberof Header
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
        this.refreshSearch(ev);
      }, 200);
    });

    // Show backdrop with activating search input
    this.element.addEventListener("click", (ev: any) => {
      style(this.backdrop, { opacity: 1, visibility: "visible" });
      this.refreshSearch(ev);
    });

    // After clicking backdrop it will fade out with result box
    this.backdrop.addEventListener("click", (_: any) => {
      style(this.backdrop, { opacity: 0 });
      style(this.resultBox, { opacity: 0 });
      this.element.value = "";
      setTimeout(() => {
        style(this.backdrop, { visibility: "hidden" });
        style(this.resultBox, { visibility: "hidden" });
      }, 500);
      this.element.removeEventListener("keydown", (e: any) => e);
      this.element.removeEventListener("click", (e: any) => e);
    });
  }

  /**
   * Refresh result box. Add item etc.
   *
   * @protected
   * @param {*} ev
   * @memberof Header
   */
  protected refreshSearch(ev: any): void {
    if (ev.target.value.length !== 0) {
      // Get all actions matched to searched value
      const actions = SearchController.searchAction(ev.target.value);
      if (actions.length >= 1) {
        // Show resultbox
        style(this.resultBox, { opacity: 1, visibility: "visible" });
        // Clear box every time after typing
        this.resultBox.innerHTML = "";
        // Add all matched results to result box
        actions.forEach((action: any) => {
          // Add item to results
          this.resultBox.appendChild(
            this.addItem(action.icon, action.action, action.view)
          );
        });
      }
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
    item.onclick = () => {
      View.renderView(view);
    };
    item.innerHTML = `
    <div class="item__icon">
      <i class="fas fa-${type}" style="font-size: 1.3rem; color: #59B369;"></i>
    </div>
    <p class="item__name">${action}</p>
    `;
    return item;
  }

  /**
   * Render header
   *
   * @protected
   * @memberof Header
   */
  protected renderUserProfile(): void {
    const where = document.querySelector(".header");
    const userProfile = document.createElement("div");
    userProfile.classList.add("user");
    userProfile.innerHTML = this.template;
    where.appendChild(userProfile);
  }
}

export default new Header();
