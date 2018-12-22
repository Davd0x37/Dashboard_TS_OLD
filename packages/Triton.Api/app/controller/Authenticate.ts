import {
  IAccessTokenParams,
  IAuthenticationParams,
  IAuthTokens,
  IRefreshToken
} from "#/type/Auth";
import { ErrorType } from "#/type/Enum";
import { queryString } from "#/utils/net";
import { generateRandomString } from "#SH/Utils";
import { post } from "got";
import { getUser, updateTokens } from "../components/user/Manager";

export const requestAuthentication = async (
  id: string,
  service: string,
  options: IAuthenticationParams
) => {
  try {
    const StateKey = generateRandomString(64);

    await updateTokens({
      id,
      service,
      tokens: { StateKey }
    });

    return queryString(options.url, {
      client_id: options.clientID,
      response_type: "code",
      scope: encodeURI(options.scopes),
      redirect_uri: encodeURI(options.redirect_uri),
      state: options.state || StateKey,
      ...(options.nonce ? { nonce: options.nonce } : undefined)
    });
  } catch (err) {
    throw Error(err);
  }
};

export const getAccessToken = (
  id: string,
  service: string,
  { code, state, Authorization, url, redirect_uri }: IAccessTokenParams
): Promise<boolean> =>
  getStateKey(id, service)
    .then(key =>
      state === key || state !== null
        ? Promise.resolve(true)
        : Promise.reject(ErrorType.BadStateKey)
    )
    .then(_ =>
      updateTokens({ id, service, tokens: { Code: code, StateKey: "" } })
    )
    .then(basicAuth(Authorization.clientID, Authorization.clientSecret))
    .then(auth =>
      post(url, {
        form: true,
        body: {
          code,
          grant_type: "authorization_code",
          ...(redirect_uri !== undefined ? { redirect_uri } : "")
        },
        headers: {
          Authorization: auth
        },
        json: true
      })
    )
    .then(({ body }) =>
      updateTokens({
        id,
        service,
        tokens: {
          AccessToken: body.access_token || "",
          RefreshToken: body.refresh_token || "",
          ExpiresIn: body.expires_in || "",
          Scope: body.scope || ""
        }
      })
    )
    .catch(err => Promise.reject(err));

/**
 * Receive new refresh token from service
 */
export const refreshTokens = async (
  id: string,
  service: string,
  { url, auth }: IRefreshToken
): Promise<boolean> =>
  getUser<IAuthTokens>(id)
    .then(user =>
      tokensExists(user, service)
        ? Promise.resolve(user)
        : Promise.reject(ErrorType.TokensNotExists)
    )
    .then(user =>
      post(url, {
        form: true,
        body: {
          grant_type: "refresh_token",
          refresh_token: user.AuthTokens[service].RefreshToken
        },
        headers: {
          Authorization: basicAuth(auth.clientID, auth.clientSecret)()
        },
        json: true
      })
    )
    .then(({ body }) =>
      updateTokens({ id, service, tokens: { AccessToken: body.access_token } })
    )
    .catch(err => Promise.reject(err));

/**
 *
 * ----------| MODEL UTILS |----------
 *
 */

const getStateKey = async (id: string, service: string): Promise<string> =>
  getUser<IAuthTokens>(id)
    .then(user => user.AuthTokens[service].StateKey)
    .catch(err => Promise.reject(err));

/**
 *
 * ----------| UTILS |----------
 *
 */

const basicAuth = (clientID: string, clientSecret: string) => (): string =>
  `Basic ${Buffer.from(clientID + ":" + clientSecret).toString("base64")}`;

export const tokensExists = (tokens: IAuthTokens, service: string): boolean =>
  tokens.AuthTokens[service] !== undefined &&
  tokens.AuthTokens[service].AccessToken !== undefined;
