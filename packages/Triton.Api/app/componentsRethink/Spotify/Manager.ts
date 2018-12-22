import {
  GetUser,
  UpdateCredentials,
  getUser,
  updateCredentials
} from "#/components/user/Manager";
import {
  RefreshTokens,
  TokensNotExists,
  TokensExists
} from "#/controller/Authenticate";
// import { spotifyConfig } from '#SH/Config';
import request from "request";
import signale from "signale";
import { IAuthTokens } from "#/interfaces/Auth";
import { ErrorType } from "../../type/Enum";
import got from "got";
import { IAccountResponse } from "./Interface";

export const update = (api: string, id: string) =>
  getUser<IAuthTokens>(id)
    .then(
      data =>
        TokensExists("Paypal", data)
          ? Promise.resolve(data)
          : Promise.reject(ErrorType.TokensNotExists)
    )
    .then(({ AuthTokens }) =>
      got(api, {
        headers: {
          Authorization: `Bearer ${AuthTokens.Paypal.AccessToken}`
        },
        json: true
      })
    )
    .then(({ body }: { body: IAccountResponse }) =>
      updateCredentials(id, {
        Spotify: {
          Username: body.id,
          Email: body.email,
          Type: body.product
        }
      })
    )
    .catch(e => {
      throw Error(e);
    });

export const update2 = async (id: string) => {
  try {
    await RefreshTokens({
      id,
      service: "Spotify",
      url: spotifyConfig.apiTokenService,
      auth: {
        clientID: spotifyConfig.clientID,
        clientSecret: spotifyConfig.clientSecret
      }
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
