export const assignStyles = (styles: {}, newElement: HTMLElement): void =>
  Object.entries(styles).forEach(
    ([key, val]: [string, any]) => (newElement.style[key] = val)
  );
