/**
 * Return query string.
 *
 * ```
 * queryString("url", {
 *  response_type: "code",
 *  scope: "email+profile+avatar",
 *  redirect_uri: "http..."
 * }) -> string
 *
 * -> url?response_type=code&scope=email+profile+avatar&redirect_uri=http...
 * ```
 *
 * @param {string} url URL
 * @param {object} obj Queries
 * @returns {string} Generated query string
 */
export const queryString = (url: string, obj: object): string =>
  `${url}${Object.entries(obj)
    .map(
      ([key, val]: [string, any], i: number) =>
        `${i === 0 ? "?" : "&"}${key}=${val}`
    )
    .join("")}`;
