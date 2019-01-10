import { randomBytes } from "crypto";
// import { existsSync } from "fs";
// import { createFileSync } from "fs-extra";
import { post } from "got";
// import { resolve } from "path";
import { write } from "./components/vault";
import { apiVersion, endpoint, secrets } from "./config/vault";
import { AppError } from "./utils/log";

// const file = "./setup.log";

export const firstRun = async () => {
  try {
    const exs = process.env.VAULT_EXISTS

    // After restart we don't want to create new vault
    // if (existsSync(resolve(file))) {
    //   return false;
    // }

    // We can stop creating new vault
    if (exs) {
      return false
    }

    await createVault()
    await initVault();

    // createFileSync(resolve(file));
    return true;
  } catch (err) {
    throw AppError(err, err);
  }
};

const createVault = async () => {
  try {
    const req = await post(`${endpoint}/${apiVersion}/sys/mounts/keys`, {
      headers: {
        "X-Vault-Token": process.env.VAULT_TOKEN
      },
      body: JSON.stringify({
        type: "kv",
        version: "2"
      })
    })
    return req.statusCode === 204
  } catch (err) {
    throw AppError(err, err)
  }
}

const initVault = async () => {
  try {
    const value = secrets.encrypt.reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: Buffer.from(randomBytes(256)).toString("base64")
      }),
      {}
    );
    await write("keys/encrypt", { ...value });
  } catch (err) {
    throw AppError(err, err);
  }
};
