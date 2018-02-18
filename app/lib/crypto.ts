import argon, { Options } from "argon2"

export async function encrypt(
  password: string,
  options?: Options & { raw: false },
): Promise<string> {
  const hash = argon.hash(password, options)
  return hash
}

export async function decrypt(
  hashed: string,
  password: string,
): Promise<boolean> {
  const verified = argon.verify(hashed, password)
  return verified
}
