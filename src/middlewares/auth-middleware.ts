import dotenv from "dotenv";
dotenv.config();

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY: jwt.Secret = process.env.SECRET!;

function checkRole(array1: string[], array2: string[]): boolean {
  // Check if there's any common value between the two arrays
  const commonValues = array1.filter((value) => array2.includes(value));

  // Return true if there is at least one common value, otherwise return false
  return commonValues.length > 0;
}

export const authorize =
  (roles: string[] = []) =>
  (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["access_token"];

    if (!token) {
      return res.sendStatus(401);
    }

    jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403);
      }

      // If roles are specified and the decoded user doesn't have any of those roles, return 403
      if (roles.length > 0 && !checkRole(roles, user.role)) {
        return res.sendStatus(403);
      }

      // Attach decoded information to request locals
      req.app.locals.credential = user;

      next();
    });
  };
