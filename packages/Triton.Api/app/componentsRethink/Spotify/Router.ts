import Authenticate from '#/controller/Authenticate';
// import { spotifyConfig } from '#SH/Config';
import express, { Request, Response } from 'express';
import { resolve } from 'path';
import signale from 'signale';

const router = express.Router();

const auth = new Authenticate();

// Redirect to spotify for authentication
router.get("/authenticate", async (req: Request, res: Response) => {
  try {
    const authUrl = await auth.AuthenticateAccount(req.query.id, "Spotify", {
      clientID: spotifyConfig.clientID,
      redirect_uri: spotifyConfig.redirectURI,
      scopes: spotifyConfig.userScopes.join("+"),
      url: spotifyConfig.authorizeUrl
    });
    res.redirect(authUrl);
  } catch (e) {
    signale.error("Spotify.Router.authenticate ------", e);
    throw Error(e);
  }
});

// Redirect from spotify authenticator with success or error message
router.get("/authenticateResult", async (req: Request, res: Response) => {
  try {
    const code = req.query.code;
    const state = req.query.state;

    const accessToken = await auth.GetAccessToken({
      code,
      state,
      redirect_uri: spotifyConfig.redirectURI,
      url: spotifyConfig.apiTokenService,
      Authorization: {
        clientID: spotifyConfig.clientID,
        clientSecret: spotifyConfig.clientSecret
      }
    });

    if (accessToken) {
      res.sendFile(resolve(__dirname, "../src/views/authenticateSuccess.html"));
    } else {
      res.sendFile(resolve(__dirname, "../src/views/authenticateError.html"));
    }
  } catch (e) {
    signale.error("Spotify.Router.authenticateResult ------", e);
    throw Error(e);
  }
});

export default router;
