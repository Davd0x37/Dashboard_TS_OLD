export abstract class Component {
  /**
   * Create component and initialize all needed methods
   *
   * @protected
   * @abstract
   * @param {...any[]} args
   * @memberof Component
   */
  public abstract create(...args: any[]): any;
  /**
   * Update component. Not for view. Update props, values etc.
   *
   * @abstract
   * @param {...any[]} args
   * @memberof Component
   */
  public abstract update(...args: any[]): any;
  /**
   * Create and update view
   *
   * @protected
   * @abstract
   * @param {...any[]} args
   * @returns {string}
   * @memberof Component
   */
  protected abstract view(...args: any[]): any;
  /**
   * Manage actions and events in component
   * Can use event listeners here
   *
   * @protected
   * @abstract
   * @param {...any[]} args
   * @memberof Component
   */
  protected abstract controller(...args: any[]): any;
}

export abstract class PlateComponent extends Component {
  protected article!: HTMLElement;

  public addPlate(): void {
    this.create()
    document.querySelector(".feed")!.appendChild(this.article);
  }

  /**
   * Create plate
   *
   * @returns {Element}
   * @memberof PlateComponent
   */
  protected createPlate(template: string): void {
    this.article = document.createElement("article");
    this.article.classList.add("plate");
    this.article.innerHTML = template;
  }
}
