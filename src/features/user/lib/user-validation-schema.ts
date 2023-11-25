import { z } from "zod";
const Gender = ["LAKI_LAKI", "PEREMPUAN"] as const;

export const createUserValidationSchema = z
  .object({
    name: z
      .string({ required_error: "FullName is required" })
      .min(3, "Full Name must consist of at least 3 letters"),
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email format"),
    password: z
      .string({ required_error: "Password is required" })
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
    confirmPassword: z.string({
      required_error: "Confirm Password is required",
    }),
    nim: z.string({ required_error: "NIM is required" }),
    tempatTanggalLahir: z.optional(z.string()),
    gender: z.enum(Gender, { required_error: "Gender is required" }),
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

export const updateUserValidationSchema = z.object({
  name: z.string().min(3, "Full Name must consist of at least 3 letters"),
  nickName: z.string().min(3, "Full Name must consist of at least 3 letters"),
  email: z.string().email("Invalid email format"),
  nim: z.optional(z.string()),
  tempatTanggalLahir: z.string({
    required_error: "Tempat Tanggal Lahir is required",
  }),
  gender: z.optional(z.enum(Gender)),
  phone: z
    .string({ required_error: "Phone number is required" })
    .refine((value) => /^0\d{9,12}$/.test(value), {
      message:
        "invalid phone number. make sure your phone number start with 0 and contains at least 10-13 digits",
    }),
  address: z.string({ required_error: "Address is required" }),
  agama: z.string({ required_error: "Agama is required" }),
  idLine: z.string({ required_error: "IdLine is required" }),
  penyakitKhusus: z.optional(z.string()),
});
