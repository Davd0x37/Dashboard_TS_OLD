import { User } from "@/entity";
import { ApiTokens } from "@/entity/ApiTokens";
import { AppError } from "@/utils/log";
import { readSession } from "../memory";
import { setupServiceTokens } from "../service";
import { fetchKey } from "../vault";
import { encryptPass } from "../vault";

export default {
  // User input is defined in graphql schema
  // We know it will be valid as long as schema contains valid fields declarations
  addUser: async (__: any, { data }: any): Promise<boolean> => {
    const { userAes } = await fetchKey("encrypt", "userAes");
    if (userAes === undefined) {
      return false;
    }

    const encrypted = await encryptPass(data.password, userAes);
    return await User.insert({
      ...data,
      registerDate: new Date(),
      password: encrypted
    })
      .then(_ => true)
      .catch(err => AppError(err, false));
  },

  updateBasicToken: async (
    __: any,
    { session_id, serviceName, token }: any
  ): Promise<boolean> => {
    try {
      const id = await readSession(session_id);

      return (
        !!id &&
        (await setupServiceTokens(id, serviceName, {
          accessToken: token,
          tokenType: "Basic"
        }))
      );
    } catch (err) {
      return AppError(err, false);
    }
  },

  addService: async (__: any, { data, update }: any): Promise<boolean> => {
    try {
      // @TODO: Add strategy pattern for this
      if (data.tokenType === "Bearer") {
        if (data.clientID === null) {
          return false;
        }
      }
      if (update) {
        return await ApiTokens.updateTokens(data);
      }
      return await ApiTokens.saveTokens(data);
    } catch (err) {
      return AppError(err, false);
    }
  }
};
