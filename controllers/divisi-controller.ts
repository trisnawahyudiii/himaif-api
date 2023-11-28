import { Request, Response } from "express";
import { db } from "../lib/db";
import { handleError } from "../lib/handleError";
import { SuccessResponse } from "types";
import { divisiValidationSchema } from "../features/divisi/lib/divisi-validation-schema";
import createHttpError from "http-errors";
import { Divisi } from "@prisma/client";

export const create = async (req: Request, res: Response) => {
  try {
    const validatedData = divisiValidationSchema.parse(req.body);

    const target = await db.himpunan.findUnique({
      where: { id: validatedData.himpunanId },
    });

    if (!target) throw createHttpError(404, "Himpunan not found");

    const result = await db.divisi.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        himpunanId: validatedData.himpunanId,
      },
    });

    const successResponse: SuccessResponse<Divisi> = {
      meta: {
        success: true,
        message: "Divisi created successfully",
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
    const { himpunanId } = req.params;

    const target = await db.himpunan.findUnique({
      where: { id: parseInt(himpunanId) },
    });

    if (!target) throw createHttpError(404, "Himpunan not found");

    const data = await db.divisi.findMany({
      where: { himpunanId: target.id },
    });

    const successResponse: SuccessResponse<Divisi[]> = {
      meta: {
        success: true,
        message: "Divisi obtained successfully",
      },
      payload: data,
    };

    return res.status(200).json(successResponse);
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};

export const getSingle = async (req: Request, res: Response) => {
  try {
    const { divisiId } = req.params;

    const data = await db.divisi.findUnique({
      where: { id: parseInt(divisiId) },
    });

    if (!data) throw createHttpError(404, "Divisi not found");

    const successResponse: SuccessResponse<Divisi> = {
      meta: {
        success: true,
        message: "Divisi obtained successfully",
      },
      payload: data,
    };

    return res.status(200).json(successResponse);
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { divisiId } = req.params;

    const target = await db.divisi.findUnique({
      where: { id: parseInt(divisiId) },
    });

    if (!target) throw createHttpError(404, "Divisi not found");

    const validatedData = divisiValidationSchema.parse(req.body);

    const data = await db.divisi.update({
      where: { id: target.id },
      data: {
        name: validatedData.name,
        description: validatedData.description,
      },
    });

    const successResponse: SuccessResponse<Divisi> = {
      meta: {
        success: true,
        message: "Divisi updated successfully",
      },
      payload: data,
    };

    return res.status(200).json(successResponse);
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const { divisiId } = req.params;

    const target = await db.divisi.findUnique({
      where: { id: parseInt(divisiId) },
    });

    if (!target) throw createHttpError(404, "Divisi not found");

    const data = await db.divisi.delete({
      where: { id: target.id },
    });

    const successResponse: SuccessResponse<Divisi> = {
      meta: {
        success: true,
        message: "Divisi deleted successfully",
      },
      payload: data,
    };

    return res.status(200).json(successResponse);
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};
