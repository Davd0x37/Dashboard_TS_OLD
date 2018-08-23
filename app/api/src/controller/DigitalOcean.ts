import axios from "axios";
import { digitalOceanConfig } from "../config/secretConfig";
import { timeToSeconds } from "../utils/utils";
import { UserManager } from "./User";

interface IDropletData {
  total: number;
  lastCreatedDroplet: number;
}

interface IAccountData {
  email: string;
  dropletLimit: number;
}

class DigitalOcean {
  /**
   * Get every account details needed to show user
   *
   * @param {string} id
   * @param {string} authToken
   * @returns {Promise<void>}
   * @memberof DigitalOcean
   */
  public async accountData(id: string, authToken: string): Promise<void> {
    const account: IAccountData = await this.getAccount(authToken);
    const droplets: IDropletData = await this.getDroplet(authToken);
    await UserManager.updateCredentials(id, {
      services: {
        digitalocean: {
          total: droplets.total,
          lastCreatedDroplet: droplets.lastCreatedDroplet,
          email: account.email,
          dropletLimit: account.dropletLimit
        }
      }
    });
  }

  /**
   * Get number of droplets. It can show list of droplets too
   *
   * @protected
   * @param {string} authToken
   * @returns {Promise<IDropletData>}
   * @memberof DigitalOcean
   */
  protected async getDroplet(authToken: string): Promise<IDropletData> {
    const { data }: any = await this.getData("droplets", authToken);
    const now = timeToSeconds(Date.now());
    const creationDate = timeToSeconds(Date.parse(data.droplets[0].created_at));
    const createdAt = Math.round((now - creationDate) / (60 * 60 * 24));
    return {
      total: data.meta.total,
      lastCreatedDroplet: createdAt
    };
  }

  /**
   * Get account details (Email, verified etc.)
   *
   * @protected
   * @param {string} authToken
   * @returns {Promise<IAccountData>}
   * @memberof DigitalOcean
   */
  protected async getAccount(authToken: string): Promise<IAccountData> {
    const { data }: any = await this.getData("account", authToken);
    return {
      email: data.account.email,
      dropletLimit: data.account.droplet_limit
    };
  }

  /**
   * Fetch data from API
   *
   * @protected
   * @param {string} type
   * @param {string} authToken
   * @returns
   * @memberof DigitalOcean
   */
  protected async getData(type: string, authToken: string) {
    return axios.get(`${digitalOceanConfig.api}/${type}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
  }
}

export default new DigitalOcean();
