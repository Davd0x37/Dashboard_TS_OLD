import express, { Request, Response } from "express";
import { resolve } from "path";
import { paypalConfig } from "./config";
import Authenticate from "./controller/Authenticate";
import { Paypal } from "./controller/Paypal";
import { generateRandomString } from "./utils/utils";
const router = express.Router();

// Cookies - user_id contains user id from database for further authentications
const userAuthenticationID = "user_id";

// SPOTIFY
// Redirect to spotify for authentication
router.get("/authenticate", (req: Request, res: Response) => {
  const nonce = `${Date.now() + Buffer.from(generateRandomString(16, true)).toString("base64")}`;
  Authenticate.authenticateAccount(req.cookies[userAuthenticationID], res, "paypal", {
    clientID: paypalConfig.clientID,
    redirect: paypalConfig.redirectURI,
    scopes: paypalConfig.userScopes.join("+"),
    url: paypalConfig.authenticateURL,
    nonce
  });
});
// Redirect from spotify authenticator with success or error message
router.get("/authenticateResult", (req: Request, res: Response) => {
  Paypal.accessToken(req.cookies[userAuthenticationID], { code: req.query.code, state: req.query.state });
  res.sendFile(resolve(__dirname, "./views/authenticateResult.html"));
});

export default router;
