import { query } from "../../controller/DB";

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
export const getUser = async (id: string): Promise<unknown> => {
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
export const fieldAvailable = async (field: {}): Promise<boolean> => {
  try {
    const user = await query(q => q.filter({ ...field }));
    return user.length === 0;
  } catch (e) {
    throw Error(e);
  }
};
