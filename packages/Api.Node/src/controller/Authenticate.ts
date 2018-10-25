import request from "request";
import { GetUser, UpdateCredentials } from "../components/user/Manager";
import { IAccessTokenParams, IAuthenticationParams, IAuthForm, IRefreshToken } from "../interfaces/IAuthenticate";
import { IUser } from "../interfaces/IUser";
import { generateRandomString } from "../utils/utils";

export default class Authenticate {
  protected id!: string;
  protected service!: string;

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
      await this.UpdateTokens({ StateKey });

      return (
        `${options.url}?client_id=${options.clientID}` +
        `&response_type=code` +
        `&scope=${encodeURI(options.scopes)}` +
        `&redirect_uri=${encodeURI(options.redirect)}` +
        `&state=${options.state || StateKey}` +
        `${options.nonce ? "&nonce" + options.nonce : ""}`
      );
    } catch (e) {
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
        // Reset state key
        await this.UpdateTokens({ Code: code, StateKey: "" });

        // Generate authentication form
        const form = this.AuthForm({
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
            const AccessToken = body.access_token;
            const RefreshToken = body.refresh_token;
            // Store tokens in database
            this.UpdateTokens({ AccessToken, RefreshToken });
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
   */
  public async RefreshToken({ url, auth, refreshToken }: IRefreshToken) {
    try {
      const authOptions = this.AuthForm({
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
          const AccessToken = body.access_token;
          await this.UpdateTokens({ AccessToken });
        }
      });
    } catch (e) {
      throw Error(e);
    }
  }

  /**
   * Generate basic authorization
   */
  public GenerateBasicAuthorization(clientId: string, clientSecret: string): string {
    return `Basic ${Buffer.from(clientId + ":" + clientSecret).toString("base64")}`;
  }

  /**
   * Get state key from database
   */
  protected async GetStateKey(): Promise<string> {
    try {
      const user: IUser = await GetUser(this.id);
      // @ts-ignore
      return user.AuthTokens[this.service].StateKey;
    } catch (e) {
      throw Error(e);
    }
  }

  /**
   * Update user tokens
   */
  protected async UpdateTokens(tokens: object): Promise<void> {
    try {
      await UpdateCredentials(this.id, { AuthTokens: { [this.service]: { ...tokens } } });
    } catch (e) {
      throw Error(e);
    }
  }

  /**
   * Generate authentication form for request
   */
  protected AuthForm({
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
