import ApolloClient from "apollo-boost";
import { Component } from "./components/Component";
import { View } from "./controller/View";

class App extends Component {
  protected client: ApolloClient<any>;

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
    super();
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
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Invoke all needed methods
   *
   * @memberof App
   */
  public create(): void {
    this.setupClient();
    this.renderView();
  }

  public update(): void {
    // FILL
  }

  public postProcess(): void {
    // FILL
  }

  protected view(): void {
    // FILL
  }

  protected controller(): void {
    // FILL
  }

  /**
   * Setup client connection
   *
   * @protected
   * @memberof App
   */
  protected setupClient() {
    this.client = new ApolloClient({
      uri: "http://localhost:4000"
    });
  }

  /**
   * Render view
   *
   * @protected
   * @memberof App
   */
  protected renderView() {
    View.addPlates();
    View.initSearch();
  }
}

export default new App();
