import { REDIS_PORT } from "@/config/ports";
import { AppError } from "@/utils/log";
import Redis from "ioredis";

const redis = new Redis(REDIS_PORT);

/**
 * Retrieve user ID from session.
 * @param {string} session Session id
 * @returns {(Promise<string | null>)} User ID or null if not found
 */
export const readSession = async (session: string): Promise<string | null> => {
  try {
    return await redis
      .get(`session:${session}`)
      .catch(err => AppError(err, null));
  } catch (err) {
    return AppError(err, null);
  }
};

/**
 * Save user ID within session.
 * @param {string} session Session id
 * @param {string} id User id
 * @param {boolean} [expire=false] Session should expire?
 * @param {string} [time="1h"] Expires in
 * @returns {Promise<boolean>} True if saved/false not
 */
export const saveSession = async (
  session: string,
  id: string,
  expire: boolean = false,
  time: string = "1h"
): Promise<boolean> => {
  try {
    if (expire) {
      return redis.set(`session:${session}`, id, "EX", time).then(_ => true);
    } else {
      return redis.set(`session:${session}`, id).then(_ => true);
    }
  } catch (err) {
    return AppError(err, false);
  }
};

/**
 * Delete user ID from session.
 * @param {string} session Session id
 * @returns {Promise<boolean>}
 */
export const deleteSession = async (session: string): Promise<boolean> =>
  await redis
    .del(`session:${session}`)
    .then(n => (n === 1 ? true : false))
    .catch(err => AppError(err, false));
