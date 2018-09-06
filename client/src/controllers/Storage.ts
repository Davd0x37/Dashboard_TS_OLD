import gql from "graphql-tag";
import { mutation } from "./Api";
import store from "@/store";

class Storage {
  // protected isOnline: boolean = navigator.onLine;

  // /**
  //  * Default mockup data
  //  *
  //  * @protected
  //  * @type {IStoreValues}
  //  * @memberof Storage
  //  */
  // protected mockupData: IStoreValues = {
  //   userId: "",
  //   header: {
  //     username: "",
  //     avatar: ""
  //   },
  //   services: {
  //     spotify: {
  //       username: "",
  //       email: "",
  //       type: ""
  //     },
  //     digitalocean: {
  //       lastCreatedDroplet: "",
  //       email: "",
  //       dropletLimit: "",
  //       total: ""
  //     },
  //     paypal: {
  //       username: "",
  //       email: "",
  //       phone: "",
  //       language: "",
  //       verified: "",
  //       country: "",
  //       zoneinfo: ""
  //     }
  //   }
  // };

  // /**
  //  * Return user data from store or if online from local storage
  //  *
  //  * @readonly
  //  * @type {IStoreValues}
  //  * @memberof Storage
  //  */
  // public get store(): IStoreValues {
  //   return this.storageData;
  // }

  // /**
  //  * Save data in mockupData and local storage
  //  *
  //  * @memberof Storage
  //  */
  // public set store(data: IStoreValues) {
  //   this.mockupData = { ...this.storageData, ...data };
  //   this.storageData = this.mockupData;
  // }

  // /**
  //  * Return data from local storage
  //  * If local storage is empty, return default data from storage class
  //  *
  //  * @protected
  //  * @memberof Storage
  //  */
  // protected get storageData() {
  //   const data = localStorage.getItem("user_data");
  //   if (data !== null) {
  //     return JSON.parse(data);
  //   } else {
  //     return this.mockupData;
  //   }
  // }

  public getStorage() {
    const data = localStorage.getItem("user_data");
    if (data !== null) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }

  /**
   * Save user data to local storage
   *
   * @protected
   * @memberof Storage
   */
  public saveStorage(value: IStoreValues) {
    localStorage.setItem("user_data", JSON.stringify(value));
    store.dispatch("update_user_data", value);
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
