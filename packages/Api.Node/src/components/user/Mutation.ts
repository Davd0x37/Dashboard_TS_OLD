import { DigitalOceanManager, PaypalManager, SpotifyManager } from "../../components";
import { digitalOceanConfig } from "../../config";
import { query } from "../../controller/DB";
import { hashPass } from "../../utils/crypto";
import { getUser, loginAvailable } from "./Manager";

// Need to be exported as object because we want to use spread operator
export default {
  /**
   * Add user to database
   *
   * @param {*} _
   * @param {*} { data }
   * @returns {Promise<boolean>}
   */
  async addUser(_: any, { data }: any): Promise<boolean> {
    if (loginAvailable(data.login)) {
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
    await SpotifyManager(id);
    await PaypalManager(id);
    await DigitalOceanManager(id, digitalOceanConfig.authToken);
    const res: any = await getUser(id);
    return res.services;
  }
};
