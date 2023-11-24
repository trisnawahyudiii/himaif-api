import { z } from "zod";

export const assignRoleValidationSchema = z.object({
  userId: z.number({ required_error: "UserId is required" }),
  roleId: z
    .number({ required_error: "roleId is required" })
    .refine((value) => value !== 1, {
      message: "protected role cannot be assigned",
    }),
  roleName: z.string().refine((value) => value !== "SUPER_ADMIN", {
    message: "protected role cannot be assigned",
  }),
});
