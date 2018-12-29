/**
 * Generate random string from passed range
 *
 * @param {number} size size of generated string
 * @param {boolean} [onlyNumbers] generate only numbers?
 * @param {boolean} [promise=false] should return promise?
 * @returns {(string | Promise<string>)} generated string or promise
 */
export const generateRandomString = (
  size: number,
  onlyNumbers?: boolean,
  promise: boolean = false
): string | Promise<string> => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const numbers = "0123456789";

  if (onlyNumbers) {
    for (let i = 0; i < size; i++) {
      text += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
  } else {
    for (let i = 0; i < size; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
  }
  return promise ? Promise.resolve(text) : text;
};
