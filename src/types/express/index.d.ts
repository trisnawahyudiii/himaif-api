import express from "express";

import { CreatedUser } from "@/features/user/types";

declare global {
  namespace Express {
    interface Request {
      user?: CreatedUser;
    }
  }
}
