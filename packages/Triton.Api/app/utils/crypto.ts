import argon2 from "argon2";

/**
 * Hash password with argon2
 *
 * @param {string} pass
 * @param {number} [saltSize=1024]
 * @param {string} saltString
 * @returns {Promise<string>} Hashed password
 */
export const hashPass = (
  pass: string,
  saltSize: number = 1024,
  saltString: string = "JarzXnzUqsyecnrwu)hzbriw!qig7h@rdJzyhzyzegixkczrxcpgunhgcmrqhhkfvuctjpf.aM,7pixdn2mupjdmmxexhghaacmb"
): Promise<string> =>
  argon2
    .hash(pass, {
      type: argon2.argon2id,
      salt: Buffer.alloc(saltSize, saltString)
    })
    .catch(err => Promise.reject(err));

/**
 * Verify hashed password with original one
 *
 * @param {string} hash Hashed password
 * @param {string} pass Password to compare with hash
 * @returns {Promise<boolean>} True if hash is verified otherwise false
 */
export const verifyPass = (hash: string, pass: string): Promise<boolean> =>
  argon2.verify(hash, pass).catch(err => Promise.reject(err));
