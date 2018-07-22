/**
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
