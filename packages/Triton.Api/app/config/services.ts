import { IServices } from "@/type";

const env = process.env;

export const servicesOAuth = {
  spotify: {
    /**
     * CHANGE YOUR REDIRECT URL
     */
    redirectURL: "http://localhost:4000/services/spotify/authenticateResult",
    // redirectURL: "https://api.liquidash.pl/services/spotify/authenticateResult",

    /**
     * READONLY DATA
     */
    apiURL: "https://api.spotify.com/v1/",
    tokenService: "https://accounts.spotify.com/api/token",
    authorizeURL: "https://accounts.spotify.com/authorize",
    userScopes: ["user-read-private", "user-read-email"],
    clientID: env.SPOTIFY_CLIENT_ID || "",
    clientSecret: env.SPOTIFY_CLIENT_SECRET || "",

    // @TODO: Maybe change it with only query instead of full url?
    paths: ["https://api.spotify.com/v1/me"],

    requestedData: ["display_name", "email", "product", "followers.total"]
  } as IServices,

  // paypalDev: {
  //   /**
  //    * CHANGE YOUR REDIRECT URL
  //    */
  //   redirectURL: "https://api.liquidash.pl/services/paypal/authenticateResult",

  //   /**
  //    * READONLY DATA
  //    */
  //   apiURL: "https://api.paypal.com/v1/",
  //   tokenService:
  //     "https://api.paypal.com/v1/identity/openidconnect/tokenservice",
  //   authorizeURL: "https://www.paypal.com/signin/authorize",
  //   userScopes: ["openid", "profile", "email", "address", "phone"],
  //   clientID: env.PAYPAL_CLIENT_ID || "",
  //   clientSecret: env.PAYPAL_CLIENT_SECRET || "",

  //   paths: [
  //     "https://api.paypal.com/v1/identity/openidconnect/userinfo?schema=openid"
  //   ],

  //   requestedData: [
  //     "name",
  //     "email",
  //     "verified",
  //     "zoneinfo",
  //     "phone_number",
  //     "language",
  //     "verified"
  //   ]
  // } as IServices,

  paypal: {
    /**
     * CHANGE YOUR REDIRECT URL
     */
    redirectURL: "http://localhost:4000/services/paypal/authenticateResult",
    // redirectURL: "https://api.liquidash.pl/services/paypal/authenticateResult",

    /**
     * READONLY DATA
     */
    apiURL: "https://api.sandbox.paypal.com/v1/",
    tokenService:
      "https://api.sandbox.paypal.com/v1/identity/openidconnect/tokenservice",
    authorizeURL: "https://www.sandbox.paypal.com/signin/authorize",
    userScopes: ["openid", "profile", "email", "address", "phone"],
    clientID: env.PAYPAL_CLIENT_ID_DEV || "",
    clientSecret: env.PAYPAL_CLIENT_SECRET_DEV || "",

    paths: [
      "https://api.sandbox.paypal.com/v1/identity/openidconnect/userinfo?schema=openid"
    ],

    requestedData: [
      "name",
      "email",
      "verified",
      "zoneinfo",
      "phone_number",
      "language",
      "verified"
    ]
  } as IServices
};

export const servicesBasic = {
  digitalocean: {
    apiURL: "https://api.digitalocean.com/v2/",
    paths: [
      "https://api.digitalocean.com/v2/account",
      "https://api.digitalocean.com/v2/droplets"
    ]
  }
};
