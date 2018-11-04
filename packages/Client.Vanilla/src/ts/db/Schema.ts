import { RxCollection, RxDatabase, RxDocument, RxJsonSchema } from "rxdb";

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
          type: "number"
        },
        DropletLimit: {
          type: "number"
        },
        LastCreatedDroplet: {
          type: "number"
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

// User document type
export interface IUserDocType {
  id: string;
  User: {
    Avatar: string;
    Email: string;
    Login: string;
  };
  Spotify?: {
    Email?: string;
    Username?: string;
    Type?: string;
  };
  DigitalOcean?: {
    Email?: string;
    Total?: number;
    DropletLimit?: number;
    LastCreatedDroplet?: number;
  };
  Paypal?: {
    Username?: string;
    Email?: string;
    Phone?: string;
    Verified?: string;
    Country?: string;
    Zoneinfo?: string;
  };
}

// User document methods
export type IUserDocMethods = {
  UpdateId: (/* self: IUserDocument,  */data: IUserDocType["id"]) => boolean;
  UpdateUser: (/* self: IUserDocument,  */data: IUserDocType["User"]) => boolean;
  UpdateSpotify: (/* self: IUserDocument,  */data: IUserDocType["Spotify"]) => boolean;
  UpdateDigitalOcean: (/* self: IUserDocument,  */data: IUserDocType["DigitalOcean"]) => boolean;
  UpdatePaypal: (/* self: IUserDocument,  */data: IUserDocType["Paypal"]) => boolean;
  Test: (/* self: IUserDocument,  */text: string) => void;
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
