import { ApiTokens, AuthTokens, Service, User } from "@/entity";
import { AppError } from "@/utils/log";
import { omit } from "lodash";
import { genEncryptedJWT } from "../authentication";
import { deleteSession, readSession, saveSession } from "../memory";
import { mapTokens } from "../service";
import { decryptPass, fetchKey } from "../vault";

export default {
  /**
   * Get user from database.
   * @param {*} _ context
   * @param {*} { login, password } User login and password
   * @returns {(Promise<{} | null>)} User or null if not found/bad credentials
   */
  async authenticateUser(_: any, { login, password }: any): Promise<{} | null> {
    try {
      const { userAes, jwt } = await fetchKey("encrypt", ["userAes", "jwt"]);
      if (password === undefined || jwt === undefined) {
        return null;
      }

      // There is no need to check returned value because it will
      // reject if not found
      const user: Readonly<User> = await User.findOneOrFail({
        where: { login }
      });

      const decrypt = await decryptPass(user.password, password, userAes);

      if (decrypt) {
        const token = await genEncryptedJWT(user.id, jwt, "2d");
        if (token === null) {
          return null;
        }

        // We don't need to check if sessin exists or no
        // if no, redis will return null otherwise delete previous
        // @TODO: Maybe instead of deleting just reuse existing one before it expires?
        // Or add authentication limit? 5 requests per 30 mins?
        const del = await deleteSession(user.sessionId!);
        const update = await User.updateSession(user.id, token!);
        const newSession = await saveSession(user.id, token!);

        // `token!` contains `!` because jwt exists
        const services = await Service.getServiceById(user.id);
        const reqServ = await ApiTokens.find();
        const avServices = reqServ.map(srv => srv.serviceName)

        return (
          newSession && {
            session_id: token,
            ...omit(user, ["id", "password", "login"]),
            services,
            avServices
          }
        );
      }
      return null;
    } catch (err) {
      return AppError(err, null);
    }
  },

  updateUserData: async (
    __: any,
    { session_id }: any
  ): Promise<Service[] | null> => {
    try {
      // const key = await fetchKey("encrypt", "serviceData");
      const id = await readSession(session_id);
      if (id === null /* || key === undefined */) {
        return null;
      }

      const tokens = await AuthTokens.getAuthTokensById(id);
      const apiKeys = await ApiTokens.find();
      if (tokens && tokens.length < 1) {
        return null;
      }

      // Do something with it. Optimize or something.
      await Promise.all(tokens!.map(mapTokens(id, apiKeys)));

      return await Service.getServiceById(id);
    } catch (err) {
      return AppError(err, null);
    }
  }
};
