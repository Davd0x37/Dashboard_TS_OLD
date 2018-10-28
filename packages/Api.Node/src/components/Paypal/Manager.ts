import request from "request";
import signale from "signale";
import { GetUser, UpdateCredentials } from "../../components/user/Manager";
import { paypalConfig } from "../../config";
import { RefreshTokens, TokensNotExists } from "../../controller/Authenticate";

export const update = async (id: string) => {
  try {
    await RefreshTokens({
      id,
      service: "Paypal",
      url: paypalConfig.apiTokenService,
      auth: { clientID: paypalConfig.clientID, clientSecret: paypalConfig.clientSecret }
    });
    const data: any = await GetUser(id);

    // If AccessToken is undefined just end requesting data
    if (TokensNotExists("Paypal", data)) {
      return false;
    }

    const { AccessToken } = await data.AuthTokens.Paypal;
    const options = {
      url: paypalConfig.paths.personalData,
      headers: { Authorization: "Bearer " + AccessToken },
      json: true
    };

    request.get(options, async (_: any, __: any, body: any) => {
      await UpdateCredentials(id, {
        Paypal: {
          Username: body.name,
          Email: body.email,
          Phone: body.phone_number,
          Verified: body.verified,
          Country: body.address.country,
          Zoneinfo: body.zoneinfo
        }
      });
    });
    return true;
  } catch (e) {
    signale.error("Paypal.Manager.update ------", e);
    throw Error(e);
  }
};
