/**
 * Flatten object from array or one object.
 * Creates nested properties with dot.
 * @param {string} obj Object to flatten
 * @param {string[]} [prop=[]] Jus put empty []
 * @param {boolean} [flat=true] Should output array be flatten or keep dimensions?
 * @param {boolean} [withDot=true] Use nested dot or last key?
 * @returns {*} Object
 */
export const flattenObj = (
  obj: string,
  prop: string[] = [],
  flat: boolean = true,
  withDot: boolean = true
): any => {
  const prefix = (key: string, join: boolean = true): any =>
    withDot ? (join ? prop.concat(key).join(".") : prop.concat(key)) : key;

  const reducer = (prev: {}, [key, val]: [string, any]) =>
    typeof val === "object"
      ? { ...prev, ...flattenObj(val, prefix(key, false), flat, withDot) }
      : { ...prev, [prefix(key)]: val };

  return Array.isArray(obj)
    ? flat
      ? [].concat(...obj.map(el => flattenObj(el, prop, flat, withDot)))
      : obj.map(el => flattenObj(el, prop, flat, withDot))
    : Object.entries(obj).reduce(reducer, {});
};
