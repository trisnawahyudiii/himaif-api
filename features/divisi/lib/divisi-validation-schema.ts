import z from "zod";

export const divisiValidationSchema = z.object({
  name: z.string({ required_error: "Divisi name is required" }),
  description: z.string({ required_error: "Divisi description is required" }),
  himpunanId: z.number({ required_error: "Himpunan id is required" }),
});
