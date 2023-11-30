import { Request, Response } from "express";
import { db } from "../lib/db";
import { handleError } from "../lib/handleError";
import { SuccessResponse } from "../types";
import {
  jobdescDivisiValidationSchema,
  updateJobdescDivisiValidationSchema,
} from "../features/jobdesc-divisi/lib/jobdesc-divisi-validation-schema";
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
    return handleError(error, res);
  }
};

export const list = async (req: Request, res: Response) => {
  try {
    const { divisiId } = req.params;

    const target = await db.divisi.findUnique({
      where: { id: parseInt(divisiId) },
    });

    if (!target) throw createHttpError(404, "Divisi not found");

    const jobdescs = await db.jobdescDivisi.findMany({
      where: {
        divisiId: target.id,
      },
    });

    const successResponse: SuccessResponse<JobdescDivisi[]> = {
      meta: {
        success: true,
        message: "Jobdesces obtained successfully",
      },
      payload: jobdescs,
    };

    return res.status(200).json(successResponse);
  } catch (error) {
    console.log(error);
    return handleError(error, res);
  }
};

export const getSingle = async (req: Request, res: Response) => {
  try {
    const { jobdescId } = req.params;

    const data = await db.jobdescDivisi.findUnique({
      where: { id: parseInt(jobdescId) },
    });

    if (!data) throw createHttpError(404, "Jobdesc not found");

    const successResponse: SuccessResponse<JobdescDivisi> = {
      meta: {
        success: true,
        message: "Jobdesces obtained successfully",
      },
      payload: data,
    };

    return res.status(200).json(successResponse);
  } catch (error) {
    console.log(error);
    return handleError(error, res);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { jobdescId } = req.params;

    const target = await db.jobdescDivisi.findUnique({
      where: { id: parseInt(jobdescId) },
    });

    if (!target) throw createHttpError(404, "Jobdesc not found");

    const { name, description } = updateJobdescDivisiValidationSchema.parse(
      req.body
    );

    const updatedData = await db.jobdescDivisi.update({
      where: { id: target.id },
      data: {
        name,
        description,
      },
    });

    const successResponse: SuccessResponse<JobdescDivisi> = {
      meta: {
        success: true,
        message: "Jobdesces updated successfully",
      },
      payload: updatedData,
    };

    return res.status(200).json(successResponse);
  } catch (error) {
    console.log(error);
    return handleError(error, res);
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const { jobdescId } = req.params;

    const target = await db.jobdescDivisi.findUnique({
      where: { id: parseInt(jobdescId) },
    });

    if (!target) throw createHttpError(404, "Jobdesc not found");

    const deletedData = await db.jobdescDivisi.delete({
      where: { id: target.id },
    });

    const successResponse: SuccessResponse<JobdescDivisi> = {
      meta: {
        success: true,
        message: "Jobdesces deleted successfully",
      },
      payload: deletedData,
    };

    return res.status(200).json(successResponse);
  } catch (error) {
    console.log(error);
    return handleError(error, res);
  }
};
