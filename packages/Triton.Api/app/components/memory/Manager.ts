import { REDIS_PORT } from "@/config/ports";
import { AppError } from "@/utils/log";
import Redis from "ioredis";

const redis = new Redis(REDIS_PORT);

/**
 * Retrieve user ID from session
 * @param {string} session Session id
 * @returns {(Promise<string | null>)} User ID or null if not found
 */
export const readSession = async (session: string): Promise<string | null> => {
  try {
    return await redis.get(`session:${session}`);
  } catch (err) {
    return AppError(err, null);
  }
};

/**
 * Save user ID within session
 * @param {string} session Session id
 * @param {string} id User id
 * @param {boolean} [exp=false] Session should expire?
 * @param {string} [time="1h"] Expires in
 * @returns {Promise<boolean>} True if saved/false not
 */
export const saveSession = async (
  session: string,
  id: string,
  exp: boolean = false,
  time: string = "1h"
): Promise<boolean> => {
  try {
    if (exp) {
      return await redis
        .set(`session:${session}`, id, "EX", time)
        .then(_ => true);
    } else {
      return await redis.set(`session:${session}`, id).then(_ => true);
    }
  } catch (err) {
    return AppError(err, false);
  }
};
