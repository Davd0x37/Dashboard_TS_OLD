import { getUser } from "#/components/user/Manager";
import { IAuthTokens } from "#/type/Auth";
import { ErrorType } from "#/type/Enum";
import { get } from "got";
import { tokensExists } from "./Authenticate";

/**
 * First get user data and check if tokens are exists
 * then fetch data from api and return it as promise
 * @TODO: Rename
 *
 * @template T
 * @param {string} api API url
 * @param {string} id User id
 * @param {string} service Service name
 * @returns {Promise<T>} Requested data with selected type
 */
export const update = <T>(
  api: string,
  id: string,
  service: string
): Promise<T> =>
  getUser<IAuthTokens>(id)
    .then(resolveTokens(service))
    .then(data => fetchData<T>(api, data.AuthTokens[service].AccessToken))
    .catch(e => {
      throw Error(e);
    });

/**
 * Check if AuthTokens exists in user data
 *
 * @param {string} service
 */
const resolveTokens = (service: string) => (
  data: IAuthTokens
): Promise<IAuthTokens> =>
  tokensExists(data, service)
    ? Promise.resolve(data)
    : Promise.reject(ErrorType.TokensNotExists);

/**
 * Fetch data from API
 *
 * @template T
 * @param {string} api Api url
 * @param {string} authToken Authentication token
 * @param {boolean} [json=true] Use json in request (default true)
 * @returns {Promise<T>} Requested data
 */
export const fetchData = <T>(
  api: string,
  authToken: string,
  json: boolean = true
): Promise<T> =>
  get(api, {
    headers: { Authorization: `Bearer ${authToken}` },
    ...(json ? { json } : undefined)
  })
    .then(data => JSON.parse(data.body))
    .catch(_ => Promise.reject(ErrorType.RequestFailed));
