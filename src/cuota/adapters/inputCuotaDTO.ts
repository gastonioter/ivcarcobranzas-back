import z, { array } from "zod";
import { CuotaStatus } from "../domain/cuota.entity";

const createCuotaSchema = z.object({
  amount: z.number(),
  customerId: z.string().uuid(),
  year: z.number(),
  month: z.number(),
  status: z.enum([CuotaStatus.PENDING, CuotaStatus.NO_SERVICE]),
  facturaId: z.string().optional(),
});

const UpdateCuotasSchema = z.object({
  cuotasId: array(z.string().uuid()).nonempty(),
  customerId: z.string().uuid(),
  status: z.nativeEnum(CuotaStatus),
});

const updateCuotaSchema = z.object({
  status: z.nativeEnum(CuotaStatus),
  serie: z.string(),
  customerId: z.string().uuid(),
});

export type UpdateCuotaDTO = z.infer<typeof updateCuotaSchema>;

export type UpdateCuotasDTO = z.infer<typeof UpdateCuotasSchema>;

export type CreateCuotaDTO = z.infer<typeof createCuotaSchema>;
