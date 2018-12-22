import { query } from '#/controller/DB';
import { hashPass } from '#/utils/crypto';
// import { IUserDocType } from '#SH/Interfaces';
import signale from 'signale';

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
      const req: [IUserDocType] = await query(async q =>
        q.filter({ User: { Login: login, Password: await hashPass(password) } })
      );
      return req[0];
    } catch (e) {
      signale.error("User.Query.authenticateUser ------", e);
      throw Error(e);
    }
  }
};
