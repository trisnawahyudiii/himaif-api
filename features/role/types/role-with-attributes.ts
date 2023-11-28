import { Prisma } from "@prisma/client";

export type RoleWithAttributes = Prisma.RoleGetPayload<{
  include: {
    UserRole: {
      select: {
        id: true;
        user: {
          select: {
            name: true;
          };
        };
      };
    };
  };
}>;

export type RoleWithUser = {
  id: number;
  name: string;
  users: {
    userRoleId: number;
    name: string;
  }[];
};
