import signale from "signale";
import { query } from "../../controller/DB";
import { IUser } from "../../interfaces/IUser";

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
 * Get user details
 *
 * @param {string} id
 * @returns {Promise<unknown>}
 */
export const GetUser = async (id: string): Promise<IUser> => {
  try {
    return query(q => q.get(id));
  } catch (e) {
    signale.error("User.Manager.GetUser ------", e);
    throw Error(e);
  }
};

/**
 * Check if login is available
 *
 * @param {string} login
 * @returns {Promise<boolean>}
 */
export const FieldAvailable = async (fields: any): Promise<boolean> => {
  try {
    const field = await query(q => q.filter({ ...fields }));
    return field.length === 0;
  } catch (e) {
    signale.error("User.Manager.FieldAvailable ------", e);
    throw Error(e);
  }
};
