import express from "express";

import { PendaftaranHimpunanController } from "../controllers";
import { authorize } from "../middlewares";

const PendaftaranHimpunanRoutes = express.Router();

PendaftaranHimpunanRoutes.get(
  "/",
  authorize(["SUPER_ADMIN", "ADMIN"]),
  PendaftaranHimpunanController.list
);
PendaftaranHimpunanRoutes.get(
  "/:userId",
  authorize(),
  PendaftaranHimpunanController.getSingle
);
PendaftaranHimpunanRoutes.post(
  "/",
  authorize(),
  PendaftaranHimpunanController.create
);
PendaftaranHimpunanRoutes.delete(
  "/:userId",
  authorize(["SUPER_ADMIN", "ADMIN"]),
  PendaftaranHimpunanController.destroy
);

export { PendaftaranHimpunanRoutes };
