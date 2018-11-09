import { RxJsonSchema } from "rxdb";

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
