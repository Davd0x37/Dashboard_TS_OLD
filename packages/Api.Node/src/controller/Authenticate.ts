import request from "request";
import { getUser, updateCredentials } from "../components/user/Manager";
import { IAccessTokenParams, IAuthenticationParams, IAuthForm, IRefreshToken } from "../interfaces/IAuthenticate";
import { generateRandomString } from "../utils/utils";

export default class Authenticate {
  protected id!: string;
  protected service!: string;

  /**
   * Generate authentication url with needed state key
   *
   * @param {string} id
   * @param {string} service
   * @param {IAuthenticationParams} options
   * @returns {Promise<string>}
   * @memberof Authenticate
   */
  public async authenticateAccount(id: string, service: string, options: IAuthenticationParams): Promise<string> {
    try {
      this.id = id;
      this.service = service;
      // Generate state key for service authentication to ensure that result code is from service
      const stateKey = generateRandomString(64);
      // Add state key to user account
      await this.updateTokens({ stateKey });

      return (
        `${options.url}?client_id=${options.clientID}` +
        `&response_type=code` +
        `&scope=${encodeURI(options.scopes)}` +
        `&redirect_uri=${encodeURI(options.redirect)}` +
        `&state=${options.state || stateKey}` +
        `${options.nonce ? "&" + options.nonce : ""}`
      );
    } catch (e) {
      throw Error(e);
    }
  }

  /**
   * Send request to service in order to receive access and refresh tokens
   *
   * @param {IAccessTokenParams} { code, state, Authorization, url, redirect_uri }
   * @returns {Promise<boolean>}
   * @memberof Authenticate
   */
  public async getAccessToken({ code, state, Authorization, url, redirect_uri }: IAccessTokenParams): Promise<boolean> {
    try {
      const stateKey = await this.getStateKey();
      // If state key from request is different from one stored in db
      // Return false and end authentication
      if (state !== stateKey || state === null) {
        return false;
      } else {
        // Reset state key
        await this.updateTokens({ code, stateKey: "" });

        // Generate authentication form
        const form = this.authForm({
          url,
          form: {
            code,
            redirect_uri,
            grant_type: "authorization_code"
          },
          headers: { Authorization },
          json: true
        });

        // Send request to service to receive access token and refresh token
        request.post(form, (err: any, response: request.Response, body: any) => {
          if (!err && response.statusCode === 200) {
            const accessToken = body.access_token;
            const refreshToken = body.refresh_token;
            // Store tokens in database
            this.updateTokens({ accessToken, refreshToken });
          }
        });
        return true;
      }
    } catch (e) {
      throw Error(e);
    }
  }

  /**
   * Receive new refresh token from service
   *
   * @param {IRefreshToken} { url, auth, refreshToken }
   * @memberof Authenticate
   */
  public async refreshToken({ url, auth, refreshToken }: IRefreshToken) {
    try {
      const authOptions = this.authForm({
        url,
        form: {
          grant_type: "refresh_token",
          refresh_token: refreshToken
        },
        headers: {
          Authorization: auth
        },
        json: true
      });

      request.post(authOptions, async (error: any, response: request.Response, body: any) => {
        if (!error && response.statusCode === 200) {
          const accessToken = body.access_token;
          await this.updateTokens({ accessToken });
        }
      });
    } catch (e) {
      throw Error(e);
    }
  }

  /**
   * Generate basic authorization
   *
   * @param {string} clientId
   * @param {string} clientSecret
   * @returns {string}
   * @memberof Authenticate
   */
  public generateBasicAuthorization(clientId: string, clientSecret: string): string {
    return `Basic ${Buffer.from(clientId + ":" + clientSecret).toString("base64")}`;
  }

  /**
   * Get state key from database
   *
   * @protected
   * @returns {Promise<string>}
   * @memberof Authenticate
   */
  protected async getStateKey(): Promise<string> {
    try {
      const user: any = await getUser(this.id);
      return user.authTokens[this.service].stateKey;
    } catch (e) {
      throw Error(e);
    }
  }

  /**
   * Update user tokens
   *
   * @protected
   * @param {object} tokens
   * @returns {Promise<void>}
   * @memberof Authenticate
   */
  protected async updateTokens(tokens: object): Promise<void> {
    try {
      await updateCredentials(this.id, { authTokens: { [this.service]: { ...tokens } } });
    } catch (e) {
      throw Error(e);
    }
  }

  /**
   * Generate authentication form for request
   *
   * @protected
   * @param {IAuthForm} {
   *     url,
   *     form: { code, grant_type, redirect_uri, refresh_token },
   *     headers: { Authorization },
   *     json
   *   }
   * @returns {IAuthForm}
   * @memberof Authenticate
   */
  protected authForm({
    url,
    form: { code, grant_type, redirect_uri, refresh_token },
    headers: { Authorization },
    json
  }: IAuthForm): IAuthForm {
    return {
      url,
      form: {
        ...(code !== undefined ? { code } : ""),
        ...(refresh_token !== undefined ? { refresh_token } : ""),
        ...(redirect_uri !== undefined ? { redirect_uri } : ""),
        grant_type
      },
      headers: {
        Authorization
      },
      json
    };
  }
}
