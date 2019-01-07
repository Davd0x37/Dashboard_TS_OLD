import { User } from "@/entity";
import { AppError } from "@/utils/log";
import { omit } from "lodash";
import { genEncryptedJWT } from "../authentication";
import { saveSession } from "../memory";
import { fetchKey } from "../vault/Vault";
import { decryptPass } from "./Crypto";

export default {
  /**
   * Get user from database.
   * @param {*} _
   * @param {*} { login, password } User login and password
   * @returns {(Promise<{} | null>)} User or null if not found/bad credentials
   */
  async authenticateUser(_: any, { login, password }: any): Promise<{} | null> {
    try {
      const key = await fetchKey("encrypt", "userAes");
      const jwtKey = await fetchKey("encrypt", "jwt");
      if (password === undefined || jwtKey === undefined) {
        return null;
      }

      const user: Readonly<User> = await User.findOneOrFail({
        where: { login }
      });

      const decrypt = await decryptPass(user.password, password, key);

      if (decrypt) {
        const token = await genEncryptedJWT(user.id, jwtKey, "2d");

        // `token!` contains `!` because jwtKey exists
        const session = await saveSession(token!, user.id);

        return (
          session && {
            session_id: token,
            ...omit(user, ["id", "password", "login"])
          }
        );
      }
      return null;
    } catch (err) {
      return AppError(err, null);
    }
  }
};
