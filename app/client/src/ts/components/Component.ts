export abstract class Component {
  protected template: string;
  protected articleRef: any;

  /**
   * Create plate
   *
   * @returns {Element}
   * @memberof Component
   */
  public renderPlate(): Element {
    const article = document.createElement("article");
    article.classList.add("plate");
    article.innerHTML = this.template;
    this.articleRef = article;
    return article;
  }
  /**
   * Update component
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
   * Create component
   *
   * @protected
   * @abstract
   * @memberof Component
   */
  protected abstract create(...args: any[]): void;
}
