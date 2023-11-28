import z from "zod";

export const roleValidationSchema = z.object({
  name: z
    .string({ required_error: "Role name is required" })
    .transform((name) => name.toUpperCase())
    .refine((value) => /^[A-Z_]+$/.test(value), {
      message: "Name must be uppercase and separated by underscores",
    }),
});

export const assignRoleValidationSchema = z.object({
  userId: z.number({ required_error: "UserId is required" }),
  roleId: z
    .number({ required_error: "roleId is required" })
    .refine((value) => value !== 1, {
      message: "protected role cannot be assigned",
    }),
});
