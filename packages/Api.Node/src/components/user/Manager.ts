import { query } from "../../controller/DB";
import { IUser } from "../../interfaces/IUser";

/**
 * Update user credentials
 *
 * @param {string} id
 * @param {unknown} config
 * @returns {Promise<void>}
 */
export const updateCredentials = async (id: string, config: unknown): Promise<void> => {
  try {
    await query(q => q.get(id).update({ ...config }));
  } catch (e) {
    throw Error(e);
  }
};

/**
 * Get user details
 *
 * @param {string} id
 * @returns {Promise<unknown>}
 */
export const getUser = async (id: string): Promise<IUser> => {
  try {
    return query(q => q.get(id));
  } catch (e) {
    throw Error(e);
  }
};

/**
 * Check if login is available
 *
 * @param {string} login
 * @returns {Promise<boolean>}
 */
export const fieldAvailable = async (fields: {}): Promise<boolean> => {
  try {
    const field = await query(q => q.filter({ ...fields }));
    return field.length === 0;
  } catch (e) {
    throw Error(e);
  }
};
