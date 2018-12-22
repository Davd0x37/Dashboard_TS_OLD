import { getUser, updateCredentials } from "#/components/user/Manager";
import { TokensExists } from "#/controller/Authenticate";
import { IAuthTokens } from "#/interfaces/Auth";
import { ErrorType } from "../../type/Enum";
import { IAccountResponse } from "./Interface";
import got from "got";

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
        Paypal: {
          Username: body.name,
          Email: body.email,
          Phone: body.phone_number,
          Verified: body.verified,
          Country: body.address.country,
          Zoneinfo: body.zoneinfo
        }
      })
    )
    .catch(e => {
      throw Error(e);
    });
