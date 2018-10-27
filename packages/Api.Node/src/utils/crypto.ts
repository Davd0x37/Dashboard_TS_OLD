import argon2 from "argon2";
import signale = require("signale");

/**
 * Hash password with argon2
 * @param {string} pass
 * @param {number} [saltSize=1024]
 * @param {string} [saltString="SaltArgon2"]
 * @returns
 */
export const hashPass = async (
  pass: string,
  saltSize: number = 1024,
  saltString: string = "SaltArgon2"
) => {
  try {
    const salt = Buffer.alloc(saltSize, saltString);
    return argon2.hash(pass, {
      type: argon2.argon2id,
      salt
    });
  } catch (error) {
    signale.error("Crypto.hashPass ------", error);
    throw new Error(error);
  }
};

/**
 * Verify hashed password with original one
 *
 * @param {string} hash hashed password
 * @param {string} pass password which will be verified with hash
 * @returns true if hash is verified otherwise false
 */
export const verifyPass = async (hash: string, pass: string) => {
  try {
    return argon2.verify(hash, pass);
  } catch (error) {
    signale.error("Crypto.verifyPass ------", error);
    throw new Error(error);
  }
};
