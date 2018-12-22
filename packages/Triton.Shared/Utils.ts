/**
 * Generate random string from passed range
 *
 * @param {number} length
 * @param {boolean} [onlyNumbers]
 * @returns {Promise<string>}
 */
export const generateRandomString = (
  length: number,
  onlyNumbers?: boolean,
  promise: boolean = false
): string | Promise<string> => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const numbers = "0123456789";

  if (onlyNumbers) {
    for (let i = 0; i < length; i++) {
      text += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
  } else {
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
  }
  return promise ? Promise.resolve(text) : text;
};
