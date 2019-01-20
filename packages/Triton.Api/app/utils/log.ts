import { error } from "signale";

/**
 * It will log error and return value that should be returned
 * just as normal return.
 * @template T
 * @param {*} err Error message
 * @param {T} ret Return value
 * @returns {T}
 */
export const AppError = <T>(err: any, ret: T): T => {
  const env = process.env.NODE_ENV;
  if (env === "test") {
    // Error only in dev mode
    error(err);
  }
  return ret;
};
