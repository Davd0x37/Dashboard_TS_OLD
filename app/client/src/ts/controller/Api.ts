import ApolloClient from "apollo-boost";

class Api {
  protected client: ApolloClient<any> = new ApolloClient({
    uri: "http://localhost:4000"
  });

  constructor() {
    // FILL
  }

  /**
   * Send request to API
   *
   * @param {*} req
   * @returns {Promise<any>}
   * @memberof Api
   */
  public async query(req: any): Promise<any> {
    try {
      const res = await this.client.query({
        query: req
      });
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Send mutation to API
   *
   * @param {*} req
   * @returns {Promise<any>}
   * @memberof Api
   */
  public async mutation(req: any): Promise<any> {
    try {
      const res = await this.client.mutate({
        mutation: req
      });
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new Api();
