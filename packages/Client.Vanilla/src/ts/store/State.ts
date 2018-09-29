export interface IState {
  user: {
    username: string;
    avatar: string;
  };
  service: {
    Spotify: {
      username: string;
      email: string;
      type: string;
    };
    DigitalOcean: {
      email: string;
      lastCreatedDroplet: number;
      dropletLimit: number;
      total: number;
    };
    Paypal: {
      username: string;
      email: string;
      phone: number;
      country: string;
      verified: string;
      zoneinfo: string;
    };
  };
}

export const State: IState = {
  user: {
    avatar:
      "https://images.8tracks.com/cover/i/009/400/711/mr_robot_fuck_society-866.jpg?rect=0,170,1047,1047&q=98&fm=jpg&fit=max&w=640&h=640",
    username: "Vernon"
  },
  service: {
    Spotify: {
      username: "Vernon",
      email: "vernon@pm.me",
      type: "Premium"
    },
    DigitalOcean: {
      email: "vernon@pm.me",
      lastCreatedDroplet: 20,
      dropletLimit: 10,
      total: 2
    },
    Paypal: {
      username: "Vernon",
      email: "vernon@pm.me",
      phone: 123456789,
      country: "Poland",
      verified: "Verified",
      zoneinfo: "Szczecin"
    }
  }
};
