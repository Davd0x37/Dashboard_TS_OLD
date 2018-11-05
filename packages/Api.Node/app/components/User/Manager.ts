import signale from "signale";
import { query } from "#/controller/DB";
import { IUserDocType, IAuthTokens } from "#SH/Interfaces";

/**
 * Update user credentials
 *
 * @param {string} id
 * @param {unknown} config
 * @returns {Promise<void>}
 */
export const UpdateCredentials = async (id: string, config: unknown): Promise<void> => {
  try {
    await query(q => q.get(id).update({ ...config }));
  } catch (e) {
    signale.error("User.Manager.UpdateCredentials ------", e);
    throw Error(e);
  }
};

/**
 * Update auth tokens
 *
 * @param {{ id: string; service: string; tokens: object }} { id, service, tokens }
 */
export const UpdateTokens = async ({ id, service, tokens }: { id: string; service: string; tokens: unknown }) => {
  try {
    await UpdateCredentials(id, {
      AuthTokens: {
        [service]: {
          ...tokens
        }
      }
    });
  } catch (e) {
    signale.error("User.Manager.UpdateTokens ------", e);
    throw Error(e);
  }
};

/**
 * Get user details
 *
 * @param {string} id
 * @returns {Promise<IUserDocType>}
 */
export const GetUser = async (id: string): Promise<IUserDocType | IAuthTokens> => {
  try {
    return query(q => q.get(id));
  } catch (e) {
    signale.error("User.Manager.GetUser ------", e);
    throw Error(e);
  }
};

/**
 * Check if field is available
 *
 * @param {object} fields
 * @returns {Promise<boolean>}
 */
export const FieldAvailable = async (fields: object): Promise<boolean> => {
  try {
    const field = await query(q => q.filter({ ...fields }));
    return field.length === 0;
  } catch (e) {
    signale.error("User.Manager.FieldAvailable ------", e);
    throw Error(e);
  }
};
