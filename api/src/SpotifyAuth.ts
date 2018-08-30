import express, { Request, Response } from "express";
import { resolve } from "path";
import { spotifyConfig } from "./config";
import Authenticate from "./controller/Authenticate";
import { Spotify } from "./services/Spotify";

const router = express.Router();

// Cookies - user_id contains user id from database for further authentications
const userAuthenticationID = "user_id";

// SPOTIFY
// Redirect to spotify for authentication
router.get("/authenticate", (req: Request, res: Response) =>
  Authenticate.authenticateAccount(req.cookies[userAuthenticationID], res, "spotify", {
    clientID: spotifyConfig.clientID,
    redirect: spotifyConfig.redirectURI,
    scopes: spotifyConfig.userScopes.join("+"),
    url: spotifyConfig.authenticateURL
  })
);
// Redirect from spotify authenticator with success or error message
router.get("/authenticateResult", (req: Request, res: Response) => {
  Spotify.accessToken(req.cookies[userAuthenticationID], { code: req.query.code, state: req.query.state });
  res.sendFile(resolve(__dirname, "./views/authenticateResult.html"));
});

export default router;
