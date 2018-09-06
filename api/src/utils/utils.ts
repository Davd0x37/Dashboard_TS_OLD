/**
 * USELESS!
 * Pipeline polyfill
 * pipe(array or other value)(functions, next function, ....)
 *
 * -----EXAMPLE-----
 * pipe([ 1, 2, 3, 4, 5 ])(
 * 	(x: any) => x.map((el: any) => el * 20),
 * 	(x: any) => {
 * 		x.forEach((el: any) => console.log(el))
 * 	}
 * )
 * -----EXAMPLE-----
 *
 * @template T
 * @param {(T | T[])} value
 * @returns value or function
 */
export const pipe = <T>(value: T | T[]) => {
  return (...fns: any[]) => {
    return fns.reduce((currentValue: T, currentFunction: any) => {
      return currentFunction(currentValue);
    }, value);
  };
};

/**
 * Convert timestamp to seconds
 *
 * @param {number} time
 * @returns
 */
export const timeToSeconds = (time: number) => {
  return Math.round(time / 1000);
};

/**
 * Generate random string from passed range
 *
 * @param {number} length
 * @returns {string}
 */
export const generateRandomString = (length: number, onlyNumbers?: boolean): string => {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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
  return text;
};
