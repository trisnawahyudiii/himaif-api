import { Request, Response } from "express";
import { db } from "../lib/db";
import { handleError } from "../lib/handleError";
import { SuccessResponse } from "../types";
import { jobdescDivisiValidationSchema } from "../features/jobdesc-divisi/lib/jobdesc-divisi-validation-schema";
import createHttpError from "http-errors";
import { JobdescDivisi, Prisma } from "@prisma/client";
export const create = async (req: Request, res: Response) => {
  try {
    const validatedData = jobdescDivisiValidationSchema.parse(req.body);

    const target = await db.divisi.findUnique({
      where: { id: validatedData.divisiId },
    });

    if (!target) throw createHttpError(404, "divisi not found");

    const createPayload = validatedData.jobdesc.map((val) => ({
      divisiId: validatedData.divisiId,
      name: val.name,
      description: val.description,
    }));

    const result = await db.jobdescDivisi.createMany({
      data: createPayload,
    });

    const successResponse: SuccessResponse<Prisma.BatchPayload> = {
      meta: {
        success: true,
        message: "Jobdesces created successfully",
      },
      payload: result,
    };

    return res.status(201).json(successResponse);
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};

export const list = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};

export const getSingle = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};
