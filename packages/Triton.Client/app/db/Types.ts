import { IUserDocType } from "#SH/Interfaces";
import { RxCollection, RxDatabase, RxDocument } from "rxdb";

// User document methods
export type IUserDocMethods = {
  UpdateId: (data: IUserDocType["id"]) => boolean;
  UpdateUser: (data: IUserDocType["User"]) => boolean;
  UpdateSpotify: (data: IUserDocType["Spotify"]) => boolean;
  UpdateDigitalOcean: (data: IUserDocType["DigitalOcean"]) => boolean;
  UpdatePaypal: (data: IUserDocType["Paypal"]) => boolean;
  Test: (text: string) => void;
};

// User document with fields and methods
export type IUserDocument = RxDocument<IUserDocType, IUserDocMethods>;
// User collection with fields, methods and collection methods
export type IUserCollection = RxCollection<IUserDocType, IUserDocMethods>;
// Dashboard database type with all collections
export type IDashboardDatabase = RxDatabase<IDashboardDatabaseCollections>;
// Dashboard collections
export type IDashboardDatabaseCollections = {
  dashboard: IUserCollection;
};
