import dotenv from "dotenv";
dotenv.config();

import { CreatedUser } from "../types";
import jwt from "jsonwebtoken";

const SECRET_KEY: jwt.Secret = process.env.SECRET ?? "";

export function createToken(user: CreatedUser) {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    SECRET_KEY,
    { expiresIn: "24h" }
  );
}
