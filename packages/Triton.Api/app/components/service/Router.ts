import { servicesOAuth } from "@CFG/services";
import {
  getAccessToken,
  requestAuthentication
} from "@COMP/authentication/Manager";
import express, { Request, Response } from "express";
import { resolve } from "path";

const router = express.Router();

/**
 * @TODO: Write some documentation or something 🤦‍
 */
router.get("/:serviceName", async (req: Request, res: Response) => {
  try {
    if (req.query.id === undefined) {
      res.send("GIVE ME YOUR ID AND I WILL GIVE YOU NOTHING 🐱‍🐉");
      return false;
    }

    const serviceName = req.params.serviceName.toLowerCase();

    if (servicesOAuth[serviceName] === undefined) {
      res.send("WE DO NOT HAVE ANY SERVICE THAT YOU WANT 🤷‍");
      return false;
    }

    const authUrl = await requestAuthentication(
      // @TODO: Fix this!!
      req.query.id,
      serviceName,
      servicesOAuth[serviceName]
    );

    return authUrl && res.redirect(authUrl);
  } catch (e) {
    throw Error(e);
  }
});

router.get(
  "/:serviceName/authenticateResult",
  async (req: Request, res: Response) => {
    try {
      const serviceName = req.params.serviceName.toLowerCase();

      if (servicesOAuth[serviceName] === undefined) {
        res.send("WE DO NOT HAVE ANY SERVICE THAT YOU WANT 🤷‍");
        return false;
      }

      const code = req.query.code;
      const state = req.query.state;

      if (code === undefined || state === undefined) {
        res.send("I NEED CODE AND STATE TO DO SOMETHING 🤔");
        return false;
      }

      const accessToken: boolean = await getAccessToken(
        serviceName,
        servicesOAuth[serviceName],
        { code, state }
      );

      // @TODO: Fix view path
      if (accessToken) {
        res.sendFile(
          resolve(__dirname, "../../../../app/views/authenticateSuccess.html")
        );
      } else {
        res.sendFile(
          resolve(__dirname, "../../../../app/views/authenticateError.html")
        );
      }
      return true;
    } catch (e) {
      throw Error(e);
    }
  }
);

export default router;
