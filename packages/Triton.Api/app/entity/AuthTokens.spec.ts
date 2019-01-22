import {
  FALSE_ID,
  SERVICE,
  TOKENS,
  TOKENS_UPDATED,
  USER,
  USER_ID
} from "@/config/testData";
import { igniteConnection } from "@/CreateConnection";
import { AuthTokens, User } from "./index";

beforeAll(async () => {
  await igniteConnection();

  const user = await User.create({ id: USER_ID, ...USER }).save();
  expect(user).toMatchObject({ login: USER.login, isOnline: USER.isOnline });
});

describe("Testing AuthTokens", () => {
  describe("Create unique tokens", () => {
    test("Inserted unique", async () => {
      const unique = await AuthTokens.saveTokens(
        USER_ID,
        SERVICE,
        TOKENS_UPDATED
      );
      expect(unique).toBeTruthy();
    });

    test("Insertion failed due to uniquability", async () => {
      const error = await AuthTokens.saveTokens(USER_ID, SERVICE, TOKENS);
      expect(error).toBeFalsy();
    });
  });

  describe("User not found", () => {
    test("Received false while saving tokens of unknown ID", async () => {
      const save = await AuthTokens.saveTokens(FALSE_ID, SERVICE, TOKENS);
      expect(save).toBeFalsy();
    });

    test("Received false while updating tokens of unknown ID", async () => {
      const update = await AuthTokens.updateTokens(FALSE_ID, SERVICE, TOKENS);
      expect(update).toBeFalsy();
    });
  });

  describe("Update tokens", () => {
    test("Update tokens", async () => {
      const update = await AuthTokens.updateTokens(USER_ID, SERVICE, TOKENS);
      expect(update).toBeTruthy();
    });

    test("Match updated with mocked one", async () => {
      const updated = await AuthTokens.getAuthTokenByName(USER_ID, SERVICE);
      expect(updated).toMatchObject(TOKENS);
    });
  });

  describe("Get token by service name", () => {
    test("Exists", async () => {
      const tokens = await AuthTokens.getAuthTokenByName(USER_ID, SERVICE);
      expect(tokens).toMatchObject(TOKENS);
      expect(tokens).not.toBeNull();
    });

    test("Not exists", async () => {
      const tokens = await AuthTokens.getAuthTokenByName(FALSE_ID, SERVICE);
      expect(tokens).toBeNull();
    });
  });

  describe("Get tokens by user ID", () => {
    test("Exists", async () => {
      const tokens = await AuthTokens.getAuthTokensById(USER_ID);
      expect(tokens).toHaveLength(1);
      expect(tokens).toContainEqual(expect.objectContaining(TOKENS));
      expect(tokens).not.toBeNull();
    });

    test("Not exists", async () => {
      const tokens = await AuthTokens.getAuthTokensById(FALSE_ID);
      expect(tokens).toBeNull();
    });
  });
});
