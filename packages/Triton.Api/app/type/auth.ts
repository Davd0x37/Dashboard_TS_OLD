export interface IServiceTokens {
  readonly accessToken?: string;
  readonly refreshToken?: string;
  readonly expiresIn?: number;
  readonly tokenType?: string;
  readonly updateTime?: Date;
  readonly state?: string;
}

export interface IServiceAPI {
  serviceName: string;
  apiURL: string;
  tokenService: string;
  authorizeURL: string;
  userScopes: string[];
  clientID: string;
  clientSecret: string;
  paths: string[];
  requestedData: string[];
  tokenType: string;
}
