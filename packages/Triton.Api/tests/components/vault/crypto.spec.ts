import { AES256_AR2, hashPass, verifyPass } from "@/components/vault";

describe("Encrypt/decrypt data", () => {
  const password = "TESTEDPASSWORDD";
  const argonPhrase = /^\$argon2/g;

  it("Should hash data", async () => {
    const hash = await hashPass(password);
    expect(hash).not.toBeNull();
    expect(hash).toEqual(expect.stringMatching(argonPhrase));
  });

  it("Should verify hashed data", async () => {
    const hash = await hashPass(password);
    expect(hash).not.toBeNull();
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
});
