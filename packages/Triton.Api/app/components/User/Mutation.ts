import { requestServiceData } from "@/components/service";
import { servicesOAuth } from "@/config/services";
import { User } from "@/entity";
import { hashPass } from "@/utils/crypto";
import { AppError } from "@UTILS/log";

export default {
  // User input is defined in graphql schema
  // We know it will be valid as long as schema contains valid fields declarations
  addUser: async (__: any, { data }: any): Promise<boolean> => {
    try {
      data.password = await hashPass(data.password);
      return await User.insert(data)
        .then(_ => true)
        .catch(err => AppError(err, false));
    } catch (err) {
      return AppError(err, false);
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
        req.map(service =>
          Object.entries(service).forEach(([key, val]) =>
            console.log(key, JSON.stringify(val))
          )
        )
      );

      return true;
    } catch (err) {
      return AppError(err, false);
    }
  }
};
