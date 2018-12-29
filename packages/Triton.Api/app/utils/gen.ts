// tslint:disable
/**
 * Generate random string from passed range
 *
 * @param {number} size size of generated string
 * @param {boolean} [onlyNumbers=false] generate only numbers?
 * @returns {string} generated string
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
