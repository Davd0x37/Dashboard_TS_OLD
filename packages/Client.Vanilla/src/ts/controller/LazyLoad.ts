import { $$ } from "../utils/DOM";

enum EventAction {
  ADD,
  REMOVE
}

const data = {
  elements: {} as NodeListOf<any>,
  replaced: 0,
  options: {
    directive: "v-lazy-load",
    formattedDirective: "vLazyLoad",
    offset: 100
    // windowTop: Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
  }
};

/**
 * @param {string} [directive]
 */
export default (directive?: string) => {
  initDirective(directive);
  data.elements = $$(`[data-${data.options.directive}]`);
  events(EventAction.ADD);
};

const events = (action: EventAction) => {
  switch (action) {
    case EventAction.ADD:
      window.addEventListener("load", scrollHandler);
      window.addEventListener("scroll", scrollHandler);
      break;
    case EventAction.REMOVE:
      window.removeEventListener("load", scrollHandler);
      window.removeEventListener("scroll", scrollHandler);
      break;
  }
};

/**
 * DOMRect {x: 8, y: -1621, width: 1560, height: 1170, top: -1621, width: 1560}
 * If 'top' (-1621) is smaller than inner height of window (920) and (top + height)
 * (-1621 + 1170) is higher than 0 (is not in this case) then render image.
 * `Top` property is like absolute position and it's `top` prop.
 * Fetch image only if placeholder is in viewport
 */
const scrollHandler = () => {
  if (data.replaced === data.elements.length) {
    events(EventAction.REMOVE);
  }
  data.elements.forEach((elem: HTMLImageElement) => {
    const bound = elem.getBoundingClientRect();
    if (bound.top <= window.innerHeight && bound.top + bound.height >= 0) {
      if (elem.src === elem.dataset[data.options.formattedDirective]) {
        return;
      }
      elem.src = elem.dataset[data.options.formattedDirective]!;
      data.replaced++;
    }
  });
};

const initDirective = (dir?: string) => {
  if (dir) {
    data.options.formattedDirective = formatDirective(dir);
    data.options.directive = dir;
  }
};

/**
 * Change directive format from 'v-lazy-load' to 'vLazyLoad'
 *
 * @param {string} str
 * @returns formatted directive
 */
const formatDirective = (str: string) => {
  return str
    .split("-")
    .map((word: string) => word.replace(word[0], word[0].toUpperCase()))
    .reduce((prev: string, curr: string, index: number) => {
      prev = index === 1 ? prev.toLowerCase() : prev;
      return prev + curr;
    });
};
