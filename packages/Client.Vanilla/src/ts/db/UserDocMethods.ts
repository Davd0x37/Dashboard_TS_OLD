import { IUserDocMethods, IUserDocType, IUserDocument } from "./Schema";

export const UserDocMethods: IUserDocMethods = {
  UpdateId(this: IUserDocument, data: IUserDocType["id"]): boolean {
    //
    return true;
  },

  UpdateUser(this: IUserDocument, data: IUserDocType["User"]): boolean {
    // this.atomicSet("User", data)
    return true;
  },

  UpdateSpotify(this: IUserDocument, data: IUserDocType["Spotify"]): boolean {
    //
    return true;
  },

  UpdateDigitalOcean(this: IUserDocument, data: IUserDocType["DigitalOcean"]): boolean {
    //
    return true;
  },

  UpdatePaypal(this: IUserDocument, data: IUserDocType["Paypal"]): boolean {
    //
    return true;
  },

  Test(this: IUserDocument, text: string): void {
    console.log(this.User.Avatar, text);
  }
};
