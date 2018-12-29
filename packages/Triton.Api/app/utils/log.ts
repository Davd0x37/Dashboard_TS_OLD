import { error } from "signale";

// Maybe change undefined to enum type?
export const log = (err: any, ret?: any, prom: boolean = false) => {
  const env = process.env.NODE_ENV;
  if (env !== "prod") {
    // Error only in dev mode
    error(err);
  }

  return prom === false ? ret : Promise.reject(err);
};
