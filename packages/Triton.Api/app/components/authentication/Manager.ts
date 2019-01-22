import { AuthTokens } from "@/entity";
import { ApiTokens } from "@/entity/ApiTokens";
import { generateRandomString } from "@/utils/gen";
import { AppError } from "@/utils/log";
import { queryString } from "@/utils/net";
import { readSession } from "../memory";
import { setupServiceTokens } from "../service";
import { fixPostgresArray } from "../service/Utils";
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
 * @returns {Promise<string>} Generated query string or false if failed
 */
export const requestAuthentication = async (
  token: string,
  serviceName: string
): Promise<string> => {
  try {
    const userID = await readSession(token);
    const apiTokens = await ApiTokens.getAuthTokenByName(serviceName);
    if (
      userID === null ||
      apiTokens === null ||
      apiTokens.tokenType === "Basic"
    ) {
      return Promise.reject(
        "We do not have implemented this service or you passed wrong name 🤷‍"
      );
    }

    const userScopes =
      typeof apiTokens.userScopes === "string"
        ? fixPostgresArray(apiTokens.userScopes)
        : (apiTokens.userScopes as any);

    const nonce = `${Date.now() +
      Buffer.from(generateRandomString(16, true)).toString("base64")}`;

    return queryString(apiTokens.authorizeURL!, {
      client_id: apiTokens.clientID,
      response_type: "code",
      scope: encodeURI(userScopes.join("+")),
      redirect_uri: encodeURI(apiTokens.redirectURL!),
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
 * @param {{ code: string; state: string }} { code, state } Received code and state.
 * @returns {Promise<boolean>} True if successfully retrieved tokens or false in case of failure
 */
export const getAccessToken = async (
  serviceName: string,
  { code, state }: { code: string; state: string }
): Promise<boolean> => {
  try {
    // We can skip checking state key because it is assigned to user ID saved in memory
    // If state is incorrect it will reject on first validation
    const userID = await readSession(state);
    const apiTokens = await ApiTokens.getAuthTokenByName(serviceName);

    if (
      userID === null ||
      apiTokens === null ||
      apiTokens.tokenType === "Basic"
    ) {
      return Promise.reject("You shall not pass!");
    }

    // const stateKey = await AuthTokens.getStateKey(userID, serviceName);
    // if (state !== stateKey || state === null) {
    //   return Promise.reject("Do not try this with me!");
    // }

    const encodedAuth = basicAuth(apiTokens.clientID!, apiTokens.clientSecret!);

    const { body } = await requestTokens({
      url: apiTokens.tokenService!,
      auth: encodedAuth,
      body: {
        code,
        grant_type: "authorization_code",
        redirect_uri: apiTokens.redirectURL
      }
    });

    // Now we can save our new tokens and delete state key
    // It is somehow dangerous to store it for long time
    // Because we can get user id using state key
    return setupServiceTokens(userID, serviceName, {
      accessToken: body.access_token,
      refreshToken: body.refresh_token,
      tokenType: body.token_type,
      expiresIn: body.expires_in
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
 * @returns {Promise<boolean>} True if successfully received new tokens otherwise false
 */
export const refreshTokens = async (
  id: string,
  serviceName: string
): Promise<boolean> => {
  try {
    const tokens = await AuthTokens.getAuthTokenByName(id, serviceName);
    const apiTokens = await ApiTokens.getAuthTokenByName(serviceName);

    if (tokens === null || tokens.refreshToken === null || apiTokens === null) {
      return false;
    }

    const encodedAuth = basicAuth(apiTokens.clientID!, apiTokens.clientSecret!);

    const { body } = await requestTokens({
      url: apiTokens.tokenService!,
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
      updateTime: new Date().toISOString()
    });
  } catch (err) {
    return AppError(err, false);
  }
};
