import * as log from "signale";
import { db } from "../config/config";
import { DB } from "./DB";

/**
 * User schema like login, password etc.
 *
 * @export IUser
 * @interface IUser
 */
export interface IUser {
  avatar: string;
  country: string;
  email: string;
  firstName: string;
  language: string;
  lastName: string;
  login: string;
  password: string;
}

export const loginAvailable = async (login: string) => {
  try {
    const con = await DB();
    const user = await db.general
      .filter({ login })
      .run(con)
      .then(cursor => cursor.toArray());
    return user.length === 0;
  } catch (error) {
    log.error(error);
    return false;
  }
};

export const UserMutation = {
  addUser: async (_: any, args: any) => {
    try {
      const con = await DB();
      if (await loginAvailable(args.data.login)) {
        await db.general.insert(args.data).run(con);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      log.error(error);
      return false;
    }
  }
};

export const UserQuery = {
  /**
   * Get user from database
   *
   * @returns [array] all information about selected user
   * @param _
   * @param args
   */
  getUser: async (_: any, { login, password }: any) => {
    try {
      const con = await DB();
      return db.general
        .filter({ login, password })
        .run(con)
        .then(cursor => cursor.toArray())
        .then(user => user[0])
    } catch (error) {
      log.error(error);
      return false;
    }
  },

  /**
   * Get all users from database
   *
   * @returns [array] array of users
   */
  getAllUsers: async () => {
    try {
      const con = await DB();
      return db.general.run(con).then(cursor => cursor.toArray());
    } catch (error) {
      log.error(error);
      return false;
    }
  }
};
