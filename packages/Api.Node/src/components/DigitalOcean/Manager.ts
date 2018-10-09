import axios from "axios";
import signale from "signale";
import { getUser, updateCredentials } from "../../components/user/Manager";
import { digitalOceanConfig } from "../../config";
import { timeToSeconds } from "../../utils/utils";

interface IDropletData {
  total: number;
  lastCreatedDroplet: number;
}

interface IAccountData {
  email: string;
  dropletLimit: number;
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
    const authToken = token || (await getAuthToken(id));
    const account: IAccountData = await getAccount(authToken);
    const droplets: IDropletData = await getDroplet(authToken);
    await updateCredentials(id, {
      DigitalOcean: {
        total: droplets.total,
        lastCreatedDroplet: droplets.lastCreatedDroplet,
        email: account.email,
        dropletLimit: account.dropletLimit
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
const getDroplet = async (authToken: string): Promise<IDropletData> => {
  try {
    const { data }: any = await getData("droplets", authToken);
    const now = timeToSeconds(Date.now());
    const creationDate = timeToSeconds(Date.parse(data.droplets[0].created_at));
    const createdAt = Math.round((now - creationDate) / (60 * 60 * 24));
    return {
      total: data.meta.total,
      lastCreatedDroplet: createdAt
    };
  } catch (e) {
    signale.error("DigitalOcean.Manager.getDroplet ------", e);
    throw Error(e);
  }
};

/**
 * Get account details (Email, verified etc.)
 *
 * @param {string} authToken
 * @returns {Promise<IAccountData>}
 */
const getAccount = async (authToken: string): Promise<IAccountData> => {
  try {
    const { data }: any = await getData("account", authToken);
    return {
      email: data.account.email,
      dropletLimit: data.account.droplet_limit
    };
  } catch (e) {
    signale.error("DigitalOcean.Manager.getAccount ------", e);
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
const getAuthToken = async (id: string): Promise<string> => {
  try {
    const data: any = await getUser(id);
    return data.authTokens.DigitalOcean.accessToken;
  } catch (e) {
    signale.error("DigitalOcean.Manager.getAuthToken ------", e);
    throw Error(e);
  }
};
