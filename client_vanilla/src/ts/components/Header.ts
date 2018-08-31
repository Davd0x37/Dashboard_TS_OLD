import { SearchController } from "../controller/Search";
import Storage, { IStoreValues } from "../controller/Storage";
import { animate } from "../utils/Style";
import { Component } from "./Component";

class Header extends Component {
  // Input
  protected searchElement: HTMLInputElement = document.querySelector(
    "#searchbox__search-input",
  );
  protected searchResultBox: HTMLElement = document.querySelector(
    "#searchbox__result",
  );
  protected searchBackdrop: HTMLElement = document.querySelector(
    "#background__backdrop",
  );
  protected userProfile: HTMLElement = document.querySelector(".user__profile");

  // Timer for checking if user is typing
  protected checker: any;

  constructor() {
    super();
  }

  /**
   * Invoke all needed methods to create component
   *
   * @memberof Header
   */
  public create(): void {
    this.view();
    this.controller();
  }

  /**
   * Update component
   *
   * @memberof Header
   */
  public update(): void {
    this.view();
  }

  /**
   * Render user profile
   *
   * @protected
   * @memberof Header
   */
  protected view(): void {
    const data: IStoreValues["header"] = Storage.store.header;
    const template = `<p class="user__name">${data.username}</p>
    <img src="${data.avatar}" alt="Avatar" class="user__avatar">`;
    this.userProfile.innerHTML = template;
  }

  /**
   * Controll buttons and all data
   *
   * @protected
   * @memberof Header
   */
  protected controller(): void {
    this.searchElement.addEventListener("keydown", (ev: any) => {
      if (ev.key === "Enter") {
        ev.target.value = "";
      }
      clearTimeout(this.checker);
      this.checker = setTimeout(() => this.refreshSearch(ev), 200);
    });

    // Show backdrop with activating search input
    this.searchElement.addEventListener("click", (ev: any) => {
      animate.sequence({ elements: [this.searchBackdrop] }, [
        { opacity: 1, visibility: "visible" },
      ]);
      this.refreshSearch(ev);
      this.searchResultBox.innerHTML = "";
    });

    // After clicking backdrop it will fade out with result box
    this.searchBackdrop.addEventListener("click", (_: any) => {
      animate.sequence(
        {
          elements: [this.searchResultBox, this.searchBackdrop],
          timeout: 500,
        },
        [{ opacity: 0 }, { visibility: "hidden" }],
      );
      this.searchElement.value = "";
      this.searchElement.removeEventListener("keydown", null);
      this.searchElement.removeEventListener("click", null);
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
        animate.sequence({ elements: [this.searchResultBox] }, [
          { opacity: 1, visibility: "visible" },
        ]);
        this.searchResultBox.innerHTML = ""; // Clear box every time after typing
        // Add all matched results to result box
        actions.forEach((action: any) => {
          this.searchResultBox.appendChild(
            this.addResultItem(action.icon, action.action, action.view), // Add item to results
          );
        });
      }
    } else {
      animate.sequence({ elements: [this.searchResultBox], timeout: 500 }, [
        { opacity: 0 },
        { visibility: "hidden" },
      ]);
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
  protected addResultItem(type: string, action: string, _: string): Element {
    const item = document.createElement("a");
    item.classList.add("searchbox__item");
    // item.onclick = () => {
    //   View.renderView(view);
    // };
    item.innerHTML = `
    <div class="item__icon">
      <i class="fas fa-${type}" style="font-size: 1.3rem; color: #59B369;"></i>
    </div>
    <p class="item__name">${action}</p>
    `;
    return item;
  }
}

export default new Header();
