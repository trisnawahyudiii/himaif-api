import { authorize, upload, convertToWebP } from "../middlewares";
import { AuthController } from "../controllers";
import express from "express";

const AuthRouter = express.Router();

// authentication
AuthRouter.post("/register", AuthController.register);
AuthRouter.post("/login", AuthController.login);
AuthRouter.post("/logout", authorize(), AuthController.logout);

// user management
AuthRouter.get("/", authorize(["SUPER_ADMIN", "ADMIN"]), AuthController.list);
AuthRouter.get("/profile", authorize(), AuthController.profile);
AuthRouter.get(
  "/:userId",
  authorize(["SUPER_ADMIN", "ADMIN"]),
  AuthController.getSingle
);
AuthRouter.put(
  "/update/:userId",
  authorize(),
  upload.single("image"),
  convertToWebP,
  AuthController.updateProfile
);

export { AuthRouter };
