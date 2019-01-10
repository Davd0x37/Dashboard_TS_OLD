import { apiVersion, endpoint } from "@/config/vault";
import { AppError } from "@/utils/log";
// @ts-ignore
import vlt from "node-vault";

const token = process.env.VAULT_TOKEN;
const vault = vlt({ apiVersion, endpoint, token });

export const unseal = async () => {
  const key = process.env.VAULT_KEY;
  return await vault.unseal({ secret_shares: 1, key });
};

export const fetchKey = async (key: string, sel: string): Promise<string> => {
  const req = await vault.read(`keys/${key}`);
  return req.data[sel];
};

export const write = async (path: string, value: {}): Promise<boolean> => {
  try {
    await vault.write(path, value);
    return true;
  } catch (err) {
    return AppError(err, false);
  }
};