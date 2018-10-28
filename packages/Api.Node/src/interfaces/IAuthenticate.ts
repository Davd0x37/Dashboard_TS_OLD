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
