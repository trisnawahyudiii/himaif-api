import { ErrorResponse } from "types";
import { z } from "zod";
const createError = require("http-errors");
import { Response } from "express";
import { Prisma } from "@prisma/client";

export function handleError(error: any, res: Response) {
  if (error instanceof z.ZodError) {
    const errorResponse: ErrorResponse = {
      meta: {
        success: false,
        message: "Validation Error",
      },
      error: error.errors.map((err) => err.message),
    };
    return res.status(400).json(errorResponse);
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    const err: Prisma.PrismaClientValidationError = error;

    const errorResponse: ErrorResponse = {
      meta: {
        success: false,
        message: err.message,
      },
      error: [err.message],
    };
    return res.status(400).json(errorResponse);
  }

  if (error.statusCode && error.expose) {
    // Menggunakan isHttpError dari http-errors
    const errorResponse: ErrorResponse = {
      meta: {
        success: false,
        message: error.message,
      },
      error: error,
    };

    return res.status(error.statusCode).json(errorResponse);
  }

  const err = createError(422);
  return res.status(422).json({
    meta: {
      success: true,
      message: err.message,
    },
    error,
  });
}
