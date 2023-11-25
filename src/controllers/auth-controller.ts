// env
import dotenv from "dotenv";
dotenv.config();

import { Prisma, User, UserRole } from "@prisma/client";
import { Request, Response } from "express";
import {
  ComparePass,
  assignRoleValidationSchema,
  createToken,
  encryptPass,
  userCreatePayloadMapper,
  createUserValidationSchema,
  updateUserValidationSchema,
} from "../features/user/lib";
import createHttpError from "http-errors";
import { SuccessResponse } from "types";
import { AuthResponse, CreatedUser } from "../features/user/types";
import { db } from "../lib/db";
import { handleError } from "../lib/handleError";
import { findUserByEmail } from "../models/user";
import path from "path";
import fs from "fs";

// list
export const list = async (req: Request, res: Response) => {
  try {
    const data = await db.user.findMany({
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

    const userData = data.map((user) => userCreatePayloadMapper(user));

    const successResponse: SuccessResponse<CreatedUser[]> = {
      meta: {
        success: true,
        message: "User data obtained successfully",
      },
      payload: userData,
    };

    return res.status(200).json(successResponse);
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};

// get single
// list
export const getSingle = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const data = await db.user.findUnique({
      where: { id: parseInt(userId) },
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

    if (!data) throw createHttpError(404, "User not found");

    const userData = userCreatePayloadMapper(data);

    const successResponse: SuccessResponse<CreatedUser> = {
      meta: {
        success: true,
        message: "User data obtained successfully",
      },
      payload: userData,
    };

    return res.status(200).json(successResponse);
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};

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

// update user profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) throw createHttpError(404, "user id is required");

    const user = await db.user.findUnique({
      where: { id: parseInt(userId) },
    });
    if (!user) throw createHttpError(404, "user not found");

    const userData = updateUserValidationSchema.parse(req.body);
    const updatePayload: Prisma.UserUpdateInput = {
      name: userData.name,
      nickName: userData.nickName,
      address: userData.address,
      agama: userData.agama,
      gender: userData.gender,
      tempatTanggalLahir: userData.tempatTanggalLahir,
      penyakitKhusus: userData.penyakitKhusus,
    };
    if (user.email !== userData.email) updatePayload.email = userData.email;
    if (user.idLine !== userData.idLine) updatePayload.idLine = userData.idLine;
    if (user.phone !== userData.phone) updatePayload.phone = userData.phone;
    if (user.nim !== userData.nim) updatePayload.nim = userData.nim;

    // create image URL
    if (req.file?.filename) {
      // delete old image
      console.log(user.image?.split("/")[4]);
      if (user.image) {
        const imgPath = path.join(
          __dirname,
          "../../public/uploads/",
          user.image?.split("/")[4]
        );
        console.log("imgpath", imgPath);
        fs.unlinkSync(imgPath);
      }
      // generate new image url
      const url = process.env.API_URL;
      console.log("file: ", req.file);
      const imagePath = req.file.filename;
      const image_url = `${url}/images/${imagePath}`;

      updatePayload.image = image_url;
    }

    const updated = await db.user.update({
      where: {
        id: user.id,
      },
      data: updatePayload,
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

    const updatedUser = userCreatePayloadMapper(updated);

    const successResponse: SuccessResponse<CreatedUser> = {
      meta: {
        success: true,
        message: "User data updated successfully",
      },
      payload: updatedUser,
    };

    return res.status(200).json(successResponse);
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};

// get user profile
export const profile = async (req: Request, res: Response) => {
  try {
    const user = await db.user.findUnique({
      where: { id: req.user.id },
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

export const deleteUser = (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};

export const assignRole = async (req: Request, res: Response) => {
  try {
    const validatedData = assignRoleValidationSchema.parse(req.body);

    const targetUser = await db.user.findUnique({
      where: { id: validatedData.userId },
    });
    if (!targetUser) throw createHttpError(404, "user not found");

    const targetRole = await db.role.findUnique({
      where: { id: validatedData.roleId },
    });
    if (!targetRole) throw createHttpError(404, "role not found");

    const result = await db.userRole.create({
      data: {
        userId: targetUser.id,
        roleId: targetRole.id,
      },
    });

    const successResponse: SuccessResponse<UserRole> = {
      meta: {
        success: true,
        message: "Role successfully assigned",
      },
      payload: result,
    };

    return res.status(201).json(successResponse);
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};
