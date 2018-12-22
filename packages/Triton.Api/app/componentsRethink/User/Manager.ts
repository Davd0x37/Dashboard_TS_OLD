import { query } from "#/controller/DB";
import { IAuthTokens } from "#/Interfaces/Auth";
import { IUserDocType } from "#SH/Interfaces";

/**
 * Update user credentials
 *
 * @param {string} id User id
 * @param {unknown} config
 * @returns {Promise<boolean>}
 */
export const updateCredentials = (
  id: string,
  config: unknown
): Promise<boolean> =>
  query(q => q.get(id).update({ ...config })).then(res => !!res.updated);

/**
 * Update auth tokens
 *
 * @param {{
 *   readonly id: string;
 *   readonly service: string;
 *   readonly tokens: unknown;
 * }} {
 *   id,
 *   service,
 *   tokens
 * }
 * @returns {Promise<boolean>}
 */
export const updateTokens = async ({
  id,
  service,
  tokens
}: {
  readonly id: string;
  readonly service: string;
  readonly tokens: unknown;
}): Promise<boolean> =>
  updateCredentials(id, {
    AuthTokens: {
      [service]: {
        ...tokens
      }
    }
  }).catch(err => Promise.reject(err));

/**
 * Get user details
 *
 * @template T
 * @param {string} id
 * @returns {Promise<T>}
 */
export const getUser = <T extends IUserDocType | IAuthTokens>(
  id: string
): Promise<T> => query(q => q.get(id));

/**
 * Check if field is available
 *
 * @param {object} fields
 * @returns {Promise<boolean>}
 */
export const fieldAvailable = async (fields: object): Promise<boolean> => {
  const field = await query(q => q.filter({ ...fields }));
  return field.length === 0;
};
