import argon2 from 'argon2'

/**
 * Hash password with argon2
 *
 * @param {string} pass
 * @returns [Promise] hashed password
 */
const hashPass = async (pass: string) => {
    try {
        const salt = Buffer.alloc(512, 'SaltArgon2')
        const hash = await argon2.hash(pass, {
            type: argon2.argon2id,
            salt
        })
        return hash
    } catch (error) {
        throw new Error(error)
    }
}

/**
 * Verify hashed password with original one
 * 
 * @param hash hashed password
 * @param pass password which will be verified with hash
 * @returns true if hash is verified otherwise false
 */
export const verifyPass = async (hash: string, pass: string) => {
    try {
        if(await argon2.verify(hash, pass)) {
            return true
        }else{
            return false
        }
    } catch (error) {
        throw new Error(error)
    }
}