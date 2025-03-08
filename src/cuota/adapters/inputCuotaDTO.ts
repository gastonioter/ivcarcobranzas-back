import z from "zod";
import { CuotaStatus } from "../domain/cuota.entity";

const createCuotaSchema = z.object({
  amount: z.number(),
  customerId: z.string().uuid(),
  year: z.number(),
  month: z.number(),
  status: z.enum([CuotaStatus.PENDING, CuotaStatus.NO_SERVICE]),
});

export type CreateCuotaDTO = z.infer<typeof createCuotaSchema>;
