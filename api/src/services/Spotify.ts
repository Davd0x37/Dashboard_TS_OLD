import request from "request";
import log from "signale";
import { getUser, updateCredentials } from "../components/user/Manager";
import { spotifyConfig } from "../config/secretConfig";

export const update = async (id: string) => {
  try {
    const data: any = await getUser(id);
    const { accessToken } = await data[0].authTokens.spotify;
    const options = {
      url: `${spotifyConfig.api}me`,
      headers: { Authorization: "Bearer " + accessToken },
      json: true
    };

    request.get(options, async (_, __, body) => {
      await updateCredentials(id, {
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
    throw Error(e);
  }
};
