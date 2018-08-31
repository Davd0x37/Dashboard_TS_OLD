import request from "request";
import log from "signale";
import { getUser, updateCredentials } from "../components/user/Manager";
import { paypalConfig } from "../config/secretConfig";

export const update = async (id: string) => {
  try {
    const data: any = await getUser(id);
    const { accessToken } = await data.authTokens.paypal;
    const options = {
      url: paypalConfig.paths.personalData,
      headers: { Authorization: "Bearer " + accessToken },
      json: true
    };

    request.get(options, async (_, __, body) => {
      await updateCredentials(id, {
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
    throw Error(e);
  }
};
