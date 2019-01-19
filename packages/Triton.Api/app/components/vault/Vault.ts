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

export const fetchKey = async (
  key: string,
  selected: string | string[]
): Promise<{ [key: string]: any }> =>
  Array.isArray(selected)
    ? await selected.reduce(reduceKeys, {})
    : await readKey(key, selected);

export const writeKey = async (path: string, value: {}): Promise<boolean> => {
  try {
    await vault.write(path, value);
    return true;
  } catch (err) {
    return AppError(err, false);
  }
};

const reduceKeys = async (prev: any, curr: any): Promise<{}> => {
  const key = await vault.read(`keys/${curr}`);
  return {
    ...prev,
    [curr]: key.data[curr]
  };
};

const readKey = (
  key: string,
  selected: string
): Promise<{ [key: string]: any }> =>
  vault
    .read(`keys/${key}`)
    .then(({ data }: any) => ({ [selected]: data[selected] }));
