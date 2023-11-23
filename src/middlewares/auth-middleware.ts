import dotenv from "dotenv";
dotenv.config();

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY: jwt.Secret = process.env.SECRET!;

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["access_token"];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.app.locals.credential = user;
    next();
  });
};
