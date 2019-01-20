import { IUserDocType } from "#SH/Interfaces";

import { IUserDocMethods, IUserDocument } from "./Types";

export const UserDocMethods: IUserDocMethods = {
  UpdateUserData(this: IUserDocument, _: IUserDocType): boolean {
    // this.atomicSet("User", data)
    return true;
  }
};
