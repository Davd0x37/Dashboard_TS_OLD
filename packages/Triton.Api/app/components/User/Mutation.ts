import { User } from "@/entity";
import { AppError } from "@/utils/log";
import { readSession } from "../memory";
import { setupServiceTokens } from "../service";
import { fetchKey } from "../vault";
import { encryptPass } from "./Crypto";
import { ApiTokens } from "@/entity/ApiTokens";

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

  updateBasicToken: async (
    __: any,
    { session_id, serviceName, token }: any
  ): Promise<boolean> => {
    try {
      const id = await readSession(session_id);
      if (id === null) {
        return false;
      }

      return await setupServiceTokens(id, serviceName, {
        accessToken: token,
        tokenType: "Basic"
      });
    } catch (err) {
      return AppError(err, false);
    }
  },

  addService: async (__: any, { data, update }: any): Promise<boolean> => {
    try {
      if(data.tokenType === "Bearer") {
        if(data.clientID === null) {
          return false
        }
      }
      if(update) {
        return await ApiTokens.updateTokens(data)
      }
      return await ApiTokens.saveTokens(data);
    } catch (err) {
      return AppError(err, false);
    }
  }
};
