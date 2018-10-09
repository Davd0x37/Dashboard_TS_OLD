import request from "request";
import signale from "signale";
import { getUser, updateCredentials } from "../../components/user/Manager";
import { paypalConfig } from "../../config";

export const update = async (id: string) => {
  try {
    const data: any = await getUser(id);
    const { accessToken } = await data.authTokens.Paypal;
    const options = {
      url: paypalConfig.paths.personalData,
      headers: { Authorization: "Bearer " + accessToken },
      json: true
    };

    request.get(options, async (_: any, __: any, body: any) => {
      await updateCredentials(id, {
        Paypal: {
          username: body.name,
          email: body.email,
          phone: body.phone_number,
          verified: body.verified,
          country: body.address.country,
          zoneinfo: body.zoneinfo
        }
      });
    });
  } catch (e) {
    signale.error("Paypal.Manager.update ------", e);
    throw Error(e);
  }
};
