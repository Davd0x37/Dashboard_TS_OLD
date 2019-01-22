import { AES256_AR2, decryptPass, encryptPass, hashPass, verifyPass } from "./index";

describe("Encrypt/decrypt data", () => {
  const masterKey = "MASTERKEY";
  const password = "TESTEDPASSWORDD";
  const passwordBase = Buffer.from(password, "utf8").toString("base64");
  const argonPhrase = /^\$argon2/g;

  it("Should hash and verify", async () => {
    const hash = await hashPass(password);
    expect(hash).not.toBeNull();
    expect(hash).toEqual(expect.stringMatching(argonPhrase));

    const req = await verifyPass(hash!, password);
    expect(req).toBeTruthy();
  });

  it("Should encrypt/decrypt data", async () => {
    const KEY = "MASTERPASSWORD";
    const data = {
      name: "TESTER"
    };

    const encrypt = await AES256_AR2.Encrypt(JSON.stringify(data), KEY);
    expect(typeof encrypt).toBe("string");

    const decrypt = await AES256_AR2.Decrypt(encrypt, KEY);
    expect(JSON.parse(decrypt)).toMatchObject(data);
  });

  it("Should encrypt/decrypt password", async () => {
    const encrypt = await encryptPass(passwordBase, masterKey);
    expect(typeof encrypt).toBe("string")

    const decrypt = await decryptPass(encrypt, passwordBase, masterKey);
    expect(decrypt).toBeTruthy()
  });
});
