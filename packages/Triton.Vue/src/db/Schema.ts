import { RxJsonSchema } from "rxdb";

export const UserSchema: RxJsonSchema = {
  title: "User schema",
  description: "User data and services",
  version: 0,
  keyCompression: true,
  type: "object",
  required: ["session_id"],
  properties: {
    session_id: {
      type: "string",
      encrypted: true,
    },
    avatar: {
      encrypted: true,
      type: "string"
    },
    email: {
      primary: true,
      type: "string"
    },
    registerDate: {
      encrypted: true,
      type: "string"
    },
    isOnline: {
      encrypted: true,
      type: "boolean"
    },
    services: {
      encrypted: true,
      type: "array",
      items: {
        type: "object",
        properties: {
          serviceName: {
            type: "string"
          },
          data: {
            type: "string"
          }
        }
      }
    }
  }
};
