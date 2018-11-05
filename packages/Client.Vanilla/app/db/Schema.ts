import { RxCollection, RxDatabase, RxDocument, RxJsonSchema } from "rxdb";
import {IUserDocType} from "#SH/Interfaces"

export const UserSchema: RxJsonSchema = {
  title: "User schema",
  description: "User data and services",
  version: 0,
  keyCompression: true,
  type: "object",
  required: ["id", "User"],
  properties: {
    id: {
      type: "string",
      primary: true
    },
    User: {
      type: "object",
      encrypted: true,
      properties: {
        Avatar: {
          type: "string"
        },
        Email: {
          type: "string"
        },
        Login: {
          type: "string"
        }
      }
    },
    Spotify: {
      type: "object",
      properties: {
        Email: {
          type: "string"
        },
        Username: {
          type: "string"
        },
        Type: {
          type: "string"
        }
      }
    },
    DigitalOcean: {
      type: "object",
      properties: {
        Email: {
          type: "string"
        },
        Total: {
          type: "string"
        },
        DropletLimit: {
          type: "string"
        },
        LastCreatedDroplet: {
          type: "string"
        }
      }
    },
    Paypal: {
      type: "object",
      properties: {
        Username: {
          type: "string"
        },
        Email: {
          type: "string"
        },
        Phone: {
          type: "string"
        },
        Verified: {
          type: "string"
        },
        Country: {
          type: "string"
        },
        Zoneinfo: {
          type: "string"
        }
      }
    }
  }
};

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
