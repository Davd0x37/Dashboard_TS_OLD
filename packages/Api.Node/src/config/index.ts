export const spotifyConfig = {
  authorizeUrl: "https://accounts.spotify.com/authorize",
  // redirectURI: "http://localhost:4000/spotify/authenticateResult",
  redirectURI: "https://api.liquidash.pl/spotify/authenticateResult",
  userScopes: ["user-read-private", "user-read-email"],
  clientID: "5022d32a21ad45a3bfce0835142a3d2c",
  clientSecret: "1c385db25c474181841aabcc6385e457",
  api: "https://api.spotify.com/v1/",
  apiTokenService: "https://accounts.spotify.com/api/token"
};

export const digitalOceanConfig = {
  api: "https://api.digitalocean.com/v2/",
  authToken: "838b15096e235f752287bb2c29123bfa800284049054a385e5dc1e8029923f52"
};

export const paypalConfigSandbox = {
  // redirectURI: "http://localhost:4000/paypal/authenticateResult",
  redirectURI: "https://api.liquidash.pl/paypal/authenticateResult",
  userScopes: ["openid", "profile", "email", "address", "phone"],
  clientID: "ASfO1H0mADohGRw2pX1mY0f2u4T6LmZzvssekIVfLfJAsqPd-UjN_xEhc7gzj9R6rlDp4HvsSBB8BxK7",
  clientSecret: "EDXICZXmXulpBA_LssZmUr2-3WgoOeA7Qos2dsakEHZXMNXC20Erk6KZ1zpvT0BeIM12E0IJjEnGLkR4",
  authorizeUrl: "https://www.sandbox.paypal.com/signin/authorize",
  api: "https://api.sandbox.paypal.com/v1/",
  apiTokenService: "https://api.sandbox.paypal.com/v1/identity/openidconnect/tokenservice"
};

export const paypalConfig = {
  // redirectURI: "http://localhost:4000/paypal/authenticateResult",
  redirectURI: "https://api.liquidash.pl/paypal/authenticateResult",
  userScopes: ["openid", "profile", "email", "address", "phone"],
  clientID: "AR-cWCrFFOiRP_aSp6VgurEZBCNecPixTWsopyHrBVRiRJ9kde2KgRpIelpy-DtytodJDJMyIC5JPQQ1",
  clientSecret: "EKSZLSU5OoUmabEqr7xATzvPhMWA70Q_XrjWL0ds-ShFNnByv_a0sMKC56avEaTj5sifjgc4vq_QgCUk",
  authorizeUrl: "https://www.paypal.com/signin/authorize",
  api: "https://api.paypal.com/v1/",
  apiTokenService: "https://api.paypal.com/v1/identity/openidconnect/tokenservice",
  paths: {
    personalData: "https://api.paypal.com/v1/identity/openidconnect/userinfo?schema=openid"
  }
};
