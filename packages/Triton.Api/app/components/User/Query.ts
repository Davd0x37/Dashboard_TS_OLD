import { User } from "@/entity";
import { hashPass } from "@/utils/crypto";
import { AppError } from "@/utils/log";

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
      return await User.findOneOrFail({
        where: { login, password: await hashPass(password) }
      });
    } catch (err) {
      return AppError(err, null);
    }
  }
};
