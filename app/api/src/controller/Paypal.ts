import request from "request";
import log from "signale";
import { paypalConfig } from "../config/secretConfig";
import Authenticate from "./Authenticate";
import { UserManager } from "./User";

export const Paypal = {
  /**
   * Update user data
   *
   * @param {string} id
   */
  async updateData(id: string) {
    try {
      await this.refreshToken(id);
      const data = await UserManager.getUser(id);
      const { accessToken } = await data.authTokens.paypal;
      const options = {
        url: `${paypalConfig.api}identity/openidconnect/userinfo?schema=openid`,
        headers: { Authorization: "Bearer " + accessToken },
        json: true
      };

      request.get(options, async (_, __, body) => {
        await UserManager.updateCredentials(id, {
          services: {
            paypal: {
              username: body.name,
              email: body.email,
              phone: body.phone_number,
              language: body.language,
              verified: body.verified,
              country: body.address.country,
              zoneinfo: body.zoneinfo
            }
          }
        });
      });
    } catch (e) {
      log.error(e);
      // await this.refreshToken(id);
      // await this.updateData(id);
    }
  },

  /**
   * Refresh access token
   *
   * @param {string} id
   */
  async refreshToken(id: string) {
    const data = await UserManager.getUser(id);
    const refreshToken = data.authTokens.spotify.refreshToken;
    const form = {
      url: `${paypalConfig.api}identity/openidconnect/tokenservice`,
      headers: {
        Authorization: Authenticate.generateBasicAuthorization(paypalConfig.clientID, paypalConfig.clientSecret)
      },
      form: {
        grant_type: "refresh_token",
        refresh_token: refreshToken
      },
      json: true
    };
    Authenticate.refreshToken(id, "paypal", form);
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
      url: `${paypalConfig.api}identity/openidconnect/tokenservice`,
      form: {
        code,
        // redirect_uri: paypalConfig.redirectURI,
        grant_type: "authorization_code"
      },
      headers: {
        Authorization: Authenticate.generateBasicAuthorization(paypalConfig.clientID, paypalConfig.clientSecret)
      },
      json: true
    };
    Authenticate.getAccessToken(id, "paypal", form, { code, state });
  }
};
