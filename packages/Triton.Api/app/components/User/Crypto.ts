import { AES256_AR2, hashPass, verifyPass } from "@/components/vault";

/**
 * Decrypt password, compare hashes and return result.
 * @param {string} buffer Password encoded in base64
 * @param {string} password Password to decrypt
 * @param {string} key Master key
 * @returns {Promise<boolean>} True if password match or false if not
 */
export const decryptPass = async (
  buffer: string,
  password: string,
  key: string
): Promise<boolean> => {
  const decoded = Buffer.from(password, "base64").toString("utf8");
  const encrypted = await AES256_AR2.Decrypt(buffer, key);
  return await verifyPass(encrypted, decoded);
};

/**
 * Encrypt password with master key
 * @param {string} password Password (in base64) to encrypt
 * @param {string} key Master key
 * @returns {Promise<string>} Encrypted hash password
 */
export const encryptPass = async (
  password: string,
  key: string
): Promise<string> => {
  const decoded = Buffer.from(password, "base64").toString("utf8");
  const hashed = await hashPass(decoded);
  return await AES256_AR2.Encrypt(hashed, key);
};
