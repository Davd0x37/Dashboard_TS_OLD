// tslint:disable
/**
 * Generate random string from passed range.
 * @param {number} size Size of generated string
 * @param {boolean} [onlyNumbers=false] Generate only numbers?
 * @returns {string} Generated string
 */
export const generateRandomString = (
  size: number,
  onlyNumbers: boolean = false
): string => {
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
  return text;
};
