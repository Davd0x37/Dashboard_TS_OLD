import { setupServiceTokens } from "@/components/service";
import { AuthTokens } from "@/entity";
import { ApiTokens } from "@/entity/ApiTokens";
import { generateRandomString } from "@/utils/gen";
import { AppError } from "@/utils/log";
import { queryString } from "@/utils/net";
import { readSession } from "../memory";
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
 * @param {string} token Generated JWT token
 * @param {string} serviceName Service name
 * @param {ApiTokens} serviceSettings Options needed to generate authentication url
 * @returns {Promise<string>} Generated query string or false if failed
 */
export const requestAuthentication = async (
  token: string,
  serviceName: string,
  serviceSettings: ApiTokens
): Promise<string> => {
  try {
    const userID = await readSession(token);
    if (userID === null) {
      return Promise.reject("Wrong token!1");
    }

    const { authorizeURL, clientID, userScopes, redirectURL } = serviceSettings;
    const nonce = `${Date.now() +
      Buffer.from(generateRandomString(16, true)).toString("base64")}`;

    // Maybe instead of returning boolean, just throw exception?
    const setup = await setupServiceTokens(userID, serviceName, {
      state: token
    });
    if (!setup) {
      throw AppError("Error occurs during setting up account!", null);
    }

    return queryString(authorizeURL!, {
      client_id: clientID,
      response_type: "code",
      scope: encodeURI(userScopes!.join("+")),
      redirect_uri: encodeURI(redirectURL!),
      state: token,
      nonce
    });
  } catch (err) {
    throw AppError(err, "Something went wrong!");
  }
};

/**
 * Request access tokens with received code and state key.
 *
 * #NOTE: Returns only boolean if tokens are updated or state keys are different
 * otherwise it will reject and throw proper error message.
 * We don't check if received user ID (getIdByStateKey) is string or null because
 * it will throw error. Without ID we can't do anything so there is no reason to validate it.
 *
 * **IMPURE**
 *
 * @param {string} serviceName Service name
 * @param {ApiTokens} serviceSettings Service options
 * @param {{ code: string; state: string }} { code, state } Received code and state.
 * @returns {Promise<boolean>} True if successfully retrieved tokens or false in case of failure
 */
export const getAccessToken = async (
  serviceName: string,
  serviceSettings: ApiTokens,
  { code, state }: { code: string; state: string }
): Promise<boolean> => {
  try {
    const encryptedID = await readSession(state);
    if (encryptedID === null) {
      return Promise.reject("You shall not pass!");
    }

    // Destructure
    const {
      clientID,
      clientSecret,
      redirectURL,
      tokenService
    } = serviceSettings;

    const stateKey = await AuthTokens.getStateKey(encryptedID, serviceName);
    if (state !== stateKey || state === null) {
      return Promise.reject("Do not try this with me!");
    }

    const encodedAuth = basicAuth(clientID!, clientSecret!);

    const { body } = await requestTokens({
      url: tokenService!,
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
    return AuthTokens.updateTokens(encryptedID, serviceName, {
      accessToken: body.access_token,
      refreshToken: body.refresh_token,
      tokenType: body.token_type,
      expiresIn: body.expires_in,
      state: ""
    });
  } catch (err) {
    throw AppError(err, "Something went wrong!");
  }
};

/**
 * Receive new refresh token from service.
 *
 * **IMPURE**
 *
 * @param {string} id User id
 * @param {string} serviceName Service name
 * @param {ApiTokens} serviceSettings Service options
 * @returns {Promise<boolean>} True if successfully received new tokens otherwise false
 */
export const refreshTokens = async (
  id: string,
  serviceName: string,
  serviceSettings: ApiTokens
): Promise<boolean> => {
  try {
    const tokens = await AuthTokens.getAuthTokenByName(id, serviceName);

    if (tokens === null || tokens.refreshToken === null) {
      return false;
    }

    const encodedAuth = basicAuth(
      serviceSettings.clientID!,
      serviceSettings.clientSecret!
    );

    const { body } = await requestTokens({
      url: serviceSettings.tokenService!,
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
