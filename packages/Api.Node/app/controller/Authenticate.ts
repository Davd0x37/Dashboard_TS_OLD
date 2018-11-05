import request from "request";
import signale from "signale";
import { GetUser, UpdateTokens } from "#/components/user/Manager";
import { IAccessTokenParams, IAuthenticationParams, IRefreshToken } from "#SH/Interfaces";
import { IAuthTokens } from "#SH/Interfaces";
import { generateRandomString } from "#SH/Utils";

/**
 * Generate basic authorization
 */
const GenerateBasicAuthorization = (clientID: string, clientSecret: string): string => {
  return `Basic ${Buffer.from(clientID + ":" + clientSecret).toString("base64")}`;
};

export const TokensNotExists = (service: string, tokens: IAuthTokens): boolean => {
  return tokens.AuthTokens[service] === undefined || tokens.AuthTokens[service].AccessToken === undefined;
};

/**
 * Receive new refresh token from service
 */
export const RefreshTokens = async ({ id, service, url, auth }: IRefreshToken): Promise<boolean> => {
  try {
    const basicAuth = GenerateBasicAuthorization(auth.clientID, auth.clientSecret);
    const user: IAuthTokens = await GetUser(id);

    // If service doesn't exists stop requesting refresh token
    if (user.AuthTokens[service] === undefined) {
      return false;
    }

    const refreshToken = user.AuthTokens[service].RefreshToken;
    const authOptions = {
      url,
      form: {
        grant_type: "refresh_token",
        refresh_token: refreshToken
      },
      headers: {
        Authorization: basicAuth
      },
      json: true
    };

    request.post(authOptions, async (error: any, response: request.Response, body: any) => {
      if (!error && response.statusCode === 200) {
        const AccessToken = body.access_token;

        await UpdateTokens({
          id,
          service,
          tokens: { AccessToken }
        });
      }
    });
    return true;
  } catch (e) {
    signale.error("Authenticate.RefreshToken ------", e);
    throw Error(e);
  }
};

export default class Authenticate {
  protected id: string = "";
  protected service: string = "";

  /**
   * Generate authentication url with needed state key
   */
  public async AuthenticateAccount(id: string, service: string, options: IAuthenticationParams): Promise<string> {
    try {
      this.id = id;
      this.service = service;
      // Generate state key for service authentication to ensure that result code is from service
      const StateKey = generateRandomString(64);
      // Add state key to user account
      await UpdateTokens({
        id: this.id,
        service: this.service,
        tokens: { StateKey }
      });

      return (
        `${options.url}?client_id=${options.clientID}` +
        `&response_type=code` +
        `&scope=${encodeURI(options.scopes)}` +
        `&redirect_uri=${encodeURI(options.redirect_uri)}` +
        `&state=${options.state || StateKey}` +
        `${options.nonce ? "&nonce" + options.nonce : ""}`
      );
    } catch (e) {
      signale.error("Authenticate.AuthenticateAccount ------", e);
      throw Error(e);
    }
  }

  /**
   * Send request to service in order to receive access and refresh tokens
   */
  public async GetAccessToken({ code, state, Authorization, url, redirect_uri }: IAccessTokenParams): Promise<boolean> {
    try {
      const stateKey = await this.GetStateKey();
      // If state key from request is different from one stored in db
      // Return false and end authentication
      if (state !== stateKey || state === null) {
        return false;
      } else {
        // Reset state key and update code
        await UpdateTokens({
          id: this.id,
          service: this.service,
          tokens: {
            Code: code,
            StateKey: ""
          }
        });

        const basicAuth = GenerateBasicAuthorization(Authorization.clientID, Authorization.clientSecret);

        const form = {
          url,
          form: {
            code,
            grant_type: "authorization_code",
            ...(redirect_uri !== undefined ? { redirect_uri } : "")
          },
          headers: {
            Authorization: basicAuth
          },
          json: true
        };

        // Send request to service to receive access token and refresh token
        request.post(form, async (error: any, response: request.Response, body: any) => {
          if (!error && response.statusCode === 200) {
            const AccessToken = body.access_token;
            const RefreshToken = body.refresh_token;
            const ExpiresIn = body.expires_in;
            const Scope = body.scope;
            // Store tokens in database
            await UpdateTokens({
              id: this.id,
              service: this.service,
              tokens: {
                ...(AccessToken !== undefined ? { AccessToken } : ""),
                ...(RefreshToken !== undefined ? { RefreshToken } : ""),
                ...(ExpiresIn !== undefined ? { ExpiresIn } : ""),
                ...(Scope !== undefined ? { Scope } : "")
              }
            });
          }
        });
        return true;
      }
    } catch (e) {
      signale.error("Authenticate.GetAccessToken ------", e);
      throw Error(e);
    }
  }

  /**
   * Get state key from database
   */
  protected async GetStateKey(): Promise<string> {
    try {
      const user: IAuthTokens = await GetUser(this.id);
      return user.AuthTokens[this.service].StateKey;
    } catch (e) {
      signale.error("Authenticate.GetStateKey ------", e);
      throw Error(e);
    }
  }
}
