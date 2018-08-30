import { digitalOceanConfig } from "../config";
import DigitalOcean from "../services/DigitalOcean";
import { Spotify } from "../services/Spotify";
import { hashPass } from "../utils/crypto";
import { query } from "./DB";

export const UserManager = {
  /**
   * Update user credentials
   *
   * @param {string} id
   * @param {unknown} config
   * @returns {Promise<void>}
   */
  async updateCredentials(id: string, config: unknown): Promise<void> {
    await query(q => q.get(id).update({ ...config }));
  },

  /**
   * Get user details
   *
   * @param {string} id
   * @returns {Promise<unknown>}
   */
  async getUser(id: string): Promise<unknown> {
    return query(q => q.get(id));
  },

  /**
   * Check if login is available
   *
   * @param {string} login
   * @returns {Promise<boolean>}
   */
  async loginAvailable(login: string): Promise<boolean> {
    const user = await query(q => q.filter({ login }));
    return user.length === 0;
  }
};

export const UserQuery = {
  /**
   * Get user from database
   *
   * @param {*} _
   * @param {*} { login, password }
   * @returns {Promise<object>}
   */
  async authenticateUser(_: any, { login, password }: any): Promise<object> {
    const req: any = await query(async q => q.filter({ login, password: await hashPass(password) }));
    return req[0];
  },

  /**
   * Get all users from database
   *
   * @returns {Promise<object[]>}
   */
  async getAllUsers(): Promise<object[]> {
    return query(q => q);
  }
};

export const UserMutation = {
  /**
   * Add user to database
   *
   * @param {*} _
   * @param {*} { data }
   * @returns {Promise<boolean>}
   */
  async addUser(_: any, { data }: any): Promise<boolean> {
    if (UserManager.loginAvailable(data.login)) {
      // Hash password
      data.password = await hashPass(data.password);
      // Save user credentials in database
      await query(q => q.insert(data));
      return true;
    } else {
      // Login already taken
      return false;
    }
  },

  /**
   * Change user password
   *
   * @param {*} _
   * @param {*} { id, password, newPassword }
   * @returns
   */
  async changePassword(_: any, { id, password, newPassword }: any): Promise<boolean> {
    const req: any = query(async q =>
      q.filter({ id, password: await hashPass(password) }).update({ password: await hashPass(newPassword) })
    );
    return !!req.replaced;
  },

  /**
   * Update user data with APIs
   *
   * @param {*} _
   * @param {*} { id }
   * @returns {Promise<object>}
   */
  async updateUserData(_: any, { id }: any): Promise<object> {
    await Spotify.updateData(id);
    await DigitalOcean.accountData(id, digitalOceanConfig.authToken);
    const res: any = await UserManager.getUser(id);
    return res.services;
  }
};
