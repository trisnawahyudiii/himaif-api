import z from "zod";

export const jobdescDivisiValidationSchema = z.object({
  divisiId: z.number({ required_error: "Divisi id is reuqired" }),
  jobdesc: z.array(
    z.object({
      name: z.string({ required_error: "jobdesc name is required" }),
      description: z.string({
        required_error: "jobdesc description is required",
      }),
    })
  ),
});
