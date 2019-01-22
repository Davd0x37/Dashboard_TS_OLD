export interface IServiceTokens {
  readonly accessToken?: string;
  readonly refreshToken?: string;
  readonly expiresIn?: number;
  readonly tokenType?: string;
  readonly updateTime?: string;
}

export interface IServiceAPI {
  readonly serviceName: string;
  readonly apiURL: string;
  readonly tokenService: string;
  readonly authorizeURL: string;
  readonly userScopes: string[];
  readonly clientID: string;
  readonly clientSecret: string;
  readonly paths: string[];
  readonly requestedData: string[];
  readonly tokenType: string;
  readonly redirectURL: string;
}
