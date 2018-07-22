import ApolloClient from "apollo-boost";

class App {
  public readonly client: ApolloClient<any>;

  constructor() {
    this.client = new ApolloClient({
      uri: "http://localhost:4000"
    });
  }

}

export default new App();