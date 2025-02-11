import { z } from "zod";
import { CustomerModalidad, CustomerStatus } from "../domain/types";

const phoneSchema = z.string().regex(/^\+?\d{10,15}$/, {
  message: "Número de teléfono inválido. Debe contener entre 10 y 15 dígitos.",
});

export const createCustomerSchema = z
  .object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    phone: phoneSchema,
    modalidad: z.nativeEnum(CustomerModalidad),
    priceCategoryId: z.string().uuid().optional(), // Solo para CLOUD
  })
  .superRefine((data, ctx) => {
    if (data.modalidad === CustomerModalidad.CLOUD && !data.priceCategoryId) {
      ctx.addIssue({
        path: ["category"],
        message:
          "Los clientes de modalidad CLOUD deben tener una categoría de pago.",
        code: "custom",
      });
    }
  });

export const BajaCustumerSchema = z.object({
  uuid: z.string(),
  status: z.nativeEnum(CustomerStatus),
});

export type CreateCustomerDTO = z.infer<typeof createCustomerSchema>;
export type EditCustomerDTO = z.infer<typeof createCustomerSchema>;
export type BajaCustomerRequest = z.infer<typeof BajaCustumerSchema>;
