import { AES256_AR2 } from "@/components/vault";
import { AppError } from "@/utils/log";
import { sign, SignOptions, verify } from "jsonwebtoken";

/**
 * Generate JWT token.
 * @param {string} payload
 * @param {(string | Buffer)} key
 * @param {SignOptions} options
 * @returns {(Promise<string | null>)}
 */
export const genJWT = async (
  payload: string,
  key: string | Buffer,
  options: SignOptions
): Promise<string | null> => {
  try {
    return sign({ payload }, key, {
      algorithm: "HS512",
      ...options
    });
  } catch (err) {
    return AppError(err, null);
  }
};

/**
 * @param {string} token
 * @param {(string | Buffer)} key
 * @returns {({} | null)}
 */
export const verifyJWT = (token: string, key: string | Buffer): {} | null => {
  try {
    return verify(token, key);
  } catch (err) {
    return AppError(err, null);
  }
};

/**
 * Encrypt payload and generate JWT token with it.
 * @param {string} payload Payload to encrypt
 * @param {string} key Master key
 * @param {string} expire Expiration time
 * @returns {(Promise<string | null>)} Generated token (base64) or null if error
 */
export const genEncryptedJWT = async (
  payload: string,
  key: string,
  expire: string
): Promise<string | null> => {
  try {
    const encryptPayload = await AES256_AR2.Encrypt(payload, key);
    const token = await genJWT(encryptPayload, key, { expiresIn: expire });
    return Buffer.from(token!).toString("base64");
  } catch (err) {
    return AppError(err, null);
  }
};
