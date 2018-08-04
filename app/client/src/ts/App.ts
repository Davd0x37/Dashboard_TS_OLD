import ApolloClient from "apollo-boost";

class App {
  public readonly client: ApolloClient<any>;

  private defaultData: object = {
    user: {
      avatar: "avatar.png",
      name: "Vernon Roche"
    },
    spotify: {
      username: "Jon Doe",
      email: "doe@doe.com",
      type: "Premium",
      expire: "13 dni"
    },
    digitalocean: {
      username: "Jon Doe",
      email: "jon@pm.me",
      amount: "$200.00",
      droplets: "1",
      usage: "$0.00"
    },
    paypal: {
      username: "Jon doe",
      email: "jondoe@gmail.com",
      type: "Osobiste",
      amount: "$200.00",
      connectedCard: "VISA",
      avatar: "lol"
    },
    facebook: {
      username: "Jon Doe",
      email: "jondoe@gmail.com",
      phoneNumber: "+48 123 456 789",
      notifications: "12",
      messages: "12"
    }
  };

  constructor() {
    this.client = new ApolloClient({
      uri: "http://localhost:4000"
    });
  }

  public addPlates(where: Element, plates: any[]): void {
    plates.forEach(plate => {
      where.appendChild(plate);
      console.log(plate)
      plate.postProcess()
    });
  }
}

export default new App();
