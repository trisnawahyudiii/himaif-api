import { authenticateToken } from "../middlewares";
import { AuthController } from "../controllers";
import express from "express";

const AuthRouter = express.Router();

AuthRouter.post("/register", AuthController.register);
AuthRouter.post("/login", AuthController.login);
AuthRouter.post("/logout", authenticateToken, AuthController.logout);
AuthRouter.get("/profile", authenticateToken, AuthController.profile);

export { AuthRouter };
