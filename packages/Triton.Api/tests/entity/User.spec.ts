import { igniteConnection } from "@/CreateConnection";
import { AuthTokens } from "@/entity/AuthTokens";
import { User } from "@/entity/User";
import { FALSE_ID, SERVICE, TOKENS, USER, USER_ID } from "../testData";

beforeAll(async () => {
  await igniteConnection();
});

describe("Testing User", () => {
  describe("Create user and AuthTokens instance", () => {
    test("Create user", async () => {
      const user = await User.create({ id: USER_ID, ...USER }).save();
      expect(user).toMatchObject(USER);
    });

    test("Create AuthTokens", async () => {
      const tokens = await AuthTokens.saveTokens(USER_ID, SERVICE, TOKENS);
      expect(tokens).toBeTruthy();
    });
  });

  describe("User availability", () => {
    test("Available", async () => {
      const goodUUID = await User.getById(USER_ID);
      expect(goodUUID).toMatchObject({ id: USER_ID, login: USER.login });
    });

    test("Unavailable", async () => {
      const badUUID = await User.getById(FALSE_ID);
      expect(badUUID).toBeNull();
    });
  });

  describe("Get user by his ID", () => {
    test("Correct ID", async () => {
      const req = await User.getById(USER_ID);
      expect(req).toMatchObject({ login: USER.login });
      expect(req).not.toBeNull();
    });

    test("Incorrect ID", async () => {
      const req = await User.getById(FALSE_ID);
      expect(req).toBeNull();
    });
  });

  describe("Get user by state key", () => {
    test("Receive user entity", async () => {
      const req = await User.getIdByStateKey(TOKENS.state!);
      expect(req).toBe(USER_ID);
    });

    test("Receive null", async () => {
      const req = await User.getIdByStateKey(FALSE_ID);
      expect(req).toBeNull();
    });
  });
});
