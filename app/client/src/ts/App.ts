import ApolloClient from "apollo-boost";
import { Component } from "./components/Component";
import { View } from "./controller/View";

class App extends Component {
  protected client: ApolloClient<any>;

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
    this.view();
  }

  /**
   * Update component
   *
   * @memberof App
   */
  public update(): void {
    // FILL
  }

  /**
   * Methods invoked after creating component
   *
   * @memberof App
   */
  public postProcess(): void {
    // FILL
  }

  /**
   * App view
   *
   * @protected
   * @memberof App
   */
  protected view(): void {
    View.renderHeader();
    View.renderPlates();
  }

  /**
   * Controller
   *
   * @protected
   * @memberof App
   */
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
}

export default new App();
