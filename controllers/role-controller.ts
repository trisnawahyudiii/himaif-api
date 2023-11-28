import { Request, Response } from "express";
import createHttpError from "http-errors";
import { SuccessResponse } from "types";

import { Role, UserRole } from "@prisma/client";

import {
  rolePayloadMapper,
  roleValidationSchema,
  assignRoleValidationSchema,
} from "../features/role/lib";
import { RoleWithUser } from "../features/role/types";
import { db } from "../lib/db";
import { handleError } from "../lib/handleError";

export const list = async (req: Request, res: Response) => {
  try {
    const data = await db.role.findMany();

    const successResponse: SuccessResponse<Role[]> = {
      meta: {
        success: true,
        message: "Role data obtained successfully",
      },
      payload: data,
    };

    return res.status(200).json(successResponse);
  } catch (error) {
    console.log(error);
    return handleError(error, res);
  }
};

export const getSingle = async (req: Request, res: Response) => {
  try {
    const { roleId } = req.params;

    if (!roleId) throw createHttpError(400, "RoleId is required");

    const data = await db.role.findUnique({
      where: { id: parseInt(roleId) },
      include: {
        UserRole: {
          select: {
            id: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!data) throw createHttpError(404, "Role not found");

    const roleData = rolePayloadMapper(data);

    const successResponse: SuccessResponse<RoleWithUser> = {
      meta: {
        success: true,
        message: "Role data obtained successfully",
      },
      payload: roleData,
    };

    return res.status(200).json(successResponse);
  } catch (error) {
    console.log(error);
    return handleError(error, res);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const validatedData = roleValidationSchema.parse(req.body);

    const exist = await db.role.findUnique({
      where: { name: validatedData.name },
    });

    if (exist) throw createHttpError(409, "Role already exist");

    const createdRole = await db.role.create({
      data: {
        name: validatedData.name,
        UserRole: {
          create: {
            userId: 1,
          },
        },
      },
    });

    const successResponse: SuccessResponse<Role> = {
      meta: {
        success: true,
        message: "Role created successfully",
      },
      payload: createdRole,
    };

    return res.status(201).json(successResponse);
  } catch (error) {
    console.log(error);
    return handleError(error, res);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { roleId } = req.params;
    if (!roleId) throw createHttpError(400, "RoleId is required");

    const target = await db.role.findUnique({
      where: { id: parseInt(roleId) },
    });

    if (!target) throw createHttpError(404, "Role not found");

    const validatedData = roleValidationSchema.parse(req.body);

    const updatedData = await db.role.update({
      where: { id: target.id },
      data: {
        name: validatedData.name,
      },
    });

    const successResponse: SuccessResponse<Role> = {
      meta: {
        success: true,
        message: "Role updated successfully",
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
    const { roleId } = req.params;
    if (!roleId) throw createHttpError(400, "RoleId is required");

    const protectedRole = [1, 2, 3];
    if (protectedRole.includes(parseInt(roleId)))
      throw createHttpError(403, "Role is protected");

    const target = await db.role.findUnique({
      where: { id: parseInt(roleId) },
    });

    if (!target) throw createHttpError(404, "Role not found");

    const deletedRole = await db.role.delete({
      where: { id: target.id },
    });

    const successResponse: SuccessResponse<Role> = {
      meta: {
        success: true,
        message: "Role deleted successfully",
      },
      payload: deletedRole,
    };

    return res.status(200).json(successResponse);
  } catch (error) {
    console.log(error);
    return handleError(error, res);
  }
};

// assign role
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

    const exist = await db.userRole.findFirst({
      where: {
        userId: targetUser.id,
        roleId: targetRole.id,
      },
    });

    if (exist) throw createHttpError(409, "User already has the role");

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

// assign role
export const unAssignRole = async (req: Request, res: Response) => {
  try {
    const { userRoleId } = req.params;

    const target = await db.userRole.findUnique({
      where: {
        id: parseInt(userRoleId),
      },
    });

    if (!target) throw createHttpError(409, "User didn't has the role");

    const result = await db.userRole.delete({
      where: { id: target.id },
    });

    const successResponse: SuccessResponse<UserRole> = {
      meta: {
        success: true,
        message: "Role removed from user successfully",
      },
      payload: result,
    };

    return res.status(200).json(successResponse);
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};
