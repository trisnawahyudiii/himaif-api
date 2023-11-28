import { z } from "zod";

export const himpunanValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
});
