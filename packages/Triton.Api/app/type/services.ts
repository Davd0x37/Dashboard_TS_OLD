export interface IServices {
  readonly serviceName: string;
  readonly redirectURL: string;
  readonly apiURL: string;
  readonly tokenService: string;
  readonly authorizeURL: string;
  readonly userScopes: string[];
  readonly clientID: string;
  readonly clientSecret: string;
  readonly paths: string[];
  readonly requestedData: string[];
}
