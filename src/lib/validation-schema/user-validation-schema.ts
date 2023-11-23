import { z } from "zod";
const Gender = ["LAKI_LAKI", "PEREMPUAN"] as const;

export const createUserValidationSchema = z
  .object({
    name: z.string().min(3, "Full Name must consist of at least 3 letters"),
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .refine((value) => /[A-Z]/.test(value), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((value) => /\d/.test(value), {
        message: "Password must contain at least one digit",
      })
      .refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value), {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string(),
    nim: z.string(),
    tempatTanggalLahir: z.string(),
    gender: z.enum(Gender),
    phone: z.optional(z.string()),
    address: z.optional(z.string()),
    nickName: z.optional(z.string()),
    agama: z.optional(z.string()),
    idLine: z.optional(z.string()),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });
