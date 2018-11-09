import { IUserDocType } from "#SH/Interfaces";

import { IUserDocMethods, IUserDocument } from "./Types";

export const UserDocMethods: IUserDocMethods = {
  UpdateId(this: IUserDocument, _: IUserDocType["id"]): boolean {
    //
    return true;
  },

  UpdateUser(this: IUserDocument, _: IUserDocType["User"]): boolean {
    // this.atomicSet("User", data)
    return true;
  },

  UpdateSpotify(this: IUserDocument, _: IUserDocType["Spotify"]): boolean {
    //
    return true;
  },

  UpdateDigitalOcean(
    this: IUserDocument,
    _: IUserDocType["DigitalOcean"]
  ): boolean {
    //
    return true;
  },

  UpdatePaypal(this: IUserDocument, _: IUserDocType["Paypal"]): boolean {
    //
    return true;
  },

  Test(this: IUserDocument, text: string): void {
    console.log(this.User.Avatar, text);
  }
};
