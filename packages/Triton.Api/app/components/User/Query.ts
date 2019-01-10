import { Service, User } from "@/entity";
import { AppError } from "@/utils/log";
import { omit } from "lodash";
import { genEncryptedJWT } from "../authentication";
import { deleteSession, saveSession } from "../memory";
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

        // We don't need to check if sessin exists or no
        // if no, redis will return null otherwise delete previous
        // @TODO: Maybe instead of deleting just reuse existing one before it expires?
        // Or add authentication limit? 5 requests per 30 mins?
        await deleteSession(user.sessionId!)
        await User.updateSession(user.id, token!)

        // `token!` contains `!` because jwtKey exists
        const session = await saveSession(token!, user.id);

        const services = await Service.getServiceById(user.id)

        return (
          session && {
            session_id: token,
            ...omit(user, ["id", "password", "login"]),
            services
          }
        );
      }
      return null;
    } catch (err) {
      return AppError(err, null);
    }
  }
};
