import gql from "graphql-tag";
import { isEqual } from "lodash";
import Api from "./Api";

class Storage {
  protected isOnline: boolean = navigator.onLine;

  /**
   * Default mockup data
   *
   * @protected
   * @type {IStoreValues}
   * @memberof Storage
   */
  protected mockupData: IStoreValues = {
    userId: "",
    header: {
      username: "",
      avatar: ""
    },
    services: {
      spotify: {
        username: "",
        email: "",
        type: ""
      },
      digitalocean: {
        lastCreatedDroplet: "",
        email: "",
        dropletLimit: "",
        total: ""
      },
      paypal: {
        username: "",
        email: "",
        phone: "",
        language: "",
        verified: "",
        country: "",
        zoneinfo: ""
      }
    }
  };

  /**
   * Return user data from store or if online from local storage
   *
   * @readonly
   * @type {IStoreValues}
   * @memberof Storage
   */
  public get store(): IStoreValues {
    return this.storageData;
  }

  /**
   * Save data in mockupData and local storage
   *
   * @memberof Storage
   */
  public set store(data: IStoreValues) {
    this.mockupData = { ...this.storageData, ...data };
    this.storageData = this.mockupData;
  }

  /**
   * Return data from local storage
   * If local storage is empty, return default data from storage class
   *
   * @protected
   * @memberof Storage
   */
  protected get storageData() {
    return JSON.parse(localStorage.getItem("user_data"));
  }

  /**
   * Save user data to local storage
   *
   * @protected
   * @memberof Storage
   */
  protected set storageData(value: object) {
    localStorage.setItem("user_data", JSON.stringify(value));
  }

  /**
   * Fetch user data and put them into store
   *
   * @param {string} id
   * @memberof Storage
   */
  public async create(id?: string, asyncUpdate?: any) {
    if (this.isOnline) {
      try {
        this.mockupData.userId = id;
        this.storageData = this.mockupData;
        asyncUpdate(id);
      } catch (error) {
        // Do something
        // LOL 🤦‍
      }
    }
  }

  /**
   * Fetch data from server
   *
   * @protected
   * @returns
   * @memberof Storage
   */
  protected async fetchData() {
    return Api.mutation(gql`
        mutation {
          updateUserData(id: "${this.store.userId}") {
            spotify {
              email
              username
              type
            }
            digitalocean {
              email
              dropletLimit
              total
              lastCreatedDroplet
            }
            paypal {
              username
              email
              phone
              language
              verified
              country
              zoneinfo
            }
          }
        }
      `);
  }
}
export default new Storage();

export interface IStoreValues {
  userId?: string;
  header?: {
    username: string;
    avatar: string;
  };
  services?: {
    spotify?: {
      username?: string;
      email?: string;
      type?: string;
    };
    digitalocean?: {
      lastCreatedDroplet?: string;
      email?: string;
      dropletLimit?: string;
      total?: string;
    };
    paypal?: {
      username?: string;
      email?: string;
      phone?: string;
      language?: string;
      verified?: string;
      country?: string;
      zoneinfo?: string;
    };
  };
}
