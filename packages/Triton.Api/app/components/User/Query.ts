import { User } from "@/entity/User";
import { hashPass } from "@UTILS/crypto";
import { log } from "@UTILS/log";

export default {
  /**
   * Get user from database
   *
   * @param {*} _
   * @param {*} { login, password } User login and password
   * @returns {(Promise<User | null>)} User or null if not found/bad credentials
   */
  async authenticateUser(
    _: any,
    { login, password }: any
  ): Promise<User | null> {
    try {
      return User.findOneOrFail({
        where: { login, password: await hashPass(password) }
      });
    } catch (e) {
      return log(e, null);
    }
  }
};
