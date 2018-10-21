import request from "request";
import signale from "signale"
import { GetUser, UpdateCredentials } from "../../components/user/Manager";
import { spotifyConfig } from "../../config";

export const update = async (id: string) => {
  try {
    const data: any = await GetUser(id);
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
  } catch (e) {
    signale.error("Spotify.Manager.update ------", e);
    throw Error(e);
  }
};
