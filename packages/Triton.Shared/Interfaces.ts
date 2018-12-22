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
    Total?: string;
    DropletLimit?: string;
    LastCreatedDroplet?: string;
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

export interface FnType {
  [key: string]: (
    ...args: any | any[] | Promise<any | any[]>
  ) => any | any[] | Promise<any | any[]>;
}
