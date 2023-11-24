import { Request, Response } from "express";
import { db } from "../lib/db";
import { handleError } from "../lib/handleError";
import { SuccessResponse } from "../types";

export const create = async (req: Request, res: Response) => {
  try {
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
