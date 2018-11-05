import request from "request";
import signale from "signale";
import { GetUser, UpdateCredentials } from "#/components/user/Manager";
import { spotifyConfig } from "#SH/Config";
import { RefreshTokens, TokensNotExists } from "#/controller/Authenticate";

export const update = async (id: string) => {
  try {
    await RefreshTokens({
      id,
      service: "Spotify",
      url: spotifyConfig.apiTokenService,
      auth: { clientID: spotifyConfig.clientID, clientSecret: spotifyConfig.clientSecret }
    });
    const data: any = await GetUser(id);

    // If AccessToken is undefined just end requesting data
    if (TokensNotExists("Spotify", data)) {
      return false;
    }

    const { AccessToken } = await data.AuthTokens.Spotify;
    const options = {
      url: `${spotifyConfig.api}me`,
      headers: { Authorization: "Bearer " + AccessToken },
      json: true
    };

    request.get(options, async (_: any, __: any, body: any) => {
      await UpdateCredentials(id, {
        Spotify: {
          Username: body.id,
          Email: body.email,
          Type: body.product
        }
      });
    });
    return true;
  } catch (e) {
    signale.error("Spotify.Manager.update ------", e);
    throw Error(e);
  }
};
