import { AppError } from "@/utils/log";
import { argon2id, hash, verify } from "argon2";
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

/**
 * Hash password with argon2.
 * @param {string} pass Password to hash
 * @returns {Promise<string>} Hashed password
 */
export const hashPass = async (pass: string): Promise<string> => {
  try {
    return await hash(pass, {
      timeCost: 16,
      memoryCost: 2 ** 15,
      parallelism: 2,
      type: argon2id
    });
  } catch (err) {
    throw AppError(err, null);
  }
};

/**
 * Verify hashed password with original one.
 * @param {string} hashed Hashed password
 * @param {string} pass Password to compare with hash
 * @returns {Promise<boolean>} True if hash is verified otherwise false
 */
export const verifyPass = async (
  hashed: string,
  pass: string
): Promise<boolean> =>
  await verify(hashed, pass).catch(_ => Promise.reject(null));

/**
 *
 * @param password Password to encrypt and decrypt
 */
export const AES256_AR2 = {
  createHash: async (password: string, salt: Buffer) => {
    return await hash(password, {
      hashLength: 32,
      salt,
      timeCost: 16,
      memoryCost: 2 ** 15,
      parallelism: 2,
      type: argon2id,
      raw: true
    });
  },

  Encrypt: async (data: string, password: string) => {
    const salt = randomBytes(64); // Create random salt
    const initVec = randomBytes(64); // Create vector initializer
    // Hash password and salt
    const secretKey = await AES256_AR2.createHash(password, salt);
    // Set authTagLength to 16 to ensure that length will be constant
    const cipher = createCipheriv("aes-256-gcm", secretKey, initVec, {
      authTagLength: 16
    });
    const encrypted = Buffer.from(
      cipher.update(data, "utf8", "base64") + cipher.final("base64")
    );
    const authTag = cipher.getAuthTag();

    // 64 + 64 + 16 + ...
    return Buffer.concat([salt, initVec, authTag, encrypted]).toString(
      "base64"
    );
  },

  Decrypt: async (buffer: string, password: string) => {
    const decode = Buffer.from(buffer, "base64");
    const [salt, initVec, authTag, encrypted] = [
      decode.slice(0, 64),
      decode.slice(64, 128),
      decode.slice(128, 144),
      decode.slice(144).toString()
    ];

    const secretKey = await AES256_AR2.createHash(password, salt);
    const decipher = createDecipheriv("aes-256-gcm", secretKey, initVec);
    decipher.setAuthTag(authTag);
    return (
      decipher.update(encrypted, "base64", "utf8") + decipher.final("utf8")
    );
  }
};
