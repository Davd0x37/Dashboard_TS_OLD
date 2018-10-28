export interface ISpotify {
  Email: string;
  Username: string;
  Type: string;
}

export interface IDigitalOcean {
  Email: string;
  Total: number;
  DropletLimit: number;
  LastCreatedDroplet: number;
}

export interface IPaypal {
  Username: string;
  Email: string;
  Phone: string;
  Verified: string;
  Country: string;
  Zoneinfo: string;
}

export interface IUserDetails {
  Avatar: string;
  Login: string;
  Email: string;
}

export interface IUser {
  id: string;
  User: IUserDetails;
  Spotify?: ISpotify;
  DigitalOcean?: IDigitalOcean;
  Paypal?: IPaypal;
  AuthTokens: {
    [key: string]: {
      AccessToken: string;
      Code: string;
      RefreshToken: string;
      StateKey: string;
    };
  };
}

export interface IServices extends IPaypal, ISpotify, IDigitalOcean {}
