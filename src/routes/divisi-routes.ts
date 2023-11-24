import express from "express";

import { DivisiController } from "../controllers";
import { authorize } from "../middlewares";

const DivisiRouter = express.Router();

DivisiRouter.get(
  "/list/:himpunanId",
  authorize(["SUPER_ADMIN", "ADMIN"]),
  DivisiController.list
);
DivisiRouter.get(
  "/:divisiId",
  authorize(["SUPER_ADMIN", "ADMIN"]),
  DivisiController.getSingle
);
DivisiRouter.post(
  "/",
  authorize(["SUPER_ADMIN", "ADMIN"]),
  DivisiController.create
);
DivisiRouter.put(
  "/:divisiId",
  authorize(["SUPER_ADMIN", "ADMIN"]),
  DivisiController.update
);
DivisiRouter.delete(
  "/:divisiId",
  authorize(["SUPER_ADMIN", "ADMIN"]),
  DivisiController.destroy
);

export { DivisiRouter };
