import request from "request";
import { getUser, updateCredentials } from "../components/user/Manager";
import { digitalOceanConfig } from "../config/secretConfig";
import { timeToSeconds } from "../utils/utils";

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
 * @param {string} authToken
 * @returns {Promise<void>}
 */
export const update = async (id: string, token?: string): Promise<void> => {
  const authToken = token || (await getAuthToken(id));
  const account: IAccountData = await getAccount(authToken);
  const droplets: IDropletData = await getDroplet(authToken);
  await updateCredentials(id, {
    services: {
      digitalocean: {
        total: droplets.total,
        lastCreatedDroplet: droplets.lastCreatedDroplet,
        email: account.email,
        dropletLimit: account.dropletLimit
      }
    }
  });
};
/**
 * Get number of droplets. It can show list of droplets too
 *
 * @param {string} authToken
 * @returns {Promise<IDropletData>}
 */
const getDroplet = async (authToken: string): Promise<IDropletData> => {
  const { data }: any = await getData("droplets", authToken);
  const now = timeToSeconds(Date.now());
  const creationDate = timeToSeconds(Date.parse(data.droplets[0].created_at));
  const createdAt = Math.round((now - creationDate) / (60 * 60 * 24));
  return {
    total: data.meta.total,
    lastCreatedDroplet: createdAt
  };
};

/**
 * Get account details (Email, verified etc.)
 *
 * @param {string} authToken
 * @returns {Promise<IAccountData>}
 */
const getAccount = async (authToken: string): Promise<IAccountData> => {
  const { data }: any = await getData("account", authToken);
  return {
    email: data.account.email,
    dropletLimit: data.account.droplet_limit
  };
};

/**
 * Fetch data from API
 *
 * @param {string} type
 * @param {string} authToken
 * @returns
 */
const getData = async (type: string, authToken: string) => {
  return request.get(`${digitalOceanConfig.api}/${type}`, {
    headers: { Authorization: `Bearer ${authToken}` }
  });
};

/**
 * Get access token from database
 *
 * @param {string} id
 * @returns {Promise<string>}
 */
const getAuthToken = async (id: string): Promise<string> => {
  const data: any = await getUser(id);
  return data.authTokens.digitalocean.accessToken;
};
