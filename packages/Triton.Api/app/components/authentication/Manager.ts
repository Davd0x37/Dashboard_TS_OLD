import { setupServiceTokens } from "@/components/user";
import { AuthTokens, User } from "@/entity";
import { IServices } from "@/type";
import { generateRandomString } from "@/utils/gen";
import { AppError } from "@/utils/log";
import { queryString } from "@/utils/net";
import { basicAuth, requestTokens } from "./Utils";

/**
 * Generate authentication url.
 * Save generated state key in database.
 *
 * #Note: Just return string or reject in case of failure.
 * This is only used in router component and will catch rejection
 * then proper message will be send to user.
 *
 * **IMPURE**
 *
 * @param {string} id User id
 * @param {string} serviceName Service name
 * @param {IServices} serviceSettings Options needed to generate authentication url
 * @returns {Promise<string>} Generated query string or false if failed
 */
export const requestAuthentication = async (
  id: string,
  serviceName: string,
  serviceSettings: IServices
): Promise<string> => {
  try {
    const { authorizeURL, clientID, userScopes, redirectURL } = serviceSettings;

    const state = generateRandomString(64);
    const nonce = `${Date.now() +
      Buffer.from(generateRandomString(16, true)).toString("base64")}`;

    // Maybe instead of returning boolean, just throw exception?
    const setup = await setupServiceTokens(id, serviceName, { state });
    if (!setup) {
      return Promise.reject(false);
    }

    return queryString(authorizeURL, {
      client_id: clientID,
      response_type: "code",
      scope: encodeURI(userScopes.join("+")),
      redirect_uri: encodeURI(redirectURL),
      state,
      nonce
    });
  } catch (err) {
    throw AppError(err, false);
  }
};

/**
 * Request access tokens with received code and state key
 *
 * #NOTE: Returns only boolean if tokens are updated or state keys are different
 * otherwise it will reject and throw proper error message.
 * We don't check if received user ID (getIdByStateKey) is string or null because
 * it will throw error. Without ID we can't do anything so there is no reason to validate it.
 *
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

    const id = await User.getIdByStateKey(state);
    if (id === null) {
      return false;
    }

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
  } catch (err) {
    throw AppError(err, false);
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
    const tokens = await AuthTokens.getAuthTokenByName(id, serviceName);

    if (tokens === null || tokens.refreshToken === null) {
      return false;
    }

    const encodedAuth = basicAuth(
      serviceSettings.clientID,
      serviceSettings.clientSecret
    );

    const { body } = await requestTokens({
      url: serviceSettings.tokenService,
      auth: encodedAuth,
      body: {
        grant_type: "refresh_token",
        refresh_token: tokens.refreshToken
      }
    });

    return AuthTokens.updateTokens(id, serviceName, {
      accessToken: body.access_token,
      expiresIn: body.expires_in,
      tokenType: body.token_type,
      updateTime: new Date()
    });
  } catch (err) {
    return AppError(err, false);
  }
};
