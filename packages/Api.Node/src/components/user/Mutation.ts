import signale from "signale";
import { DigitalOceanManager, PaypalManager, SpotifyManager } from "../../components";
import { query } from "../../controller/DB";
import { IServices } from "../../interfaces/IUser";
import { hashPass } from "../../utils/crypto";
import { FieldAvailable, GetUser } from "./Manager";

// Need to be exported as object because we want to use spread operator
export default {
  async AddUser(_: any, { data }: any): Promise<boolean> {
    try {
      if (
        (await FieldAvailable({ User: { Login: data.Login } })) &&
        (await FieldAvailable({ User: { Email: data.Email } }))
      ) {
        // Hash password
        data.Password = await hashPass(data.password);
        // Save user credentials in database
        await query(q =>
          q.insert({
            User: {
              ...data
            },
            Spotify: {
              Username: "",
              Email: "",
              Type: ""
            },
            DigitalOcean: {
              Email: "",
              Total: "",
              DropletLimit: "",
              LastCreatedDroplet: ""
            },
            Paypal: {
              Username: "",
              Email: "",
              Phone: "",
              Verified: "",
              Country: "",
              Zoneinfo: ""
            },
            authTokens: {
              Spotify: {
                AccessToken: "",
                Code: "",
                RefreshToken: "",
                StateKey: ""
              },
              DigitalOcean: {
                AccessToken: "",
                Code: "",
                RefreshToken: "",
                StateKey: ""
              },
              Paypal: {
                AccessToken: "",
                Code: "",
                RefreshToken: "",
                StateKey: ""
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

  async ChangePassword(_: any, { id, newPassword }: any): Promise<boolean> {
    try {
      const req: any = query(async q =>
        q
          .get(id)
          .update({ User: { Password: await hashPass(newPassword) } })
      );
      return !!req.replaced;
    } catch (e) {
      signale.error("User.Mutation.changePassword ------", e);
      throw Error(e);
    }
  },

  async UpdateUserData(_: any, { id }: any): Promise<IServices> {
    try {
      await SpotifyManager(id);
      await PaypalManager(id);
      await DigitalOceanManager(id);
      const res: any = await GetUser(id);
      return res;
    } catch (e) {
      signale.error("User.Mutation.updateUserData ------", e);
      throw Error(e);
    }
  },

  async UpdateDigitalOceanToken(_: any, { id, token }: any): Promise<boolean> {
    try {
      const req: any = await query(async q =>
        q.get(id).update({ AuthTokens: { DigitalOcean: { AccessToken: token } } })
      );
      return !!req.inserted || !!req.replaced;
    } catch (e) {
      signale.error("User.Mutation.updateDigitalOceanToken ------", e);
      throw Error(e);
    }
  }
};
