import { AuthTokens, Service, User } from "@/entity";
import { AppError } from "@/utils/log";
import { omit } from "lodash";
import { genEncryptedJWT, refreshTokens } from "../authentication";
import { deleteSession, readSession, saveSession } from "../memory";
import { requestServiceData } from "../service";
import { fetchKey } from "../vault/Vault";
import { decryptPass } from "./Crypto";
import { selectTokenType, time } from "./Utils";

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
        await deleteSession(user.sessionId!);
        await User.updateSession(user.id, token!);

        // `token!` contains `!` because jwtKey exists
        const session = await saveSession(token!, user.id);

        const services = await Service.getServiceById(user.id);

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
  },

  // Fetch services assigned to user and select from services.ts file
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
      if (tokens && tokens.length < 1) {
        return null;
      }

      /**
       * For now, we consider `accessToken` as valid.
       * In future I will implement validation.
       */
      await Promise.all(
        tokens!.map(async token => {
          const tokenType = token.tokenType;
          const service = selectTokenType(tokenType!, token.serviceName); // servicesOAuth[token.serviceName];

          if (tokenType === "Bearer") {
            const expired = time.expired(
              new Date(),
              token.updateTime!,
              token.expiresIn!
            );

            if (expired) {
              const refresh = await refreshTokens(
                id,
                token.serviceName,
                service
              );
              if (!refresh) {
                return null;
              }
            }
          }

          const newData = await Promise.all(
            service.paths.map(
              async (path: string) =>
                await requestServiceData(
                  path,
                  token.accessToken!,
                  service.requestedData
                )
            )
          );

          const stringified = JSON.stringify(newData);

          // const encryptedData = await AES256_AR2.Encrypt(stringified, key)

          return await Service.updateData(
            id,
            token.serviceName,
            // encryptedData
            stringified
          );
        })
      );

      return await Service.getServiceById(id);
    } catch (err) {
      return AppError(err, null);
    }
  }
};
