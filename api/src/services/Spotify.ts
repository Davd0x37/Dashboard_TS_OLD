import request from "request";
import log from "signale";
import { spotifyConfig } from "../config/secretConfig";
import Authenticate from "../controller/Authenticate";
import { UserManager } from "../controller/User";

export const Spotify = {
  /**
   * Update user data
   *
   * @param {string} id
   */
  async updateData(id: string) {
    try {
      await this.refreshToken(id);
      const data: any = await UserManager.getUser(id);
      const { accessToken } = await data[0].authTokens.spotify;
      const options = {
        url: "https://api.spotify.com/v1/me",
        headers: { Authorization: "Bearer " + accessToken },
        json: true
      };

      request.get(options, async (_, __, body) => {
        await UserManager.updateCredentials(id, {
          services: {
            spotify: {
              username: body.id,
              email: body.email,
              type: body.product
            }
          }
        });
      });
    } catch (e) {
      log.error(e);
    }
  },

  /**
   * Refresh access token
   *
   * @param {string} id
   */
  async refreshToken(id: string) {
    const data: any = await UserManager.getUser(id);
    const refreshToken = data.authTokens.spotify.refreshToken;
    const form = {
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization: Authenticate.generateBasicAuthorization(spotifyConfig.clientID, spotifyConfig.clientSecret)
      },
      form: {
        grant_type: "refresh_token",
        refresh_token: refreshToken
      },
      json: true
    };
    Authenticate.refreshToken(id, "spotify", form);
  },

  /**
   * Update access token for spotify api
   *
   * @param {string} id
   * @param {*} { code, state }
   * @returns {Promise<void>}
   */
  async accessToken(id: string, { code, state }: any): Promise<void> {
    const form = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code,
        redirect_uri: spotifyConfig.redirectURI,
        grant_type: "authorization_code"
      },
      headers: {
        Authorization: Authenticate.generateBasicAuthorization(spotifyConfig.clientID, spotifyConfig.clientSecret)
      },
      json: true
    };

    Authenticate.getAccessToken(id, "spotify", form, { code, state });
  }
};
