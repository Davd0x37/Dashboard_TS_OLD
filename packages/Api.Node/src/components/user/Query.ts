import signale from "signale"
import { query } from "../../controller/DB";
import { IUser } from "../../interfaces/IUser";
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
  async AuthenticateUser(_: any, { login, password }: any): Promise<object> {
    try {
      const req: [IUser] = await query(async q => q.filter({ User: { Login: login, Password: await hashPass(password) } }));
      return req[0];
    } catch (e) {
      signale.error("User.Query.authenticateUser ------", e);
      throw Error(e);
    }
  },

  /**
   * Get all users from database
   *
   * @returns {Promise<object[]>}
   */
  async GetAllUsers(): Promise<object[]> {
    try {
      return query(q => q);
    } catch (e) {
      signale.error("User.Query.getAllUsers ------", e);
      throw Error(e);
    }
  }
};
