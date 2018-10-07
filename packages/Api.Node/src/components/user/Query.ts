import { query } from "../../controller/DB";
import { hashPass } from "../../utils/crypto";

// Need to be exported as object because we want to use spread operator
export default {
  /**
   * Get user from database
   *
   * @param {*} _
   * @param {*} { login, password }
   * @returns {Promise<object>}
   */
  async authenticateUser(_: any, { login, password }: any): Promise<object> {
    try {
      const req: any = await query(async q => q.filter({ login, password: await hashPass(password) }));
      return req[0];
    } catch (e) {
      throw Error(e);
    }
  },

  /**
   * Get all users from database
   *
   * @returns {Promise<object[]>}
   */
  async getAllUsers(): Promise<object[]> {
    try {
      return query(q => q);
    } catch (e) {
      throw Error(e);
    }
  }
};
