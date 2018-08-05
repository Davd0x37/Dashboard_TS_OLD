export function style(el: HTMLElement | HTMLInputElement | HTMLCanvasElement, styles: object) {
  Object.entries(styles).forEach((prop: any) => (el.style[prop[0]] = prop[1]))
}