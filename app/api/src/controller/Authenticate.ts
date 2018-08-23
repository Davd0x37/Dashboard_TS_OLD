import { Response } from "express";
import request from "request";
import { generateRandomString } from "../utils/utils";
import { UserManager } from "./User";

interface IAuthenticationParams {
  scopes: string;
  redirect: string;
  clientID: string;
  url: string;
  state?: string;
  nonce?: string;
}

class Authenticate {
  constructor() {
    // FILL
  }
  /**
   * Authenticate user account on third party service
   * Simply redirect to service for authentication
   *
   * @param {string} id
   * @param {Response} res
   * @param {string} service
   * @param {IAuthenticationParams} options
   * @returns {Promise<void>}
   * @memberof Authenticate
   */
  public async authenticateAccount(
    id: string,
    res: Response,
    service: string,
    options: IAuthenticationParams
  ): Promise<void> {
    // Generate state key for service authentication to ensure that result code is from service
    const stateKey = generateRandomString(64);

    // Add state key to user account
    await this.updateCodes(id, {
      // It will works just like typing `digitalocean: {stateKey}` or `spotify: {stateKey}`
      [service]: {
        stateKey
      }
    });

    // Generate authentication URL
    const authenticateURL = await this.generateAuthenticationURL({ ...options, state: stateKey });
    res.redirect(authenticateURL);
  }

  /**
   * Get access and refresh token from service
   *
   * @param {string} id
   * @param {string} service
   * @param {*} authOptions
   * @param {*} { code, state }
   * @returns {Promise<boolean>}
   * @memberof Authenticate
   */
  public async getAccessToken(id: string, service: string, authOptions: any, { code, state }: any): Promise<boolean> {
    const usr = await UserManager.getUser(id);
    const stateKey = usr.authTokens[service].stateKey;
    if (state !== stateKey || state === null) {
      return false;
    } else {
      // Update code and state key
      UserManager.updateCredentials(id, {
        authTokens: { [service]: { code, stateKey: "" } }
      });

      request.post(authOptions, (err: any, response: request.Response, body: any) => {
        if (!err && response.statusCode === 200) {
          const accessToken = body.access_token;
          const refreshToken = body.refresh_token;
          UserManager.updateCredentials(id, {
            authTokens: { [service]: { accessToken, refreshToken } }
          });
        }
      });

      return true;
    }
  }

  /**
   * Use refresh token to get new access token
   *
   * @param {string} id
   * @param {string} service
   * @param {*} authOptions
   * @memberof Authenticate
   */
  public async refreshToken(id: string, service: string, authOptions: any) {
    request.post(authOptions, async (error: any, response: request.Response, body: any) => {
      if (!error && response.statusCode === 200) {
        const accessToken = body.access_token;
        await this.updateCodes(id, { [service]: { accessToken } });
      }
    });
  }

  /**
   * Generate basic authorization code with base64
   *
   * @protected
   * @param {string} id
   * @param {string} secret
   * @returns
   * @memberof Authenticate
   */
  public generateBasicAuthorization(id: string, secret: string) {
    return `Basic ${Buffer.from(id + ":" + secret).toString("base64")}`;
  }

  /**
   * Update user state key
   *
   * @protected
   * @param {string} id
   * @param {string} stateKey
   * @returns {Promise<void>}
   * @memberof Authenticate
   */
  protected async updateCodes(id: string, stateKey: object): Promise<void> {
    await UserManager.updateCredentials(id, { authTokens: { ...stateKey } });
  }

  /**
   * It will redirect user to authentication service
   *
   * @protected
   * @param {IAuthenticationParams} {
   *     scopes,
   *     redirect,
   *     clientID,
   *     url,
   *     state,
   *     nonce
   *   }
   * @returns {Promise<string>}
   * @memberof Authenticate
   */
  protected async generateAuthenticationURL({
    scopes,
    redirect,
    clientID,
    url,
    state,
    nonce
  }: IAuthenticationParams): Promise<string> {
    return `${url}?client_id=${clientID}&response_type=code&scope=${encodeURI(scopes)}&redirect_uri=${encodeURI(
      redirect
    )}&state=${state}${nonce ? "&" + nonce : ""}`;
  }
}

export default new Authenticate();
