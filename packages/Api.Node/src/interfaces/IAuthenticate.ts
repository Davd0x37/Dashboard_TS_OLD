export interface IAuthenticationParams {
  scopes: string;
  redirect: string;
  clientID: string;
  url: string;
  state?: string;
  nonce?: string;
}

export interface IAccessTokenParams {
  code: string;
  state: string;
  Authorization: string;
  url: string;
  redirect_uri?: string;
}

export interface IAuthForm {
  url: string;
  form: {
    code?: string;
    grant_type: string;
    refresh_token?: string;
    redirect_uri?: string;
  };
  headers: {
    Authorization: string;
  };
  json: boolean;
}

export interface IRefreshToken {
  url: string;
  auth: string;
  refreshToken: string;
}
