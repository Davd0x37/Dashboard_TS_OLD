import request from "request";
import log from "signale";
import { getUser, updateCredentials } from "../../components/user/Manager";
import { spotifyConfig } from "../../config";

export const update = async (id: string) => {
  try {
    const data: any = await getUser(id);
    const { accessToken } = await data.authTokens.Spotify;
    const options = {
      url: `${spotifyConfig.api}me`,
      headers: { Authorization: "Bearer " + accessToken },
      json: true
    };

    request.get(options, async (_: any, __: any, body: any) => {
      await updateCredentials(id, {
        Spotify: {
          username: body.id,
          email: body.email,
          type: body.product
        }
      });
    });
  } catch (e) {
    throw Error(e);
  }
};
