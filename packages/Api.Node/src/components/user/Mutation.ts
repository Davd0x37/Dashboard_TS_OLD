import signale from "signale";
import { DigitalOceanManager, PaypalManager, SpotifyManager } from "../../components";
import { digitalOceanConfig } from "../../config";
import { query } from "../../controller/DB";
import { IServices } from "../../interfaces/IUser";
import { hashPass } from "../../utils/crypto";
import { fieldAvailable, getUser } from "./Manager";

// Need to be exported as object because we want to use spread operator
export default {
  async addUser(_: any, { data }: any): Promise<boolean> {
    try {
      if (
        (await fieldAvailable({ user: { login: data.login } })) &&
        (await fieldAvailable({ user: { email: data.email } }))
      ) {
        // Hash password
        data.password = await hashPass(data.password);
        // Save user credentials in database
        await query(q =>
          q.insert({
            user: {
              ...data
            },
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
            },
            authTokens: {
              Spotify: {
                accessToken: "",
                code: "",
                refreshToken: "",
                stateKey: ""
              },
              DigitalOcean: {
                accessToken: "",
                code: "",
                refreshToken: "",
                stateKey: ""
              },
              Paypal: {
                accessToken: "",
                code: "",
                refreshToken: "",
                stateKey: ""
              }
            }
          })
        );
        return true;
      } else {
        // Login already taken
        return false;
      }
    } catch (e) {
      signale.error("User.Mutation.addUser ------", e);
      throw Error(e);
    }
  },

  async changePassword(_: any, { id, password, newPassword }: any): Promise<boolean> {
    try {
      const req: any = query(async q =>
        q
          .filter({ id, user: { password: await hashPass(password) } })
          .update({ user: { password: await hashPass(newPassword) } })
      );
      return !!req.replaced;
    } catch (e) {
      signale.error("User.Mutation.changePassword ------", e);
      throw Error(e);
    }
  },

  async updateUserData(_: any, { id }: any): Promise<IServices> {
    try {
      await SpotifyManager(id);
      await PaypalManager(id);
      await DigitalOceanManager(id, digitalOceanConfig.authToken);
      const res: any = await getUser(id);
      return res;
    } catch (e) {
      signale.error("User.Mutation.updateUserData ------", e);
      throw Error(e);
    }
  },

  async updateDigitalOceanToken(_: any, { id, token }: any): Promise<boolean> {
    try {
      const req: any = await query(async q =>
        q.get(id).update({ authTokens: { DigitalOcean: { accessToken: token } } })
      );
      return !!req.inserted || !!req.replaced;
    } catch (e) {
      signale.error("User.Mutation.updateDigitalOceanToken ------", e);
      throw Error(e);
    }
  }
};
