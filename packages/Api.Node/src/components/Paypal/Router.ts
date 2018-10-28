import express, { Request, Response } from "express";
import { resolve } from "path";
import signale from "signale";
import { paypalConfig } from "../../config";
import Authenticate from "../../controller/Authenticate";
import { generateRandomString } from "../../utils/utils";

const router = express.Router();

// Create new instance of authenticator
const auth = new Authenticate();

// Redirect to spotify for authentication
router.get("/authenticate", async (req: Request, res: Response) => {
  try {
    const nonce = `${Date.now() + Buffer.from(generateRandomString(16, true)).toString("base64")}`;
    const authUrl = await auth.AuthenticateAccount(req.query.id, "Paypal", {
      clientID: paypalConfig.clientID,
      redirect_uri: paypalConfig.redirectURI,
      scopes: paypalConfig.userScopes.join("+"),
      url: paypalConfig.authorizeUrl,
      nonce
    });
    res.redirect(authUrl);
  } catch (e) {
    signale.error("Paypal.Router.authenticate ------", e);
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
      url: paypalConfig.apiTokenService,
      Authorization: {
        clientID: paypalConfig.clientID,
        clientSecret: paypalConfig.clientSecret
      }
    });

    if (accessToken) {
      res.sendFile(resolve(__dirname, "../src/views/authenticateSuccess.html"));
    } else {
      res.sendFile(resolve(__dirname, "../src/views/authenticateError.html"));
    }
  } catch (e) {
    signale.error("Paypal.Router.authenticateResult ------", e);
    throw Error(e);
  }
});

export default router;
