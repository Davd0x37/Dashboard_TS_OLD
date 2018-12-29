import { servicesOAuth } from "@CFG/services";
import { requestServiceData } from "@COMP/service/Manager";
import { User } from "@ENTITY/User";
import { hashPass } from "@UTILS/crypto";
import { log } from "@UTILS/log";

export default {
  // User input is defined in graphql schema
  // We know it will be valid as long as schema contains valid fields declarations
  addUser: async (_: any, { data }: any): Promise<boolean> => {
    try {
      data.password = await hashPass(data.password);
      await User.insert(data);
      return true;
    } catch (e) {
      return log(e, false);
    }
  },
  // Fetch services assigned to user and select from services.ts file
  updateUserData: async (_: any, { id }: any): Promise<boolean> => {
    try {
      const req = await Promise.all(
        Object.entries(servicesOAuth).map(
          async ([service, { paths, requestedData }]) => ({
            [service]: await Promise.all(
              paths.map(
                async path =>
                  await requestServiceData(path, id, service, requestedData)
              )
            )
          })
        )
      );

      const saveReq = await Promise.all(
        req.map(service => Object.entries(service).forEach(([key, val]) => console.log(key, JSON.stringify(val))))
      );

      return true;
    } catch (e) {
      return log(e, false);
    }
  }
};
