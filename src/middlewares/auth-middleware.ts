import dotenv from "dotenv";
dotenv.config();

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { handleError } from "../lib/handleError";

const SECRET_KEY: jwt.Secret = process.env.SECRET!;

function checkRole(array1: string[], array2: string[]): boolean {
  const commonValues = array1.filter((value) => array2.includes(value));
  return commonValues.length > 0;
}

export const authorize =
  (roles: string[] = []) =>
  (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers["authorization"];

    if (!bearerToken) {
      // If no token is provided, return a 401 Unauthorized response
      return res
        .status(401)
        .json({ error: "Unauthorized - No token provided" });
    }

    try {
      const token = bearerToken.split("Bearer ")[1];

      jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
        if (err) throw handleError(err, res);

        // If roles are specified and the decoded user doesn't have any of those roles, return 403
        if (roles.length > 0 && !checkRole(roles, user.role)) {
          return res.sendStatus(403);
        }

        // Attach decoded information to request locals
        req.user = user;

        next();
      });
    } catch (error) {
      return handleError(error, res);
    }
  };
