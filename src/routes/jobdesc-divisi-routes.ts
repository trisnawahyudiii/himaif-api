import express from "express";

import { JobdescDivisiController } from "../controllers";
import { authorize } from "../middlewares";

const JobdescDivisiRoutes = express.Router();

JobdescDivisiRoutes.get(
  "/list/:divisiId",
  authorize(["SUPER_ADMIN", "ADMIN"]),
  JobdescDivisiController.list
);
JobdescDivisiRoutes.get(
  "/:jobdescId",
  authorize(["SUPER_ADMIN", "ADMIN"]),
  JobdescDivisiController.getSingle
);
JobdescDivisiRoutes.post(
  "/",
  authorize(["SUPER_ADMIN", "ADMIN"]),
  JobdescDivisiController.create
);
JobdescDivisiRoutes.put(
  "/:jobdescId",
  authorize(["SUPER_ADMIN", "ADMIN"]),
  JobdescDivisiController.update
);
JobdescDivisiRoutes.delete(
  "/:jobdescId",
  authorize(["SUPER_ADMIN", "ADMIN"]),
  JobdescDivisiController.destroy
);

export { JobdescDivisiRoutes };
