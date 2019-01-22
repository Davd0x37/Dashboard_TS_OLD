export interface ITokens {
  serviceName: string;
  apiURL: string;
  tokenService?: string;
  authorizeURL?: string;
  userScopes?: string[];
  clientID?: string;
  redirectURL?: string;
  clientSecret?: string;
  paths: string[];
  requestedData: string[];
  tokenType: string;
}
