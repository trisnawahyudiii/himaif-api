import { authorize, upload, convertToWebP } from "../middlewares";
import { AuthController } from "../controllers";
import express from "express";

const AuthRouter = express.Router();

AuthRouter.post("/register", AuthController.register);
AuthRouter.post("/login", AuthController.login);
AuthRouter.post("/logout", authorize(), AuthController.logout);
AuthRouter.put(
  "/update/:userId",
  authorize(),
  upload.single("image"),
  convertToWebP,
  AuthController.updateProfile
);
AuthRouter.get("/profile", authorize(), AuthController.profile);
AuthRouter.post(
  "/assign-role",
  authorize(["SUPER_ADMIN"]),
  AuthController.assignRole
);

export { AuthRouter };
