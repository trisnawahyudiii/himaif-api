import { Request, Response } from "express";
import { SuccessResponse } from "types";

import { Himpunan } from "@prisma/client";

import { himpunanValidationSchema } from "../features/himpunan/lib/himpunan-validation-schema";
import { db } from "../lib/db";
import { handleError } from "../lib/handleError";
import createHttpError from "http-errors";

export const create = async (req: Request, res: Response) => {
  try {
    const { name, description } = himpunanValidationSchema.parse(req.body);

    const result = await db.himpunan.create({
      data: { name, description },
    });

    const SuccessResponse: SuccessResponse<Himpunan> = {
      meta: {
        success: true,
        message: "Berhasil menambah data himpunan",
      },
      payload: result,
    };

    return res.status(201).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};

export const list = async (req: Request, res: Response) => {
  try {
    const dataList = await db.himpunan.findMany();

    const SuccessResponse: SuccessResponse<Himpunan[]> = {
      meta: {
        success: true,
        message: "Berhasil mengambil data himpunan",
      },
      payload: dataList,
    };

    return res.status(200).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};

export const getSingle = async (req: Request, res: Response) => {
  try {
    const { himpunanId } = req.params;

    const data = await db.himpunan.findUnique({
      where: {
        id: parseInt(himpunanId),
      },
    });

    if (!data) throw createHttpError(404, "Himpunan data not found");

    const SuccessResponse: SuccessResponse<Himpunan> = {
      meta: {
        success: true,
        message: "Berhasil mengambil data himpunan",
      },
      payload: data,
    };

    return res.status(200).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { name, description } = himpunanValidationSchema.parse(req.body);
    const { himpunanId } = req.params;

    const target = await db.himpunan.findUnique({
      where: {
        id: parseInt(himpunanId),
      },
    });
    if (!target) throw createHttpError(404, "Himpunan data not found");

    const updatedData = await db.himpunan.update({
      where: { id: target.id },
      data: {
        name,
        description,
      },
    });

    const SuccessResponse: SuccessResponse<Himpunan> = {
      meta: {
        success: true,
        message: "Berhasil mengubah data himpunan",
      },
      payload: updatedData,
    };

    return res.status(200).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const { himpunanId } = req.params;

    const target = await db.himpunan.findUnique({
      where: {
        id: parseInt(himpunanId),
      },
    });

    if (!target) throw createHttpError(404, "Himpunan data not found");

    const result = await db.himpunan.delete({
      where: { id: target.id },
    });

    const SuccessResponse: SuccessResponse<Himpunan> = {
      meta: {
        success: true,
        message: "Berhasil menghapus data himpunan",
      },
      payload: result,
    };

    return res.status(200).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};
