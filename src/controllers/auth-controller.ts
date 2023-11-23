// env
import dotenv from "dotenv";
dotenv.config();

import { Prisma, User } from "@prisma/client";
import { Request, Response } from "express";
import {
  ComparePass,
  createToken,
  encryptPass,
  userCreatePayloadMapper,
} from "../features/user/lib";
import createHttpError from "http-errors";
import { SuccessResponse } from "types";
import { AuthResponse } from "../features/user/types";
import { db } from "../lib/db";
import { handleError } from "../lib/handleError";
import { createUserValidationSchema } from "../lib/validation-schema";
import { findUserByEmail } from "../models/user";

// register
export const register = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const {
      name,
      email,
      password,
      nickName,
      nim,
      agama,
      phone,
      tempatTanggalLahir,
      address,
      idLine,
      gender,
    } = createUserValidationSchema.parse(body);
    // check duplicates
    const existingUser = await findUserByEmail(body.email);

    if (existingUser) {
      const err = createHttpError(409, `${email} already registered`);
      throw err;
    }

    // User Create Payload
    const role = await db.role.findFirst({
      where: {
        name: "MAHASISWA",
      },
    });

    const encryptedPassword = encryptPass(password);

    const createPayload: Prisma.UserCreateInput = {
      name,
      email,
      password: encryptedPassword,
      nickName,
      nim,
      agama,
      phone,
      tempatTanggalLahir,
      address,
      idLine,
      gender,
      UserRole: {
        create: {
          roleId: role?.id!,
        },
      },
    };

    // create user on db with return value
    const newUser = await db.user.create({
      data: createPayload,
      include: {
        UserRole: {
          select: {
            role: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    const user = userCreatePayloadMapper(newUser);
    const accessToken = createToken(user);

    // return response
    const SuccessResponse: SuccessResponse<AuthResponse> = {
      meta: {
        success: true,
        message: "Registrasi berhasil dilakukan",
      },
      payload: {
        user,
        accessToken: accessToken,
      },
    };

    res.status(201).json(SuccessResponse);
  } catch (error) {
    console.error(error);
    handleError(error, res);
  }
};

// login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userByEmail = await findUserByEmail(email);

    if (!userByEmail || !ComparePass(password, userByEmail.password)) {
      if (!userByEmail) {
        throw createHttpError(404, `${email} not registered`);
      }

      throw createHttpError(400, "wrong password");
    }

    const user = userCreatePayloadMapper(userByEmail);

    const accessToken = createToken(user);

    res.cookie("access_token", accessToken, { httpOnly: true });

    const successResponse: SuccessResponse<AuthResponse> = {
      meta: {
        success: true,
        message: "Login berhasil",
      },
      payload: {
        user,
        accessToken: accessToken,
      },
    };

    res.status(200).json(successResponse);
  } catch (error) {
    console.error(error);
    handleError(error, res);
  }
};

// logout
export const logout = (req: Request, res: Response) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  res.json({ message: "Logout successful" });
};

// get user profile
export const profile = async (req: Request, res: Response) => {
  console.log(req.app.locals.credential);

  try {
    const user = await db.user.findUnique({
      where: { id: req.app.locals.credential.id },
    });

    if (!user) {
      throw createHttpError(404, "user tidak ditemukan");
    }

    const successResponse: SuccessResponse<User> = {
      meta: {
        success: true,
        message: "Profile data successfully retrieved",
      },
      payload: user,
    };

    res.status(200).json(successResponse);
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};

export const update = (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};

export const deleteUser = (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};
