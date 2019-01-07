import { randomBytes } from "crypto";
import { existsSync } from "fs";
import { createFileSync } from "fs-extra";
import { resolve } from "path";
import { write } from "./components/vault";
import { secrets } from "./config/vault";
import { AppError } from "./utils/log";

const file = "./Setup.log";

export const firstRun = async () => {
  try {
    if (existsSync(resolve(file))) {
      return false;
    }
    await createVault();

    createFileSync(resolve(file));
    return true;
  } catch (err) {
    throw AppError(err, err);
  }
};

const createVault = async () => {
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
