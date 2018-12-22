export interface IServiceType {
  id: string;
  service: string;
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
  url: string;
  auth: {
    clientID: string;
    clientSecret: string;
  };
}
