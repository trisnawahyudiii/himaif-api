import { db } from "../lib/db";
import { Prisma } from "@prisma/client";

export const findUserByEmail = async (email: string) => {
  return await db.user.findUnique({
    where: {
      email,
    },
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
};

export const createUser = async (payload: Prisma.UserCreateInput) => {
  return await db.user.create({
    data: payload,
  });
};
