import { API_TOKENS } from "@/config/testData";
import { igniteConnection } from "@/CreateConnection";
import { ApiTokens } from "./index";

beforeAll(async () => {
  await igniteConnection();
});

describe("Testing AuthTokens", () => {
  describe("Create unique tokens", () => {
    test("Inserted unique", async () => {
      const unique = await ApiTokens.saveTokens(API_TOKENS);
      expect(unique).toBeTruthy();
    });

    test("Insertion failed due to uniquability", async () => {
      const error = await ApiTokens.saveTokens(API_TOKENS);
      expect(error).toBeFalsy();
    });
  });

  describe("Get token by service name", () => {
    test("Exists", async () => {
      const tokens = await ApiTokens.getAuthTokenByName(API_TOKENS.serviceName);
      expect(tokens).toMatchObject(API_TOKENS);
      expect(tokens).not.toBeNull();
    });

    test("Not exists", async () => {
      const tokens = await ApiTokens.getAuthTokenByName(
        API_TOKENS.serviceName + "LELELELE"
      );
      expect(tokens).toBeNull();
    });
  });

  describe("Token not found", () => {
    test("Received false while updating tokens of unknown name", async () => {
      const update = await ApiTokens.updateTokens({
        ...API_TOKENS,
        serviceName: "NOTFOUND"
      });
      expect(update).toBeFalsy();
    });
  });

  describe("Update tokens", () => {
    test("Update tokens", async () => {
      const update = await ApiTokens.updateTokens({
        ...API_TOKENS,
        tokenType: "Basic"
      });
      expect(update).toBeTruthy();
    });

    test("Match updated with mocked one", async () => {
      const updated = await ApiTokens.getAuthTokenByName(
        API_TOKENS.serviceName
      );
      expect(updated).toMatchObject({ ...API_TOKENS, tokenType: "Basic" });
    });
  });
});
