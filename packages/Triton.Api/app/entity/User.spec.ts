import { FALSE_ID, SERVICE, TOKENS, USER, USER_ID } from "@/config/testData";
import { igniteConnection } from "@/CreateConnection";
import { AuthTokens, User } from "./index";

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
      expect(goodUUID).not.toBeNull();
    });

    test("Unavailable", async () => {
      const badUUID = await User.getById(FALSE_ID);
      expect(badUUID).toBeNull();
    });
  });

  describe("Update session ID", () => {
    test("Success", async () => {
      const req = await User.updateSession(USER_ID, "UPDATED_SESSION_ID");
      expect(req).toBeTruthy();

      const checkSID = await User.getById(USER_ID);
      expect(checkSID!.sessionId).toBe("UPDATED_SESSION_ID");
    });

    test("Error", async () => {
      const req = await User.updateSession(FALSE_ID, "FALSE_SESSION_ID");
      expect(req).toBeFalsy();
    });
  });
});
