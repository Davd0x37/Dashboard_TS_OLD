export abstract class Component {
  /**
   * Create component and initialize all needed methods
   *
   * @protected
   * @abstract
   * @param {...any[]} args
   * @memberof Component
   */
  public abstract create(...args: any[]): void;
  /**
   * Update component. Not for view. Update props, values etc.
   *
   * @abstract
   * @param {...any[]} args
   * @memberof Component
   */
  public abstract update(...args: any[]): void;
  /**
   * Invoke all methods needed after creating component
   *
   * @abstract
   * @param {...any[]} args
   * @memberof Component
   */
  public abstract postProcess(...args: any[]): void;
  /**
   * Create and update view
   *
   * @protected
   * @abstract
   * @param {...any[]} args
   * @memberof Component
   */
  protected abstract view(...args: any[]): void;
  /**
   * Manage actions and events in component
   * Can use event listeners here
   *
   * @protected
   * @abstract
   * @param {...any[]} args
   * @memberof Component
   */
  protected abstract controller(...args: any[]): void;
}

export abstract class PlateComponent extends Component {
  protected template: string;
  protected articleRef: any;
  protected userData: any;

  /**
   * Create plate
   *
   * @returns {Element}
   * @memberof Component
   */
  public renderPlate(data?: object): Element {
    this.createTemplate(data);
    const article = document.createElement("article");
    article.classList.add("plate");
    // article.classList.add("plate__background");
    article.innerHTML = this.template;
    this.articleRef = article;
    return article;
  }
  /**
   * Update template with new data
   *
   * @param {object} data
   * @memberof Component
   */
  public updatePlate(data: object) {
    while (this.articleRef.firstChild) {
      this.articleRef.removeChild(this.articleRef.firstChild);
    }
    this.createTemplate(data);
    this.articleRef.innerHTML = this.template;
    this.postProcess();
  }
  /**
   * Create template
   *
   * @protected
   * @param {object} [data]
   * @memberof Component
   */
  protected createTemplate(data?: object) {
    Object.assign(this.userData, data);
    this.view();
  }
}
