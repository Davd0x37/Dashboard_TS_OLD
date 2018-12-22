import { getUser, updateCredentials } from "#/components/user/Manager";
import { IAuthTokens } from "#/type/Auth";
import { DataType, ErrorType } from "../../type/Enum";
import { IAccountResponse, IDropletsResponse } from "./Interface";
import { hoursFromCreate } from "./Utils";
import { fetchData } from "#/controller/Service";

/**
 * Get every account details needed to show user
 *
 * @param {string} api Api url
 * @param {string} id User id
 * @returns {Promise<boolean>} True if updating goes without problems
 */
export const update = async (api: string, id: string): Promise<boolean> => {
  try {
    const authToken = await getAccessToken(id);
    const account = await fetchData<IAccountResponse>(
      `${api}/${DataType.ACCOUNT}`,
      authToken
    );
    const droplets = await fetchData<IDropletsResponse>(
      `${api}/${DataType.DROPLETS}`,
      authToken
    );

    return updateCredentials(id, {
      DigitalOcean: {
        Total: droplets.meta.total,

        LastCreatedDroplet:
          droplets.droplets.length >= 1
            ? hoursFromCreate(droplets.droplets[0].created_at)
            : 0,

        Email: account.email,

        DropletLimit: account.droplet_limit
      }
    });
  } catch (e) {
    throw Error(e);
  }
};

/**
 * Get access token from database
 *
 * @param {string} id User id
 * @returns {Promise<string>} Access token
 */
const getAccessToken = (id: string): Promise<string> =>
  getUser<IAuthTokens>(id)
    .then(data => data.AuthTokens.DigitalOcean.AccessToken)
    .catch(_ => Promise.reject(ErrorType.NotFound));
