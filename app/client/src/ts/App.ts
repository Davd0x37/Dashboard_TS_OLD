import ApolloClient from "apollo-boost";

class App {
  public readonly client: ApolloClient<any>;

  /**
   * Default mock visible while loading data
   *
   * @private
   * @type {object}
   * @memberof App
   */
  private defaultData: object = {
    user: {
      avatar: "avatar.png",
      name: "Vernon Roche"
    }
  };

  constructor() {
    this.client = new ApolloClient({
      uri: "http://localhost:4000"
    });
  }

  /**
   * Generate plates at startup
   *
   * @param {Element} where
   * @param {any[]} plates
   * @memberof App
   */
  public addPlates(where: Element, plates: any[]) {
    plates.forEach(plate => {
      where.appendChild(plate.renderPlate());
      plate.postProcess();
    });
  }

  /**
   * GraphQL Query
   *
   * @param {*} qry
   * @returns {Promise<any>}
   * @memberof App
   */
  public async query(qry: any): Promise<any> {
    try {
      const res: any = await this.client.query({ query: qry });
      return res.data
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new App();
