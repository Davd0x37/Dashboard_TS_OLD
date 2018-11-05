import axios from "axios";
import signale from "signale";
import { GetUser, UpdateCredentials } from "#/components/user/Manager";
import { digitalOceanConfig } from "#SH/Config";
import { timeToSeconds } from "#SH/Utils";

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
 * @returns {Promise<void>}
 */
export const update = async (id: string): Promise<void> => {
  try {
    const authToken = await GetAccessToken(id);
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
    if (data.droplets.length >= 1) {
      const now = timeToSeconds(Date.now());
      const creationDate = timeToSeconds(Date.parse(data.droplets[0].created_at));
      const createdAt = Math.round((now - creationDate) / (60 * 60));
      return {
        Total: data.meta.total,
        LastCreatedDroplet: createdAt
      };
    } else {
      return {
        Total: data.meta.total,
        LastCreatedDroplet: 0
      };
    }
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
const GetAccessToken = async (id: string): Promise<string> => {
  try {
    const data: any = await GetUser(id);
    return data.AuthTokens.DigitalOcean.AccessToken;
  } catch (e) {
    signale.error("DigitalOcean.Manager.GetAccessToken ------", e);
    throw Error(e);
  }
};
