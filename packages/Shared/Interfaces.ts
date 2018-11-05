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

export interface IAuthTokens {
  AuthTokens: {
    [key: string]: {
      AccessToken: string;
      Code: string;
      RefreshToken: string;
      StateKey: string;
    };
  };
}

export interface IAuthenticationParams {
  scopes: string;
  redirect_uri: string;
  clientID: string;
  url: string;
  state?: string;
  nonce?: string;
}

export interface IAccessTokenParams {
  code: string;
  state: string;
  Authorization: {
    clientID: string;
    clientSecret: string;
  };
  url: string;
  redirect_uri?: string;
}

export interface IRefreshToken {
  id: string;
  service: string;
  url: string;
  auth: {
    clientID: string;
    clientSecret: string;
  };
}
