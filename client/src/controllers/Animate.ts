/**
 * EXAMPLE
 * animate.sequence({
 *  elements: [document.querySelector("body")]
 *  timeout:  3000
 * }, [
 *  {
 *    visibility: 'hidden',
 *    opacity: '0.2'
 *  }
 * ])
 */

interface IAnimateSequence {
  elements: any[];
  timeout?: number;
}

export const animate = {
  // timeout: 200, // Default timeout is 200 ms
  // el: [] as any[],
  /**
   * Init sequence
   *
   * @param {IAnimateSequence} { elements, timeout }
   * @param {any[]} styles
   */
  async sequence({ elements, timeout }: IAnimateSequence, styles: any[]) {
    // this.timeout = timeout;
    this._run({ elements, timeout }, styles);
  },

  /**
   * Attach all styles to an elements
   *
   * @param {*} styles
   */
  _animate({ elements }: IAnimateSequence, styles: any) {
    // For every element attach all styles
    elements.forEach(elem => {
      // Get keys and values from object as array
      // @ts-ignore
      Object.entries(styles).forEach(async (prop: any) => {
        elem.style[prop[0]] = prop[1];
      });
    });
  },

  /**
   * REturn empty timeout promise
   *
   * @param {number} time
   * @returns
   */
  _after(time: number) {
    return new Promise(r => setTimeout(r, time));
  },

  /**
   * Run sequence
   *
   * @param {any[]} styles
   */
  async _run({ elements, timeout = 0 }: IAnimateSequence, styles: any[]) {
    let i = 0;
    styles.forEach(async style => {
      await this._after(timeout * i++);
      this._animate({ elements }, style);
    });
  }
};
