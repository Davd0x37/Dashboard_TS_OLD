import { requestServiceData } from "@/components/service";
import { servicesOAuth } from "@/config/services";
import { AuthTokens, User } from "@/entity";
import { AppError } from "@/utils/log";
import { refreshTokens } from "../authentication";
import { readSession } from "../memory";
import { fetchKey } from "../vault";
import { encryptPass } from "./Crypto";

export default {
  // User input is defined in graphql schema
  // We know it will be valid as long as schema contains valid fields declarations
  addUser: async (__: any, { data }: any): Promise<boolean> => {
    try {
      const key = await fetchKey("encrypt", "userAes");
      if (key === undefined) {
        return false;
      }

      const encrypted = await encryptPass(data.password, key);
      return await User.insert({
        ...data,
        registerDate: new Date(),
        password: encrypted
      })
        .then(_ => true)
        .catch(err => AppError(err, false));
    } catch (err) {
      return AppError(err, false);
    }
  },

  // Fetch services assigned to user and select from services.ts file
  updateUserData: async (__: any, { session_id }: any): Promise<boolean> => {
    try {
      const id = await readSession(session_id);
      if (id === null) {
        return false;
      }

      const tokens = await AuthTokens.getAuthTokensById(id);
      const req = await Promise.all(
        tokens!.map(async token => {
          // ut2 - ut
          const ut = token.updateTime!;
          const ut2 = new Date();
          ut.setSeconds(ut.getSeconds() + token.expiresIn!);
          const service = servicesOAuth[token.serviceName];
          if (ut2 > ut) {
            const refresh = await refreshTokens(id, token.serviceName, service);
            if (!refresh) {
              return Promise.reject(false);
            }
          }
          return await Promise.all(
            service.paths.map(
              async (path: string) =>
                await requestServiceData(
                  path,
                  token.accessToken!,
                  service.requestedData
                )
            )
          );
        })
      );

      console.log(req);

      // const req = await Promise.all(
      //   Object.entries(servicesOAuth).map(
      //     async ([service, { paths, requestedData }]) => ({
      //       [service]: await Promise.all(
      //         paths.map(
      //           async path =>
      //             await requestServiceData(path, id, service, requestedData)
      //         )
      //       )
      //     })
      //   )
      // );

      // await Promise.all(
      //   req.map(service =>
      //     Object.entries(service).forEach(([key, val]) =>
      //       debug(key, JSON.stringify(val))
      //     )
      //   )
      // );

      return true;
    } catch (err) {
      return AppError(err, false);
    }
  }
};
