import { DigitalOceanManager, PaypalManager, SpotifyManager } from '#/components';
import { query } from '#/controller/DB';
import { hashPass } from '#/utils/crypto';
// import { IUserDocType } from '#SH/Interfaces';
import signale from 'signale';

import { fieldAvailable, getUser } from './Manager';

// Need to be exported as object because we want to use spread operator
export default {
  async AddUser(_: any, { data }: any): Promise<boolean> {
    try {
      if (
        (await fieldAvailable({ User: { Login: data.Login } })) &&
        (await fieldAvailable({ User: { Email: data.Email } }))
      ) {
        // Hash password
        data.Password = await hashPass(data.Password);
        // Save user credentials in database
        await query(q =>
          q.insert({
            User: {
              ...data
            }
          })
        );
        return true;
      } else {
        // Login already taken
        return false;
      }
    } catch (e) {
      signale.error("User.Mutation.AddUser ------", e);
      throw Error(e);
    }
  },

  async UpdateUserData(_: any, { id }: any): Promise<IUserDocType> {
    try {
      await SpotifyManager(id);
      await PaypalManager(id);
      await DigitalOceanManager(id);
      const res: any = await getUser(id);
      return res;
    } catch (e) {
      signale.error("User.Mutation.UpdateUserData ------", e);
      throw Error(e);
    }
  },

  async UpdateDigitalOceanToken(_: any, { id, token }: any): Promise<boolean> {
    try {
      const req: any = await query(q => q.get(id).update({ AuthTokens: { DigitalOcean: { AccessToken: token } } }));
      return !!req.inserted || !!req.replaced;
    } catch (e) {
      signale.error("User.Mutation.UpdateDigitalOceanToken ------", e);
      throw Error(e);
    }
  }
};
