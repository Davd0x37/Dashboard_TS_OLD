import {
  getAccessToken,
  requestAuthentication
} from "@/components/authentication";
import { ApiTokens } from "@/entity/ApiTokens";
import { AppError } from "@/utils/log";
import express, { Request, Response } from "express";

const router = express.Router();
/**
 * User opens `api.path/services/serviceName`
 * then page redirects to selected service
 * for authentication. If user is successfully
 * authenticated, service will redirect to
 * `api.path/services/serviceName/authenticateResult`
 */
router.get("/:serviceName", async (req: Request, res: Response) => {
  try {
    if (req.query.token === undefined) {
      res.render("error", {
        message: "YOU DO NOT HAVE TOKEN THAT I NEED 🐱‍🐉"
      });

      return false;
    }

    const serviceName = req.params.serviceName.toLowerCase();
    const authUrl = await requestAuthentication(req.query.token, serviceName);
    return res.redirect(authUrl);
  } catch (err) {
    res.render("error", { message: err });

    return AppError(err, false);
  }
});

router.get(
  "/:serviceName/authenticateResult",
  async (req: Request, res: Response) => {
    try {
      const serviceName = req.params.serviceName.toLowerCase();
      const code = req.query.code;
      const state = req.query.state;

      if (code === undefined || state === undefined) {
        res.render("error", {
          message: "YOU PASSED WRONG URL 🤔"
        });
        return false;
      }

      await getAccessToken(serviceName, { code, state });
      res.render("success");

      return true;
    } catch (err) {
      res.render("error", { message: err });

      return AppError(err, false);
    }
  }
);

export default router;
