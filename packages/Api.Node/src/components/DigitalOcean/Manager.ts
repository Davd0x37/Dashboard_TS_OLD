import axios from "axios";
import signale from "signale";
import { GetUser, UpdateCredentials } from "../../components/user/Manager";
import { digitalOceanConfig } from "../../config";
import { timeToSeconds } from "../../utils/utils";

interface IDropletData {
  Total: number;
  LastCreatedDroplet: number;
}

interface IAccountData {
  Email: string;
  DropletLimit: number;
}

/**
 * Get every account details needed to show user
 *
 * @param {string} id
 * @param {string} [token]
 * @returns {Promise<void>}
 */
export const update = async (id: string, token?: string): Promise<void> => {
  try {
    const authToken = token || (await GetAuthToken(id));
    const account: IAccountData = await GetAccount(authToken);
    const droplets: IDropletData = await GetDroplet(authToken);
    await UpdateCredentials(id, {
      DigitalOcean: {
        Total: droplets.Total,
        LastCreatedDroplet: droplets.LastCreatedDroplet,
        Email: account.Email,
        DropletLimit: account.DropletLimit
      }
    });
  } catch (e) {
    signale.error("DigitalOcean.Manager.update ------", e);
    throw Error(e);
  }
};
/**
 * Get number of droplets.
 *
 * @param {string} authToken
 * @returns {Promise<IDropletData>}
 */
const GetDroplet = async (authToken: string): Promise<IDropletData> => {
  try {
    const { data }: any = await getData("droplets", authToken);
    const now = timeToSeconds(Date.now());
    const creationDate = timeToSeconds(Date.parse(data.droplets[0].created_at));
    const createdAt = Math.round((now - creationDate) / (60 * 60 * 24));
    return {
      Total: data.meta.total,
      LastCreatedDroplet: createdAt
    };
  } catch (e) {
    signale.error("DigitalOcean.Manager.GetDroplet ------", e);
    throw Error(e);
  }
};

/**
 * Get account details (Email, verified etc.)
 *
 * @param {string} authToken
 * @returns {Promise<IAccountData>}
 */
const GetAccount = async (authToken: string): Promise<IAccountData> => {
  try {
    const { data }: any = await getData("account", authToken);
    return {
      Email: data.account.email,
      DropletLimit: data.account.droplet_limit
    };
  } catch (e) {
    signale.error("DigitalOcean.Manager.GetAccount ------", e);
    throw Error(e);
  }
};

/**
 * Fetch data from API
 *
 * @param {string} type
 * @param {string} authToken
 * @returns
 */
const getData = async (type: string, authToken: string) => {
  try {
    return axios.get(`${digitalOceanConfig.api}${type}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
  } catch (e) {
    signale.error("DigitalOcean.Manager.getData ------", e);
    throw Error(e);
  }
};

/**
 * Get access token from database
 *
 * @param {string} id
 * @returns {Promise<string>}
 */
const GetAuthToken = async (id: string): Promise<string> => {
  try {
    const data: any = await GetUser(id);
    return data.AuthTokens.DigitalOcean.AccessToken;
  } catch (e) {
    signale.error("DigitalOcean.Manager.GetAuthToken ------", e);
    throw Error(e);
  }
};
