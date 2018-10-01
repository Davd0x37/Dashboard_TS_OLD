import { query } from "../../controller/DB";

/**
 * Update user credentials
 *
 * @param {string} id
 * @param {unknown} config
 * @returns {Promise<void>}
 */
export const updateCredentials = async (id: string, config: unknown): Promise<void> => {
  await query(q => q.get(id).update({ ...config }));
};

/**
 * Get user details
 *
 * @param {string} id
 * @returns {Promise<unknown>}
 */
export const getUser = async (id: string): Promise<unknown> => {
  return query(q => q.get(id));
};

/**
 * Check if login is available
 *
 * @param {string} login
 * @returns {Promise<boolean>}
 */
export const loginAvailable = async (login: string): Promise<boolean> => {
  const user = await query(q => q.filter({ login }));
  return user.length === 0;
};
