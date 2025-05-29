import z, { array } from "zod";
import { CuotaMonths, CuotaStatus } from "../domain/cuota.entity";

const baseCuotaSchema = z.object({
  amount: z
    .number({ message: "El monto es requerido" })
    .min(0, { message: "El monto debe ser mayor o igual a 0" }),

  customerId: z
    .string({ message: "El ID del cliente es obligatorio" })
    .uuid({ message: "ID del cliente inválido" }),

  year: z.number({ message: "El año es requerido" }),

  status: z.enum([CuotaStatus.PENDING, CuotaStatus.NO_SERVICE], {
    errorMap: () => ({ message: "El estado es inválido" }),
  }),

  facturaId: z.string({ message: "ID de factura inválido" }).optional(),
});

const createCuotaSchema = baseCuotaSchema.extend({
  month: z.number(),
});

export const BulkCreateCuotaSchema = baseCuotaSchema.extend({
  months: z
    .array(
      z.nativeEnum(CuotaMonths, {
        errorMap: () => ({ message: "Mes inválido" }),
      }),
    )
    .nonempty({ message: "Debe seleccionar al menos un mes" }),
});

export const UpdateCuotasSchema = z.object({
  cuotasId: z
    .array(
      z
        .string({ message: "ID de cuota inválido" })
        .uuid({ message: "Formato de UUID inválido" }),
    )
    .nonempty({ message: "Debe incluir al menos un ID de cuota" }),

  customerId: z
    .string({ message: "ID del cliente es obligatorio" })
    .uuid({ message: "ID del cliente inválido" }),

  status: z.nativeEnum(CuotaStatus, {
    errorMap: () => ({ message: "Estado inválido" }),
  }),
});

export const updateCuotaSchema = z.object({
  status: z.nativeEnum(CuotaStatus, {
    errorMap: () => ({ message: "Estado inválido" }),
  }),
  serie: z.string({ message: "La serie es obligatoria" }),
  monto: z.number({ message: "El monto es obligatorio" }),
  customerId: z
    .string({ message: "ID del cliente es obligatorio" })
    .uuid({ message: "ID del cliente inválido" }),
});

export type UpdateCuotaDTO = z.infer<typeof updateCuotaSchema>;

export type UpdateCuotasDTO = z.infer<typeof UpdateCuotasSchema>;

export type CreateCuotaDTO = z.infer<typeof createCuotaSchema>;

export type BulkCreateCuotasDTO = z.infer<typeof BulkCreateCuotaSchema>;
