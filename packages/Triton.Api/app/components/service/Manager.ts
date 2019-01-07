import { AuthTokens, Service } from "@/entity";
import { IServiceTokens } from "@/type";
import { AppError } from "@/utils/log";
import { get } from "got";
import { pick } from "lodash";

/**
 * First get user data and check if tokens are exists
 * then fetch data from api and return it as promise.
 * @param {string} path API path
 * @param {string} accessToken Access token
 * @param {string[]} [pickData] Array of properties to return from response
 * @returns {(Promise<{} | null>)} Requested data
 */
export const requestServiceData = async (
  path: string,
  accessToken: string,
  pickData?: string[]
): Promise<{} | null> => {
  try {
    if (pickData) {
      const data = await fetchServiceData(path, accessToken);
      return pick(data, pickData);
    } else {
      return fetchServiceData(path, accessToken);
    }
  } catch (err) {
    return AppError(err, null);
  }
};

/**
 * Fetch data from API.
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

/**
 * Setup user new tokens and service.
 * Create new service row or do nothing if exists.
 * Do the same with tokens.
 * @param {string} id User id
 * @param {string} serviceName Service name
 * @param {IServiceTokens} tokens Selected tokens
 * @returns {Promise<boolean>} False if cannot update or create tokens.
 */
export const setupServiceTokens = async (
  id: string,
  serviceName: string,
  tokens: IServiceTokens
): Promise<boolean> => {
  try {
    await Service.saveService(id, serviceName, "");
    const saveTokens = await AuthTokens.saveTokens(id, serviceName, tokens);
    const updateTokens =
      !saveTokens && (await AuthTokens.updateTokens(id, serviceName, tokens));

    return saveTokens || updateTokens;
  } catch (err) {
    return AppError(err, false);
  }
};
