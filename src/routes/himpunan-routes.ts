import express from "express";

import { HimpunanControler } from "../controllers";
import { authorize } from "../middlewares";

const HimpunanRouter = express.Router();

HimpunanRouter.get(
  "/",
  authorize(["SUPER_ADMIN", "ADMIN"]),
  HimpunanControler.list
);
HimpunanRouter.get(
  "/:himpunanId",
  authorize(["SUPER_ADMIN", "ADMIN"]),
  HimpunanControler.getSingle
);
HimpunanRouter.post(
  "/",
  authorize(["SUPER_ADMIN", "ADMIN"]),
  HimpunanControler.create
);
HimpunanRouter.put(
  "/:himpunanId",
  authorize(["SUPER_ADMIN", "ADMIN"]),
  HimpunanControler.update
);
HimpunanRouter.delete(
  "/:himpunanId",
  authorize(["SUPER_ADMIN", "ADMIN"]),
  HimpunanControler.destroy
);

export { HimpunanRouter };
