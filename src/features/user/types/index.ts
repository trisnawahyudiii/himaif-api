import { Prisma, Role, User } from "@prisma/client";

export type UserWithUserRole = Prisma.UserGetPayload<{
  include: {
    UserRole: {
      select: {
        role: {
          select: {
            id: true;
            name: true;
          };
        };
      };
    };
  };
}>;

export type CreatedUser = Omit<User, "password" | "createdAt" | "updatedAt"> & {
  role: string[];
};

export type AuthResponse = {
  user: CreatedUser;
  accessToken: String;
};
