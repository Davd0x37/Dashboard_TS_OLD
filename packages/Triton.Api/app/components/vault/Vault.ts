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

export const writeKey = async (path: string, value: {}): Promise<boolean> => {
  try {
    await vault.write(path, value);
    return true;
  } catch (err) {
    return AppError(err, false);
  }
};

export const fetchKey = (
  key: string,
  selected: string | string[]
): Promise<{ [key: string]: any }> =>
  vault
    .read(`keys/${key}`)
    .then(({ data }: any) =>
      Array.isArray(selected)
        ? selected.reduce((prev, curr) => ({ ...prev, [curr]: data[curr] }), {})
        : { [selected]: data[selected] }
    )
    .catch((err: any) => AppError(err, null));
