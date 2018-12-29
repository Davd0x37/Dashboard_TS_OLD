import { setupServiceTokens } from "@/components/user/Manager";
import { AuthTokens } from "@ENTITY/AuthTokens";
import { User } from "@ENTITY/User";
import { IServices } from "@TYPE/services";
import { generateRandomString } from "@UTILS/gen";
import { queryString } from "@UTILS/net";
import { basicAuth, requestTokens } from "./Utils";

/**
 * Generate authentication url
 * Save generated state key in database
 * **IMPURE**
 *
 * @param {string} id User id
 * @param {string} serviceName Service name
 * @param {IServices} serviceSettings Options needed to generate authentication url
 * @returns @returns {(Promise<string | false>)} Generated query string or false if failed
 */
export const requestAuthentication = async (
  id: string,
  serviceName: string,
  serviceSettings: IServices
): Promise<string | false> => {
  try {
    const { authorizeURL, clientID, userScopes, redirectURL } = serviceSettings;

    const state = generateRandomString(64);
    const nonce = `${Date.now() +
      Buffer.from(generateRandomString(16, true)).toString("base64")}`;

    const setup = await setupServiceTokens(id, serviceName, { state });

    return (
      setup &&
      queryString(authorizeURL, {
        client_id: clientID,
        response_type: "code",
        scope: encodeURI(userScopes.join("+")),
        redirect_uri: encodeURI(redirectURL),
        state,
        nonce
      })
    );
  } catch (e) {
    throw Error(e);
  }
};

/**
 * Request access tokens with received code and state key
 * **IMPURE**
 *
 * @param {string} serviceName Service name
 * @param {IServices} serviceSettings Service options
 * @param {{ code: string; state: string }} { code, state } Received code and state.
 * @returns {Promise<boolean>} True if successfully retrieved tokens or false in case of failure
 */
export const getAccessToken = async (
  serviceName: string,
  serviceSettings: IServices,
  { code, state }: { code: string; state: string }
): Promise<boolean> => {
  try {
    // Destructure
    const {
      clientID,
      clientSecret,
      redirectURL,
      tokenService
    } = serviceSettings;

    const id = await User.getUserIdByStateKey(state);
    const stateKey = await AuthTokens.getStateKey(id, serviceName);

    if (state !== stateKey || state === null) {
      return false;
    }

    const encodedAuth = basicAuth(clientID, clientSecret);

    const { body } = await requestTokens({
      url: tokenService,
      auth: encodedAuth,
      body: {
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectURL
      }
    });

    // Now we can save our new tokens and delete state key
    // It is somehow dangerous to store it for long time
    // Because we can get user id using state key
    return AuthTokens.updateTokens(id, serviceName, {
      accessToken: body.access_token,
      refreshToken: body.refresh_token,
      tokenType: body.token_type,
      expiresIn: body.expires_in,
      state: ""
    });
  } catch (e) {
    throw Error(e);
  }
};

/**
 * Receive new refresh token from service
 * **IMPURE**
 *
 * @param {string} id User id
 * @param {string} serviceName Service name
 * @param {IServices} serviceSettings Service options
 * @returns {Promise<boolean>} True if successfully received new tokens otherwise false
 */
export const refreshTokens = async (
  id: string,
  serviceName: string,
  serviceSettings: IServices
): Promise<boolean> => {
  try {
    const { refreshToken } = await AuthTokens.getAuthTokenByName(
      id,
      serviceName
    );

    const encodedAuth = basicAuth(
      serviceSettings.clientID,
      serviceSettings.clientSecret
    );

    const { body } = await requestTokens({
      url: serviceSettings.tokenService,
      auth: encodedAuth,
      body: {
        grant_type: "refresh_token",
        refresh_token: refreshToken
      }
    });

    return AuthTokens.updateTokens(id, serviceName, {
      accessToken: body.access_token,
      expiresIn: body.expires_in,
      tokenType: body.token_type,
      updateTime: new Date()
    });
  } catch (e) {
    throw Error(e);
  }
};
