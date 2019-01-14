import { IUserDocType } from "@/types/Interface";

import { IUserDocMethods, IUserDocument } from "./Types";
import { omit } from "lodash";
export const UserDocMethods: IUserDocMethods = {
  updateUserData(this: IUserDocument, data: IUserDocType["data"]): boolean {
    this.update({ $set: data });
    return true;
  },
  getData(this: IUserDocument): IUserDocType["data"] {
    return omit(this.toJSON(), "_rev");
  }
};
