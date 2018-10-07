import { DigitalOceanManager, PaypalManager, SpotifyManager } from "../../components";
import { digitalOceanConfig } from "../../config";
import { query } from "../../controller/DB";
import { hashPass } from "../../utils/crypto";
import { fieldAvailable, getUser } from "./Manager";

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
    try {
      if ((await fieldAvailable({ login: data.login })) && (await fieldAvailable({ email: data.email }))) {
        // Hash password
        data.password = await hashPass(data.password);
        // Save user credentials in database
        await query(q =>
          q.insert({
            ...data,
            Spotify: {
              username: "",
              email: "",
              type: ""
            },
            DigitalOcean: {
              email: "",
              total: "",
              dropletLimit: "",
              lastCreatedDroplet: ""
            },
            Paypal: {
              username: "",
              email: "",
              phone: "",
              verified: "",
              country: "",
              zoneinfo: ""
            }
          })
        );
        return true;
      } else {
        // Login already taken
        return false;
      }
    } catch (e) {
      throw Error(e);
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
    try {
      const req: any = query(async q =>
        q.filter({ id, password: await hashPass(password) }).update({ password: await hashPass(newPassword) })
      );
      return !!req.replaced;
    } catch (e) {
      throw Error(e);
    }
  },

  /**
   * Update user data with APIs
   *
   * @param {*} _
   * @param {*} { id }
   * @returns {Promise<object>}
   */
  async updateUserData(_: any, { id }: any): Promise<object> {
    try {
      await SpotifyManager(id);
      await PaypalManager(id);
      await DigitalOceanManager(id, digitalOceanConfig.authToken);
      const res: any = await getUser(id);
      return res;
    } catch (e) {
      throw Error(e);
    }
  },

  async updateDigitalOceanToken(_: any, { id, token }: any): Promise<boolean> {
    try {
      const req: any = query(async q => q.get(id).update({ authTokens: { DigitalOcean: { accessToken: token } } }));
      return !!req.inserted || !!req.replaced;
    } catch (e) {
      throw Error(e);
    }
  }
};
