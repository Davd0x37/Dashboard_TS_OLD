import express, { Request, Response } from "express";
import { resolve } from "path";
import { spotifyConfig } from "../config/secretConfig";
import Authenticate from "../controller/Authenticate";

const userAuthenticationID = "user_id";
const router = express.Router();

const auth = new Authenticate();

// Redirect to spotify for authentication
router.get("/authenticate", async (req: Request, res: Response) => {
  const authUrl = await auth.authenticateAccount(req.cookies[userAuthenticationID], "spotify", {
    clientID: spotifyConfig.clientID,
    redirect: spotifyConfig.redirectURI,
    scopes: spotifyConfig.userScopes.join("+"),
    url: spotifyConfig.authenticateURL
  });
  res.redirect(authUrl);
});

// Redirect from spotify authenticator with success or error message
router.get("/authenticateResult", async (req: Request, res: Response) => {
  const code = req.query.code;
  const state = req.query.state;

  await auth.getAccessToken({
    code,
    state,
    redirect_uri: spotifyConfig.redirectURI,
    url: spotifyConfig.apiTokenService,
    Authorization: auth.generateBasicAuthorization(spotifyConfig.clientID, spotifyConfig.clientSecret)
  });

  res.sendFile(resolve(__dirname, "./views/authenticateResult.html"));
});

export default router;
