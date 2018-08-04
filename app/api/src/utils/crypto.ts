import argon2 from "argon2";

/**
 * Hash password with argon2
 *
 * @param {string} pass
 * @param saltSize
 * @param saltString
 * @returns [Promise] hashed password
 */
export const hashPass = async (
  pass: string,
  saltSize: number = 1024,
  saltString: string = "SaltArgon2"
) => {
  try {
    const salt = Buffer.alloc(saltSize, saltString);
    return await argon2.hash(pass, {
      type: argon2.argon2id,
      salt
    });
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Verify hashed password with original one
 *
 * @param hash hashed password
 * @param pass password which will be verified with hash
 * @returns true if hash is verified otherwise false
 */
export const verifyPass = async (hash: string, pass: string) => {
  try {
    return await argon2.verify(hash, pass);
  } catch (error) {
    throw new Error(error);
  }
};
