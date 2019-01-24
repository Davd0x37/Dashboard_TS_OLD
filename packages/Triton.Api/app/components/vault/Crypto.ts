// import { AppError } from "@/utils/log";
// import { argon2id, hash, verify } from "argon2";
// import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

// /**
//  * Hash password with argon2.
//  * @param {string} pass Password to hash
//  * @returns {Promise<string>} Hashed password
//  */
// export const hashPass = async (pass: string): Promise<string> => {
//   try {
//     return await hash(pass, {
//       timeCost: 16,
//       memoryCost: 2 ** 15,
//       parallelism: 2,
//       type: argon2id
//     });
//   } catch (err) {
//     throw AppError(err, null);
//   }
// };

// /**
//  * Verify hashed password with original one.
//  * @param {string} hashed Hashed password
//  * @param {string} pass Password to compare with hash
//  * @returns {Promise<boolean>} True if hash is verified otherwise false
//  */
// export const verifyPass = async (
//   hashed: string,
//   pass: string
// ): Promise<boolean> =>
//   await verify(hashed, pass).catch(_ => Promise.reject(null));

// /**
//  *
//  * @param password Password to encrypt and decrypt
//  */
// export const AES256_AR2 = {
//   createHash: async (password: string, salt: Buffer) => {
//     return await hash(password, {
//       hashLength: 32,
//       salt,
//       timeCost: 16,
//       memoryCost: 2 ** 15,
//       parallelism: 2,
//       type: argon2id,
//       raw: true
//     });
//   },

//   /**
//    * Encrypt data and return buffer as base64 string
//    * Salt from 0 to 64
//    * IV 64-128
//    * Authentication tag 128-144
//    * Encrypted data 144-x
//    *
//    * @param {string} data Data to encrypt
//    * @param {string} password Strong password
//    * @returns {Promise<string>} Encrypted data
//    */
//   Encrypt: async (data: string, password: string): Promise<string> => {
//     const salt = randomBytes(64); // Create random salt
//     const initVec = randomBytes(64); // Create vector initializer
//     // Hash password and salt
//     const secretKey = await AES256_AR2.createHash(password, salt);
//     // Set authTagLength to 16 to ensure that length will be constant
//     const cipher = createCipheriv("aes-256-gcm", secretKey, initVec, {
//       authTagLength: 16
//     });
//     const encrypted = Buffer.from(
//       cipher.update(data, "utf8", "base64") + cipher.final("base64")
//     );
//     const authTag = cipher.getAuthTag();

//     // 64 + 64 + 16 + ...
//     return Buffer.concat([salt, initVec, authTag, encrypted]).toString(
//       "base64"
//     );
//   },

//   /**
//    * Decrypt data from base64 buffer
//    * @param {string} buffer Buffer saved in base64 string
//    * @param {string} password Password
//    * @returns {Promise<string>} Decrypted data
//    */
//   Decrypt: async (buffer: string, password: string): Promise<string> => {
//     const decode = Buffer.from(buffer, "base64");
//     const [salt, initVec, authTag, encrypted] = [
//       decode.slice(0, 64),
//       decode.slice(64, 128),
//       decode.slice(128, 144),
//       decode.slice(144).toString()
//     ];

//     const secretKey = await AES256_AR2.createHash(password, salt);
//     const decipher = createDecipheriv("aes-256-gcm", secretKey, initVec);
//     decipher.setAuthTag(authTag);
//     return (
//       decipher.update(encrypted, "base64", "utf8") + decipher.final("utf8")
//     );
//   }
// };

// /**
//  * Decrypt password, compare hashes and return result.
//  * @param {string} buffer Password encoded in base64
//  * @param {string} password Password to decrypt
//  * @param {string} key Master key
//  * @returns {Promise<boolean>} True if password match or false if not
//  */
// export const decryptPass = async (
//   buffer: string,
//   password: string,
//   key: string
// ): Promise<boolean> => {
//   const decoded = Buffer.from(password, "base64").toString("utf8");
//   const encrypted = await AES256_AR2.Decrypt(buffer, key);
//   return await verifyPass(encrypted, decoded);
// };

// /**
//  * Encrypt password with master key
//  * @param {string} password Password (in base64) to encrypt
//  * @param {string} key Master key
//  * @returns {Promise<string>} Encrypted hash password
//  */
// export const encryptPass = async (
//   password: string,
//   key: string
// ): Promise<string> => {
//   const decoded = Buffer.from(password, "base64").toString("utf8");
//   const hashed = await hashPass(decoded);
//   return await AES256_AR2.Encrypt(hashed, key);
// };
