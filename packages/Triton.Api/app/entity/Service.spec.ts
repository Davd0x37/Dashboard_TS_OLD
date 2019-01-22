import {
  FALSE_ID,
  SERVICE,
  SERVICE_ARRAY,
  SERVICE_DATA,
  SERVICE_DATA_UPDATED,
  USER,
  USER_ID
} from "@/config/testData";
import { igniteConnection } from "@/CreateConnection";
import { Service, User } from "./index";

beforeAll(async () => {
  await igniteConnection();

  const user = await User.create({ id: USER_ID, ...USER }).save();
  expect(user).toMatchObject({ login: USER.login, isOnline: USER.isOnline });
});

describe("Testing Service", () => {
  describe("Create unique service", () => {
    test("Inserted unique", async () => {
      const unique = await Service.saveService(USER_ID, SERVICE, SERVICE_DATA);
      expect(unique).toBeTruthy();

      const uniqueArray = await Promise.all(
        SERVICE_ARRAY.map(
          async (srv: string) =>
            await Service.saveService(USER_ID, srv, SERVICE_DATA)
        )
      );
      expect(uniqueArray).toContain(true);
    });

    test("Insertion failed due to uniquability", async () => {
      const error = await Service.saveService(USER_ID, SERVICE, SERVICE_DATA);
      expect(error).toBeFalsy();
    });
  });

  describe("User not found", () => {
    test("False ID", async () => {
      const save = await Service.saveService(FALSE_ID, SERVICE, SERVICE_DATA);
      expect(save).toBeFalsy();

      const update = await Service.updateData(FALSE_ID, SERVICE, SERVICE_DATA);
      expect(update).toBeFalsy();
    });
  });

  describe("Update service data", () => {
    test("Update data", async () => {
      const update = await Service.updateData(
        USER_ID,
        SERVICE,
        SERVICE_DATA_UPDATED
      );
      expect(update).toBeTruthy();
    });

    test("Match updated with mocked one", async () => {
      const updated = await Service.getServiceByName(USER_ID, SERVICE);
      expect(updated).toEqual(
        expect.objectContaining({
          serviceName: SERVICE,
          data: SERVICE_DATA_UPDATED
        })
      );
    });
  });

  describe("Get service by name and user ID", () => {
    test("Exists", async () => {
      const service = await Service.getServiceByName(USER_ID, SERVICE);
      expect(service).toEqual(
        expect.objectContaining({
          serviceName: SERVICE,
          data: SERVICE_DATA_UPDATED
        })
      );
      expect(service).not.toBeNull();
    });

    test("Not exists", async () => {
      const service = await Service.getServiceByName(FALSE_ID, SERVICE);
      expect(service).toBeNull();
    });
  });

  describe("Get services by user ID", async () => {
    test("Exists", async () => {
      const len = [SERVICE, ...SERVICE_ARRAY].length;
      const service = await Service.getServiceById(USER_ID);
      expect(service).toHaveLength(len);
      expect(service).toContainEqual(
        expect.objectContaining({
          serviceName: SERVICE,
          data: SERVICE_DATA_UPDATED
        })
      );
      expect(service).not.toBeNull();
    });

    test("Not exists", async () => {
      const service = await Service.getServiceById(FALSE_ID);
      expect(service).toBeNull();
    });
  });
});
