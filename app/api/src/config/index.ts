export const spotifyConfig = {
  authenticateURL: "https://accounts.spotify.com/authorize",
  redirectURI: "http://localhost:4000/spotify/authenticateResult",
  userScopes: ["user-read-private", "user-read-email"],
  clientID: "",
  clientSecret: "",
  api: "https://api.spotify.com/v1/"
};

export const digitalOceanConfig = {
  api: "https://api.digitalocean.com/v2/",
  authToken: ""
};

export const paypalConfigSandbox = {
  redirectURI: "http://localhost:4000/paypal/authenticateResult",
  userScopes: ["openid", "profile", "email", "address", "phone"],
  clientID: "",
  clientSecret: "",
  authenticateURL: "https://www.sandbox.paypal.com/signin/authorize",
  api: "https://api.sandbox.paypal.com/v1/"
};

export const paypalConfig = {
  redirectURI: "http://localhost:4000/paypal/authenticateResult",
  userScopes: ["openid", "profile", "email", "address", "phone"],
  clientID: "",
  clientSecret: "",
  authenticateURL: "https://www.paypal.com/signin/authorize",
  api: "https://api.paypal.com/v1/"
};
