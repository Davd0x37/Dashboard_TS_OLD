import { IUserDocType } from "@/types/Interface";
import { RxCollection, RxDatabase, RxDocument } from "rxdb";

// User document methods
export type IUserDocMethods = {
  readonly updateUserData: (data: IUserDocType["data"]) => boolean;
  readonly getData: () => IUserDocType["data"];
};

// User document with fields and methods
export type IUserDocument = RxDocument<IUserDocType["data"], IUserDocMethods>;
// User collection with fields, methods and collection methods
export type IUserCollection = RxCollection<IUserDocType["data"], IUserDocMethods>;
// Dashboard database type with all collections
export type IDashboardDatabase = RxDatabase<IDashboardDatabaseCollections>;
// Dashboard collections
export type IDashboardDatabaseCollections = {
  readonly dashboard: IUserCollection;
};
