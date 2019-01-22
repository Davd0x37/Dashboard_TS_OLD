import { REDIS_PORT } from "@/config/ports";
import { AppError } from "@/utils/log";
import Redis from "ioredis";

const redis = new Redis(REDIS_PORT);
type sessionNames = "session" | "other";

/**
 * Retrieve user ID from session.
 * @param {string} session Session id
 * @param {sessionNames} [name="session"] Key name
 * @returns {(Promise<string | null>)} User ID or null if not found
 */
export const readSession = async (
  session: string,
  name: sessionNames = "session"
): Promise<string | null> => {
  try {
    return redis
      .get(`${name}:${session}`)
      .catch(err => AppError(err, null));
  } catch (err) {
    return AppError(err, null);
  }
};

/**
 * Save user ID within session.
 * @param {string} id User id
 * @param {string} session Session id
 * @param {sessionNames} name Key name
 * @param {boolean} [expire=true] Session should expire?
 * @param {number} [time=172800] Expires in 2 days
 * @returns {Promise<boolean>} True if saved/false not
 */
export const saveSession = async (
  id: string,
  session: string,
  name: sessionNames = "session",
  expire: boolean = true,
  time: number = 172800
): Promise<boolean> => {
  try {
    if (expire) {
      return redis
        .set(`${name}:${session}`, id, "EX", time)
        .then(_ => true)
        .catch(err => AppError(err, false));
    } else {
      return redis
        .set(`${name}:${session}`, id)
        .then(_ => true)
        .catch(err => AppError(err, false));
    }
  } catch (err) {
    return AppError(err, false);
  }
};

/**
 * Delete user ID from session.
 * @param {string} session Session id
 * @param {sessionNames} [name="session"] Key name
 * @returns {Promise<boolean>}
 */
export const deleteSession = async (
  session: string,
  name: sessionNames = "session"
): Promise<boolean> => {
  try {
    return redis
      .del(`${name}:${session}`)
      .then(n => (n === 1 ? true : false))
      .catch(err => AppError(err, false));
  } catch (err) {
    return AppError(err, false);
  }
};
