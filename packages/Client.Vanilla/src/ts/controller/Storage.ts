import { IState } from "../store/State";
class Storage {
  // protected isOnline: boolean = navigator.onLine;
  /**
   * Return data from local storage
   *
   * @public
   * @memberof Storage
   */
  public get storageData() {
    const data = localStorage.getItem("user_data");
    if (data !== null) {
      return JSON.parse(data);
    }
  }

  /**
   * Save user data to local storage
   *
   * @public
   * @memberof Storage
   */
  public set storageData(value: IState) {
    localStorage.setItem("user_data", JSON.stringify(value));
  }
}
export default new Storage();
