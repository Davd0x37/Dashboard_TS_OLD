import { AuthTokens } from "@ENTITY/AuthTokens";
import { AppError } from "@UTILS/log";
import { get } from "got";
import { pick } from "lodash";

/**
 * First get user data and check if tokens are exists
 * then fetch data from api and return it as promise
 *
 * @param {string} path API path
 * @param {string} id User id
 * @param {string} serviceName Service name
 * @param {string[]} [pickData] Array of properties to return from response
 * @returns {(Promise<{} | null>)} Requested data
 */
export const requestServiceData = async (
  path: string,
  id: string,
  serviceName: string,
  pickData?: string[]
): Promise<{} | null> => {
  try {
    const tokens = await AuthTokens.getAuthTokenByName(id, serviceName);

    if (tokens === null || tokens.accessToken === null) {
      return null;
    }

    if (tokens.accessToken) {
      if (pickData) {
        const data = await fetchServiceData(path, tokens.accessToken);
        return pick(data, pickData);
      } else {
        return fetchServiceData(path, tokens.accessToken);
      }
    }

    return null;
  } catch (err) {
    return AppError(err, null);
  }
};

/**
 * Fetch data from API
 *
 * @param {string} api Api url
 * @param {string} authToken Authentication token
 * @param {boolean} [json=true] Should return parsed json or string?
 * - If is set to true it will return parsed json (default=true)
 * - Otherwise raw data (string) will be returned
 * @returns {Promise<{} | null>} Requested data or null if cannot
 * authenticate or nothing has fetched
 */
export const fetchServiceData = (
  api: string,
  authToken: string,
  json: boolean = true
): Promise<{} | null> =>
  get(api, {
    headers: { Authorization: `Bearer ${authToken}` },
    ...(json && { json })
  })
    .then(data => data.body)
    .catch(err => AppError(err, null));
