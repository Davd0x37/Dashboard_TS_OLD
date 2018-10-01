import express, { Request, Response } from "express";
import { resolve } from "path";
import { paypalConfig } from "../../config";
import Authenticate from "../../controller/Authenticate";
import { generateRandomString } from "../../utils/utils";

const userAuthenticationID = "user_id";
const router = express.Router();

// Create new instance of authenticator
const auth = new Authenticate();

// Redirect to spotify for authentication
router.get("/authenticate", async (req: Request, res: Response) => {
  const nonce = `${Date.now() + Buffer.from(generateRandomString(16, true)).toString("base64")}`;
  const authUrl = await auth.authenticateAccount(req.cookies[userAuthenticationID], "paypal", {
    clientID: paypalConfig.clientID,
    redirect: paypalConfig.redirectURI,
    scopes: paypalConfig.userScopes.join("+"),
    url: paypalConfig.authenticateURL,
    nonce
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
    url: paypalConfig.apiTokenService,
    Authorization: auth.generateBasicAuthorization(paypalConfig.clientID, paypalConfig.clientSecret)
  });

  res.sendFile(resolve(__dirname, "../src/views/authenticateResult.html"));
});

export default router;
