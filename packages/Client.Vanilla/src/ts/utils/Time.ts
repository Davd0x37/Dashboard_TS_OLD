export const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

export function debounce(
  fn: (...args: any[]) => any | any[] | Promise<any | any[]>,
  ms: number = 100
) {
  let timeout: any = null;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, ms);
  };
}
