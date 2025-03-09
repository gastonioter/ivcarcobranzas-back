import z, { array } from "zod";
import { CuotaStatus } from "../domain/cuota.entity";

const createCuotaSchema = z.object({
  amount: z.number(),
  customerId: z.string().uuid(),
  year: z.number(),
  month: z.number(),
  status: z.enum([CuotaStatus.PENDING, CuotaStatus.NO_SERVICE]),
});

const UpdateCuotasSchema = z.object({
  cuotasId: array(z.string().uuid()).nonempty(),
  customerId: z.string().uuid(),
  status: z.nativeEnum(CuotaStatus),
});

export type UpdateCuotasDTO = z.infer<typeof UpdateCuotasSchema>;

export type CreateCuotaDTO = z.infer<typeof createCuotaSchema>;
