import { authorize } from "../middlewares";
import { RoleController } from "../controllers";
import express from "express";

const RoleRouter = express.Router();

// CRUD
RoleRouter.get("/", authorize(["SUPER_ADMIN"]), RoleController.list);
RoleRouter.get(
  "/:roleId",
  authorize(["SUPER_ADMIN"]),
  RoleController.getSingle
);
RoleRouter.post("/", authorize(["SUPER_ADMIN"]), RoleController.create);
RoleRouter.put("/:roleId", authorize(["SUPER_ADMIN"]), RoleController.update);
RoleRouter.delete(
  "/:roleId",
  authorize(["SUPER_ADMIN"]),
  RoleController.destroy
);

// ASSIGN ROLE AND UNASSIGN ROLE
RoleRouter.post(
  "/assign-role",
  authorize(["SUPER_ADMIN"]),
  RoleController.assignRole
);
RoleRouter.delete(
  "/unassign-role/:userRoleId",
  authorize(["SUPER_ADMIN"]),
  RoleController.unAssignRole
);

export { RoleRouter };
